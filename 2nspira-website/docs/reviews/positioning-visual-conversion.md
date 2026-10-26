# Positioning: visual and conversion specialist review

Date: 2026-10-26. Scope: source-based baseline and implementation recommendations; no product-code ownership. Final rendered review pending preview. Browser integration returned no registered handler, so this report does not claim visual/browser verification.

## Existing visual language to preserve

Evidence: `src/components/ui.ts` and `src/app/globals.css`: warm off-white surfaces, indigo #4a6fa5, near-black headings, muted body type, rounded cards and pills, restrained shadows. Homepage already uses a split advisory photograph, spacious section bands and shared heading/button tokens. No new visual system or library is necessary.

## Baseline findings

1. **High — hero does not deliver the approved broad problem-led positioning.** `src/app/page.tsx` leads with “For leaders of small and mission-driven organizations” and “Technology that works the way your people do.” This excludes other intended buyers and does not identify the operational trigger quickly. Replace with the approved exact headline and short recognizable problem statement; broaden the eyebrow.
2. **High — hero action hierarchy is fragmented.** `ServiceConversation` renders booking, Send a message, and a 30-minute/calendar explanation; homepage adds Find the right service. Visitors must parse three actions before seeing evidence. Use one filled “Let's Discuss Your Challenge” contact link and one secondary “See Our Work” link. Keep booking available in existing contact experience. Do not globally replace the shared booking component without reviewing its other consumers.
3. **High — no six-card recognition section.** `ClientServiceGrid` contains five service cards, each with service label before buyer need plus help, examples and links. Immediately after hero, add six reusable problem cards with customer quote first in visual hierarchy, concise supporting sentence, then capability link. Existing integration/automation page can cover multiple capabilities; do not invent new routes for Data & Analytics.
4. **Medium — approach describes values, not a concrete operating sequence.** Homepage values People First / Process Clarity / Data Integrity / Practical AI are positive but do not explain engagement flow. Replace/refine this bounded section with Understand / Simplify / Implement / Improve. Preserve shared style tokens.
5. **High — operational portfolio status is unclear.** `/work` displays manufacturing and property-operation capability lists without an explicit current project status. Broad phrases such as “measurable impact,” “audit-ready records,” and “real-time reporting” are stronger than evidence supplied by source alone. Qualify status using verified project evidence; distinguish demonstrated scope from deployed capabilities. Do not infer production completion from screenshots or public URLs. Public website examples already have bounded descriptions and should stay concrete.
6. **Medium — contact journey can improve without schema changes.** `/contact` already has name, email, optional organization and required message. Relabel the last field “Business challenge,” prompt for what is difficult and what should improve; keep organization optional, avoid additional qualification fields and preserve fetch `/api/contact` payload. Change narrow global-region FAQ to the approved broad audience with NYC identity. Existing delivery/draft distinction is useful and must survive.
7. **Medium — misleading contact shortcut.** Form displays “or use Ctrl+Enter to submit” but source contains no key handler. Remove this instruction or implement and test the shortcut. Removing is the smaller change.
8. **Medium — contact image increases distance to form.** Hero has generous padding followed by a large decorative meeting-room image before the form. For challenge-intent arrival, anchor primary CTA directly to `#contact-message`, retain visible book/message choice, and reduce/remove decorative image height only within contact rather than changing global styling.

## Bounded design specification

- Hero retains photograph, brand palette and existing desktop split. Approved headline is longer; constrain readable width and assess at 320, 390, 768, 1024 and 1440 px. Actions should be reachable before the photograph in DOM/mobile order. Use vertical or wrapping action layout; never nowrap long CTA text.
- Sound Familiar cards: 1 column narrow mobile, 2 tablet, 3 desktop; `gap-5` / `p-6` and existing `cardFlat` or `card`. Quote as h3, optional small problem label above, one support sentence and an explicit descriptive capability link. Equal-height flex cards, link at bottom; no whole-card nested interactive area, no new animation.
- Maintain one clear primary action in each decision area. Contextual links may be secondary. Final CTA should repeat approved challenge label and explain that visitors need not know the technical solution.
- Put clear approach and credible work evidence before final conversion prompt. Keep services available through existing navigation and contextual card links; avoid a homepage wall of six problem cards plus equally dense service cards without differentiation.
- Portfolio cards should visibly separate Challenge, Approach/Implemented, Business value/new capability and Status. Qualitative capability gains are acceptable; unsupported percentages, testimonials, savings or completion claims are not.

## Final review gate

Pending: rendered desktop/tablet/mobile screenshots; approve hero wrapping, CTA prominence, card rhythm, focus-visible links, readability and contact distance; verify all six links reach matching existing content; verify no inflated claims or narrow audience language. Report pass/fail against rendered evidence rather than source assumptions.

## Implementation source review

Approved intent is now present in source: exact problem-led hero, two clearly differentiated actions, six responsive problem cards linked to existing routes/anchors, practical four-step approach, broad audience/NYC language and challenge-first contact field. Existing shared design tokens are retained. Contact payload shape and submission implementation remain intact. No source-level visual/conversion release blocker found in these bounded areas; rendered review remains necessary.

Minor non-blocking observation: problem labels use h3 with customer quotes in larger paragraphs. This is an acceptable accessible structure and preserves a recognizably problem-first visual hierarchy, though quotes are not themselves headings. Retaining both six recognition cards and five service cards lengthens homepage; assess actual scrolling rhythm in preview rather than deleting established service navigation blindly.

## Operational portfolio evidence and approved cautious wording

### Manufacturing

Checked workspace `SMA/README.md` and `SMA/apps/sma-command-dashboard/README.md`: SMA means Social Media Advantage and the dashboard tracks affiliate activity/clicks/revenue. It does not substantiate a manufacturing system. Workspace search found manufacturing screenshots in website clones but no implementation/readiness evidence. A screenshot demonstrates a design artifact, not operational adoption.

Recommended status: **Concept showcase — connected manufacturing workspace. Production deployment and client adoption are not verified.** Describe production/materials/quality/equipment scope as illustrated capabilities, not live real-time reporting or audit-ready guarantees.

### Water Bear / Teams

Latest relevant source: `teams-waterbear-development/docs/operations/README.md` directs readers to `WATERBEAR-DEVELOPMENT.md` (18 October), explicitly superseding initial synthetic-only setup. That handoff documents a migrated isolated development environment, scoped admin and resident access, operational records, sign-in mail verification and focused tests. It explicitly leaves production promotion/remaining acceptance checks separate and private lease-upload storage unavailable. Earlier 8 October completion reports are themselves marked superseded and must not be cited as release proof.

Recommended public wording: **A phased property-operations platform connecting portfolio content, scoped administration, resident access, and operational records. Implemented and tested in an isolated development environment; production rollout and remaining acceptance checks are separate.**

No reviewed evidence substantiates AI-assisted publishing, lease generation, e-signatures, or automatic delivery of signed leases as completed production capabilities. Present those only as proposed future scope if an authoritative approved roadmap supports them; otherwise remove them from this case study. Keep private data, resource IDs and operational credentials out of public copy.

## Final hosted rendered review — PASS

Preview: https://2nspira-website-preview.jcortez-36a.workers.dev (reviewed release `9d5aff94`). Automated Chrome rendering plus manual screenshot inspection, 26 October 2026.

- Homepage inspected at 1440×1000, 768×1024, 390×844 and 320×700. All four reported no horizontal overflow. Cards use three desktop columns, two tablet columns and one mobile column. Clear quote/support/link hierarchy, restrained existing palette/cards, no added decorative complexity.
- Hero exact headline and problem statement are immediately readable. Filled challenge action and secondary work action are distinct and precede photograph on mobile. At 390 px primary CTA is visibly above fold; at 320×700 it reaches viewport bottom, acceptable with normal scrolling.
- Challenge actions target `/contact#contact-message`; mobile contact anchor places form heading near y183. Labels are Name, Email, optional Organization, Business challenge. The visitor does not have to identify a service.
- Work page now labels manufacturing Concept showcase and explicitly says proposed scope/no verified production adoption. Water Bear is explicitly isolated-development implementation with production/acceptance separate. Those statuses match reviewed evidence and avoid unsupported metrics.
- Both homepage published-project screenshots successfully lazy-load on hosted preview (`complete=true`, naturalWidth 559); manual screenshot shows GeVitals and Open Goal Soccer correctly. A local-only optimizer failure was not reproduced hosted and is not a product defect. No optimizer/infrastructure change recommended.
- No blocking visual/conversion issue remains. Nonblocking consideration: long homepage repeats recognition and service cards; retained intentionally to preserve established service paths and complete scope.

Evidence screenshots: `/tmp/hosted-positioning-desktop.png`, `tablet.png`, `mobile.png`, `narrow.png` (all with `hosted-positioning-` prefix), plus `hosted-positioning-mobile-hero.png`, `hosted-positioning-work-cards.png`, `hosted-positioning-contact-mobile.png`, `hosted-positioning-work-mobile.png`. This is visual/conversion approval, not a replacement for independent QA/form-delivery or SEO/accessibility signoff.
