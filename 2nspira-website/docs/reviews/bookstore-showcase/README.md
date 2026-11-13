# Fourth website showcase — review only

Follow-up to [#249](https://github.com/2NspiraOpsTeam/2nspira-website/issues/249) and merged [#250](https://github.com/2NspiraOpsTeam/2nspira-website/pull/250). Base `a3c9b68d6689cc825a85df3e2e19b45657d44a4d`. Separate from advisory PR #251. No production approval or release.

## Change

Four always-visible cards: GeVitals → Open Goal Soccer → Teams Management → 2Nspira Bookstore. Two equal columns above 760px, including 768px tablet; single column at/below 760px to keep images and labels readable. Grid DOM and keyboard order agree. Existing CSS grid, Next Image and effects reused; no dependency, backend or custom gallery needed. Existing hero/device, services, navigation, contact/chat and Watch / Listen / Read / Play / Shop preserved.

Bookstore copy:
- **2Nspira Bookstore**
- **In-house e-commerce storefront**
- **Every copy has a story.**
- A collectible-book catalog with individual copy details, photography and pricing.
- An in-house 2Nspira project · **Visit bookstore** → https://books.2nspira.com/

## Authentic imagery and claim limits

Fresh anonymous public homepage screenshots captured November 13, 2026 at 1440×1000, visually reviewed against all four live sites. [Provenance](sources.json) records source/final URLs, UTC timestamps, viewport, originals, asset mapping and byte counts. No stock/generated interfaces or private dashboards. Existing owner-authorized portfolio use retained; Bookstore is the organization's own storefront. Public captures contain site editorial imagery, not customer data.

Originals: [GeVitals](gevitals-source.png), [Open Goal Soccer](soccer-source.png), [Teams Management](teams-source.png), [Bookstore](bookstore-source.png). Four optimized WebP assets are 1008×700, approximately 60/70/85/39 KB, with intrinsic dimensions and descriptive alt. Assets are below the fold and lazy loaded. No added image JS.

Live Bookstore catalog text confirms individually listed books, copy identifiers, actual-copy photography, condition descriptions and USD prices. This card makes only catalog claims. Search/filter operation, shipping/tax calculation, provider handoff, actual payments, wallet availability, receipts/refunds, inventory reservation and fulfillment are **not verified or advertised** here. Prior checkout-entry inspection is documented in #249; no purchase or customer-data submission performed. Existing Teams authorized-workflow distinction and Soccer inactive-archive caveat retained.

## Before / after

| Width | Before | After |
|---|---|---|
| 1440 | [Desktop](before-1440.jpg) | [Desktop](after-1440.jpg) |
| 768 | — | [Tablet](after-768.jpg) |
| 390 | [Mobile](before-390.jpg) | [Mobile](after-390.jpg) |
| 320 | — | [Narrow mobile](after-320.jpg) |

[Desktop portfolio detail](portfolio-1440.jpg). Full-page desktop/tablet/mobile renders visually reviewed. Section-only captures can include the sticky header at the current scroll position; full-page captures begin at document top.

## Local validation

342 fresh browser assertions: 87 general regression, 108 portfolio, 42 preserved refinement, 33 motion/no-JS/lab stability, 72 four-card/breakpoint checks. Four primary widths 1440/768/390/320; grid transitions additionally checked at 1000/769/761/760/759. Four destinations return 200 and keyboard Enter reaches each real public site. Focus, alt, decoded images, equal grid widths/order, refresh, no overflow/text-spacing, mobile chatbot overlap, Studio taxonomy/routes, nav Escape/focus return and CTA preserved. Contact validation/retry/double-click uses intercepted no-send responses; chatbot only opened, no inference.

Zero automated main-content axe WCAG A/AA findings (not certification). Single unthrottled headless Chrome lab CLS below .1 at four widths, not field CWV. Canonical build and routing/404 smoke passed; TypeScript passed; lint zero errors/four pre-existing ai-team warnings. No dependency changes; no repository GitHub Actions workflows exist in this checkout. No new custom solution or paid service required.

Hosted exact-SHA marker, asset hashes, checks and draft PR status are reported in the GitHub handoff. Authenticated Teams tools, inbox delivery, payments, field CWV/conversion and real AI responses remain unverified. No production merge, activation, DNS, secret, billing or database changes.
