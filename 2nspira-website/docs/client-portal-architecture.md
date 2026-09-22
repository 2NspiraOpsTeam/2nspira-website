# 2Nspira Client Portal V1 architecture

## Decision record

- **Runtime:** the existing Next.js 16/vinext application on Cloudflare Workers.
- **Authentication:** Better Auth with email/password, secure cookie sessions, email-verification and password-reset hooks. Better Auth is used instead of a custom credential system. V1 preview uses verified demo accounts; transactional email delivery remains provider-neutral until an email provider is selected.
- **Persistence:** Cloudflare D1 with version-controlled SQL migrations and Drizzle ORM. This keeps data in the existing Cloudflare deployment architecture and avoids a second database platform.
- **Tenant boundary:** organization membership is resolved from the authenticated server session. Every client-data query requires and filters by `organization_id`; organization context is never accepted from browser input.
- **Payments:** provider-neutral domain interfaces and token/reference-only payment methods. No PAN, CVV, routing number, or bank credentials are stored.
- **Routing:** portal routes live under `/account`. Portal shell and domain services are isolated so a future `my.2nspira.com` hostname can route to the same application without changing the domain model.

## Security posture

- Sessions are HTTP-only and managed by Better Auth.
- Roles are membership-scoped: account owner, billing admin, standard user, and 2Nspira admin.
- Invoice detail and all account data are loaded through organization-scoped repositories.
- Autopay requires an explicit authorization record, selected tokenized payment method, authorizing user, timestamp, and audit event.
- Demo records are clearly labeled and contain no real client financial data.

## Deferred integrations

- Transactional email provider for verification and recovery delivery.
- Live payment-provider adapter and webhook signing secrets.
- PDF invoice generation.
- Internal administration console.

These are replaceable adapters and do not require a portal UI or tenant-model redesign.
