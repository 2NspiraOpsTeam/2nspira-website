# AI Invoice showcase, Operations identity and AI page refinement

## Scope

- New marketable route `/demos/ai-invoice-workflow`: capabilities, a four-step walkthrough, five sample scenarios, primary workspace links and a concise scope disclosure.
- The existing `/demos/ai-operations` workspace remains the interactive experience. No API, provider, database, financial or email behavior changed.
- Aubergine workspace styling and copper approval-gateway illustration distinguish this product from the other demos. Navigation, footer, sitemap and marketing route recognition include the showcase.
- AI Enablement now leads with the offers and invoice demonstration; tool logos appear after those sections. Removed repeated training/workflow imagery and moved the five-stage framework into a native disclosure. Reduced eleven FAQs to six. Customer-facing readiness wording now begins “Not sure where AI can help?”
- AI Enablement uses actual scorecard/workspace captures, the existing approved Jeffrey portrait and published Teams Management imagery. No generated scene artwork is rendered on that route. Detailed engagement scope remains available in disclosures. No testimonial was invented or published.

## Evidence and provenance

- Jeffrey portrait: existing `/images/leadership/jeffrey-cortez-linkedin-20261103.jpg`, already used by the owner-approved LeadershipProfile component.
- Teams story and image: existing `/work` project description and `/images/work/teams-homepage-20261113.webp`; published delivery capabilities, not measured outcomes or AI implementation results.
- Scorecard capture: read-only browser screenshot of `https://scorecard.2nspira.com/`, default sector. Export: `public/images/engagement/ai-readiness-screen-20261116.webp`.
- Invoice workspace capture: actual locally rendered app using the existing deterministic synthetic test fixture and mocked provider; approved case/task records are sandbox examples, not client results or a live provider claim. Site chrome hidden for the screenshot; upper workspace captured at desktop width. Export: `public/images/demos/ai-operations-screen-20261116.webp`.
- Operations concept art: built-in image generation. Export: `public/images/demos/ai-operations-copper-20261116.webp`. Retained on demo routes, not AI Enablement.
- Final generation prompt: “Use case: ads-marketing. Create a premium widescreen website hero illustration for an AI-assisted invoice operations product. A striking architectural orchestration engine: luminous copper paths carry sculptural ivory invoice sheets and translucent case/task/message panels through an elegant central glass intelligence prism, resolving into three beautifully ordered workstreams, with a prominent human approval gateway as a tactile copper control ring. Deep aubergine, plum and burnt copper palette, soft ivory highlights; no green, blue, gold or pink dominant colors. Cinematic dimensional editorial 3D, sophisticated tactile materials, dramatic depth, crisp focal point, restrained atmospheric light, not generic robot imagery. Communicate transformation from fragmented billing paperwork to coordinated human-controlled action. Landscape 16:9 composition, important objects centrally placed for mobile crop, no text, no letters, no logos, no numbers, no watermark. This is illustrative product storytelling, not a screenshot.”

## Observed local verification

- Lint: no errors; four existing warnings in unrelated `ai-team/page.tsx`.
- `build:ci`: passed, including representative built-Worker routes and missing-route 404.
- Typecheck: passed.
- Existing operations service test: 41 checks passed, including persistence, revision conflicts, approval gates, duplicate protection, expiration and isolation; provider mocked.
- Existing rendered operations harness: approvals, cancel/Escape, edit/reapproval, simulated outbox, refresh, reset, clear/disabled input, backend failure and recovery affordance, browser voice fallback, and mocked speech behaviors passed. This is not evidence of real microphone recognition or live Groq invocation.
- Four routes (`/demos/ai-invoice-workflow`, `/demos/ai-operations`, `/ai-enablement`, `/demos`) checked at 1440, 768, 390 and 320px. Images decoded, one h1, no horizontal overflow, no page exceptions or missing JS/CSS/image assets. Desktop/mobile screenshots visually inspected.
- Main-region axe scans with disclosures expanded: no WCAG A/AA rule violations on those four routes. Automated scan is not a full accessibility certification.
- Showcase canonical, parsed JSON-LD, walkthrough and launch links, native scope disclosure and no-JavaScript content checked. AI page section ordering, six FAQs and actual-image-only inventory checked.
- Release-specific hosted checks and exact deployed SHA are recorded in the PR/release report, separately from these local checks.
