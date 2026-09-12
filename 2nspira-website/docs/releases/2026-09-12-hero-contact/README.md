# Hero/contact release — final candidate

## Scope and provenance

- Full-site development base: `2eb2557d21a93857c80c6388aa5192a6d6b0fa72`.
- Production baseline snapshot: `04f1e62` (existing apex canonicals, production Worker routes, www middleware and favicon). All 36 pre-existing modified text files other than Wrangler were verified to contain only www-to-apex canonical-host substitutions. Original checkout left untouched.
- Maya source commit: `02300f7c9c1700fdcbce6aeb7ec8c9084df5c58b` on lean `main`. Do not deploy/cherry-pick its full page replacements.
- Removed homepage figure disclaimer and contact street address. Email, phone, functional contact form, existing headline (including its existing terminal period), site structure, content, SEO and routing retained.
- Image blocker resolved by Jeffrey on 2026-09-12: “Just use this same one and just remove the disclaimer.” The latest supplied whiteboard/advisory image visually matches the existing 1672 × 941 hero. Retain the existing optimized WebP and its layout; do not use either alternative AVIF. Homepage visible disclaimer removed, headline unchanged.

## Validation, 2026-09-12

- `npm ci --no-audit --no-fund`: passed.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build:vinext`: passed. Existing middleware-deprecation warning; no migration performed in this scoped release.
- `git diff --check`: passed.
- Built Worker tested with Wrangler locally: all 41 content URLs return 200, one H1 and correct production canonical each.
- All 25 blog posts preserved. Services, both individual services, resources and both resource detail pages verified.
- Main text compared against cache-busted live production: exact normalized match on all 41 pages after excluding only requested homepage disclaimer/contact address removals. Header/footer link lists identical.
- Sitemap: same 41 entries as live production. All 22 configured/in-app redirects and two unknown-page/post 404 checks passed. Robots responds 200 and allows public crawling.
- Invalid contact POST returns 422; no real inquiry sent.
- Live www-to-apex redirect preserves resource path and query, HTTP 301.
- Public bare-URL baseline: 41 of 43 probes returned 200. TWO PRE-EXISTING cached self-redirects: `/sitemap.xml` and `/post/the-great-ai-decentralization`. Both report CF cache HIT, HTTP 301 back to themselves; cache-busted requests serve the correct content. Both ordinary URLs were rechecked at 18:18 UTC and now return HTTP 200 (sitemap cache expired naturally). Reverify during launch; do not rely only on cache-busting.
- Active production Worker version before this work: `13ed31f4-04c5-42bb-acf0-22f9fbf9a23d` (2026-09-12 14:16:50 UTC). No Git SHA is recorded in that deployment. No deployment executed for this release.

## Remaining launch steps

1. Completed: verified latest supplied image against existing approved hero; retain same image per explicit follow-up.
2. Repeat relevant checks/build and asset rendering validation; commit final source; record full SHA.
3. Run supported `npm run deploy:vinext`; record Worker version and exact source SHA.
4. Resolve pre-existing cached redirects through supported Cloudflare cache management and verify ordinary, uncached and www URLs.
5. Verify all 41 pages, 25 posts, redirects, SEO, navigation, homepage asset and contact changes in production; record results against deployed SHA.

## Post-launch follow-up: repository divergence cleanup

Tracked as requested; do not replace production with lean `main` during launch.

- Establish one canonical full-site branch and checkout from the deployed release SHA.
- Reconcile/archive the lean branch through a reviewed PR; retain approved changes and full-site history.
- Align the default branch and deployment source so they cannot deploy the lean skeleton accidentally.
- Consolidate duplicate checkouts/documented entry points; retain recovery references before removing anything.
- Add an appropriate route/content inventory gate to the supported release validation.
- Acceptance: a single documented source/deploy path containing all 41 pages and 25 posts, no conflicting website codebases used for new changes.
