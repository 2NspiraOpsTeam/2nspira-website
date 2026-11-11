# Creative Studio menu cleanup

Status: READY FOR QA (preview only; production release not authorized).
Repository: 2NspiraOpsTeam/2nspira-website
Branch: cleo/creative-studio-navigation-20261110
Starting SHA: 53aa3c23b6cd7bda51800cafa506a38c1a735b4b
Owner: Cleo; next owners: Brian (technical QA), Maya (product validation), Jeffrey (production release).

## Approved information architecture

Creative Studio stays under **About Us** on desktop and mobile. Its single disclosure contains only:

- Explore Creative Studio → `/studio`
- Watch → `/studio/watch` (channel image, description, direct `https://www.youtube.com/@2Nspira` link, and published video collection)
- Read → `/studio/read` (articles, resources, authored-book introductions; existing purchase links retained)
- Shop → `/shop` (our published books; rare and collectible books linking to `https://books.2nspira.com`; other creative products)

The footer consumes the exact same published list. No regex-generated menu nesting, hard-coded footer duplicates, individual product entries, or secondary Leadership Books / Bookstore / Creative Shop menu links.

## Admin and content safety

`/admin/creative-studio` → Navigation edits labels, destinations, order (Move up/down), and visibility for every menu entry, including the landing link. Existing Groups, Categories and Content workflows remain. Published-content filtering hides empty/hidden sections. Add a link to the existing Listen group when ready; new groups use their landing-page anchors without a developer-authored route. Navigation changes are revision-protected and do not become public when saving a draft.

Legacy navigation is upgraded once in memory to schema marker `navigationVersion: 2`, then retained on subsequent Admin saves. The upgrade does not write D1, copy products, publish item drafts, alter purchase URLs, or discard custom future groups. Listen and Play URLs remain available but are absent from the initial menu. Production and preview Studio content tables were inspected read-only: neither has a saved row at implementation time. The fallback seed erroneously published the retired Breadcrumb game; its status is now draft, consistent with issue #182's explicit retirement direction.

`/books`, `/shop/*`, `/videos`, `/studio/listen`, `/studio/play`, individual articles and existing product destinations remain. The old `/creative-studio` redirect remains. No new checkout, duplicate catalog, schema migration, DNS or production mutation. Shop reuses existing product arrays and external purchase destinations. Additional authored books are no longer accidentally excluded from Read after the first featured book.

## Validation

- Isolated D1/handler suite: 49 checks (auth, draft/publish, revision conflict, safe destinations, canonical identity, deduplication, empty/hidden sections, menu order/labels/visibility, future Listen, migration idempotence and draft preservation).
- TypeScript: passed after required article generation.
- ESLint: zero errors; four existing AI-team image warnings.
- Supported `npm run build:ci`: Vinext build and Worker smoke passed.
- Browser QA: `PLAYWRIGHT_MODULE=<installed playwright-core module> node scripts/creative-studio-menu-qa.mjs <base>` covers desktop/mobile menu parity, agreed nav location, footer, channel image/link, lazy video embeds, Read/Shop boundary, shop departments, legacy routes, overflow/runtime errors, anonymous Admin denial. Screenshots/results are output to `QA_OUTPUT` (default `/tmp/creative-studio-menu-qa`).

Hosted authenticated Admin writes are not claimed verified. Handler tests use a disposable local D1 and fictional identity/content; no remote Admin content is written by QA.

## Release / rollback

Only an isolated noindex Worker preview is deployed for review, without production routes. Release requires Jeffrey's exact-SHA authorization after Brian/Maya validation. Rollback is the prior known-good Worker version/source SHA; the change performs no production database migration or destructive data rewrite. Saved Admin drafts/items remain intact.
