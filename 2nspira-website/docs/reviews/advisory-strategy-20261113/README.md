# Technology Advisory: strategic imagery and section engagement

Requested by Jeffrey, November 13, 2026: replace people imagery with the previous chess pieces and strong strategy imagery; add tasteful effects and engaging sections.

## Scope

- Restored the existing black/white chess knights as the hero, ahead of the eight executive lenses so the visual and primary action are immediately discoverable.
- Replaced the leadership-gap illustration with existing people-free infrastructure photography, and the strategy-wall illustration with a bridge connecting two shores.
- Replaced the partner portrait with a decorative compass; retained Jeffrey's named biography, featured-partner wording and biography link. This page now contains three people-free photographs; other pages and shared assets remain unchanged.
- Icon-led advisory cards, subtle border/hover treatment, a connected process sequence, numbered outcomes and restrained compass hover rotation. Existing Reveal/CatalogEffects supply one-time entrance motion, not a new dependency.
- All core offerings, authority/scope boundaries, eight-lens carousel controls, working-document disclosure, booking and contact handoff preserved.
- CSS is page-scoped. No dependencies, database, secrets, backend or deployment configuration changes.

## Image provenance

- Chess: existing `/images/audiences/advisory-strategy-1280.webp`; original source recorded in `docs/qa/service-industry-imagery-2026-11-10.md`/commit `166f074f`: https://images.unsplash.com/photo-1586165368502-1bad197a6461 . Reused bytes unchanged.
- Infrastructure: existing `/images/audiences/technology-infrastructure-1280.webp`, reused bytes unchanged.
- Bridge: https://images.unsplash.com/photo-1501594907352-04cda38ebc29, downloaded November 13, 2026 as optimized 1280×720 WebP. Unsplash standard license: https://unsplash.com/license . Illustrative strategy metaphor, not a client project or claimed engagement.
- Compass: existing lucide-react icon, code-native decoration.

## Validation

- Canonical `npm run build:ci`: vinext build, representative built-Worker route smoke and missing-route 404 passed.
- `npm run lint`: zero errors; four unchanged pre-existing `ai-team/page.tsx` warnings.
- `npx tsc --noEmit`: passed.
- Final local browser suite: **101 checks passed**, including zero automated axe findings at all four widths.
- Browser script: `scripts/advisory-strategy-qa.mjs`; widths 1440, 768, 390 and 320; local built Worker, isolated existing QA D1 fixtures. Three decoded photographs, no former people images, no overflow, section anchors, keyboard disclosure open/close, Fractional CIO offering, retained partner link, carousel pause/next, service-specific contact handoff, refresh persistence and browser exceptions checked.
- Reduced-motion and JavaScript-disabled modes checked separately. No email, booking, payment or AI request sent. Form/backend error and submission states were not retested because this change does not alter a form or backend.
- Initial QA harness needed to await contact hydration before inspecting its selection, and await entrance-animation settlement before contrast scanning. Those initial assertions failed; final results describe subsequent settled runs, not those attempts.
- Automated accessibility checks are not certification. Field performance/conversion and authenticated workflows not verified.

## Review evidence

Local before/after renders are included alongside this file. Hosted exact-commit preview evidence and the final check count are recorded on the PR. Production remains unchanged by this review branch.
