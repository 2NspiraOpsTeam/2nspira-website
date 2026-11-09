# Studio collections and public-page engagement

## Owner direction

The Studio overview is `/studio`, with dedicated `/studio/watch`, `/studio/listen`, `/studio/read`, and `/studio/play` pages. The shared header, mobile menu, footer, and collection navigation use this exact order:

1. Explore Creative Studio
2. Watch
3. Listen
4. Read
5. Play

Watch contains visual stories and leadership/AI perspectives. Listen is Music & Ambience, using the existing verified public soundscapes. Read features the leadership book and published insights/resources. Play features Breadcrumb, coloring/activity books, and existing Amazon/Etsy destinations. No private YouTube upload is made public and no new purchase/checkout flow is introduced.

## Implementation boundaries

- Existing CatalogEffects and lucide-react are reused; no animation dependency is added. Editorial accents are opt-in to the affected pages. Content stays visible without JavaScript, and decorative motion honors reduced-motion preferences.
- The automation, websites, AI enablement, and team pages gain clearer sections/shortcuts, process badges, and optional detail disclosures. Team biography text and stored records are preserved.
- The Studio landing is an overview rather than a full catalog. Read and Play show nine catalog entries initially; a native disclosure makes all remaining entries available without JS. Category/type filters preserve the existing category refresh behavior and offer empty/clear states.
- `studioVideoIds` uses publication-filtered CMS items and categories. Hiding a known video/category must not cause the static video catalog to re-expose it on a dedicated Studio media page. `/videos` retains the full existing public video collection.
- Group links now target dedicated routes. Old `/studio#watch` etc. still have overview anchors, and old category query URLs redirect to the appropriate collection. `/videos` and existing item/purchase destinations remain supported.
- No production schema migration is needed. Read-only checks on 2026-11-08 found no persisted Studio content row in production or preview, so the updated seed applies without rewriting CMS data.

## Breadcrumb

The working destination is `https://breadcrumb-challenge.vercel.app/`. A fresh run progressed through stage one to stage two, survived refresh, and showed no page errors/overflow at 1440px and 390px. An existing saved run also resumed successfully. This does not establish completion of the full ten-stage game. `breadcrumb.2nspira.com` DNS recovery is separate; no DNS change is part of this update.

## Verification

- Canonical gates: `npm run lint`, `npm run build:ci`, `npx tsc --noEmit`, `npm audit --omit=dev`.
- Handler/data tests: `npm run test:creative-studio` and `npm run test:team-delivery` use isolated synthetic data, not production writes.
- `scripts/page-engagement-browser-qa.mjs`: ten affected public routes at 1440, 768, 390, and 320px, image readiness, overflow, native keyboard disclosures, no-JS readability, reduced motion, and main-content axe scans. Axe runs with reduced motion to avoid transient decorative fade contrast readings; automated scans are not full accessibility certification.
- `scripts/studio-collections-browser-qa.mjs`: overview navigation, separate Watch/Listen video counts, click-to-load embed creation, category/type filters, empty/clear/refresh, show-more, no-JS disclosure, direct marketplace/game hrefs, header/footer order, canonical/schema/sitemap, old category redirects, unknown-route 404, and anonymous Admin denial.
- Browser scripts accept `PLAYWRIGHT_MODULE` for an existing local installation; the engagement script accepts `AXE_PATH`. No new browser dependencies are added to the application.
- Local Team & Delivery rendering uses the existing checked-in public fixture seeded into local D1. This is not proof of hosted CMS write behavior.
- A build clears its dist-local D1 state: seed local fixtures after the last build, or pass an explicit external persistence path consistently. Stop the owned dev Worker before rebuilding so browser tests never inspect overwritten hashed assets.
- Hosted review must match the final commit via `/deployment.json`. Production release, if authorized, uses the normal merge/Workers Builds pipeline and requires separate live marker and rendered verification.
