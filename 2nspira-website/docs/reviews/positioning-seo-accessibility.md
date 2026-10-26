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
