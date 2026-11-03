# Company history editorial release candidate — 2026-11-03

Status: LOCAL REVIEW ONLY — NOT APPROVED FOR PUBLICATION.

## Scope

Jeffrey supplied approved editorial copy for Our Story and five milestones. Shared structured content lives in `src/content/company-history.ts`, consumed by the existing `/about` page and reusable homepage timeline. `/our-story` retains its permanent redirect to `/about`; existing page metadata and unrelated sections are preserved. No paid service, new package, or replacement timeline framework is needed: native grouped radios and the existing CSS component support the interaction.

Full copy is retained, including historical context, subtitles and paragraph boundaries. Existing licensed illustrative stock photographs are reused, not presented as historical business-event photographs. This is not the separate requested homepage minimalism/photography redesign.

## Publication gates — unresolved

- 2022: verify **more than 20 distinct organizations** through dated engagement/delivery records; deduplicate organizations and distinguish work performed after COVID from other engagements. A client-account count is not sufficient evidence.
- 2024: verify **100 actual website launches by 2024**, with distinct delivery/launch records. Do not count routine maintenance, updates or duplicate domains for the same launch.
- 2026: no active-client count is included. The suggested 80-client figure is deliberately excluded from application content. Verify the anniversary date if retaining the exact approved “more than seven years” wording; the year 2019 alone does not establish a precise anniversary.
- Brian: functional/accessibility/responsive QA on the frozen candidate.
- Cleo: visual consistency review on that same candidate.

## Evidence/access checked

- Local content and project docs contain historical EKM-to-2Nspira continuity, but no audited organization or launch ledger substantiating the new counts.
- Read-only Google Drive search for EKM and Gmail search for the specific accomplishment phrases failed because the configured OAuth grant is invalid. No business records were retrieved, so no claim is marked verified.
- No configured Brian/Cleo agents or matching visible sessions/conversations were found. Contact/agent routes are needed for their reviews; Adam's own QA is not their sign-off.
- Jeffrey was asked for record locations and reviewer routes. No reauthorization or secret is requested in chat.

## Release scope

Do not deploy this candidate to a public preview or production, merge to main, or publish the numerical draft until the above record checks and named reviews are complete. Keep the existing homepage preview/production unchanged. Once gates pass, push through GitHub, review the exact diff, build/deploy the isolated preview for final verification, and use the established Cloudflare Workers Builds pipeline for any separately authorized production release. Do not promote the whole homepage design branch as a focused content-only production change; isolate this content delta from current production first.

## Required QA

Both `/` and `/about`: five years ordered 2019/2022/2024/2025/2026; one selected panel; click/touch/keyboard arrows; full title/subtitle/paragraph text; no clipping/overflow at desktop, tablet, mobile and narrow mobile; proper focus and radio labels; fresh-load default; reduced motion; loaded timeline images; existing navigation and `/our-story` redirect; unchanged metadata. Full local build/smoke and lint/typecheck required. Record outcomes below, without calling Adam's QA Brian or Cleo review.
