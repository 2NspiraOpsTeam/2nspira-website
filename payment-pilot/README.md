# 2Nspira Stripe Payment Pilot

Standalone test-mode pilot for stored cards, saved U.S. bank accounts, 2Nspira-owned billing schedules, advance notices, charge execution, and webhook-driven status updates.

## Architecture

- `PaymentProvider` remains provider-neutral.
- `StripePaymentProvider` implements Stripe Customers, SetupIntents, PaymentMethods, PaymentIntents, and signed webhooks.
- Legacy JPM files remain isolated in `src/jpm-*` and are not imported by the Stripe pilot.
- Stripe Billing/Subscriptions are intentionally not used.
- D1 persists only provider references, masked metadata, authorizations, schedules, notices, payments, and processed webhook IDs.
- Raw card numbers, CVV, bank-account numbers, and routing numbers are entered into Stripe Payment Element and never sent to 2Nspira.

## Required local test-mode configuration

Copy `.env.example` to `.dev.vars` and populate locally:

```dotenv
STRIPE_SECRET_KEY=       # sk_test_...
STRIPE_PUBLISHABLE_KEY=  # pk_test_...
STRIPE_WEBHOOK_SECRET=   # whsec_... from Stripe CLI/listener
```

Never paste these values into chat or commit `.dev.vars`.

## Local setup

```bash
npm install
npx wrangler d1 create 2nspira-payments-pilot
# Put the returned database_id in wrangler.toml.
npx wrangler d1 migrations apply 2nspira-payments-pilot --local
npm run dev
```

Open `http://localhost:8787/dev/payments-pilot`.

For local signed webhooks, install/authenticate Stripe CLI and run:

```bash
stripe listen --forward-to localhost:8787/api/webhooks/stripe
```

Put the listener's `whsec_...` value in `.dev.vars`, then use Stripe test-mode data only.

## Validation

```bash
npm run build
npm test
npm audit --omit=dev
```

The automated suite covers safe metadata storage, charge idempotency, one-time advance notice creation, revocation, webhook deduplication, normalized ACH failure/return states, and configurable fee paths. Live Stripe gates remain unproven until test-mode credentials and a D1 database are configured.
