# Business Hub — first local review milestone (#186 / #187)

**Owner: Cleo. Status: isolated prototype, not operational Business Hub.**
No production route, site integration, remote mutation, deployment, credentials or new database is included. Existing website and other worktrees are untouched. The Worker is an independently bundleable API; the review UI is served **only by the loopback Node review server**, not by the Worker. This is intentionally not a public dashboard.

## Review locally

Node 24+; no package installation needed for API tests or local review:

```sh
npm test --prefix services/business-hub
npm run dev --prefix services/business-hub
# Open http://127.0.0.1:8789
```

SQLite is ephemeral and contains one clearly synthetic customer/project/note. Restart resets it. The Node adapter exercises real SQL and transaction rollback but is **not Cloudflare D1 runtime validation**. The local server holds a generated read-only credential server-side; browser JavaScript never receives it. Binding to loopback, exact Host and Origin validation and cross-site rejection protect this review proxy. It is not a deployable authentication design.

`review/desktop.png` and `review/mobile.png` capture tested 1440px / 390px views. Optional reproducible browser harness (preview must be running):

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs \
CHROME_EXECUTABLE=/absolute/path/to/chrome \
node services/business-hub/review/browser-test.mjs
```

No browser package was added to the application dependency graph. Contract-only TypeScript checks can be run with an available TypeScript compiler:

```sh
tsc --noEmit --strict --target es2022 --module nodenext --skipLibCheck services/business-hub/src/contracts.ts
```

## Data adoption decision / permission matrix

Adopt the **existing** `2nspira-market-intelligence` D1 as the proposed shared store, subject to capability/security review and authorization. Brian's `mi_runs`, `mi_opportunities`, `mi_versions`, `mi_documents`, `mi_sources`, `mi_audit` schema and API contract were source-reviewed from PR #194. This branch adds namespaced `hub_*` migration SQL only; it neither edits nor imports `mi_*` records. Do not apply the migration remotely without review/authorization. No second research store, cutover or writer change is proposed in this milestone.

`public/research-source-sha.txt` pins the source commit for Brian's copied secret-free executive summary. It is preserved as a **snapshot / not connected** with original observation dates, score caveats and a 24-hour stale indication; metadata changes are not source research. It is not fetched with a shared service credential, not a live API, not verified earnings and not a pipeline count. Click through PR #194 for the full archived evidence. Original research IDs and run IDs remain intact.

Proposed Worker secret `HUB_IDENTITIES_JSON` is an array matching `Identity` in `src/contracts.ts`: SHA-256 digests of high-entropy per-agent bearer tokens, actor, reader/writer role and explicit customer ID allowlist. Provisioning/rotation must use the approved #175 identity path; none is installed by this branch. No wildcard scope, actor supplied by request, or role change endpoint. Local test credentials are generated in memory. This transitional API contract is not proof of #175 integration or peer onboarding.

| Identity | Read | Write |
|---|---|---|
| Anonymous / unknown / duplicate credential | denied | denied |
| Cleo, Adam, Brian, Maya, Dax reader | scoped customer/project/note context | denied |
| Explicit task-scoped writer | same scoped read | notes for explicitly allowed customers only |
| Any identity outside its customer scope | denied | denied |

No contacts, payment records, financial values, secrets, administrative operations or customer creation endpoint are exposed. A writer token is **not** authorization for broader business actions. All API read/write/denial decisions produce audit events. Notes and their audit entries commit atomically; audit failures return 503 rather than silently accepting unlogged writes. Audit export/retention and edge rate limiting remain pending.

## Minimal API contract

Every `/v1/` route requires an identity-specific `Authorization: Bearer …` and a D1 `DB` binding. No CORS grant or browser token storage. Responses use `Cache-Control: no-store`; malformed config/store failure returns 503, absent identity 401, out-of-scope/read-only writes 403. Audit identity comes only from the matched secret configuration.

- `GET /v1/customers?q=Orbit&offset=0` → `{results: Customer[], next_offset: number|null}`. Page size 25, stable name/ID ordering; search is parameterized. Only allowed IDs returned.
- `GET /v1/customers/:id` → `{customer: Customer, projects: Project[], notes: Note[]}`. Notes/projects currently capped at 100; pagination is a later milestone, not an unlimited-history claim.
- `POST /v1/customers/:id/notes`, JSON `{ "body": "Authorized scope confirmed" }` → `201 Note`. Writer + customer scope required; unknown fields denied, 2,000-character note/8KiB streamed-body cap. No HTML interpretation. Retry idempotency is pending: clients must not automatically retry writes.
- `GET /v1/metrics` → five `{value:null,status:"not_connected",unit:"count"|"USD"}` metrics. No real metrics calculated from fixtures or research scores.

Interfaces and field types: `src/contracts.ts`. UI text uses DOM `textContent`, with an allowlist for canonical GitHub task links. The local browser transport accesses only read-only routes.

## Verified in this milestone

- Five Node API groups: five agent identities, attributed audit, anonymous/read-only denial, cross-customer isolation/search, SQL search escaping, invalid offsets/config/duplicate credential, unknown metrics, oversized/malformed/forged note rejection and audit-failure transaction rollback.
- Headless Chrome desktop/mobile: customer search/detail/empty state, research search, unknown KPI drilldown, permission and failure UI states, first-tab skip link, no 390px horizontal overflow, no browser exceptions, exact Host/cross-origin denial. Initial raw Host assertion used Node fetch, which does not preserve this override; corrected harness uses Node HTTP and confirms 403.
- Contract TypeScript and JS syntax checks; Wrangler 4.130.0 Worker bundle dry-run passed (6.51 KiB, no bindings/no deployment).
- Wrangler local D1 applied Brian's original research schema (9 commands) followed by the additive Hub schema (8 commands); all six `mi_*` and four `hub_*` tables coexist. No remote SQL was executed. This checks migration compatibility, not complete Worker-on-D1 runtime behavior.
- Live MI unauthenticated GET returned HTTP 401 as expected. Cleo's individual credential is absent at the documented recipient config location and protected-store metadata has no MI credential; live authenticated integration remains blocked.

This is not a full accessibility audit or independent QA. Synthetic local identity tests are not tests from five real agent runtimes. No website build is required because no website source/config/dependencies changed.

## Explicit remaining acceptance / next milestone

1. Secure per-agent credential provisioning and actual authenticated D1 capability/count inspection; independent allowed/denied reads from each runtime. Do not reuse Cloudflare login as agent attribution.
2. Authorized adoption/migration review, local Wrangler/D1 execution, stable protected human session UI and existing design-system integration. No public unsecured preview.
3. Real customer/project record ingestion, deduplication, provenance and role/task-scoped contact visibility; audit retention/export and rate limits.
4. Live research read adapter, date/category/feasibility filters, immutable detail/history/source documents, comparison, cited example cards and versioned scenario forecasts. No fabricated forecasting in this prototype.
5. Verified KPI definitions and drilldown records, proposals/decisions/QA/activity views, freshness/error handling end to end; responsive/accessibility expansion and independent QA/product review.
6. #175 queue/approval integration and tested nightly execution/Telegram digest. This prototype schedules nothing and grants no approval authority.

Business Hub remains Cleo's primary project. Song #198 remains queued per owner WIP direction. This draft milestone is **ready for review**, not complete acceptance of #186/#187; no merge/deploy is requested or authorized.
