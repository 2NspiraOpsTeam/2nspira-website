# Client portal payments integration

## Runtime and ownership

The payment capability runs inside the existing Next.js/vinext Cloudflare Worker and uses the portal's `PORTAL_DB` D1 binding. The standalone `payment-pilot` remains the proof harness; it is not deployed beside the portal and no second billing database is introduced.

All customer, invoice, payment method, payment, schedule, manual-payment, and audit access is scoped to the organization resolved from the authenticated Better Auth session. Browser input never selects an organization. Internal schedule execution uses a separate job secret, and manual receipt confirmation requires an `internal_admin` membership.

## Environment configuration

Secrets (configure per Worker environment; never commit):

- `STRIPE_SECRET_KEY` — Stripe test key for preview; live operations remain outside this preview.
- `STRIPE_PUBLISHABLE_KEY` — matching Stripe test publishable key.
- `STRIPE_WEBHOOK_SECRET` — signing secret for the preview webhook endpoint.
- `BETTER_AUTH_SECRET` — preview-only portal session secret.
- `PAYMENT_JOB_SECRET` — authorizes notification and schedule-execution jobs.
- `MANUAL_ACH_INSTRUCTIONS` — approved bank-transfer instructions.
- `ZELLE_INSTRUCTIONS` — approved Zelle destination/instructions.

Non-secret policy configuration:

- `MANAGED_ACH_FEE_CENTS` — defaults to `2000` in this review branch.
- `CARD_FEE_BPS` — defaults to `0`; change only after processor/network/legal review.

If manual instructions are absent, the portal reports that the payment path is unavailable and never fabricates destination details.

## Data handling

Stripe Payment Element and Financial Connections collect payment credentials directly. The portal stores only Stripe Customer and PaymentMethod references plus card brand/last four/expiry or bank name/last four/account type/verification status. PAN, CVV, routing number, and full account number are not represented in application schemas.

Webhook verification consumes the exact raw request body through Stripe's asynchronous Web Crypto verifier before parsing trusted event data. Stripe event IDs are persisted once. ACH remains `processing` until a signed success event; failed processing can normalize to `returned`.

Manual ACH and Zelle acknowledgments create `pending_verification` records and immutable audit events. Only internal confirmation settles the invoice.

## Migration order

1. Apply `migrations/0001_client_portal.sql` to a new database.
2. Apply `migrations/0002_portal_payments.sql`.
3. Seed only local/preview environments with `migrations/seed-demo.sql`.

Production migrations, live Stripe keys, production webhook registration, and production deployment require separate explicit approval.
