# Marketing and SEO iteration — 2026-11-03

## Scope
Focused evidence, buyer journeys, search intent and closing-CTA improvements, not a wholesale redesign. Base: d9dd4e7c (Careers release preserved). Runtime: existing vinext Cloudflare Worker / Workers Builds GitOps.

## Evidence register
- Teams Management: published client website; public discovery features can be inspected. Private tenant/Admin functionality is described as access-controlled, not a public demo. No client outcome, conversion uplift or direct testimonial added.
- GeVitals: published clinic website, bilingual scope; no patient data or clinical outcomes claimed.
- Open Goal Soccer: published community archive, not represented as a commercial client case study.
- 2Nspira, Books, Breadcrumb: internal platforms/engineering. Books retains its development-preview destination and explicit checkout-readiness limitation.
- Multi-agent workflow: self-published internal engineering field notes, not a client AI deployment.
- Manufacturing workspace: concept/proposed capability, not a production system or measured result.
- Jeffrey biography: owner explicitly approved use of his LinkedIn and supplied resume on 2026-11-03. Public summary uses his 20+ years, prior CIO/VP/director roles, education/enterprise-systems work and two degrees as owner-provided facts, not independent credential verification. Source: privately supplied `Jeffrey Cortez Resume Template 109 (2).docx`; private contact information and full resume are NOT published or committed. Resume achievements/percentages/grant totals are deliberately not repurposed as 2Nspira client results. LinkedIn is linked at the exact owner-supplied URL; direct fetch returned 999 and managed browser showed authwall, so no claim of live-profile verification.
- Mentor: removed anonymous four-company example from the public pitch. No named mentor profile or network-size claim added. Owner directed use of Jeffrey and supplied his resume; shared profile now appears on About, Fractional CIO and Coaching. Resume has no usable portrait; no synthetic or misidentified photo introduced. Other mentor identities remain unconfirmed.
- Automation and CIO deliverables: explicitly illustrative / scope-dependent, not actual client artifacts.
- Resident reviews are not converted into 2Nspira testimonials. No outreach or review requests sent.

## Conversion and search changes
Work groups and anchor navigation; illustrative onboarding workflow; service-combination example; separate organization/personal AI pathways; visible shared leadership profile; scope-dependent CIO deliverables; article-to-service/assessment next steps; AI service link on Resources; contact organization-type field and post-message reassurance; hide redundant footer invitation on tailored-CTA routes while retaining footer navigation and contact links.
Existing route-owned canonicals, metadata and service schema retained; Services and Work titles refined for distinct search intent. Website page already has redesign and integration language and clear preview labels; no unnecessary rewrite.

## Measurement boundary
`MarketingEvents` emits dataLayer events for service-page views, booking clicks, AI/strength assessment clicks and outbound portfolio clicks. No personal form values, query strings or visitor IDs. Events are instrumentation, not a claim that a connected analytics destination is receiving them. GA/GTM collection/configuration must be independently verified. Assessment completion occurs in separate apps; booking completion and completed consultations require separate provider/CRM evidence. Qualified inquiry is a business classification, not inferred from a click. No new analytics vendor or paid platform introduced.

## Verification
Results will be recorded after canonical checks and rendered QA. No search-ranking, indexing, conversion-lift or real-user Core Web Vitals claim is implied by this release.

### Initial verification results
- Live pre-change sitemap crawl: 52/52 returned 200, one H1, crawlable robots directives and route-matching canonical (homepage slash normalization equivalent). No canonical/indexability defect reproduced.
- Lint, `build:ci` including built-Worker routing/404 smoke, TypeScript passed.
- Mocked contact browser QA: required/invalid validation, organization type, duplicate-click guard, delivered UI, 422 retry, clear/refresh passed. Zero external messages sent. Actual email delivery is not established by this test.
- Homepage audience routes now link to distinct services; business/executive paths lead, coaching stays separate.
- Dependency audit is unchanged from the Careers baseline: 8 findings (3 moderate, 4 high, 1 critical). No dependency or lockfile change in this marketing iteration; no repository GitHub workflow files are tracked. Findings are pre-existing, not a successful audit. The critical advisory targets Next.js including ImageResponse; this Worker uses vinext aliases, but no blanket non-applicability claim is made. A compatible dependency/security update needs separate runtime validation rather than a forced upgrade in a content release.
- www first-hop redirect preserves `/contact?qa=1` to canonical apex. Managed robots allow search indexing and advertise the canonical sitemap; training restrictions are left unchanged.

### Local validation evidence
- Initial rendered QA passed 44 page/viewport combinations (11 routes × 320/390/768/1440), unique route titles/descriptions, canonicals, one H1, JSON-LD parsing, images, no overflow/page exceptions, Work anchors, AI pathway anchor, footer SPA transitions, refresh, reduced-motion rendering and booking-event emission.
- After the supplied-resume update, all three profile routes passed at all four widths (12 additional combinations): named roles, qualifications, owner-supplied LinkedIn destination, Person schema, no private email and no overflow/page errors.
- Homepage audience paths passed all four widths. Inspected mobile audience/About/Work and desktop leadership/AI pathway plus mobile workflow screenshots.
- Mocked unavailable-mail draft/edit flow passed and preserves selected organization type. No actual delivery tested.
- All six externally linked project destinations returned 200, including the explicitly labeled Books preview.
- Pre-change live Work mobile Lighthouse lab: Performance 94, Accessibility 100, Best Practices 100, SEO 100; LCP 3.1 s, transfer 459,934 bytes. Lab baseline, not field CWV or search ranking evidence.
