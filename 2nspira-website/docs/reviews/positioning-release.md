## Positioning release — 2026-10-26

- Repository: https://github.com/2NspiraOpsTeam/2nspira-website
- Branch: feat/problem-outcome-positioning-20261026
- Baseline: a0991b7b5ac6a9e295864a37e7afb10f3066fbf0
- Baseline Worker / rollback version: 6ff01154-f1ca-432c-a8db-5db89dea9365
- PR: https://github.com/2NspiraOpsTeam/2nspira-website/pull/110
- Preview: https://2nspira-website-preview.jcortez-36a.workers.dev
- Preview implementation: 9d5aff94192f8d69f0f8ff7a79adf0d282f95cb9; initial manually observed version 1216de13-a241-4f87-906e-151806c2661a; subsequent standard CI preview check passed.

### Change boundaries
Homepage and reusable BusinessProblems component; existing service introductions and integration/analytics/workflow anchors; four-step approach; about/audience and shared metadata; work/status copy; contact labels, validation feedback, duplicate-submit guard and draft-edit retention; Header current-page accessibility correction. No framework, routing, authentication, global styles, DNS, pricing, dependencies, database schema, or notification transport changes.

### Verification
Lint, canonical build:ci with SMOKE_PORT=8896, built Worker representative routes plus missing-route 404, and TypeScript passed. Default smoke port was occupied by an unrelated Teams process; no unrelated process stopped. A separate local Worker on 9147 required x-forwarded-proto=https. Hosted preview is authoritative for image loading and final rendered checks.

Independent specialist reports are stored alongside this record. Hosted desktop/tablet/mobile/narrow visual and regression checks pass; no invented client metrics, testimonials, or production adoption claims. Preview X-Robots-Tag noindex,nofollow and robots Disallow:/ confirmed.

### Explicit verification limits
Contact success/draft/network-failure interactions use browser-intercepted requests; no test inquiry/email sent to production. Production empty-payload API validation returned 422 without invoking delivery. Actual relay acceptance and inbox receipt are not independently verified. Authenticated admin/client, billing and careers submission workflows were not exercised or modified. Public route smoke does not establish authenticated functionality.

### Rollback
Use known-good Worker version above only if required, then verify apex live content/deployment and routes. Reverting the PR through the standard main/Workers Builds pipeline is the source-level rollback. Do not bypass the guarded production deployment script.
