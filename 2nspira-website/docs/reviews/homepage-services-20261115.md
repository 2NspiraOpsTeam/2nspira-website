# Homepage service communication and SEO — 2026-11-15

## Review
Live baseline reproduced: the hero named websites and digital platforms but not organizational AI enablement. Four website examples preceded service discovery. The Websites card linked to custom software as a secondary path despite a separate software card; “More Services” implied additional core categories.

## Changes
- Hero names websites, custom software and practical team AI adoption, with a service-section anchor alongside the primary contact action.
- Service cards precede website portfolio evidence; all three have equal visual weight and specific business benefits.
- Advisory and maintenance support the three core services; portfolio evidence and its accurate classifications are preserved.
- Closing invitation supports improvements/adoption as well as new builds.
- Homepage title: Website Design, Custom Software & AI Enablement | 2Nspira.
- Benefit-led description is synchronized with Open Graph, Twitter and WebPage JSON-LD. Existing canonical and three-service ItemList are retained and verified. Existing native components/design primitives suffice; no library, paid platform or custom SEO framework is needed.

## Verification
Base: 14e2ae59. Lint: zero errors, four pre-existing ai-team warnings. Canonical build:ci and built-Worker route/404 smoke passed. tsc --noEmit passed. npm audit --omit=dev: zero vulnerabilities.
Rendered local built Worker at 320/390/768/1440: one H1, correct metadata/canonical, parseable JSON-LD and three Service items, service section before portfolio, no horizontal overflow or page exceptions. All three service links activated with keyboard, destination loaded and refreshed successfully at every width. Reduced-motion hero visible. Desktop service section and 320px hero screenshots inspected.
Live baseline checked across five routes at four widths: 20 returned 200 without overflow/broken loaded images. This is baseline evidence, not verification that the new wording is in production.
No form logic changed; no live submissions sent. No measured ranking, conversion, field performance or indexing improvement claimed. Release remains separate from review.
