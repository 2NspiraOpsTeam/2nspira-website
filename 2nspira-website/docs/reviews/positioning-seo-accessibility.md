# Positioning SEO and accessibility review

Reviewer: independent SEO/accessibility specialist. Date: 2026-10-26.
Scope: homepage, service entry points and introductions, work, contact; read-only implementation review. No routing, security, infrastructure, analytics, or public claims changed by reviewer. Applied installed `2nspira-website-validation/SKILL.md` and `SEO.md`.

## Baseline evidence

Cookie-free GETs with Twitterbot user agent against production `/`, `/services`, `/ai-enablement`, `/automation-systems-optimization`, `/websites`, `/fractional-cio`, `/work`, `/contact` all returned 200. On each: unique page title and description; route-correct canonical and `og:url`; description aligned with Open Graph description; exactly one H1 and `main#main-content`; every JSON-LD script parses as JSON. Production homepage H1 before implementation: “Technology that works the way your people do.” Homepage title before implementation: “2Nspira | AI Consulting, Technology & Business Coaching”.

Source baseline preserves a shared route-owned metadata helper (`src/lib/pageMetadata.ts`), Organization/WebSite graph in root layout, per-service structured data, existing sitemap routes and robots. Homepage has explicit social metadata, so editing root layout alone would not change its social copy.

Existing accessibility foundations: document `lang=en`, global visible keyboard focus styles, skip-to-main link, labeled navigation, desktop disclosure buttons with `aria-expanded`, Escape closure and focus restoration; mobile dialog with Tab containment and return focus; reduced-motion rules; responsive WebP hero image with `sizes`, dimensions/aspect-ratio and high fetch priority. No new image payload or animation is necessary for this task.

## Implementation source review

- Homepage now has one H1 with approved problem-first headline; `Sound Familiar?` is an H2 immediately after hero, and six article cards use H3 titles and distinct descriptive link labels.
- Card destinations reuse established routes; three anchors (`systems-integration`, `data-analytics`, `workflow-automation`) are defined on the existing automation page. No unnecessary new service URLs.
- Homepage title, description, Open Graph and Twitter descriptions now align with practical business problems and outcomes. Canonical/social URL unchanged.
- Approach steps became H3 headings under “How We Work”; sensible hierarchy.
- Contact retains native labels/required fields, API submission contract and existing status feedback. Added organization help-text association; challenge hint remains associated. Unsupported Ctrl+Enter hint removed instead of claiming an unimplemented shortcut.
- Desktop Work `aria-current` preexisting bug fixed: now compares against `/work`, not `/websites`.
- No dependency, global-style, sitemap, redirect, schema-architecture or configuration changes required.

## Bounded findings

1. **Fixed in source:** Work link announced current page on `/websites` rather than `/work` (`Header.tsx`). Independently recheck rendered navigation.
2. **Preservation recommendation:** retain self-canonicals/production social URLs on preview, but make preview itself non-indexable using HTTP X-Robots-Tag or page robots. Never point production canonical at preview.
3. **Scope note:** existing `/work` description says “measurable impact.” Do not add numeric outcomes or new schema claims without verified source evidence. Existing content is not proof of financial or performance results.

## Pending release gate

Rendered candidate head/body, keyboard/focus/mobile navigation, contrast, internal fragment targets, image loading, preview non-indexability, and final production retrieval still require independent deployed-preview verification. This source review is not a WCAG-conformance or search-indexing claim. No Google Search Console/Business Profile actions performed.

## Hosted preview independent disposition — PASS

Candidate: `https://2nspira-website-preview.jcortez-36a.workers.dev`, served `X-Deployment-Commit: 9d5aff94192f8d69f0f8ff7a79adf0d282f95cb9`. Read-only Playwright/Chrome browser checks against nine routes (the eight baseline routes plus `/about`):

- All return 200; one H1 each; route-owned titles/descriptions; canonical stays on the correct production route; rendered description, OG description and Twitter description agree on every route. New homepage title and approved hero wording are present. Work metadata now avoids the baseline “measurable impact” claim and distinguishes projects/showcases.
- Every JSON-LD block parses; no completed image has zero natural width. This is functional image-loading evidence, not a timed performance score or comprehensive offscreen asset audit.
- Preview response has `X-Robots-Tag: noindex, nofollow`; its robots.txt is `User-agent: * / Disallow: /`. Correct production canonicals remain intact. This verifies review indexing restrictions, not production search indexing.
- Contact inputs/textarea all have native labels. Organization and business-challenge hints resolve through `aria-describedby`.
- All six problem links and the service-overview link measure 44px tall. Descriptive text identifies each destination. Homepage has no horizontal overflow at 390, 768 or 1440px (document scroll width equals viewport width).
- Keyboard: first Tab reaches skip link, visible at top 0 with 2px accent outline after its transition. Enter then Tab advances directly to the main primary CTA, bypassing header navigation. Desktop Services opens by Enter; Escape closes and returns focus to Services. Mobile menu focuses Close menu when opened; Escape returns focus to Open menu.
- Calculated WCAG contrast from established opaque brand tokens: accent `#4a6fa5` on white 5.11:1; accent on canvas `#fafaf9` 4.89:1; muted `#596575` on canvas 5.67:1; body `#46505f` 7.81:1; headings `#1f2430` 14.86:1. New card text uses these existing passing pairs.

No SEO/accessibility release-blocking defect identified in this bounded review. No routing/indexing/schema/global-style regression detected. Not a comprehensive WCAG conformance certification, measured Core Web Vitals result, or guarantee of search indexing. Final production retrieval remains a post-promotion gate owned by Adam.
