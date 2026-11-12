# Shared market intelligence — GitHub #188

Jeffrey requested this Cloudflare database on November 6, 2026. Brian owns research content and quality; Adam owns shared infrastructure, D1 integration, authentication and API security. This earlier dedicated store is transitional pending his adopt-or-consolidate review. This is **not** a replacement for Adam's Business Hub (#186), Cleo's dashboard (#187), or team approval routing (#175). It stores public-source business research only, not customer PII, payments, credentials, or autonomous launch approvals.

## Live resources

- Account: `36a7807b2d8726b889873bab8b572113` (2Nspira).
- D1: `2nspira-market-intelligence`, ID `1f616938-aeef-4a1f-a9df-566f1a769adf`.
- [Cloudflare database console](https://dash.cloudflare.com/36a7807b2d8726b889873bab8b572113/workers/d1/databases/1f616938-aeef-4a1f-a9df-566f1a769adf).
- API: `https://2nspira-market-intelligence.jcortez-36a.workers.dev`.
- Only `/health` is public. All `/v1/` routes require an identity-specific bearer credential over HTTPS. No website routes or customer database were changed.

### Immediate team access using existing Cloudflare access

Authorized team members can inspect D1 in the console above, or use their existing authenticated Wrangler session in the 2Nspira account:

```sh
CLOUDFLARE_ACCOUNT_ID=36a7807b2d8726b889873bab8b572113 wrangler d1 execute 2nspira-market-intelligence --remote --command "SELECT candidate_id,title,score,stage FROM mi_opportunities ORDER BY score DESC;"
```

Cloudflare account membership/permissions still apply. We did not invite users, widen account-level access, or claim that every member's machine has been tested. The Worker API provides narrower access than an administrative Cloudflare login. Direct console/administrative SQL access is governed by Cloudflare IAM, not the Worker's per-agent audit log.

### Scoped service access

| Principal | Research read | Import |
|---|---|---|
| Brian | yes | yes |
| Adam, Maya, Cleo, Dax, Jeffrey | yes | no |

Six distinct credentials are provisioned. Plaintext credentials exist only in private `0600` files under `~/.config/2nspira-market-intelligence/` on Brian's host; directory mode `0700`. The Worker secret `AGENT_KEYS` stores SHA-256 token hashes mapped to server-controlled actor/role, **not plaintext tokens**. Actor identity is not accepted from request data or a spoofable header. Do not post credentials to GitHub, Telegram, tickets, shell arguments, or source code. Deliver only a recipient's own credential using the team's approved secret channel; do not copy the complete directory to other agents. Peer-machine secret delivery and independent read confirmation are pending; successful role tests from Brian's host are not proof of those handoffs. Existing authorized Cloudflare console access is available independently.

The client defaults to the Brian credential. Once the recipient's individual config is installed privately:

```sh
python3 scripts/client.py --identity maya get /v1/opportunities
python3 scripts/client.py --identity cleo get /v1/opportunities/MI-001
python3 scripts/client.py --identity adam get /v1/opportunities/MI-001/history
```

The private JSON shape is `{ "actor": "maya", "role": "reader", "endpoint": "https://2nspira-market-intelligence.jcortez-36a.workers.dev", "token": "<securely provisioned>" }`. Do not replace the template with a real credential in docs. Role/actor in this file are informational; only the server's hash mapping grants permissions.

To revoke/rotate a service credential, remove its hash or replace it in the private `worker-secrets.json` mapping, update that principal's file, then `wrangler secret bulk <private-file> --config wrangler.jsonc`. Only an authorized Cloudflare operator should run that command. Keep all other principals' hashes intact; do not print the file.

## Data and API contract for #186 / #187

- `mi_opportunities`: current stable `MI-xxx` records, score, stage, confidence, source run, full JSON including proposed experiments and outcomes.
- `mi_runs`: immutable source revisions with evidence timestamps, import actor, canonical GitHub issue and payload hash.
- `mi_versions`: all opportunity revisions; original MI-001 score 71 remains historical, current score is 68.
- `mi_sources`: per-run, per-opportunity source URLs.
- `mi_documents`: immutable full register, briefs, rubric, source snapshots, watchlist, proposed experiment and review documents, with SHA-256 hashes. Source IDs and source scope/limitations remain in the versioned documents; URLs alone are not demand validation.
- `mi_audit`: authenticated reads, successful imports and denied imports by the server-attributed identity. Does not audit direct Cloudflare administrative SQL.

`GET /v1/opportunities?q=<text>&stage=<text>&limit=50&offset=0` returns D1-style `{results:[...]}` summaries ordered by score then ID. Ties are not a validated commercial preference. `GET /v1/opportunities/MI-001` returns full `record`, `run_id`, `observed_at`. `GET /v1/opportunities/MI-001/history` returns versions. `GET /v1/runs` and `/v1/audit` return the latest 100 rows. `GET /v1/sources?run_id=<id>&candidate_id=MI-001&limit=100&offset=0` supports optional filters and bounded pagination with `next_offset`. `GET /v1/runs/<run_id>/documents` lists document names/hashes; append `/<name>` for full content. No secrets are returned. Data responses are not cached; no cross-origin browser access is enabled.

`POST /v1/import` is Brian-writer-only. Body: `{run_id,observed_at,issue_url,record_version,opportunities,documents:[{name,content}]}`. Only issue #188 provenance is accepted. Imports use one atomic D1 batch. Candidate IDs remain stable. Source timestamp controls which record becomes current; an older import cannot roll back the current version. A different run reusing a candidate observation timestamp is explicitly rejected (409), enforced by a unique index even during concurrent requests; corrections need a later explicit `checked_at`. Payload identity uses recursively key-sorted JSON so object key order does not create false conflicts. Original payload hashes remain preserved alongside canonical hashes. A competing committed request is recovered as an idempotent success. Same run ID + same payload is an idempotent success; a changed payload under the same ID is HTTP 409. Invalid data is 400; anonymous access 401; reader import 403; unknown resources 404. These routes do not approve an experiment, contact prospects, launch products or spend money.

## Nightly update and recovery

Brian's existing nightly job `d1395d5d-cb80-4f0d-b49d-6fb5074505e4` runs at **01:00 America/New_York**. Its payload now explicitly requires database sync after completing the local research register, saving a receipt, and reporting failures accurately. The first full scheduler clock-trigger including this new step has not yet been observed. The exact same sync client was exercised against the live database, including safe replay.

```sh
python3 scripts/client.py sync /absolute/path/to/deliverables/market-intelligence/YYYY-MM-DD --receipt /absolute/path/to/cloudflare-sync.json
```

The client whitelists research documents, not arbitrary directory files or credentials. It reads the register's timezone-aware `checked_at` (legacy imports use the source file's mtime), generates a deterministic content-based run ID, retries transient failures three times, and requires HTTPS. Authenticated redirects are refused, preventing credentials from being forwarded to another origin. It uses an explicit service User-Agent because the edge rejects Python's default agent. Ensure timezone-aware `checked_at` is updated on genuine revisions. For recovery, retry the **same source files**; do not edit a receipt into claiming success. If an import fails, retain local files and mark `sync_pending` on GitHub; the next operator can replay the pending directory.

Cloudflare D1 is the shared queryable research store. GitHub remains canonical for assignments, code, approvals and review evidence. Local dated deliverables and GitHub summaries are retained for recovery. Consult current D1 versions rather than blindly reimporting an old directory. Commercial evidence remains unproven until validated; research score is not revenue.

## Deploy, verify and roll back

```sh
wrangler d1 migrations apply 2nspira-market-intelligence --remote --config wrangler.jsonc
wrangler deploy --config wrangler.jsonc
node --test test/import.test.mjs
python3 scripts/verify_live.py
```

Run the live test with private credential configs installed; it never prints tokens. It exercises all six role credentials from the operator host, denies anonymous/read-only writes, checks current score/history/document integrity and tests exact retry + immutable conflict. It creates no synthetic research rows. To stop ingestion, disable the nightly sync and revoke Brian's writer hash; reads may remain available. Roll back Worker code via Wrangler's deployment rollback without deleting D1. Do not destroy the database to roll back the API. Export D1 with `wrangler d1 export 2nspira-market-intelligence --remote --output <private-backup.sql>` before migrations; retain versioned local artifacts. D1 Time Travel is an additional provider recovery feature, not a substitute for verified exports.

Inventory at setup found existing checkout, careers, team-management and client-portal databases but no market-research database. The inspected client portal held billing/customer tables; none were reused or changed. Dedicated namespaced research tables allow future #186 integration without putting public research into financial tables. Free-tier suitability depends on aggregate account usage; no paid plan upgrade was requested or performed. Monitor D1/Worker usage and audit table growth.

## Expanded shared-intelligence requirements

Versioned research and immutable source recovery artifacts now live in [research/market-intelligence](../../research/market-intelligence/README.md). The [integration handoff](../../research/market-intelligence/INTEGRATION.md) documents Adam/Cleo ownership, v2 structured fields, executive snapshot contract, migration constraints and acceptance gaps. No new infrastructure or security deployment was performed for this expansion. Existing q-search covers title/category only; broader structured/document search is pending Adam integration.
