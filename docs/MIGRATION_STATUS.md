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

The first preview wrapper incorrectly converted a Response to text; corrected before handoff and verified as HTML on the live deployment. Current deployed version: `baf84f13-1e74-4aa5-b820-c43cc7d213ea`.

## Remaining migration scope

Public Wix sitemap inspected at https://www.2nspira.com/pages-sitemap.xml. Its 12 listed URLs:

| Existing Wix path | Current new-build coverage / next action |
| --- | --- |
| `/` | New homepage exists; reconcile positioning and approved content with Wix. |
| `/contact` | Email-draft fallback only; select and verify production inquiry handling. |
| `/our-story` | New `/about` exists; reconcile content and prepare a 301 mapping. |
| `/blog` | `/insights` is a placeholder; inventory and migrate approved posts with URL preservation. |
| `/ai-enablement` | Generic Services exists; dedicated service page and redirect decision outstanding. |
| `/fractional-cio` | Generic Services exists; dedicated service page and redirect decision outstanding. |
| `/books` | Not migrated. |
| `/privacy-policy` | Not migrated; preserve approved legal text rather than inventing policy. |
| `/terms-conditions` | Not migrated; preserve approved legal text. |
| `/refund-cancellation` | Not migrated; preserve approved legal text. |
| `/copyright` | Not migrated. |
| `/inquiry-services-page` | Not migrated; determine relationship to inquiry/booking flow. |

Wix's sitemap index also lists blog posts/categories, bookings, pricing plans, dynamic industries/insights, and member profiles. These are not yet fully inventoried or migrated; do not assume all need recreation. Member information has not been exported. Blog sitemap parsing did not produce a usable inventory in this pass.

## Next milestone and launch gates

1. Complete Wix URL/content inventory; classify preserve, replace, retire; draft explicit redirects.
2. Migrate service, About, approved legal and relevant publishing content; remove remaining placeholders.
3. Implement and live-test the selected consultation/inquiry flow; verify recipient and consent requirements.
4. Validate old-to-new links, metadata, accessibility, responsive layouts, content, performance and production runtime.
5. Review and merge the branch; schedule domain cutover with an explicit rollback plan. Do not retire Wix until production acceptance.
