# Audience expansion and navigation — 2026-11-10

## Scope and consolidation

Main navigation: Our Services / Our Work / Who We Serve / Demos / About Us / Contact Us, with the separate accent Book a Conversation button. Who We Serve is a keyboard/touch-operable dropdown with an overview link and visible audiences.

The existing site had overview entries, not dedicated audience routes. Reuse `business` for Small Businesses & Professional Services and `retail` for Retail & E-commerce. Add `startups` and `technology`; no duplicate Retail/Small Business cards or competing page addresses. Existing education, manufacturing and property overview entries and demo destinations remain. No other hidden audience is published.

Four stable routes are defined in `src/lib/audiences/routes.ts`. The page renderer, overview, navigation and sitemap use the same identity mapping and publication state. Metadata is generated from the Admin-controlled page title and description, including canonical, Open Graph and Twitter fields. Hidden and unknown routes return 404.

## Persistence and editing

Extend the existing audience JSON document and authenticated revision/idempotency/audit save contract. No new dependencies, tables, production D1 writes or schema migrations. `upgradeContent` enriches pre-expansion records on read; Retail/Small Business retain their existing IDs, while unrelated content, revision and ordering survive. After a page exists, Admin edits and visibility remain authoritative. Upgrade and preservation are tested against isolated legacy JSON.

Admin → Who We Serve → audience entry → Dedicated audience page edits SEO, headline, intro, challenge cards, linked services, advisory/implementation scopes, labeled examples and booking invitation. Addresses are fixed for link stability. An empty example list hides that section; all other required content and HTTPS/site-relative links are validated server-side. No raw HTML rendering. Duplicate clicks and retried operation IDs retain the existing safe-save contract. On content-store failure, global navigation/discovery fails closed rather than taking unrelated pages offline or resurrecting hidden records.

## Evidence boundaries

- Startups: CalmLoop is explicitly a 2Nspira internal project.
- Technology leaders: Northstar manufacturing is explicitly a fictional-organization interactive demo.
- Retail: 2Nspira Books is our own storefront; copy describes product presentation, not unverified omnichannel integrations.
- Professional services: GeVitals is an existing published website example from Work; copy does not claim deployed clinic intake/billing automation.
- External example URLs returned 200 during the review. All pages connect services to potential practical outcomes without measured-result claims.
- Senogara and AMUR client inclusion/artwork were explicitly supplied by Jeffrey. Carousel provenance is in the client carousel QA record.

## Local verification

- `npm run lint`: zero errors; four existing ai-team image warnings.
- `npm run build:ci`: compilation and built Worker smoke route/404 checks pass.
- `npx tsc --noEmit`: pass.
- `node scripts/audiences-test.mjs`: 36 isolated handler/D1 checks, including authorization, origin, nested link/required/SEO validation, idempotency, stale revisions, audit rollback, upgrade preservation and hidden-page publication filtering.
- `scripts/audience-pages-qa.mjs`: 358 rendered checks against the built Worker using synthetic local Admin/D1 records. Four routes at 1440/1024/768/390/320px, unique actual metadata and JSON-LD, no overflow, exact primary order, dropdown destinations, client assets/captions, unknown 404 and sitemap coverage. Admin load failure/retry, cancel/partial/clear validation, duplicate save, successful refresh persistence, public headline/SEO round trip, failed-save draft retention and retry, empty examples, visibility/404/sitemap, narrow editor layout and final fixture restoration.
- Screenshots inspected for desktop and mobile page layout. Hosted/production results are appended after their exact deployment markers match the reviewed commits.

Use `PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs` when Playwright is installed in the shared agent runtime rather than in this repository. The browser QA script performs authenticated writes only against localhost synthetic fixtures; hosted runs are read-only.
- Existing carousel regression: 141 checks pass, including reduced motion, keyboard scroll, pause/resume, no-JavaScript content and all 16 logos.
- Existing consulting/navigation regression: 94 checks pass, including submenus, Creative Studio nesting, page routes and footer links.
