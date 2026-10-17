# Shop content and purchase links

Owner-approved structure (2026-10-16): Books stays separate under Ideas at `/books`. Shop is a second Ideas link at `/shop`, showcasing all five Etsy products in two collections: `/shop/printables-games` and `/shop/art-prints`. No books collection inside Shop. The Cozy Elf Workshop was added following the owner's request to include the newly published listing.

## Content sources

Product titles use concise display titles based on the owner's requests and published listings. Short descriptions and format details were checked in a normal browser against each live Etsy listing on 2026-10-16. All five listings belong to 2Nspira and expose purchase controls. Images in `public/images/shop` are downloaded actual first listing images (1080 × 1080), not generated substitutes. They are hosted locally so page rendering does not depend on Etsy image hotlinks.

| Product | Exact purchase link | Source listing image |
|---|---|---|
| The Cozy Elf Workshop — 16 Christmas Activities | https://2nspira.etsy.com/listing/4596685843 | https://i.etsystatic.com/63788734/r/il/145717/8688068576/il_1080xN.8688068576_dka3.jpg |
| Thanksgiving Family Games — 8 Activities | https://2nspira.etsy.com/listing/4596133102 | https://i.etsystatic.com/63788734/r/il/97d737/8686225150/il_1080xN.8686225150_s8ad.jpg |
| Christmas Family Games — 8 Cooperative Challenges | https://2nspira.etsy.com/listing/4596463691 | https://i.etsystatic.com/63788734/r/il/289c0f/8734034937/il_1080xN.8734034937_hvfh.jpg |
| Cocoa Club — Winter Café Coloring Pages | https://2nspira.etsy.com/listing/4595228205 | https://i.etsystatic.com/63788734/r/il/639cd4/8686227648/il_1080xN.8686227648_amwo.jpg |
| Reduce the Noise. Strengthen the Signal. | https://2nspira.etsy.com/listing/4437231821 | https://i.etsystatic.com/63788734/r/il/48dcbc/7625477319/il_1080xN.7625477319_9yt2.jpg |

The Thanksgiving and Christmas packs contain the same 15 pages in US Letter and A4 editions, not different games in each size. Cocoa Club includes 40 scenes and four bonus bookmarks, with matching Letter/A4 editions. Digital products are personal-use PDFs, not physical shipments. The art print is matte paper, available in multiple sizes, printed and shipped on demand. No prices, delivery estimates, reviews, ratings, or availability guarantees are copied onto the website.

## Tracking and eligibility

- General `Visit our Etsy shop` link: exactly https://2nspira.etsy.com, provided by the owner as Etsy's Share & Save shop link.
- Each product CTA keeps the exact owner-supplied shop-subdomain URL above. No manufactured tracking parameters. Etsy's normal redirects to www.etsy.com are not written back into source links.
- Seller enrollment and seller-only listing-specific Share & Save link comparisons are **unverified**: the available browser is signed out. No savings eligibility is promised on the website. Owner can confirm enrollment and supply listing-specific links if they differ.
- Existing Amazon link for Trust Is the Operating System remains exactly https://amzn.to/4sVBcuF. Its redirect resolves to Amazon ASIN B0GDQG1XBL with existing `tag=2nspira-20`; no tags are added or changed. Amazon's direct fetch initially returned 503; a subsequent normal-browser visit returned 200 and confirmed the book, author, Paperback and Kindle options, and purchase controls. No checkout or purchase was performed. The existing Books page and cover remain the source for this already-published title.
- Books CTA: `Buy on Amazon`, `rel=sponsored`, with the nearby disclosure: “As an Amazon Associate I earn from qualifying purchases.” Art has been removed from Books.
- No additional KDP titles are inferred from third-party recommendations in blog articles. Asked the owner for any additional published listings and existing tracked links; none are required for the one known title.

## Maintenance

The Cozy Elf Workshop is distinct from Christmas Table Rescue: sixteen individual quiet-time puzzles/drawing activities, suggested ages 7–10 with reading help as needed. It contains two non-editable PDFs (matching US Letter/A4 editions), each with the same 22 pages: cover, grown-up guide, sixteen activities, three answer pages, and printing/personal-use information. Do not count the two paper sizes as separate activity sets or promise independent use, a tested grade level, or a fixed playtime.

Edit the typed Etsy catalog in `src/content/shop/products.ts`; shared product rendering keeps landing and collection pages consistent. Check the live listings before changing descriptions or formats. Replace images with versioned filenames when changing their content. Do not add prices without a dependable update mechanism. All purchases occur on Etsy/Amazon; no cart, payments, customer collection, or credentials are introduced here.
