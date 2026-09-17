# 2Nspira Wix migration — September 9, 2026

## Working milestone

- Branch: `2nspira-refinement-20260903`.
- Preview: https://2nspira-website-preview.jcortez-36a.workers.dev/resources
- Hosting: Cloudflare Workers via the existing vinext/Vite stack, not Cloudflare Pages or Certbot.
- Wix and production DNS/routes remain unchanged.
- Resources index and both assessment detail pages are implemented and linked from desktop/mobile navigation and footer.
- Assessment CTAs use the existing hosted tools; both destinations returned HTTP 200. Assessment internals were not modified or fully retested.
- Contact form now opens an email draft with browser validation. It does not send or store inquiries. Actual email-client launch/delivery remains unverified.

## Validation performed

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript and static generation.
- `npm run build:vinext`: passed. Its build report still labels routes Unknown due to the adapter's static-analysis limitation.
- `git diff --check`: passed.
- Live preview: eight site pages returned 200; a missing route returned 404; robots.txt and sitemap.xml returned 200.
- All eight site pages rendered one H1 and their expected canonical URL.
- Preview response header: `X-Robots-Tag: noindex, nofollow`; preview robots.txt disallows crawling. This is not access control: the preview is publicly viewable.
- Chromium desktop (1920px) and mobile (390px): Resources screenshots inspected; no horizontal overflow. Strength detail and Contact also checked at mobile width.
- Resource card click navigated to Strength Profile detail; dedicated external CTA present.
- Mobile menu: Resources present, focus enters Close menu, body scroll locks, Escape closes and restores focus to Open menu.
- Contact: required name/email/message fields, native validation active, empty form invalid, no false success message.
- Browser error collection returned zero errors for the tested flow.
- Not a full accessibility audit or Firefox/Safari/Edge matrix; no independent reviewer was used in this increment.

## Reproduce preview deployment

From `2nspira-website/`:

```sh
npm run lint
npm run build
node scripts/deploy-preview.mjs
```

The script rebuilds vinext, creates a generated preview entry that preserves response bodies/status and adds noindex/no-store headers, and deploys only `2nspira-website-preview` with no custom routes. Production config is not edited. A subsequent ordinary vinext build regenerates production artifacts without the preview wrapper.

The first preview wrapper incorrectly converted a Response to text; corrected before handoff and verified as HTML on the live deployment. See the latest deployment log for the current version.

## Remaining migration scope

Public Wix sitemap inspected at https://www.2nspira.com/pages-sitemap.xml. Its 12 listed URLs:

| Existing Wix path | Current new-build coverage / next action |
| --- | --- |
| `/` | New homepage exists; reconcile positioning and approved content with Wix. |
| `/contact` | Email-draft fallback only; select and verify production inquiry handling. |
| `/our-story` | New `/about` exists; reconcile content and prepare a 301 mapping. |
| `/blog` | `/insights` is a placeholder; inventory and migrate approved posts with URL preservation. |
| `/ai-enablement` | Dedicated page migrated at the existing URL, linked from Services. |
| `/fractional-cio` | Dedicated page migrated at the existing URL, linked from Services. |
| `/books` | Not migrated. |
| `/privacy-policy` | Published Wix text migrated, parity verified; confirm alignment with final production behavior before launch. |
| `/terms-conditions` | Published Wix text migrated, parity verified. |
| `/refund-cancellation` | Published Wix text migrated, parity verified. |
| `/copyright` | Published Wix text migrated, parity verified. |
| `/inquiry-services-page` | Not migrated; determine relationship to inquiry/booking flow. |

Wix's sitemap index also lists blog posts/categories, bookings, pricing plans, dynamic industries/insights, and member profiles. These are not yet fully inventoried or migrated; do not assume all need recreation. Member information has not been exported. Blog sitemap parsing did not produce a usable inventory in this pass.

## Next milestone and launch gates

1. Complete Wix URL/content inventory; classify preserve, replace, retire; draft explicit redirects.
2. Migrate service, About, approved legal and relevant publishing content; remove remaining placeholders.
3. Implement and live-test the selected consultation/inquiry flow; verify recipient and consent requirements.
4. Validate old-to-new links, metadata, accessibility, responsive layouts, content, performance and production runtime.
5. Review and merge the branch; schedule domain cutover with an explicit rollback plan. Do not retire Wix until production acceptance.

## Second increment — services and legal content

- Continued with GPT-6 Astra selected for the session.
- Six additional pages now deployed: AI enablement, fractional CIO, privacy, terms, refunds/cancellations and copyright. Their Wix URLs are preserved, so these routes need no redirect.
- Service descriptions are editorial summaries based on the public source, not verbatim full-page copies; Wix booking widgets are replaced with explicit contact links, not fake booking controls.
- Added Services links, legal footer navigation and sitemap entries.
- Public source text-block snapshots live in `docs/wix-source/`, including partial inventories for About/Books. These snapshots do not include images, embeds, booking behavior or all links.
- Legal source snapshots and app content preserve visible text (ignoring whitespace and zero-width characters). Published dates were not changed. Missing parenthetical scope notes in the initial refund extraction were restored before final validation.
- Added `python3 scripts/verify-preview.py` (run inside the app): checks all 14 site routes, one H1, canonical URLs, noindex, sitemap, robots, 404 and published/source/rendered text parity for all four policies. All checks passed against the deployed preview.
- Lint, Next production build/TypeScript, vinext build and diff checks passed for this increment.
- Chromium at 390px: AI enablement and privacy have no horizontal overflow; legal headings/lists render; browser error log empty.
- Still outstanding: Our Story/About reconciliation, blog/content inventory, Books media/links, inquiry/booking flow, redirects, fuller QA and production cutover.
- Existing published legal text describes accounts, payments, analytics and security practices; migration is not verification that the unfinished new site implements those practices. Reconcile the policies with final actual behavior before launch. The published policy contact is `hello@2nspira.com`, while the existing new contact form uses `info@2nspira.com`; confirm the intended inquiry destination before adding server-side delivery.
