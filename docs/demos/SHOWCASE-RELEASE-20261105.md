# Interactive demos — release scope

Authorized by Jeffrey on November 5: complete the education demo, add Demos immediately after Work in desktop/mobile navigation, launch overview and consistent dedicated education/manufacturing pages, and publish only ready experiences.

## Entrances and ownership

- Marketing: `/demos`, `/demos/education`, `/demos/manufacturing`; existing vinext/Cloudflare Workers Builds owner on main. Never deploy production manually.
- Education: standalone private repository `2NspiraOpsTeam/education-operations-demo`, Worker `learning-grove-school-demo`, `https://learning-grove-school-demo.jcortez-36a.workers.dev/`. Static assets, strict CSP hashes, GET/HEAD only, no database or outbound service binding.
- Manufacturing: existing unchanged `https://demo.2nspira.com/manufacturing/`, repository `2NspiraOpsTeam/manufacturing-command-center`, main `657b7a5f90e854e8158c622f8294fcc97f0a2005`. No original client source/database/deployment modified.
- Both dedicated pages use shared `DemoDetail` and approved site tokens; booking uses the existing `BOOKING_URL`.

## Implemented scope and honesty

Education follows one shared Grade 7 family through application/sample document placeholders, verification/admission, prerequisites/capacity/waitlist, enrollment-derived schedules, one attendance mark, science material/assignment/submission, private draft and published feedback, shared simulated conversation, and one illustrative tuition charge/receipt. Four role-specific experiences; the role switch is expressly not authentication. No real uploads, cumulative transcripts, full timetabling, email, or payment integration.

Manufacturing copy is based on the actual transactional work-order/material/procurement/quality/dispatch features. Planning means cell workload and controlled stages, not resource optimization. Historical charts are synthetic fixtures; assistance uses local rules. Broader ERP gaps are listed on its page.

Both experiences use validated per-tab sessionStorage; refresh keeps valid state, confirmed reset restores seed data. Browser tab restoration behavior can preserve a session. Nothing is written to shared client systems. Work retains an implementation-focused internal engineering example linking to Demos; interactive explanations and walkthroughs belong in Demos.

## Local checks completed

- Marketing lint: zero errors, four existing AI Team image warnings. Canonical `build:ci` and route smoke gate, TypeScript, moderate dependency audit passed (zero vulnerabilities).
- Marketing: 16 route/viewport checks (Demos overview, both detail pages, Work × 1440/768/390/320), scoped WCAG scans, canonical/social metadata, all four role entrances, booking URL, real desktop/mobile menu navigation and ordering passed. Full-page screenshots reviewed.
- Education: strict typecheck/lint, ten tests, static build and moderate dependency audit passed (zero vulnerabilities). Full cross-role journey and 113 browser checks passed, plus a separate mobile journey/35 checks. Functional harness verifies no browser write requests or page errors, draft privacy, state guards, storage recovery, reset and refresh.
- Manufacturing fresh production check: order→shortage→purchase receipt→production→failed QC→passed reinspection→simulated shipment, refresh/reset, and 36 route/viewport renders passed. Source unchanged. This is not an enterprise security or production-ERP certification.

Release evidence (PRs, exact heads, hosted checks and production markers) is recorded separately after deployment. A ready local build is not yet production proof.
