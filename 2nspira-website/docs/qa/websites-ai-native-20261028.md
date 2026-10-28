# Website services: AI-native positioning and capability showcase

## Scope and source

- Requested by Jeffrey on 2026-10-28: showcase booking/calendar integration, bookstore ecommerce, analytics, backend operations, and multilingual experiences across Teams Management, 2Nspira, and GeVitals; make AI-native development central.
- Base: `27142cb0750fba26de48314f28a97fdd33ed664a` (`origin/main`). Isolated branch `feat/websites-ai-native-20261028`.
- Only `/websites` presentation/metadata and four public screenshots change. No auth, database, payment, DNS, mail, scheduling, or backend changes.
- Uses existing shared service components, native disclosures, and the existing Google booking destination. No new library or demo platform.

## Content integrity

- Four freshly captured anonymous public-facing screenshots, 1440×1000: GeVitals, Teams stable preview, 2Nspira home, and bookstore preview. No authenticated pages, tenant/client records, orders, analytics values, or private information captured.
- GeVitals: public bilingual service website and language switch, migration/publishing scope retained from existing approved portfolio.
- Teams: public preview verified HTTP 200. Property/tenant/maintenance/analytics capability wording corroborated against existing Teams source; no production launch or public Admin demo claimed.
- 2Nspira: current shared booking link retained; client portal, service management and reminders described without exposing private records or suggesting booking automatically provisions clients.
- Books: current public preview verified HTTP 200; captured storefront says direct checkout coming soon. Stripe/PayPal test/sandbox development explicitly distinguished from live collectible purchasing. No live purchase or payment exercised by this change.
- No invented testimonials, performance improvements, conversion metrics, traffic, AI features, certifications, or ranking claims.
- AI-native describes development practice, not a claim that all projects contain AI features. Human responsibility and verification remain explicit.

## Verification

- `npm ci --no-audit --no-fund`: passed; manifests unchanged.
- `npm run lint`: passed.
- `npm run build:ci`: passed including Worker smoke gate and missing-route 404.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed.
- Public project URLs, related service links, and existing Google booking destination returned HTTP 200.
- Browser harness retained outside the repository in workspace artifacts. It checks 1440, 768, 390, and 320px widths; project/capability counts, loaded images, horizontal overflow, native disclosure first-click/open/close and keyboard behavior, FAQ, fragment links, unchanged booking attributes, metadata/JSON-LD parsing, page errors, refresh, reduced motion, and no-JavaScript disclosure/content access.
- Local built Worker needs `X-Forwarded-Proto: https` in this checkout's development harness to avoid the existing canonical-origin self-redirect. Production middleware was not changed.
- Loading/empty/backend-error/duplicate-submit form states are not applicable: this change adds no form, asynchronous data, or mutation. Existing booking is an external link; no appointment, request, email, order, or payment was submitted.

## Release evidence

Local browser harness: all four widths passed, zero page errors, all eight screenshot instances loaded, no overflow. Mouse and keyboard disclosures, anchors, metadata/schema, refresh, reduced-motion run, and no-JavaScript content/disclosures passed. Rendered desktop/tablet/mobile screenshots reviewed.

Preview and production verification follow the Git-driven release; local checks are not a deployment claim.
