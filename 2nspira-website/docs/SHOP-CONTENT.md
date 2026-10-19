# Shop content and purchase links

Owner-approved structure (2026-10-16): Books stays separate under Ideas at `/books`. Shop is a second Ideas link at `/shop`, showcasing eleven Etsy products and two Amazon coloring paperbacks in three product-type collections: `/shop/printables-games`, `/shop/coloring-books`, and `/shop/art-prints`. Leadership Books remains separate; coloring books belong only in Shop. The Cozy Elf Workshop was added following the owner's request to include the newly published listing.

## Content sources

Product titles use concise display titles based on the owner's requests and published listings. Short descriptions and format details were checked in a normal browser on 2026-10-16 (original seven listings) and 2026-10-17 (four values-inspired art downloads). All eleven listings belong to 2Nspira and expose purchase controls. Images in `public/images/shop` are downloaded actual first listing images (1080 pixels wide; Little Harvest Table and Christmas Gathering Bundle are 1080 × 914; the four values-art mockups are 1080 × 810; the other Etsy images are square), not generated substitutes. They are hosted locally so page rendering does not depend on Etsy image hotlinks.

| Product | Exact purchase link | Source listing image |
|---|---|---|
| Christmas Gathering Bundle | https://2nspira.etsy.com/listing/4597140476 | https://i.etsystatic.com/63788734/r/il/321a98/8691694066/il_1080xN.8691694066_p2wv.jpg |
| Little Harvest Table — Thanksgiving Kids Table Kit | https://2nspira.etsy.com/listing/4597118917 | https://i.etsystatic.com/63788734/r/il/cf594d/8739498723/il_1080xN.8739498723_jw2z.jpg |
| The Cozy Elf Workshop — 16 Christmas Activities | https://2nspira.etsy.com/listing/4596685843 | https://i.etsystatic.com/63788734/r/il/145717/8688068576/il_1080xN.8688068576_dka3.jpg |
| Thanksgiving Family Games — 8 Activities | https://2nspira.etsy.com/listing/4596133102 | https://i.etsystatic.com/63788734/r/il/97d737/8686225150/il_1080xN.8686225150_s8ad.jpg |
| Christmas Family Games — 8 Cooperative Challenges | https://2nspira.etsy.com/listing/4596463691 | https://i.etsystatic.com/63788734/r/il/289c0f/8734034937/il_1080xN.8734034937_hvfh.jpg |
| Cocoa Club — Winter Café Coloring Pages | https://2nspira.etsy.com/listing/4595228205 | https://i.etsystatic.com/63788734/r/il/639cd4/8686227648/il_1080xN.8686227648_amwo.jpg |
| Build the bridge — Collaboration | https://2nspira.etsy.com/listing/4597328332 | https://i.etsystatic.com/63788734/r/il/b7311a/8741167611/il_1080xN.8741167611_8gud.jpg |
| Leave room — Belonging | https://2nspira.etsy.com/listing/4597329048 | https://i.etsystatic.com/63788734/r/il/d48439/8741175291/il_1080xN.8741175291_hvoc.jpg |
| Own the next step — Accountability | https://2nspira.etsy.com/listing/4597329372 | https://i.etsystatic.com/63788734/r/il/17f764/8693362684/il_1080xN.8693362684_qhos.jpg |
| Help others rise — Empowerment | https://2nspira.etsy.com/listing/4597308883 | https://i.etsystatic.com/63788734/r/il/26e442/8741183129/il_1080xN.8741183129_4v3t.jpg |
| Reduce the Noise. Strengthen the Signal. | https://2nspira.etsy.com/listing/4437231821 | https://i.etsystatic.com/63788734/r/il/48dcbc/7625477319/il_1080xN.7625477319_9yt2.jpg |

The Thanksgiving and Christmas packs contain the same 15 pages in US Letter and A4 editions, not different games in each size. Cocoa Club includes 40 scenes and four bonus bookmarks, with matching Letter/A4 editions. Games/coloring downloads are personal-use PDFs, not physical shipments. The original physical art print is matte paper, available in multiple sizes, printed and shipped on demand. No prices, delivery estimates, reviews, ratings, or availability guarantees are copied onto the website.

## Tracking and eligibility

- General `Visit our Etsy shop` link: exactly https://2nspira.etsy.com, provided by the owner as Etsy's Share & Save shop link.
- Each product CTA keeps the exact owner-supplied shop-subdomain URL above. No manufactured tracking parameters. Etsy's normal redirects to www.etsy.com are not written back into source links.
- Seller enrollment and listing-specific Share & Save comparisons remain **unverified**. The original 2026-10-16 review used a signed-out browser. Seller controls were visible on 2026-10-17, but enrollment/eligibility was not checked. No savings eligibility is promised on the website. Owner can confirm enrollment and supply listing-specific links if they differ.
- Existing Amazon link for Trust Is the Operating System remains exactly https://amzn.to/4sVBcuF. Its redirect resolves to Amazon ASIN B0GDQG1XBL with existing `tag=2nspira-20`; no tags are added or changed. Amazon's direct fetch initially returned 503; a subsequent normal-browser visit returned 200 and confirmed the book, author, Paperback and Kindle options, and purchase controls. No checkout or purchase was performed. The existing Books page and cover remain the source for this already-published title.
- Books CTA: `Buy on Amazon`, `rel=sponsored`, with the nearby disclosure: “As an Amazon Associate I earn from qualifying purchases.” Art has been removed from Books.
- No additional KDP titles are inferred from third-party recommendations in blog articles. Asked the owner for any additional published listings and existing tracked links; none are required for the one known title.

## Amazon coloring books — Shop only

Per the owner's clarified request on 2026-10-16, *Little Haunts & Happy Plants: A Cozy Spooky Garden Coloring Book for Adults and Teens* is featured under Ideas → Shop only. The leadership Books page remains unchanged. The two existing Etsy collections remain intact; the paperback now has a dedicated Coloring Books collection and shared card on the Shop landing page. All collection tabs show All collections, Printables & Games, Coloring Books, Art Prints. No marketplace-named tab or leadership-book collection is added.

Current owner-supplied URL: https://link.amazon/B03B1TntH (replaces the earlier short link at the owner’s request). A normal browser returned 200 and resolved to ASIN B0HN71Q8X2, by 2Nspira Books, with existing `tag=2nspira-20`. Preserve the exact supplied short link; do not manufacture tags. Validate short links via normal-browser navigation.

Listing-based details: paperback for adults/teens; 40 illustrations; 8.5 × 8.5 inches; black-and-white artwork, blank reverse pages and color-swatch page. Markers require a protective backing sheet; blank backs do not prevent bleed-through. No copied prices or delivery guarantees. Actual 1000 × 1000 cover from https://m.media-amazon.com/images/I/61znbZYl4LL.jpg is hosted at `public/images/books/little-haunts-happy-plants.jpg` (asset folder does not determine site placement).

The featured coloring-book card uses `Buy on Amazon`, `rel="sponsored"`, and the nearby disclosure “As an Amazon Associate I earn from qualifying purchases.” Shop metadata/copy acknowledges both Etsy and Amazon destinations. Do not add this coloring book to the leadership Books page.

## Maintenance

Christmas Gathering Bundle contains the same PDFs sold separately as Christmas Table Rescue (website: Christmas Family Games) and The Cozy Elf Workshop: eight group challenges plus sixteen individual activities. Four PDFs provide matching Letter/A4 editions. No exclusive or additional activities; disclose this overlap clearly in the card. It is not 37 games or 74 unique pages. Do not copy prices or claim savings without a dependable updater.

Little Harvest Table is a digital kids-table kit, distinct from Thanksgiving Family Games: six paper-sized activity mats, twelve write-in cards (repeating design, not twelve distinct designs), and one keepsake page. Matching landscape Letter/A4 PDFs each contain the same 15 pages; paper sizes are not extra activities. Suggested ages 6–10 with help as needed. Optional cards need adult cutting; mats do not. These are activity sheets, not protective dining mats. No classroom/commercial-event license, child playtesting, print-testing or independent-use promise is inferred. The original listing image is preserved at its actual 1080 × 914 dimensions; shared rendering contains it without cropping.

The Cozy Elf Workshop is distinct from Christmas Table Rescue: sixteen individual quiet-time puzzles/drawing activities, suggested ages 7–10 with reading help as needed. It contains two non-editable PDFs (matching US Letter/A4 editions), each with the same 22 pages: cover, grown-up guide, sixteen activities, three answer pages, and printing/personal-use information. Do not count the two paper sizes as separate activity sets or promise independent use, a tested grade level, or a fixed playtime.

Edit the typed Etsy catalog in `src/content/shop/products.ts`; shared product rendering keeps landing and collection pages consistent. Check the live listings before changing descriptions or formats. Replace images with versioned filenames when changing their content. Do not add prices without a dependable update mechanism. All purchases occur on Etsy/Amazon; no cart, payments, customer collection, or credentials are introduced here.

## Shop landing-page motion

The landing page alone composes `ShopEffects` around server-rendered content.
Collection pages and leadership Books are not restyled. One-shot hero/section
entrances and card fades progressively enhance content that stays visible without
JavaScript or IntersectionObserver. Card entrances animate opacity only, leaving
hover transforms free after and during the entrance. Fine-pointer hover adds a
4px card lift, subtle cover scale, and 2px collection-link lift; keyboard focus
uses border/shadow feedback and retains existing focus rings. Touch devices have
no hover-dependent actions. Reduced-motion preferences skip entrances and suppress
Shop transforms/transitions, including when changed while an entrance is running.
No loops, parallax, new dependencies, product-copy changes, or tracking changes.

## Values-inspired Art Prints additions (2026-10-17)

Art Prints now includes Build the bridge — Collaboration, Leave room — Belonging,
Own the next step — Accountability, and Help others rise — Empowerment, in that
order before the existing physical Reduce the Noise print. All four were verified
on their live 2Nspira Etsy listings. The first two URLs were supplied by Jeffrey;
the remaining two listing IDs were found in the same shop and matched by title,
artwork and description. All CTAs preserve the shop subdomain without added
tracking parameters. Seller tooling is visible in the browser, but Share & Save
enrollment/eligibility was not verified or claimed.

Each new product is DIGITAL ONLY: one ZIP containing one design in three
non-editable PDF sizes (5 × 7 in, 8 × 10 in, A4), plus a printing/use guide. Sizes
repeat the same artwork; other collection designs are sold separately. No frame,
physical print or mounting is shipped. First listing images are illustrated frame
mockups, preserved unchanged at 1080 × 810 with object-contain rendering and
descriptive alt text. Do not imply frames or a four-design bundle are included.
The listing license permits up to ten prints for a household or one workplace
location, not resale, redistribution or print-on-demand merchandise. No claims
of tested print quality or improved team performance are made. No prices copied.
The Art collection intro and metadata distinguish digital downloads from the
existing physical print; leadership Books, games, paperback and effects stay intact.

## The Little Cocoa Club paperback (2026-10-18)

Confirmed Live in the authorized KDP bookshelf, ASIN B0HNDQNTKM. Public Amazon
listing: https://www.amazon.com/dp/B0HNDQNTKM . 2Nspira Books; paperback for
adults and teens; 88 pages; 8.5 × 8.5 inches. Forty distinct winter-café scenes
with four woodland friends and a rhyme beneath each. Blank reverses and a
color-swatch page; markers still require a protective backing sheet. Do not copy
PDF-only extras from the separate Cocoa Club Etsy download.

The owner’s replacement link https://link.amazon/B01xtcRTf resolves to the correct
ASIN with the existing tag=2nspira-20. Preserve it exactly. The initially supplied
B09oy0uoX redirected to an account page, not the book, and must not be published.
Actual 1000 × 1000 cover:
https://m.media-amazon.com/images/I/61XUym9sfNL._SL1000_.jpg .

Add only to Shop overview and Coloring Books, not leadership Books. Keep the Etsy
PDF in Printables & Games and retain all existing destinations/disclosures. Both
paperbacks use the shared server-rendered ColoringBookCard; the original Little
Haunts copy/link/ID/layout stays intact. A data-coloring-book attribute scopes
existing Shop effects to both paperbacks without hard-coded product IDs.
No prices, new tags, account settings, KDP publishing actions, or dependencies.
