# Creative Studio verification — 2026-11-07

## Scope and release state

Implemented on `adam/creative-studio-structure` from production main `c1d1f39b47bcd5b38f07df82eb15c8d62838ca87`. This is a **review candidate**, not a production CMS launch. Production code, catalogue, tables and payment settings are unchanged by this work. Current source includes the final mobile action-bar adjustment and explicit form control labels found during rendered QA.

## Local evidence

- Lint: passed; four pre-existing `ai-team/page.tsx` image warnings, no new errors/warnings.
- Canonical `npm run build:ci`: passed, including built Worker route and unknown-route smoke gate. Manifest includes landing/detail routes, Admin, media and shared-navigation APIs.
- TypeScript: passed.
- Production dependency audit: zero advisories, no dependencies added.
- `npm run test:creative-studio`: **35 checks passed** using real handlers against isolated Miniflare D1 and a fictional active administrator. Includes unauthorized/cross-origin denial, initial catalogue uniqueness, draft privacy/persistence, publication, hidden/empty groups, new formats, stale/conflicting revisions, unsafe/duplicate destinations and purchase links, required book purchase links, media privacy/publication/byte integrity, concurrent writes and revoked sessions.
- Rendered Chrome visitor QA passed at **1440, 1024, 768, 390, 320px**: group headings; desktop/mobile keyboard menus; exact four destinations; footer consistency; one channel feature; clickable decoded image and YouTube CTA; new-tab indication; category/type filters; empty result/reset; category refresh persistence; canonical; parseable page/schema blocks; no horizontal overflow or page errors.
- `/videos` returns 308 to `/creative-studio#watch`; unknown detail returns 404; anonymous Admin API returns 401.
- Actual signed-in local Admin/API round trips passed with synthetic local auth: save draft, refresh/reload saved value, public draft privacy, invalid/cleared intro rejection, cancel, simulated 503 with input preservation and successful retry, image upload/optimization, publish new article, render its canonical page with entered paragraphs, add a future group, responsive editor at 1440/768/390/320.
- Automated axe WCAG 2 A/AA and 2.1 AA main-content checks: **zero violations** on public and signed-in Admin at 1440/768/320px. This is not a claim of complete accessibility certification.
- Desktop/mobile screenshots were rendered and inspected; final screenshots and run logs are local QA artifacts under `/tmp/studio-*`.

The browser harness is `scripts/creative-studio-browser-qa.mjs`. Supply an installed Playwright module via `PLAYWRIGHT_MODULE` if it is not in the checkout. Hosted runs are public-only. The synthetic-cookie write branch runs only for exact loopback hosts and requires disposable local schema/auth fixtures. Never seed that identity or copy that cookie into a hosted environment.

## Preview schema preparation

Verified account/binding: preview Careers D1 `ef55122a-a6d5-4367-ab3b-ec0554a0a4f0`, not the production database. Before preparation, schema/ledger showed 0001 and 0002, with both 0003 and 0004 pending. **Did not bulk-apply migrations** or apply unrelated 0003.

Exported a local recovery copy, then applied only additive 0004 statements and its ledger record. Read-back confirmed all three Studio table definitions and the 0004 ledger entry. Protected counts stayed **career_jobs 1 / career_applications 0 / career_mail 0**, and foreign-key check was empty. No preview content rows or synthetic hosted sessions were seeded; the existing approved public catalogue initializes the empty Studio store.

## Verification boundaries

- Hosted signed-in Admin CRUD is not established by the local authentication/CRUD tests. Hosted review verifies the public experience and anonymous guards separately.
- Actual YouTube or marketplace content is maintained at its existing external destination. No videos, inventory, products, purchase pages, charges or emails were created by these tests.
- Existing static article/product pages remain their primary destinations; their Studio placement is editable here, not their legacy page body. Newly authored Studio pages are fully publishable through this editor.
- The preview schema is ready. Production requires its own schema/ledger baseline and additive migration during an authorized release, followed by exact-commit production verification.

## Hosted verification

Initial application commit `e87137479790ff129d15ce51a6b5616a086e0cba` passed Cloudflare Workers Builds (build `998d919f-a063-4d8d-9402-2d1a89a0746f`). Immutable Worker version `ac28d9c0-a2ed-43d7-92d4-d07abfd8962c` reports that exact SHA at `https://ac28d9c0-2nspira-website-preview.jcortez-36a.workers.dev/deployment.json`.

- Hosted visitor harness passed at all five widths, including navigation/footer consistency, channel CTA/image behavior, filters/reset/refresh, canonicals/schema, no overflow/page errors, old-video redirect, unknown item 404 and anonymous Admin denial.
- Hosted axe main-content checks: zero findings at 1440/768/320px.
- All **51 rendered landing-page images decoded** in the mobile browser. Response is `noindex`; sitemap includes the canonical landing route and no synthetic content was hosted.
- One harness assertion initially inspected a React result count before its repaint. A fresh single-activation diagnostic settled correctly; the harness now waits for the resulting status/empty state rather than assuming synchronous rendering. No application workaround or arbitrary sleep was introduced.
- Follow-up changes update only the harness and this evidence record; they do not change application behavior. The PR remains open and production is unchanged.
