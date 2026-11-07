# Creative Studio #182 — review update

Owner direction read from GitHub November 7, 2026: Watch / Read / Play, `/studio` hub, preview only. Supersedes the earlier Shop preview.

## Implemented

Existing data-driven Admin model retained. Hub has three collection cards opening on-page sections, consistent shared navigation, published/populated filtering, featured real channel/book/activity assets, direct Amazon purchase actions and a soft contact CTA. Homepage teaser is below core services. Original `/videos` collection and embeds restored from production main. Existing book/blog/shop URLs remain unchanged; old Studio hub redirects with category query preservation, while primary authored-page URLs remain stable.

## Verification

35 isolated real-handler checks passed. Initial local visitor checks passed at 1440/1024/768/390/320px; signed-in disposable-local Admin save/refresh/clear/validation/cancel/failure-retry/upload/publish/article/new-group and responsive flow passed. Canonical Worker build and smoke, TypeScript and production dependency audit passed. Lint: zero errors, four existing ai-team warnings. Final navigation-adjusted canonical build/typecheck passed; browser checks passed at five widths and axe main-content scans returned zero findings at 1440/768/320px for public and local signed-in Admin. Exact-commit hosted QA is still pending at time of this note; hosted authenticated writes remain unverified.

## Incomplete content dependencies

Breadcrumb was deliberately retired November 4 (`docs/qa/discovery-and-retirement-2026-11-04.md`). Keep it draft, do not invent a live launch link or reactivate infrastructure. Separate Signal vs. Noise newsletter URL is not established by source; existing Signal vs. Noise article remains available. Marketplace destinations are reused from the existing catalogue, not newly created listings. No production code/database or payment changes authorized by this update.

## Hosted first-use defect reproduced and addressed

At deployed `26a5f55`, selecting authored-books immediately after DOMContentLoaded changed the native selected value but left 47 results after 15 seconds. A second selection worked; no page errors. This reproduces lost pre-hydration input, not merely a repaint delay. Filters now remain disabled in server HTML until hydration readiness, using React's server/client external-store snapshot. No arbitrary sleep, retry click or weakened publication guard. Browser harness now verifies disabled filters without JavaScript as well as the first enabled selection in normal contexts. Exact updated-head hosted verification remains required.
