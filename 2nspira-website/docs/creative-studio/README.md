# Creative Studio

## Editorial structure

- `/studio` is the shared landing page. Watch, Read and Play are the initial Admin-managed groups. Shop is not a Studio category. Add another group in Admin when approved content is ready.
- Watch starts with **one Channel record**, linking to the existing verified `https://www.youtube.com/@2Nspira`. Its branded image, description and URL are editable. Images and the Explore Our Videos button link to the channel in a new tab. `/videos` retains its established collection, metadata and opt-in embeds; the Studio Watch section highlights one channel without duplicating individual videos.
- A category can belong to multiple groups. An item can belong to multiple categories. Items are stored once; collections reference that record. Empty, hidden and draft-only collections do not appear in navigation, filters, or group sections.
- Desktop, mobile and footer consume one navigation projection. Labels follow group/category names unless explicitly overridden. “Explore Creative Studio” is always available. Custom navigation is scoped to populated visible groups/categories.
- Existing articles keep `/post/:slug`. The leadership book retains `/books` and its direct purchase link. Existing marketplace product URLs and the rare-book store stay authoritative; no inventory, checkout, billing or payment configuration is copied or changed.
- New in-site content gets one `/creative-studio/:id` page. The ID is permanent. A category assignment does not create another page. Visiting an item ID that already has an existing destination redirects to that destination rather than rendering a duplicate.
- Published internal primary URLs cannot be silently changed. Duplicate normalized primary destinations and duplicate direct purchase listings are rejected. Books require a direct purchase URL. Alternate shortened marketplace URLs cannot be automatically identified as the same remote listing; reuse the existing record rather than entering an alias.

## Admin workflow

Open **Admin → Creative Studio** (`/admin/creative-studio`). Existing active administrator authentication is required for draft reads, writes and image uploads; client sessions do not grant access.

1. **Groups:** add, rename, describe, move, hide or remove groups. A group with assignments cannot be removed until its references are reassigned. Hiding is reversible.
2. **Categories:** add, rename, move and hide categories; select all relevant groups. Remove only after reassigning its content/navigation references.
3. **Content:** search records; edit metadata, type, categories, featured status, image/alt text and publication state. Upload an image or supply an HTTPS/site path. Uploads are optimized to WebP, at most 1600px and 512KB; source files are capped at 10MB. Uploaded media stays private until referenced by visible published content.
4. To add a new article/book overview, leave **existing primary URL** empty and enter full content as blank-line-separated paragraphs. A book needs its purchase URL. To add a product/channel/playlist that already exists elsewhere, use its existing URL. Existing destination pages are not edited/unpublished by changing their Studio placement.
5. **Navigation:** add, rename, move, hide/remove links; select a group or category destination. Leave label blank to inherit the current destination name. Keep the list concise (maximum 12 configured entries).
6. **Preview draft**, then **Save draft** or **Publish changes**. Draft saving never changes the published snapshot. Item publication state plus Publish changes controls what becomes visible. The first three featured items per group follow content order; the first featured Channel in a group has a dedicated wide feature. Future channels/playlists remain browsable in collections.
7. **Cancel changes** reloads the saved draft after confirmation. Unsaved navigation/refresh warns before leaving. Failed requests preserve form input. Conflicting editors receive 409 and must reload; a ref lock and disabled controls prevent double submission. An uncertain retry cannot silently overwrite a newer revision.

Existing public catalogue data initializes an empty store. Once a version is published, its snapshot is authoritative. D1 errors fail closed instead of resurrecting previously hidden content. The navigation provider refreshes on route changes, window focus and every 60 seconds so the persistent app shell does not indefinitely retain old menus.

## Storage and recovery

Additive migration: `migrations/careers/0004_creative_studio.sql`, using the existing website `CAREERS_DB` binding. New tables only:

- `creative_studio_content`: singleton, revision-checked draft and publication snapshots.
- `creative_studio_history`: immutable revision snapshots and publishing actor/time, written in the same D1 batch.
- `creative_studio_images`: private uploaded WebP bytes, with publication-qualified serving.

No migrations against `CAREERS_AUTH_DB`; that binding only performs the existing fixed session SELECT. No applicant/portal/commerce rows are changed. Never bulk-apply unrelated pending migrations. Before release, inspect the target schema and ledger, export a recovery copy, apply only this migration where absent, record the ledger entry, and compare protected counts/foreign keys. Production schema preparation and production release are separate from preview verification.

To recover an earlier editorial revision, an authorized operator can retrieve a historical snapshot into the draft with the **current** revision, review it and publish through the same validation/optimistic-lock path. Do not overwrite the singleton directly or restore an entire shared database over concurrent application data. History is recovery evidence; a self-service restore control is not part of this release.

## Validation

`node scripts/creative-studio-test.mjs` runs the real handlers with isolated Miniflare D1 and synthetic authentication, including drafts, publishing, public filtering, channel updates, duplicate/unsafe destination rejection, image publication guards/bytes, revoked sessions and concurrent writes. No production writes or email sends.

Canonical project validation: `npm run lint`, `npm run build:ci`, `npx tsc --noEmit`; production dependency audit. Rendered browser evidence and environment-specific verification belong in `QA.md`.

## November 7 owner update (#182)

- `/creative-studio` permanently redirects to `/studio`, preserving category queries and browser fragments. Existing item URLs remain canonical at `/creative-studio/:id`; no duplicate detail pages are created.
- Homepage includes a compact showcase below consulting/services content. Desktop and mobile have a direct Studio hub link plus separate collection disclosure controls.
- Published book and activity purchase URLs are reused from the existing catalogue; no storefront, checkout, pricing or inventory is added.
- Breadcrumb remains an **unpublished draft**. The November 4 retirement evidence records it offline; no game launch URL is invented or unpaused. Owner confirmation of the intended live destination is needed before publication.
- Rare-book store placement is retained as a draft, not presented as a confirmed Etsy/Amazon product listing. The legacy site/store routes are untouched.
- Signal vs. Noise writing remains in existing article records. A separate newsletter destination has not been confirmed; no newsletter URL is invented.
- This updates the existing PR/branch, not a parallel Studio implementation. Earlier hosted QA below pertains to the superseded Watch/Read/Shop candidate.
