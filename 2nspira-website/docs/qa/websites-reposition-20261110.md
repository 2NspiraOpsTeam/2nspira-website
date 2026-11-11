# Websites & Custom Digital Platforms — review candidate

## Release boundary

Jeffrey requested a deployment-ready PR, with review and approval **before production**. Do not merge or publish this branch until that approval is recorded. Existing production service-model release #224 is separate and remains live.

## Before → after

| Surface | Before | Candidate |
| --- | --- | --- |
| Discovery | Digital Platforms third; old app wording in cross-links | Websites & Platforms first in menus/footer; full service name in cards |
| `/websites` | Modernization-led, four overlapping offers including native mobile apps, long repeated sections | Two clear offers, supplied headline/introduction, project discussion and work CTAs |
| Public planning | Draft subscription prices, editor allowances and candidate CMS architecture visible | Removed from rendering; original draft retained only in `docs/internal/` |
| Work | Client and internal work already distinguished, but categories less explicit | Client Websites and Custom Digital Platforms headings; historical internal work retained and labeled |
| Inquiry | Generic business challenge | Optional project type, existing URL, expected timeline and budget plus requirements; same sender and duplicate/unknown-outcome protections |
| AI | Prominent operational framing | AI-assisted delivery explained after offers, evidence and project process; no price/time guarantees |

## Evidence / scope

- Existing published repository descriptions and screenshots substantiate Teams Management, GeVitals and Open Goal Soccer website scope; no new outcome, endorsement or testimonial is introduced.
- Teams private operational workflows are described separately from public website access. The 2Nspira platform is explicitly in-house. School, manufacturing and property demonstrations are explicitly fictional, not client implementations.
- Historical portfolio projects, routes and unrelated service pages remain intact. Existing `/websites` section fragments receive compatibility anchors; `/work#internal-engineering` retained.
- Brian QA unavailable: only the `main` agent is configured; attempted Brian dispatch returned agent not found. No Brian approval is claimed.
- No new dependencies, pricing, subscriptions, production database writes or infrastructure changes.

## Validation

- `npm run lint`: no errors; four pre-existing AI Team image/disable warnings.
- `npm run build:ci`: vinext build and built Worker route/404 smoke checks pass.
- `npx tsc --noEmit`: pass.
- `npm audit --omit=dev`: zero vulnerabilities.
- `scripts/websites-reposition-qa.mjs`: rendered responsive routes, headings, schema parsing, keyboard disclosure/navigation, loaded service images, overflow, form validation/persistence/clear, structured payload, loading/one-submit and mocked delivery/error/unknown outcomes. No test email is sent.
- Local QA uses isolated synthetic D1 tables from existing migrations 0005/0006 under `/tmp/reposition-qa-state`, not production data.
- Server-side invalid project URL rejected with 422; internal archive URL returns 404.

Final rendered and hosted-preview results will be recorded on the PR. Production verification is intentionally not performed for this candidate because publication is not authorized.
