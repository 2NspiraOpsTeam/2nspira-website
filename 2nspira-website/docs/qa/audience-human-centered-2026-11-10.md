# Human-centered audience pages

## Scope
Four dedicated audience pages and their overview cards. No audience data, SEO, saved copy, visibility, order or route changes. Existing Admin text remains authoritative; longer explanations are progressively disclosed rather than deleted. Advisory versus implementation remains explicit before any disclosure.

## Design
- Tailored people-focused hero images with responsive 640/1280 WebP sources; eager hero and lazy overview loading; fixed aspect ratio and meaningful alt text.
- Concise hero and visible outcomes; expandable challenge prompts, service details and scope choices using native details/summary (keyboard and no-JavaScript compatible).
- Examples retain internal-project/demo/published-work classifications and limits. Booking actions remain visible.
- All four scenes are AI-generated illustrative imagery, not photographs of clients or engagements. Generated 2026-11-10 using the built-in image tool. Originals retained outside the repository; optimized project assets committed. No vendor/client logos in the generated imagery.

## Verification
- Canonical lint: zero errors, four pre-existing warnings on AI team page.
- `npm run build:ci`: pass, including built-Worker smoke checks.
- `npx tsc --noEmit`: pass.
- `scripts/audience-visual-qa.mjs`: 783 local checks passed across four pages and 1440/1024/768/390/320 widths, overview images, image decode, keyboard expand/collapse, refresh default, readable layout/overflow, booking links, reduced motion and no-JavaScript disclosure behavior. Visual desktop/tablet/mobile screenshots inspected.
- Local QA uses isolated local audience tables, not production client records. No schema or Admin mutation changes are part of this release; no live Admin write test performed.
- Release evidence is recorded on the PR after hosted validation.

## Navigation prerequisite
PR #222 (https://github.com/2NspiraOpsTeam/2nspira-website/pull/222), merge `52b38170dba10427df6e0d19303315e939d5c972`, changed only layout/header/mobile menu. Exact preview and production markers matched; direct navigation, keyboard activation, mobile close, refresh, active state and booking styling passed at five widths.
