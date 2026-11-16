# AI enablement buyer clarity

Retain `/ai-enablement` and Organizational AI Enablement as the service label. Use the candidate cluster AI consulting + employee AI training + AI implementation services, without claiming measured keyword demand or difficulty.

## Changes
- Updated title, shared social description, H1 and opening copy.
- Four buying paths with a visible employee-training offer and scoped workshops, exercises, review checklists and optional office hours.
- Practical workflow examples before roadmap detail; invoice demo remains explicitly fictional with simulated email.
- Buyer FAQs on readiness, existing tools, small pilots, pricing and adoption support.
- Descriptive links from homepage and AI-related article next-step blocks.
- Existing personal-assistant material moved to `/personal-ai-assistant`, with reciprocal navigation, canonical, Service schema and sitemap discovery. Existing main-page anchor retained as a short cross-link.

## Verification
- Lint: zero errors, four pre-existing warnings.
- Canonical `npm run build:ci`: passes including built-Worker route smoke checks and missing-route 404.
- `npx tsc --noEmit`, `git diff --check`: pass.
- Production dependency audit: zero vulnerabilities.
- Local built Worker at 1440, 768, 390 and 320px: both pages return 200, one H1, canonical, parseable JSON-LD, no horizontal overflow or page errors. Training anchor, disclosures, personal-assistant cross-link and contact navigation exercised.
- Mobile screenshots inspected for both pages. No forms or backend operations changed; no inquiry or booking submitted.

Not production-verified. Keywords remain candidates; Search Console impressions, query fit and qualified inquiries should inform subsequent refinement. No new analytics results or customer outcomes claimed.

## Separate receivables change
PR #270 exact-head preview marker verified at `https://e36ba291-2nspira-website-preview.jcortez-36a.workers.dev`, commit `dacab99457c9f5c453ec4e96a36eda0ef57b8425`. Rendered 1440/768/390/320 checks passed for the service page and discovery links from homepage, demos, software and Operations Hub, plus FAQs, canonical, JSON-LD and sitemap. This is preview verification, not production publication.
