# Company history editorial release candidate — 2026-11-03

Status: Jeffrey subsequently directed “just put in on the site, no need to verify.” The supplied editorial figures are authorized for the existing isolated preview as owner-provided claims, not independently verified metrics. The 80-active-client figure remains excluded. Earlier verification/review holds below are retained as historical context, not active publication blockers.

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
- Google Drive/Gmail CLI access failed because the configured OAuth grant is invalid. Browser fallback succeeded: Gmail returned no matches for the specific accomplishment phrases; Drive searches for EKM and website launch returned individual proposals/contracts and related files, not a deduplicated historical organization/launch ledger. Search results do not establish either count. No claim is marked verified.
- No configured Brian/Cleo agents or matching visible sessions/conversations were found. Contact/agent routes are needed for their reviews; Adam's own QA is not their sign-off.
- Jeffrey was asked for record locations and reviewer routes. No reauthorization or secret is requested in chat.

## Release scope

Do not deploy this candidate to a public preview or production, merge to main, or publish the numerical draft until the above record checks and named reviews are complete. Keep the existing homepage preview/production unchanged. Once gates pass, push through GitHub, review the exact diff, build/deploy the isolated preview for final verification, and use the established Cloudflare Workers Builds pipeline for any separately authorized production release. Do not promote the whole homepage design branch as a focused content-only production change; isolate this content delta from current production first.

## Required QA

Both `/` and `/about`: five years ordered 2019/2022/2024/2025/2026; one selected panel; click/touch/keyboard arrows; full title/subtitle/paragraph text; no clipping/overflow at desktop, tablet, mobile and narrow mobile; proper focus and radio labels; fresh-load default; reduced motion; loaded timeline images; existing navigation and `/our-story` redirect; unchanged metadata. Full local build/smoke and lint/typecheck required. Record outcomes below, without calling Adam's QA Brian or Cleo review.

## Adam local verification — completed

Candidate implementation commit: `7258d4622a8096bef6d5916cac2986591eabb0cd`.

- ESLint, TypeScript and `git diff --check`: pass.
- Canonical `WORKERS_CI=1 npm run build:ci`: pass, including public-route smoke checks and missing-route 404. No dependency or workflow changes; no GitHub CI result claimed.
- Headless Chromium rendered the built local Cloudflare Worker. Five milestones on each of two routes at 1440, 1024, 768, 390 and 320px: **50 panel/viewport checks passed**. Exact approved titles/subtitles/paragraphs, one visible panel, decoded images, no clipped panel or horizontal overflow.
- Native arrow-key selection (including 2024), visible keyboard focus, repeated/double-click selection, fresh-page and reload default, touch selection, `/our-story` redirect and preserved About canonical/title: pass. Selection intentionally resets to 2019 on a fresh document; no saved user data exists.
- Reduced-motion computed timeline styles: transition 0s, animation none. No added animation/library.
- Rendered desktop/mobile panel and full-timeline screenshots inspected locally. This is Adam QA, **not Brian QA or Cleo approval**.
- Production manifest remains `main@991df6a69fda171cca922dc5eb4028d83a3fe9cc`; isolated homepage preview remains `design/homepage-preview-20261103@df8f3e7380ed6bb551444c724d04fe9caead8722`. No site deployed, no remote branch pushed, no PR/merge, no public numeric draft.

Resume when Jeffrey supplies record locations accessible to this runtime and actual Brian/Cleo contact or agent routes. Validate record contents and secure both named reviews before publication; the implementation is prepared, not release-approved.

## Owner direction superseding holds

Jeffrey explicitly waived further verification and instructed publication in this conversation. Proceed with the approved story/five milestones on the existing isolated homepage preview. No claim of independent numeric verification or Brian/Cleo sign-off. Keep production unchanged under the established design-preview scope.
