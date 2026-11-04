# WCAG 2.2 Level AA sampled review — 2026-11-04

This is an engineering audit, not a conformance certificate or legal opinion. No blanket claim of WCAG compliance is supported by these checks.

## Scope and method

60 successful rendered axe scans across 20 distinct live public routes at 1440, 768 and 390px. Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa. Three initially guessed nonexistent paths returned 404 and were excluded; sitemap-discovered routes replaced them. No pass count includes those 404s.

- 2Nspira: /, /services, /ai-enablement, /websites, /contact, /careers, /post/building-ai-team-multi-agent-workflow-lessons (21 scans).
- Teams: /, /contact, /properties, /properties/1365-1st-ave, /retail, /rent-with-us, /tenant-services (21 scans).
- GeVitals: /, /en, /contacto, /en/contacto, /consulta-inicial, /en/consulta-inicial (18 scans).

Manual browser checks: home-page keyboard skip links, focus visibility, mobile menu opening/dismissal, 2Nspira modal focus containment, Escape focus restoration, 320px text spacing/reflow, reduced-motion video state and document languages. Verified skip-link navigation by pressing Tab after activation: next focus landed inside main on all three sites (activeElement can transiently be BODY after native fragment navigation, which is not by itself a broken skip link). Contact-page and notification-form validation/feedback checks are recorded separately.

## Findings

### 2Nspira

AI service CTA eyebrow text was 3.07:1 against its blended background: fails 1.4.3 minimum contrast. Scoped fix uses opaque white behind ink text. Fixed built Worker and live production both passed the same axe tags; 320px screenshot inspected. No other automatic violations on sampled 2Nspira routes. This is not proof that untested criteria pass.

### Teams Management

No automatic violations on sampled routes. Manual 320px text-spacing test reproduced clipped long words in the homepage hero heading (notably properties/management). Screenshot confirms visible text loss; review against 1.4.12 Text Spacing. Recommended fix: permit long-word wrapping or adjust the minimum responsive display size, preserving heading structure and visual identity; retest at 320px with line-height 1.5, letter-spacing .12em, word-spacing .16em and paragraph spacing 2em. This issue remains unfixed in this audit. Homepage reduced-motion videos were not playing; native skip link correctly bypassed navigation.

### GeVitals

No automatic violations on sampled Spanish/English routes. Spanish root lang=es; visible native skip link “Ir al contenido principal” reached main. No text-spacing overflow in the sampled homepage check; reduced-motion videos were paused. Existing pause/resume controls are present. Video captions/transcripts and screen-reader treatment of all bilingual content were not verified.

## Remaining conformance work

Automated incomplete results (notably image/background contrast) need human review. Full VoiceOver/NVDA testing, all video captions/audio descriptions, 200% text resizing, all keyboard journeys, complete third-party processes, PDFs, protected Admin/tenant/client screens, authentication and payments were not comprehensively assessed. Teams' reproduced text-spacing defect blocks a full pass claim; lack of detected issues on other samples does not establish site-wide conformance. No real contact messages, bookings, payments or client records were created by this accessibility audit.
