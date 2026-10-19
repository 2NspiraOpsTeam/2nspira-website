# Catalog search visibility and progressive effects

Scope: `/shop`, `/shop/printables-games`, `/shop/coloring-books`, `/shop/art-prints`, `/books`.

## Baseline audit (2026-10-18)

Production at 941711980bfbe17e6b664493b0fef0aab3efa8a9 returned 200 for all five routes, with self-canonicals, indexable metadata, real image alt text and sitemap entries. Only site-level Organization/WebSite JSON-LD existed; there were no catalog breadcrumbs or page-specific semantic lists. Books used JS-dependent hidden Reveal wrappers. No missing sitemap route or invented last-modified timestamp needed a fix; neither global robots nor sitemap behavior is changed.

## Implementation

- Descriptive, distinct search titles/descriptions, authored by route scope using `src/content/catalog/seo.ts`. Approved visible hero headlines, brand design, marketplace purchase destinations and disclosures remain intact. No keyword stuffing, new prices, ratings, availability or claims of improved book/art outcomes.
- Visible native breadcrumbs match existing BreadcrumbList markup. Home → Shop → collection, Home → Shop, or Home → Leadership Books; no fabricated Ideas URL.
- Server-rendered CollectionPage + ItemList markup mirrors visible product order/count (13 on Shop, 6 printables, 2 coloring paperbacks, 5 artworks). Books has a WebPage/Book entity for the actual featured book. Canonical fragment URLs resolve to real item IDs; actual images, authors and marketplace identity links are retained.
- Book/CreativeWork/VisualArtwork types describe a curated showcase. This site is not the checkout seller. No Product/Offer, price, availability or review markup is fabricated to chase Google shopping features. No Google product-rich-result or Book Actions eligibility is claimed. No FAQPage rich-result markup is emitted; native FAQ disclosures are useful reader content, not a rich-result promise.
- Paperback content is shared between visible cards and markup, preventing silent drift. Existing Etsy data remains the source for artwork/printable descriptions. Existing Amazon short affiliate links and every Etsy shop-subdomain URL are unchanged.
- Two short factual buyer questions on each page, with native keyboard/touch-friendly disclosures and real internal links. Product formats and critical details remain visible outside disclosures. No shopping/cart or account behavior added.
- `CatalogEffects` extends the existing restrained Shop language to all five routes. One-shot heading entrances and opacity-only card/fade entrances, fine-pointer hover lift/cover scale, focus feedback and native FAQ state feedback. No loops, parallax, autoplay, dependencies or new image downloads.
- No opacity/visibility gate; content is visible without JavaScript/IntersectionObserver. Books' old hidden Reveal wrappers are removed only on this route. Initial/runtime reduced motion cancels entrances and suppresses transforms/translate/scale on cards/images/links; disclosure state indicators update without animated transitions.

## Validation and measurement

Check server HTML and rendered browser output: title/description/canonical/robots/OG/Twitter, JSON parsing and actual Schema.org types/relationships, item order/count/entity fragments against visible cards, visible breadcrumbs versus BreadcrumbList, source-linked images, unchanged tracked purchase URLs, sitemap/robots, keyboard/touch, FAQ open/close, no-JS/fallback, no overflow, console errors, reduced-motion initial/runtime. Run required lint/TypeScript/Vinext build, exact-SHA preview QA, normal GitHub/Cloudflare release and final deployed-SHA/public-journey verification.

Local schema/DOM assertions are not a Google rich-result certification or proof of indexing. Use Google Search Console property access to inspect index status, submit the existing sitemap if needed, request crawling where appropriate, and monitor real impressions/queries/clicks and field Core Web Vitals. No indexing/ranking promises or automated Indexing API misuse. Do not alter DNS/verification ownership without owner authorization.

Primary references:
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- https://schema.org/CollectionPage
- https://schema.org/ItemList
- https://schema.org/Book

Source release/audit evidence and exact SHAs belong in the PR checkpoints. Search-engine recrawling and any account access remain separate from code deployment status.

## Search Console account check

The existing `sc-domain:2nspira.com` property was accessible in the authorized browser on 2026-10-18. The submitted apex sitemap (`https://2nspira.com/sitemap.xml`) reports Success, last read October 17, 2026, with 49 discovered pages. It was already submitted, so no duplicate submission, ownership, DNS, or legacy sitemap removal was performed. The property-wide overview reports no field Core Web Vitals data; this is not a lab performance pass or a catalog-specific indexing diagnosis. Any indexing requests after release are recorded separately in the PR evidence.
