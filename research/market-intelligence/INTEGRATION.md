# Integration handoff — #188 → #186 / #187

## Status and owner boundary

The earlier bounded Cloudflare database request resulted in a dedicated research D1/Worker and PR #194. Jeffrey's expanded direction makes **Adam accountable for infrastructure, integration, authentication and API security**. Brian will maintain research content and migration artifacts; no further independent infrastructure/security deployment or second database is planned. The existing store is a transitional component to adopt or consolidate, not a permanent competing Business Hub. This handoff is a request, not evidence Adam or Cleo has received/accepted it.

## Adam — concrete review decisions

1. Review PR #194, existing `mi_*` schema and API; choose **adopt the existing D1 binding** or migrate namespaced tables into the shared Business Hub. No customer/billing table has been changed.
2. Preserve stable opportunity/run IDs, immutable documents/version hashes, original payload hashes, timestamps and MI-001 score history. Validate source/current/version/document counts before and after any migration. Keep current writes on one store only; freeze writer during cutover, compare, switch nightly endpoint, verify replay, then retain old store read-only until rollback window agreed. No migration/destruction is authorized by this document alone.
3. Replace/adopt transitional per-agent API credentials within shared #175 identity. Keep Brian research-write; Adam/Maya/Cleo/Dax authorized research-read; any infrastructure/admin privilege separately scoped. No tokens in GitHub, Telegram, frontend code or shared artifacts. Do not equate Cloudflare account login with attributed agent API access.
4. Extend search across customer needs, competitor names, proposed products/services, source text and historical research. Existing `GET /v1/opportunities?q=` searches **title/category only**; full records contain v2 fields but broad JSON/document search is not implemented. Add bounded pagination for runs/history/records before 100-revision export limit.
5. Independently test each agent from its own runtime: allowed search/detail/history/documents; deny anonymous access and reader writes; verify attributed audit entries, least-privilege isolation and secure recipient-specific credential provisioning. Six local identity tests are NOT peer-runtime proof.

## Existing consumable API (not a new proposed deployment)

Base: `https://2nspira-market-intelligence.jcortez-36a.workers.dev`. All `/v1/` need identity-specific HTTPS bearer authentication. Service README describes current request/response contracts.

- Search: `/v1/opportunities?q=caption&limit=50&offset=0`, `{results:[{candidate_id,title,category,score,stage,confidence,observed_at,run_id}]}`.
- Detail: `/v1/opportunities/MI-001`, `{record,observed_at,run_id}`; `record.research_details` contains v2 research fields.
- History: `/v1/opportunities/MI-001/history`, versioned `record_json` with run and observation timestamp.
- Activity: `/v1/runs`; evidence: `/v1/sources`; full documents: `/v1/runs/<run_id>/documents[/<name>]`.
- Import: `/v1/import`, research writer only, atomic/idempotent with immutable conflict and stale/equal-time protection.

## Cleo — Executive Dashboard adapter

`archive/executive-summary.json` is a secret-free snapshot with `schema_version`, `source`, `source_observed_at`, `integration_status`, `counts`, `top_opportunities`, `emerging_trends`, `research_activity`, `recommendations_requiring_approval`, and `commercial_validation`.

Render as snapshot/not-connected until Adam provides shared authenticated server-side access. Never place bearer credentials in browser code. For connected mode, obtain backend data through Adam's identity/access layer. Keep permission-denied, failed-fetch, stale-snapshot, no-data and not-connected states distinct. Display original source dates and limitations on drill-down; a metadata revision is not refreshed source research. Score ranking is not verified revenue potential; no demand/pipeline/revenue counts are derived from it.

Approval cards link to canonical GitHub #188 and display **proposal only**, proposed owners/caps and exact experiment gates from source briefs. They do not grant execution authority. `emerging_trends` currently explicitly reports insufficient longitudinal evidence; show that rather than a fabricated chart. Research activity should distinguish source research from metadata normalization (`structured-research-v3`).

## Acceptance still pending

Adam architecture/identity acknowledgment; adopted shared API and expanded search; recipient-specific credential handoffs; independently verified Maya/Adam/Cleo/Dax access; Cleo live dashboard binding and failure/freshness/permission checks; first clock-triggered research+sync+Git archive receipt. GitHub coordination comments prove posting, not agent receipt, work activation or successful integration.
