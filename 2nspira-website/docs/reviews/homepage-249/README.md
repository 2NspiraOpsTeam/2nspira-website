# Homepage and navigation review — issue #249

Status: review-only implementation; no production merge or release authorized.
Base: `f4c5f7ef178390f19b657716578c3eab9ac5e7af` (current main when work began).

## Before-state and scope

Related: [#183 conversion audit](https://github.com/2NspiraOpsTeam/2nspira-website/issues/183), [#180 websites refinement](https://github.com/2NspiraOpsTeam/2nspira-website/issues/180), [#182 Creative Studio](https://github.com/2NspiraOpsTeam/2nspira-website/issues/182). The separate audit draft #197 is not merged or modified by this change. `/websites` already has the approved two-path structure, so this work preserves it rather than redesigning it again.

Reproduced on the November 13 production homepage: transformation-led hero; four starting-point cards; three service cards plus two large supporting-service cards; additional audience, purpose, reviews, timeline, work and demo sections. The Services menu exposed five equally weighted links. These are observed UI facts. The hypothesis that this hierarchy reduces first-time clarity is a qualitative UX judgment, not an observed conversion result.

Measured full document heights after scrolling through lazy media: 10,890 px desktop (1440 wide) and 16,215 px mobile (390 wide). These are screenshot-session measurements, not Core Web Vitals. Before images below include the existing resident-review attribution; those reviews were not endorsements of 2Nspira. The new homepage omits the resident reviews rather than using them as agency proof. About retains the company history.

## Hero choice

Three concise directions considered against the same project-led composition:

1. **Professional websites. Powerful digital platforms.** Selected: immediately identifies the flagship deliverables; human-led/AI-enabled eyebrow supplies the delivery identity without competing with the offer.
2. **A better website. A more connected business.** Approachable, but less explicit about custom platforms and “better” invites an ungrounded comparison.
3. **Websites and systems built around your business.** Accurate, but “systems” is broader and less concrete for first-time visitors.

No conversion lift, revenue improvement, current site count, availability promise or new client endorsement is claimed. “Since 2019” is supported by the existing owner-approved company-history source; it is not a newly independently audited claim.

## Implementation

- Project-led hero, primary **Discuss Your Project** → `/contact`, secondary **View Our Work** → `/work`.
- Current public Teams, GeVitals and Open Goal Soccer screenshots captured November 13 at 1440×1000 and delivered as 1008×700 WebP (74/54/62 KB). Existing published portfolio usage plus owner-requested reuse establishes the intended brand context; no new endorsement or private record is implied.
- Three-project portfolio band immediately beneath the hero, followed by exactly three core service cards, a subordinate More Services row, brief delivery principles, distinct Creative Studio link and one closing invitation. All projects remain visible without carousel interactions; mobile uses a single column.
- Desktop and mobile Services menus: exactly three core offerings, separated More Services group containing advisory and maintenance only. Existing destinations remain unchanged.
- Footer taxonomy and `/services` discovery agree. Supporting-service links appear contextually in the three core service journeys. Existing `/websites` content and automation functionality are retained.
- Existing desktop hover/click, Escape, focus return, mobile accordion and dialog behavior retained. No new UI dependency.
- Privacy-minimal inquiry/service intent events and delivered-contact success event added. No form values, free text, query strings or visitor identifiers are emitted by these additions. An event in `dataLayer` is not proof of an analytics backend receiving it.
- Homepage canonical and social metadata align with the flagship offer; JSON-LD describes the three core services.

## Rendered review

| Width | Before | After | Navigation open |
| --- | --- | --- | --- |
| 1440 | [Desktop](before-1440.jpg) | [Desktop](after-1440.jpg) | [Menu](navigation-1440.jpg) |
| 768 | — | [Tablet](after-768.jpg) | [Menu](navigation-768.jpg) |
| 390 | [Mobile](before-390.jpg) | [Mobile](after-390.jpg) | [Menu](navigation-390.jpg) |
| 320 | — | [Narrow mobile](after-320.jpg) | [Menu](navigation-320.jpg) |

Rendered images reviewed for hierarchy, crop, whitespace and responsive composition. Automated checks confirmed no overflow and successful image loading at all four widths. Final hosted preview/commit and any further QA are recorded in the PR and issue update, not inferred from these local screenshots.

## Verification and limits

- `npm ci --no-audit --no-fund`: clean install; no manifest/lockfile changes.
- `npm run lint`: zero errors; four existing warnings on unchanged `ai-team/page.tsx`.
- `npm run build:ci`: vinext build and built-Worker routing/404 smoke passed.
- `npx tsc --noEmit`: passed.
- `node scripts/chatbot-test.mjs`: 19/19 provider-stubbed contract cases; no external inference.
- `scripts/homepage-249-qa.mjs`: 89 local checks passed; see [results](result.json). Browser entry requires `PLAYWRIGHT_MODULE` when playwright-core is not installed locally. Uses existing axe-core from the installed development dependency tree.
- Homepage WCAG A/AA axe scans: zero violations at 1440/768/390/320. This is not accessibility certification; manual visual and keyboard review remain distinct.
- Existing schema migrations applied only to isolated local fixtures (`--local`); no production or shared-preview migration. Empty local content tables exercise the existing public seed behavior, not production editorial data.
- Contact backend 422 and delivered responses intercepted in browser: draft retained, explicit retry works, duplicate click sends once, success event contains no personal data. No real email or prospect record submitted. Real inbox delivery remains unverified in this task.
- Existing Google booking shortlink resolves to its appointment schedule. No booking created; calendar availability is not asserted.
- [Local lab performance](lab-performance.json): one unthrottled mobile-width run, LCP 76 ms and CLS 0. This is not production field data, an INP measurement, or a performance guarantee. No field CWV or conversion baseline was available in this task.
- Homepage chatbot opening and unchanged contract checks pass. Real model responses on the new preview are not claimed unless separately recorded; existing production chatbot implementation and credentials are untouched.

## Review decisions / release boundary

Owner review: approve the visual direction and hierarchy after viewing the preview. No new unresolved business-policy decision was introduced. Production publication still requires Jeffrey’s explicit approval; this branch remains a draft and unmerged. Existing routes and About history are preserved, and no DNS, billing, secrets or production settings were changed.

## Owner refinement — three-project showcase (November 13)

Implements [owner feedback](https://github.com/2NspiraOpsTeam/2nspira-website/issues/249#issuecomment-6865812964) on the same PR #250. Teams remains the hero lead; GeVitals and Open Goal Soccer now have equally sized, image-led cards alongside Teams immediately below it, replacing the second Teams-only feature section.

### Sources and accurate scope

All three current anonymous public homepages returned HTTP 200 and were visually inspected before screenshots were used. Screenshots preserve real imagery/marks; no generated substitutes. Project descriptions derive from the existing published `/work` scope, corroborated by the public pages:

- [Teams Management](https://www.teamsmanagement.com/): published client website; property discovery, galleries and inquiries. Current Work page also documents authorized staff tools. Public screenshots do not verify private tenant/Admin workflows, so the homepage explicitly distinguishes these from public demos and links to existing scope.
- [GeVitals](https://gevitals.com/): published bilingual clinic website; service discovery, content and video. No medical outcomes or operational automation claimed.
- [Open Goal Soccer](https://opengoalsoccer.com/): published community archive. Its live notice confirms the organization is no longer active; no current-program availability or commercial-client claim added.

### Refinement before / after

| Width | Before refinement | After refinement |
| --- | --- | --- |
| 1440 | [Desktop](portfolio-before-1440.jpg) | [Desktop](portfolio-after-1440.jpg) |
| 768 | — | [Tablet](portfolio-after-768.jpg) |
| 390 | [Mobile](portfolio-before-390.jpg) | [Mobile](portfolio-after-390.jpg) |
| 320 | — | [Narrow mobile](portfolio-after-320.jpg) |

Local checks: canonical build and route/404 smoke, TypeScript, lint (four existing warnings), plus 83 portfolio checks at 1440/768/390/320: all three real destinations, Enter activation, visible focus, descriptive alt, decoded screenshots, no chatbot covering card headings, text-spacing/no overflow, public HTTP 200. General homepage regression results and final hosted checks are recorded in the PR update. No contact email, appointment or real AI inference submitted. Performance evidence is limited to small image assets, image-loading checks and layout stability; no new field CWV claim.


## Final owner refinements — November 13

- Teams leads with its responsive mobile-site detail, not the repeated desktop screenshot. GeVitals and Open Goal Soccer lead the three-project portfolio; all three remain linked and accurately labelled.
- Mobile chat is a normal-flow button directly below navigation, not an image-covering floating overlay. It scrolls with the page; desktop floating access remains. Keyboard opening and Escape/focus return verified.
- Jeffrey’s latest direct clarification retains Explore Creative Studio / Watch / Listen / Read / Play / Shop. Existing shared navigation implementation, catalogue, content records and SEO URLs are unchanged. No database write.
- 87 regression + 83 portfolio + 42 focused browser checks passed locally at 1440/768/390/320. Lint zero errors/four unchanged warnings; supported build/routing smoke and TypeScript passed. Synthetic contact responses intercepted; no messages or real inference sent.

| Width | Before | After |
|---|---|---|
| Desktop | [Before](final-refinement/before-1440.jpg) | [After](final-refinement/after-1440.jpg) |
| Mobile | [Before](final-refinement/before-390.jpg) | [After](final-refinement/after-390.jpg) |
| Narrow mobile | [Before](final-refinement/before-320.jpg) | [After](final-refinement/after-320.jpg) |

Raw local result JSON is in `final-refinement/`. Hosted exact-commit verification is recorded in the PR handoff. Production is not approved or changed.
