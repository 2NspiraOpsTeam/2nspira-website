#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

const DEV_VARS_PATH = new URL('../../2nspira-website/.dev.vars', import.meta.url);
const API_BASE_URL = 'https://api-mock.payments.jpmorgan.com/api/v2';
const CPM_BASE_URL = 'https://api-mock.payments.jpmorgan.com/api/v2/mmp';
const MERCHANT_ID = process.env.JPM_MERCHANT_ID || '993371390059';

function loadDevVars() {
  const values = {};
  for (const rawLine of readFileSync(DEV_VARS_PATH, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator === -1) continue;
    values[line.slice(0, separator)] = line.slice(separator + 1).trim();
  }
  return values;
}

function sanitizeErrorBody(body) {
  if (!body) return 'empty response';
  try {
    const parsed = JSON.parse(body);
    const safe = {
      responseStatus: parsed.responseStatus,
      responseCode: parsed.responseCode,
      responseMessage: parsed.responseMessage,
      message: parsed.message,
      title: parsed.title,
      status: parsed.status,
      detail: parsed.detail,
      instance: parsed.instance,
      errors: parsed.errors,
      invalidParams: parsed.invalidParams,
      code: parsed.code,
      error: parsed.error,
      error_description: parsed.error_description,
      details: parsed.details,
    };
    return JSON.stringify(Object.fromEntries(Object.entries(safe).filter(([, value]) => value !== undefined)));
  } catch {
    return body.replace(/[A-Za-z0-9_-]{24,}/g, '[redacted]').slice(0, 500);
  }
}

async function acquireToken(config) {
  const attempts = [
    new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'jpm:payments:sandbox',
      client_id: config.JPM_CLIENT_ID,
      client_secret: config.JPM_CLIENT_SECRET,
    }),
    new URLSearchParams({
      grant_type: 'client_credentials',
      audience: 'jpm-combined-banking',
    }),
  ];

  let lastError = 'token request not attempted';
  for (const body of attempts) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (body.has('audience')) {
      headers.Authorization = `Basic ${Buffer.from(`${config.JPM_CLIENT_ID}:${config.JPM_CLIENT_SECRET}`).toString('base64')}`;
    }
    const response = await fetch(config.JPM_TOKEN_URL, { method: 'POST', headers, body });
    const text = await response.text();
    if (response.ok) return JSON.parse(text).access_token;
    lastError = `HTTP ${response.status}: ${sanitizeErrorBody(text)}`;
  }
  throw new Error(`OAuth failed: ${lastError}`);
}

async function postPayment(accessToken, payload) {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'merchant-id': MERCHANT_ID,
      'request-id': randomUUID(),
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${sanitizeErrorBody(text)}`);
  return JSON.parse(text);
}

async function postCpm(accessToken, path, payload) {
  const response = await fetch(`${CPM_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      merchantIdentifier: MERCHANT_ID,
      correlationIdentifier: randomUUID(),
      requestIdentifier: randomUUID(),
      userIdentifier: '2nspira-payment-pilot',
      applicationIdentifier: '2nspira-payment-pilot',
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${sanitizeErrorBody(text)}`);
  return JSON.parse(text);
}

const merchant = {
  merchantSoftware: {
    companyName: '2Nspira',
    productName: 'Payment Pilot',
    version: '1.0',
  },
  merchantCategoryCode: '4899',
};

function storedPaymentPayload(consumerProfileId, paymentMethodId) {
  return {
    captureMethod: 'NOW',
    amount: 22500,
    currency: 'USD',
    merchant,
    paymentMethodType: {
      consumerProfile: { consumerProfileId, paymentMethodId },
    },
    initiatorType: 'MERCHANT',
    accountOnFile: 'STORED',
    isAmountFinal: true,
  };
}

function safeResult(response) {
  const profile = response.accountHolder?.consumerProfileInfo;
  return {
    transactionId: response.transactionId,
    transactionState: response.transactionState,
    responseStatus: response.responseStatus,
    responseCode: response.responseCode,
    consumerProfileId: profile?.consumerProfileId,
    paymentMethodId: profile?.paymentMethodId,
    profileResponseCode: profile?.consumerProfileResponseCode,
    profileResponseMessage: profile?.consumerProfileResponseMessage,
  };
}

async function attemptFlow(accessToken, type, paymentMethodType) {
  const created = await postCpm(accessToken, '/consumer-profiles', {
    externalConsumerProfileIdentifier: randomUUID().replaceAll('-', ''),
    cardOnFileReferenceNumber: randomUUID().replaceAll('-', '').slice(0, 32),
    profileStatus: 'ACTIVE',
    firstName: 'Sandbox',
    lastName: 'Customer',
    profilePaymentMethod: paymentMethodType,
  });
  const methodList = type === 'ACH'
    ? created.paymentMethodType?.achList
    : created.paymentMethodType?.cardList;
  const createdSafe = {
    responseStatus: created.responseStatus,
    responseCode: created.responseCode,
    consumerProfileId: created.consumerProfileId,
    paymentMethodId: methodList?.[0]?.paymentMethodId,
  };
  if (!createdSafe.consumerProfileId || !createdSafe.paymentMethodId) {
    throw new Error(`Profile reference missing: ${JSON.stringify(createdSafe)}`);
  }
  const stored = await postPayment(
    accessToken,
    storedPaymentPayload(createdSafe.consumerProfileId, createdSafe.paymentMethodId),
  );
  return { type, created: createdSafe, storedPayment: safeResult(stored) };
}

async function main() {
  const config = { ...loadDevVars(), ...process.env };
  for (const key of ['JPM_CLIENT_ID', 'JPM_CLIENT_SECRET', 'JPM_TOKEN_URL']) {
    if (!config[key]) throw new Error(`${key} is not configured`);
  }

  console.log(JSON.stringify({ endpoint: API_BASE_URL, oauth: 'STARTED' }));
  const accessToken = await acquireToken(config);
  console.log(JSON.stringify({ endpoint: API_BASE_URL, oauth: 'PASS' }));

  const results = [];
  try {
    if (!process.env.JPM_TEST_ACH_ACCOUNT_NUMBER || !process.env.JPM_TEST_ACH_ROUTING_NUMBER) {
      throw new Error('ACH test credentials must be supplied ephemerally at runtime');
    }
    results.push(await attemptFlow(accessToken, 'ACH', {
      achList: [{
        accountNumber: process.env.JPM_TEST_ACH_ACCOUNT_NUMBER,
        financialInstitutionRoutingNumber: process.env.JPM_TEST_ACH_ROUTING_NUMBER,
        accountType: 'CHECKING',
        paymentType: 'WEB',
        accountStatus: 'ACTIVE',
        firstName: 'Sandbox',
        lastName: 'Customer',
      }],
    }));
  } catch (error) {
    results.push({ type: 'ACH', error: error.message });
  }

  try {
    if (!process.env.JPM_TEST_CARD_NUMBER) {
      throw new Error('Card test credentials must be supplied ephemerally at runtime');
    }
    results.push(await attemptFlow(accessToken, 'CARD', {
      cardList: [{
        accountNumber: process.env.JPM_TEST_CARD_NUMBER,
        cardExpirationMonthYearNumber: process.env.JPM_TEST_CARD_EXPIRY || '12/2027',
        accountStatus: 'ACTIVE',
        cardType: 'VI',
        firstName: 'Sandbox',
        lastName: 'Customer',
      }],
    }));
  } catch (error) {
    results.push({ type: 'CARD', error: error.message });
  }

  console.log(JSON.stringify({ results }, null, 2));
  if (results.some((result) => result.error)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(JSON.stringify({ fatal: error.message }));
  process.exitCode = 1;
});
