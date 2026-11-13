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
- Existing Teams desktop project image plus a newly captured public mobile screenshot (390×844, November 13; WebP). No private dashboard or client record is added.
- Concise project challenge/scope, then exactly three core service cards, a subordinate More Services row, brief delivery principles, distinct Creative Studio link, one closing invitation.
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
