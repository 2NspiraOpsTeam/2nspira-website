# 2Nspira Client Portal V1 architecture and security review guide

This document describes the review state of PR #29. It is intentionally explicit
about what is implemented, what is isolated to preview, and what must not be run
before approval.

## Decision record

- **Runtime:** the existing Next.js 16/vinext application on Cloudflare Workers.
- **Authentication:** Better Auth with email/password and secure cookie sessions. Better Auth is used instead of a custom credential system. Transactional email delivery, password recovery, and email verification are not connected in Milestone 1 and are not presented as working features.
- **Persistence:** Cloudflare D1 with version-controlled SQL migrations and Drizzle ORM. This keeps data in the existing Cloudflare deployment architecture and avoids a second database platform.
- **Tenant boundary:** organization membership is resolved from the authenticated server session. Every client-data query requires and filters by `organization_id`; organization context is never accepted from browser input.
- **Payments:** provider-neutral domain interfaces and token/reference-only payment methods. No PAN, CVV, routing number, or bank credentials are stored.
- **Routing:** portal routes live under `/account`. Portal shell and domain services are isolated so a future `my.2nspira.com` hostname can route to the same application without changing the domain model.

## Better Auth and session boundary

- `src/lib/portal/auth.ts` creates the Better Auth instance with the Drizzle adapter,
  a seven-day session, HTTP-only Better Auth cookies, a 10-character minimum
  password, a five-minute signed cookie cache, and an explicit trusted-origin list.
- `BETTER_AUTH_SECRET` is required at runtime. Startup/auth requests fail closed when
  it is absent. The secret is never committed to the repository.
- `src/app/api/auth/[...all]/route.ts` is the only Better Auth HTTP handler and
  delegates both `GET` and `POST` to Better Auth.
- `src/lib/portal/context.ts#getPortalContext` calls
  `getAuth().api.getSession({ headers })` on the server for every authenticated
  portal layout/page render. Missing sessions redirect to `/account/sign-in`.
- The middleware performs canonical-host redirects only. It is not treated as an
  authorization boundary; authentication and tenant authorization happen in server
  components and server-side data access.

### Intentionally unauthenticated routes

- Public marketing routes outside `/account/(portal)`.
- `/account/sign-in` and `/account/no-access`.
- `/api/auth/*`, which must be reachable for Better Auth sign-in/sign-out/session
  operations and applies Better Auth's own validation.
- Existing public site APIs remain governed by their existing route-specific rules.

Every route under `src/app/account/(portal)` is wrapped by the authenticated portal
layout and calls the server-side portal context. There are no financial mutation or
administrative API routes in Milestone 1.

## Organization tenancy and authorization boundaries

1. Better Auth resolves the session user from request headers on the server.
2. `getPortalContext` queries `organization_membership` by the authenticated
   `session.user.id`; the browser does not select or submit an organization ID.
3. The resolved membership yields the organization and role. No membership redirects
   to `/account/no-access`.
4. `src/lib/portal/data.ts` requires that resolved `organization.id` for portal data
   queries. Engagements, invoices, payments, payment methods, billing authorization,
   related invoices, and invoice detail are filtered by `organization_id`.
5. Invoice detail uses both `invoice.id` and `organization_id`; a guessed invoice ID
   from another tenant returns `notFound()`.

The role model is membership-scoped: `account_owner`, `billing_admin`,
`standard_user`, and `internal_admin`. Milestone 1 uses `canManageBilling` only to
decide whether disabled future-action controls are shown. No live mutation endpoint
exists, so frontend visibility is not relied on for financial authorization.

## D1, Drizzle, and migrations

- Binding name in every environment: `PORTAL_DB`.
- Drizzle schema: `src/db/schema.ts`.
- Initial migration: `migrations/0001_client_portal.sql`.
- Demo-only seed: `migrations/seed-demo.sql`.
- Preview database: `2nspira-client-portal-preview`
  (`6fc65c97-0414-4b11-9505-c3ccc1bd4914`).
- Production database: `2nspira-client-portal`
  (`4e120ff9-b2b8-438f-8692-00cc80eed19e`).
- `scripts/deploy-preview.mjs` rewrites the generated Worker configuration to the
  preview database, removes production routes, enables `workers.dev`, and applies
  `noindex, nofollow`.
- `wrangler.jsonc` contains the production D1 binding. Production deployment is
  guarded by `scripts/deploy-production.mjs` and accepts only Cloudflare Workers
  Builds running the exact `main` commit.

### Production migration command — documented, not executed

Run only after PR approval and explicit production-migration authorization:

```bash
cd 2nspira-website
npx wrangler d1 execute 2nspira-client-portal --remote --file=migrations/0001_client_portal.sql
```

Do **not** run `migrations/seed-demo.sql` against production. As of this review handoff,
the production migration above has not been executed.

## Configuration and secrets by environment

| Environment | Non-secret configuration | Required secret | Database |
|---|---|---|---|
| Local | `BETTER_AUTH_URL=http://localhost:3001` as appropriate | local-only `BETTER_AUTH_SECRET` in an ignored environment file or secret injection | local Wrangler D1 state |
| Preview | `BETTER_AUTH_URL=https://2nspira-website-preview.jcortez-36a.workers.dev` generated by the preview deploy script | preview-only `BETTER_AUTH_SECRET` configured in the preview Worker | `2nspira-client-portal-preview` |
| Production | `BETTER_AUTH_URL=https://2nspira.com` from `wrangler.jsonc` | distinct production `BETTER_AUTH_SECRET` configured in the production Worker | `2nspira-client-portal` |

Future payment webhook secrets and transactional-email credentials must also be
environment-specific Worker secrets. They do not exist in this branch. `.env*`, PEM
files, Wrangler state, build output, and generated deployment metadata are ignored.

## Security posture

- Sessions are HTTP-only and managed by Better Auth.
- Roles are membership-scoped: account owner, billing admin, standard user, and 2Nspira admin.
- Invoice detail and all account data are loaded through organization-scoped repositories.
- Autopay requires an explicit authorization record, selected tokenized payment method, authorizing user, timestamp, and audit event.
- Demo records are clearly labeled and contain no real client financial data.

## Payment-provider boundary

`src/lib/portal/payment-provider.ts` defines the provider-neutral `PaymentProvider`
interface. The active implementation is `UnconfiguredPaymentProvider`, which fails
closed for every operation. The UI reads demo records only; it does not charge,
tokenize, mutate, or call a payment provider.

`payment_method_reference` stores only provider name, opaque provider reference,
type, brand/bank display name, last four digits, expiration metadata, default flag,
and status. Raw card numbers, CVV, routing numbers, account numbers, and raw bank
credentials are never represented in the schema, migration, seed, or UI.

Zelle is displayed as a separate manual option and is not modeled as a stored payment
method or automated provider integration.

## Implemented schema

The Drizzle schema and SQL migration define Better Auth users/sessions/accounts/
verifications plus `organization`, `organization_membership`, `service`,
`engagement`, `invoice`, `invoice_line_item`, `payment`,
`payment_method_reference`, `billing_authorization`, and `audit_event`.
`organization_id` is the tenant key for client-owned data. Services are a shared
catalog; engagements connect a service to one organization and preserve recurring,
hourly, and fixed-project billing semantics.

The seed contains only fictional `.example` contacts, 555 phone numbers, demo
provider references, and explicitly named demo organizations. It must remain preview/
local only. Demo credentials are provisioned separately in preview and are not
embedded in source code or the client bundle.

## Intentionally incomplete / non-live functionality

The following controls are disabled or described as preview-only in the UI:

- Online payments and payment status mutation.
- Autopay enable/disable/change operations.
- Add, replace, remove, or set-default payment-method operations.
- Payment-provider tokenization, charges, ACH authorization, and webhooks.
- Transactional email delivery.
- Password recovery and email verification delivery.
- Downloadable invoice PDFs.
- Profile/organization editing and internal administration.

Invoice, payment, payment-method, and autopay records shown in preview are seeded
demonstration data, not live processor state.

## Independent review checklist

- Confirm tenant isolation using two organization memberships and direct invoice-ID
  probing across organizations.
- Verify session validation, sign-out, unauthenticated redirects, and no-access behavior.
- Compare `src/db/schema.ts` with `migrations/0001_client_portal.sql`.
- Search the full branch diff and history for secrets and sensitive client data.
- Confirm preview configuration cannot bind production routes or production D1.
- Run lint, canonical vinext build, TypeScript, and built-Worker smoke tests.
- Exercise portal routes at desktop and mobile widths and inspect console/runtime errors.
- Probe role-limited UI and confirm there are no live mutation or privilege-escalation paths.
