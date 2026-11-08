# Shared market intelligence

Brian owns research quality, prioritization and ongoing content (#188). **Adam owns shared Cloudflare infrastructure, D1 integration, identity/authentication and API security (#186/#175). Cleo owns dashboard UI (#187).**

This directory is the version-controlled research/recovery asset, not a competing Business Hub. `archive/current.json` holds four structured current records. `archive/runs/<run_id>/` preserves original source documents, hashes, observation dates, import provenance and immutable versions, including MI-001's original score 71 and corrected 68. Historical documents describe their then-current operational state; do not read them as present deployment claims.

## Content contract

Each opportunity retains stable `candidate_id`, buyer/problem/channel dedupe key, category, title, stage, confidence, reproducible score, source IDs/URLs, original check date, proposed owner, experiment and actual outcome. Version 2 adds `research_details`:

- `customer_segment`, `customer_needs`, `industry_trends` with evidence and limitations.
- `competitor_analysis`: names, URLs, observed alternatives, original access dates. Missing quotes remain unknown.
- `pricing_intelligence`: proposed amount/currency/unit explicitly untested; no fabricated price normalization.
- `demand_indicators`: evidence URLs, verified-intent/revenue flags, limitations.
- `recommended_products_services`, `customer_acquisition_strategy`, `recommended_next_steps`.
- `agent_fit`: suggested lead, rationale and unconfirmed assignment; research accountability stays Brian.
- `approval_reference`: canonical GitHub issue, proposal status and proposed caps, not spending authority.
- `source_freshness`: original source-access window separate from metadata-revision timestamp.
- `evidence_gaps`: explicit unresolved questions.

Unknowns remain explicit, never inferred from scores. Current v2 is a **metadata-only** structuring of prior evidence, not fresh market research. No commercial outcome or market trend was invented. Future claims must carry exact source URLs, actual source check times, market/time coverage, source limitations, and proposed-vs-observed labels. Preserve outcomes and append revisions; re-use IDs for the same buyer/problem/channel. Compare prior evidence and buyer signals, not just metadata timestamps or score changes.

## Shared-platform contract and migration

See [INTEGRATION.md](INTEGRATION.md). Existing D1/Worker is transitional pending Adam's architecture decision. Do not create another database, parallel identity provider, dashboard or task-status system. Existing private tokens remain transitional and are not distributed broadly; Adam should adopt/replace/revoke them through his approved secret mechanism.

## Nightly persistence

Continue research at 01:00 America/New_York. Save dated registers/briefs, update structured fields and preserve source dates, sync through the authenticated client, then export here:

```sh
python3 services/market-intelligence/scripts/export_research.py research/market-intelligence/archive
```

Review the **scoped** diff for provenance and secrets; commit only this research subtree and publish GitHub evidence. Push to the existing review branch until merged; do not deploy or merge the website. A failed sync or Git push is reported separately and retried, never claimed successful. Export refuses silently incomplete inventories at the current 100-run/100-opportunity API bounds; Adam must provide pagination before those limits are reached. Existing archive is retained if export fails; review partial local changes before committing. Run `export_research.py` only against the trusted configured service.

`archive/executive-summary.json` is a real, dated **snapshot adapter**, not a connected dashboard or live KPI feed. It gives top opportunities, revision activity, proposed experiments/owners/approval links, and explicit insufficient evidence for emerging trends. These are not sales pipeline, qualified leads or revenue metrics. Hashes in `archive/manifest.json` verify exported content; they are not a database backup of audit/authorization tables.

## Active 30-day 70/30 model — #199

From November8 through December8,2026 use [OPERATING_MODEL_199.md](OPERATING_MODEL_199.md) and the first updated [portfolio](operating-model-199/nightly-brief.md). This is a content/effort contract within #188, not a new pipeline. Preserve MI-001–MI-004, approved accessibility deep dive, independent QA and source freshness. Log active effort separately from elapsed time; 70% Adjacent /30% New Stream is a research allocation, not a quota. Existing 01:00 research and07:00 summary jobs are retained. Weekly and day30 reviews run within them. Proposals do not authorize outreach/build/listing/spend/deployment.

The isolated #199 review branch is based on PR194 and targets that branch, avoiding duplicate infrastructure work. Routine exports still use the established #188 worktree; this operating-model commit must be incorporated there by normal review, not by autonomous merge.

## Active 30-day 70/30 model — #199

From November8 through December8,2026 use [OPERATING_MODEL_199.md](OPERATING_MODEL_199.md) and the first updated [portfolio](operating-model-199/nightly-brief.md). This is a content/effort contract within #188, not a new pipeline. Preserve MI-001–MI-004, approved accessibility deep dive, independent QA and source freshness. Log active effort separately from elapsed time; 70% Adjacent /30% New Stream is a research allocation, not a quota. Existing 01:00 research and07:00 summary jobs are retained. Weekly and day30 reviews run within them. Proposals do not authorize outreach/build/listing/spend/deployment.

The isolated #199 review branch is based on PR194 and targets that branch, avoiding duplicate infrastructure work. Routine exports still use the established #188 worktree; this operating-model commit must be incorporated there by normal review, not by autonomous merge.
