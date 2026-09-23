import { Hono } from 'hono';
import { pilotHtml } from './pilot-ui';
import { StripePaymentProvider } from './stripe-provider';
import { D1PaymentStore } from './store';
import { PaymentService } from './payment-service';
import { ManualPaymentService } from './manual-payment-service';

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  MANUAL_ACH_INSTRUCTIONS?: string;
  ZELLE_INSTRUCTIONS?: string;
  PAYMENTS_OPERATOR_KEY?: string;
  PAYMENTS_DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();
const services = (env: Env) => {
  const provider = new StripePaymentProvider(env.STRIPE_SECRET_KEY, env.STRIPE_WEBHOOK_SECRET);
  const store = new D1PaymentStore(env.PAYMENTS_DB);
  return { provider, service: new PaymentService(provider, store), manual: new ManualPaymentService(store), store };
};
const safeError = (error: unknown) => error instanceof Error ? error.message.replace(/sk_(test|live)_[A-Za-z0-9]+/g, '[redacted]') : 'Request failed';
const webhookDiagnostic = (error: unknown) => {
  const message = safeError(error);
  if (/signature|signed payload/i.test(message)) return 'Stripe webhook signature verification failed';
  if (/webhook secret|STRIPE_WEBHOOK_SECRET/i.test(message)) return 'Stripe webhook signing secret is not configured';
  if (/no such table|D1|database|SQL/i.test(message)) return 'Webhook verified, but event persistence failed';
  return 'Webhook processing failed';
};
const operatorAuthorized = (provided: string | undefined, expected: string | undefined) => {
  if (!provided || !expected || provided.length !== expected.length) return false;
  let difference = 0;
  for (let i=0; i<provided.length; i++) difference |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  return difference === 0;
};

app.onError((error, c) => c.json({ error: safeError(error) }, 400));
app.get('/dev/payments-pilot', c => {
  if (!c.env.STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test_')) return c.text('Stripe test-mode publishable key is not configured', 503);
  return c.html(pilotHtml(c.env.STRIPE_PUBLISHABLE_KEY));
});
app.post('/api/customers', async c => {
  const { name = 'Demo Property Management Client' } = await c.req.json<{ name?: string }>();
  return c.json(await services(c.env).provider.createCustomer(name, { pilot: '2nspira' }));
});
app.post('/api/setup-intents', async c => {
  const body = await c.req.json<{ customerId: string; type: 'card' | 'ach' }>();
  return c.json(await services(c.env).provider.createSetupIntent(body));
});
app.post('/api/payment-methods/save', async c => {
  const { customerId, paymentMethodId } = await c.req.json<{ customerId: string; paymentMethodId: string }>();
  return c.json(await services(c.env).service.saveVerifiedMethod(customerId, paymentMethodId));
});
app.post('/api/schedules', async c => c.json(await services(c.env).service.createSchedule(await c.req.json())));
app.post('/api/schedules/:id/execute', async c => c.json(await services(c.env).service.executeSchedule(c.req.param('id'))));
app.post('/api/schedules/:id/revoke', async c => c.json({ revoked: await services(c.env).service.revokeSchedule(c.req.param('id')) }));
app.post('/api/notices/run', async c => c.json({ created: await services(c.env).service.createAdvanceNotices() }));
app.get('/api/pilot-state', async c => c.json({ schedules: await new D1PaymentStore(c.env.PAYMENTS_DB).listSchedules() }));
app.get('/api/manual-payment-instructions/:method', c => {
  const method = c.req.param('method');
  if (method !== 'manual_ach' && method !== 'zelle') return c.json({ error: 'Unsupported manual payment method' }, 400);
  const instructions = method === 'manual_ach' ? c.env.MANUAL_ACH_INSTRUCTIONS : c.env.ZELLE_INSTRUCTIONS;
  return c.json({ method, instructions: instructions || 'Approved payment instructions are not configured for this environment.' });
});
app.post('/api/manual-payments/report', async c => c.json(await services(c.env).manual.reportSent(await c.req.json())));
app.get('/api/manual-payments/:id', async c => {
  const payment = await services(c.env).store.getManualPayment(c.req.param('id'));
  return payment ? c.json(payment) : c.json({ error:'Manual payment record not found' }, 404);
});
app.post('/api/manual-payments/:id/confirm', async c => {
  if (!operatorAuthorized(c.req.header('x-2nspira-operator-key'), c.env.PAYMENTS_OPERATOR_KEY)) return c.json({ error:'Operator authorization required' }, 403);
  const body = await c.req.json<{ userId:string; note?:string }>();
  return c.json(await services(c.env).manual.confirmReceived(c.req.param('id'), body.userId, body.note));
});
app.post('/api/manual-payments/:id/not-found', async c => {
  if (!operatorAuthorized(c.req.header('x-2nspira-operator-key'), c.env.PAYMENTS_OPERATOR_KEY)) return c.json({ error:'Operator authorization required' }, 403);
  const body = await c.req.json<{ userId:string; note?:string }>();
  return c.json(await services(c.env).manual.markNotFound(c.req.param('id'), body.userId, body.note));
});
app.post('/api/manual-payments/:id/request-info', async c => {
  if (!operatorAuthorized(c.req.header('x-2nspira-operator-key'), c.env.PAYMENTS_OPERATOR_KEY)) return c.json({ error:'Operator authorization required' }, 403);
  const body = await c.req.json<{ userId:string; note:string }>();
  return c.json(await services(c.env).manual.requestMoreInformation(c.req.param('id'), body.userId, body.note));
});
app.post('/api/webhooks/stripe', async c => {
  if (!c.env.STRIPE_WEBHOOK_SECRET) return c.json({ error: 'Stripe webhook signing secret is not configured' }, 500);
  const signature = c.req.header('stripe-signature');
  if (!signature) return c.json({ error: 'Missing Stripe signature' }, 400);
  const payload = await c.req.text();
  const { provider, service } = services(c.env);
  try {
    const event = await provider.verifyWebhook(payload, signature);
    return c.json(await service.applyWebhook(event));
  } catch (error) {
    return c.json({ error: webhookDiagnostic(error) }, 400);
  }
});

export default app;
