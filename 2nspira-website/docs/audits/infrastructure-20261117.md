# Infrastructure review — 2026-11-17

## Verdict
Operational, but **not cleared as issue-free or fully production-ready**. Review covers 2nspira.com, its website repository, client-portal-v1 configuration/source, the two bound production D1 databases and the repository's payment pilot. Adjacent branded applications were inventoried by ownership only, not exhaustively audited.

## Attribution and evidence
- Fresh website main and serving `/deployment.json`: `6338f388070c104377149f1d1bff4be1068ce9a7`.
- Website active Cloudflare version: `eddf57fc-4d8d-4907-b524-a19b2b3ede99`; production and preview build check-runs succeeded at the inspected main SHA.
- Confirmed route owners: apex/www → `2nspira-website`; portal subdomain → `client-portal-v1`.
- Portal active version: `195a0ff1-de7d-46d9-8955-0262587bad1f`, deployed October 26. Fresh portal main is `cc1b59e432729a0612156954d1941663db21ac1b`. Exact deployed-source SHA linkage is unavailable; do not equate this checkout with live code. Existing dirty portal checkout preserved unchanged.
- Public homepage and login rendered in Chromium; anonymous portal/admin APIs returned 401 and no-store. Python HTTP requests encountered an edge challenge while curl and Chromium succeeded: this is not evidence of website downtime.
- Persisted Worker logs enabled for both services, sampling 1. No external Logpush or tail consumers configured. Neither log retention duration nor alert delivery was proven. Query-string redaction was disabled; the proposed website config enables it to keep link tokens/search parameters out of invocation logs. Portal configuration remains unchanged.

## Findings and disposition

| Priority | Finding | Disposition |
| --- | --- | --- |
| High | Dependency alerts and automatic security PRs disabled | Enabled through GitHub API and read back. Secret scanning and push protection already enabled. |
| High | Payment-pilot lockfile had 2 critical, 9 high, 2 moderate dependency entries | Updated Hono, Wrangler and Vitest with lockfile. Typecheck and 15 isolated tests pass; production audit zero; full audit retains 5 high entries from picomatch chain. Pilot deployment config still has placeholder D1 ID; no pilot deployment or billing action performed. |
| High | Website full audit reports 20 high dependency entries (production-only audit: 11), ultimately picomatch GHSA-fc5q-39xc-vjpf | npm reports <=4.0.7 affected; registry latest inspected is 4.0.7. No supported patched version observed. Counts include transitive affected dependents, not 20 independent flaws; request-path exploitability was not established. No audit suppression or unsafe framework downgrade applied. GitHub's corresponding picomatch alert is auto-dismissed; do not treat that discrepancy as proof of safety. Keep tracked until upstream reconciles/releases. |
| High | No recorded CodeQL analysis; no tracked root website validation workflow | Added CodeQL, weekly dependency checks, PR build/lint/typecheck and backend suites. Workflow code must merge before schedules run. |
| High | Older production builds can overwrite newer releases ([#77](https://github.com/2NspiraOpsTeam/2nspira-website/issues/77)) | Added fail-closed latest-main predeploy check with four regression cases. This reduces stale builds but is **not an atomic lock**: main may advance between the check and deploy. Provider serialization/cancellation remains unresolved. |
| Medium | Missing baseline browser response hardening | Added nosniff/referrer policy on middleware responses; no-store, noindex and frame denial on private portal/admin/API paths including login redirects. Public demos remain embeddable. No broad CSP or HSTS preload imposed without compatibility/subdomain review. |
| Medium | Recovery was not freshly demonstrated | Read Time Travel bookmarks; exported both production databases into private storage and restored each into isolated local SQLite, integrity `ok`. This proves local restore, not independent off-site disaster recovery or recovery-time objectives. |
| Medium | No confirmed public health alert delivery | Added half-hourly GitHub Actions public checks using standard Actions scheduling/notifications. Schedule is inactive until merged; GitHub schedules are best-effort, not a guaranteed SLA. Owner notification subscription and failure delivery remain unverified. |
| Medium | Branch protection does not require successful checks | Main already enforces PR path/admin enforcement, prohibits force-push/deletion and requires resolved conversations. Required status checks absent; 0 approving reviewers. Existing review policy preserved; do not invent a second approver or require production-only checks on PRs. Select required checks after their first verified run. |
| Medium | Cloudflare account security configuration not observable with available scopes | Zone active/free plan, route ownership proven. DNS records, TLS mode/minimum version, HSTS, WAF, account MFA, audit history and account-level alert destinations not verified. Zone settings/DNS APIs returned 403; authentication works but lacks these scopes. No plan upgrade, DNS or WAF changes. |
| Medium | Portal source/release/dependency reconciliation outstanding | Existing portal dependency patch [PR31](https://github.com/2NspiraOpsTeam/client-portal-v1/pull/31) and other dependency PRs remain open. Do not silently merge unrelated proposals. Authenticated tenant isolation and live payment/webhook/email health not re-proven in this review. Backend secret names do not include STRIPE_WEBHOOK_SECRET; determine intended signed-webhook endpoint/configuration before enabling live billing. No billing settings or sends changed. |

## Open-issue triage
- [#1](https://github.com/2NspiraOpsTeam/2nspira-website/issues/1): historical missing Vite configuration is no longer reproduced; current config includes Cloudflare plugin and clean-install canonical build passes.
- [#37](https://github.com/2NspiraOpsTeam/2nspira-website/issues/37): currently shipped login contains no public demo-account guidance. That resolves the misleading-copy symptom, not proof that any demo credentials or authenticated journey work. No account reset/creation attempted.
- #77 stays open: do not claim complete release ordering protection.
- Other open issues include backlog, content experiments and prior feature assignments. Their open status is not evidence of current infrastructure defects. Open draft PRs were not bulk-merged or closed.

## Validation
- Clean `npm ci`, canonical `npm run build:ci` and required-route/missing-route smoke checks passed.
- ESLint: zero errors, four existing warnings. TypeScript passed.
- Careers 65, Team & Delivery 39, Creative Studio 56, Operations 41 isolated checks passed (201 total).
- Release freshness: current head accepted, older head rejected, malformed ref rejected, network failure rejected (4 tests).
- Payment pilot: typecheck and 15 tests passed; no financial provider calls or production mutations.
- Responsive Chromium checks passed at 1440, 768 and 390 for homepage/login/demo with no overflow or page exceptions. API backend-unavailable (502) and invalid-origin (403) responses retain private/no-store and hardening headers.
- Local built-runtime hardening smoke passed for homepage, login, protected-page redirects, robots, sitemap and 404; release marker shape passed.
- Hosted preview / CI results and rendered responsive checks recorded in the PR after execution. Source fixes are not production changes until a verified release.

## Runbook and remaining acceptance gates
1. Keep production release exclusively in Workers Builds. Never bypass `deploy:production` guard. Before release inspect current main, schema requirements and other in-flight builds; after release require manifest SHA and runtime header matching merged head.
2. Rollback: select known-good Worker version, roll back through Cloudflare, verify apex and anonymous backend guards; do not assume code rollback rolls back D1.
3. Recovery: use production D1 Time Travel for a separately approved incident restore; never run restore during routine audit. Private exports from this review have SHA256/integrity receipts, remain outside git, and contain sensitive records. Schedule encrypted independent backups only after choosing authorized off-site storage/retention; local exports are not off-site backups.
4. Monitor: merge `Website health` to activate checks; configure owner Actions notification preference and verify a controlled failure notification before declaring alerting operational. The monitor performs GET only and never sends mail, signs in, changes records or charges a customer.
5. Resolve upstream advisory status, verify CodeQL results, select real passing required PR checks, prove provider deployment ordering, reconcile portal source and repeat isolated authenticated tests before clearing the remaining high items.
6. Obtain scoped account visibility for DNS/TLS/WAF/account security verification. Existing token credentials must never be copied into reports or source. No new paid services required by this change.
