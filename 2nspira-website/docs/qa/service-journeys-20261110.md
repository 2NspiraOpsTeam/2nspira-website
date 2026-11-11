# Five-service customer journey implementation

November 10, 2026. Review scope only: production merge/deployment is not authorized.

## Review structure

This branch combines PR #225's website-first implementation, PR #226's audit, and the audit implementation so Jeffrey can review a coherent final experience. The existing PRs remain unmerged. Merge only the combined implementation PR after approval; do not separately merge overlapping changes without checking the comparison.

## Recommendation disposition

- Websites: preserve the approved website-first hero, published client examples and two offers; add a scoped launch/handover checklist and contextual audience/human delivery links.
- Automation: consistent Business Automation & Integrations title (short navigation Automation & Integrations), explicit workflow/permissions/testing/monitoring/ownership outputs; fictional trigger/record/approval/failure/retry/handover walkthrough. No live connector claims. Move platform logos below needs, scope and proof.
- AI: show readiness/adoption/pilot starting points before the framework; link audience and human delivery; move logos later; make personal assistance a secondary native disclosure.
- Advisory: canonical title in landing eyebrow, engagement authority/cadence/boundaries, inspectable illustrative decision-brief template, human profile and audience links. Remove the unrelated manufacturing promotional block from this page.
- Managed Support: dedicated `/managed-services-support`, sitemap, header/mobile/footer/homepage/Services discovery, conditional suitability review, scoped coverage, onboarding, request-to-verification process, reporting template, boundaries and contact selection. No takeover promise, SLA, 24/7 support or commercial commitment invented.
- Inquiries: all five services (plus website/platform distinction), URL prefill, non-sensitive service prompts and preservation of existing drafts. Existing public API accepts the selected service through its established project-type field; no new delivery integration.
- Homepage/resources: remove duplicated next-step cards while retaining the AI readiness link; label resident reviews as client context, not 2Nspira testimonials, and disclose them optionally; replace current resource coaching labels with role-fit/self-reflection terminology. Historical articles preserved.
- Genuine client outcomes, additional client artifacts, independently verified credentials and support commercial terms remain evidence/business dependencies, not manufactured implementation deliverables.

## Preview blocker repair

Confirmed preview database lacked both Team & Delivery tables and migration 0003; migrations 0001, 0002, 0004–0006 were present. Production page worked. Backed up preview database, applied only existing additive 0003, inserted only the already-published Team content into the previously absent preview row and reconciled its migration ledger. No drafts, applicant records, client records, authentication data or portrait blobs copied. Already-public portrait URLs retain the production content owner. Foreign-key check returned no errors. Preview Team & Delivery returned HTTP 200 after repair. No production database writes or schema changes.

Rollback: remove the new preview Team row/tables and migration ledger entry only after checking for subsequent edits; pre-change preview export retained locally. Never restore the entire database over concurrent activity.

## Verification

- Canonical lint: zero errors; four pre-existing AI-team image/disable warnings.
- Canonical vinext build and built-Worker route smoke: passed. TypeScript: passed.
- Production dependency audit: zero vulnerabilities.
- 39 isolated Team handler/D1 checks passed.
- 767 rendered service-journey checks passed locally at 1440/768/390/320: five service routes, shared discovery routes, images, parsed JSON-LD, overflow, contextual links, keyboard disclosures, service-menu layout/activation, integration simulation states and inquiry prefills/refresh.
- Visually inspected rendered support mobile and automation desktop screenshots; further exact-head hosted QA recorded on the implementation PR.
- Image artifact staging: all 280 source public images matched built artifact SHA-256. This app has no separate guarded rendition namespace.
- Form delivery outcomes are simulated; no live email or booking is sent as part of QA. No measured conversion/customer comprehension, full WCAG certification, external connector operation, authenticated portal QA or production verification claimed.

## Authorized production refinement — November 10

Jeffrey approved production publication and requested engaging sections, restrained effects and less visible text. Reused the installed Lucide icons, Reveal progressive enhancement and native disclosures; no new dependency or animation framework. All five service journeys now expose three visual routes to audience fit, evidence and human delivery; contract details remain accessible in a disclosure. Website offering lists and case scope, plus AI capability/roadmap detail, are collapsed by default. Support gains visual coverage cards and numbered steps. Inquiry behavior and published-evidence boundaries remain unchanged. Motion honors reduced-motion preference and content remains server-rendered without JavaScript.
