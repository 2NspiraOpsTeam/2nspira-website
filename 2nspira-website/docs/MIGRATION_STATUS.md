# 2Nspira Wix → Cloudflare Migration — Release Candidate (2026-09-09)

Stack: Next.js 16.3.3 (App Router) · React 19.2.8 · Tailwind CSS 4 · vinext → Cloudflare Workers.

## Migration coverage

| Wix URL (source of truth) | New site | Status |
|---|---|---|
| `/` | `/` | ✅ |
| `/services` (implicit home sections) | `/services` | ✅ |
| `/ai-enablement` | `/ai-enablement` | ✅ |
| `/fractional-cio` | `/fractional-cio` | ✅ |
| `/about` + `/our-story` | `/about` (+ `/our-story` 301) | ✅ |
| `/contact` | `/contact` (production delivery) | ✅ |
| `/privacy-policy` `/terms-conditions` `/refund-cancellation` `/copyright` | same paths | ✅ copy-parity verified 2026-09-03 |
| `/books` (audio, Amazon, Etsy) | `/books` (local MP3, links preserved) | ✅ |
| `/blog` + 25 posts `/post/<slug>` | `/insights` + 25 `/post/<slug>` (identity URLs) | ✅ |
| `/blog/categories/trust-is-the-operating-system` | same path (category view) | ✅ |
| `/pricing-plans/list` | 301 → `/services` | ✅ |
| `/book-online`, `/service-page/*` (3), `/inquiry-services-page` | 301 → `/contact` or `/services` | ✅ |
| `/insights/*` (5 legacy editor stubs, never published) | 302 → `/insights` | ✅ |
| `/industries-categories/*` (9 editor stubs, never published) | 302 → `/services` | ✅ |

## Inquiry/contact delivery

- `POST /api/contact` route handler (Cloudflare Worker). Validates + sanitizes, composes the message.
- Delivery: if `CONTACT_API_URL` Worker Secret is set, POSTs to the relay → `"delivered"`. Otherwise returns `"draft"` and the client opens a pre-composed `mailto:` to **hello@2nspira.com**. Fail-closed: never claims delivery when it did not happen.
- Inbox: `hello@2nspira.com` (Wix-published; matches all legal pages).
- Tested: valid submit → 200 draft payload; missing fields → 422; bad email → 422; invalid JSON → 400; `<script>` stripped from name.

## Redirects

`next.config.ts` → vinext `redirects()`. 301s for real content, 302s for Wix editor stubs. All 20 verified on preview (including `mba-graduates%3A…` encoded + literal colon).

## SEO

- Per-page `metadata` (title/description/canonical) on all pages + `generateMetadata` on `/post/[slug]`.
- `BlogPosting` JSON-LD per article; site-level `Organization`/`WebSite` via layout metadata.
- `sitemap.xml`: 41 URLs (16 pages + 25 posts). `robots.txt`: sitemap reference; disallows `/api/`.

## Analytics

`src/components/Analytics.tsx` — env-driven GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) / GTM (`NEXT_PUBLIC_GTM_CONTAINER_ID`), renders nothing when unset. No IDs committed. Wix home had no GA/GTM/Clarity ID in the HTML shell (Wix injects via its own runtime); **no equivalent third-party ID was recoverable from Wix** — Jeffrey must supply the GA4/GTM ID to enable analytics at cutover.

## Validation results (preview `2nspira-website-preview`, version e9869237)

- lint: clean · typecheck: clean · build: 21 routes OK
- 21 routes: all 200; unknown → 404 (custom page)
- 20 redirects: all correct status codes + targets
- Inquiry API: all 6 behaviors pass
- Sitemap 41 URLs · robots noindex on preview (X-Robots-Tag + Disallow)
- SEO head: title/description/canonical present on home, article, books
- A11y spot check: lang=en, landmarks, labels/inputs matched, 0 imgs missing alt, aria present
- Mobile: no horizontal overflow at 390px (prior session, re-verified structure)

## Known issues / deferred (launch gates, need Jeffrey)

1. **Real email delivery**: needs a relay (Resend/SES/SMTP) endpoint as Worker Secret `CONTACT_API_URL` (+ optional `CONTACT_API_KEY`). Until then the form uses the honest mailto fallback.
2. **Analytics IDs**: GA4/GTM ID not recoverable from Wix; supply ID to enable.
3. **Wix booking calendar**: Wix "Book Now" flow replaced by `/contact` inquiry flow (modernization). If the calendar must survive, pick a replacement (Cal.com/Calendly) and wire it.
4. **Legal email inconsistency (Wix source)**: Wix legal pages use `hello@2nspira.com`; earlier build used `info@`. Standardized to `hello@` per Wix + your confirmation.
5. **Cutover**: DNS + Worker route attachment only after Brian QA passes on the frozen RC SHA.

## Brian QA handoff

Preview: https://2nspira-website-preview.jcortez-36a.workers.dev (public, noindex, NOT production).
Checklist: 21 routes · 20 redirects · inquiry submit (all 6 API behaviors) · sitemap/robots · SEO head · a11y (screen-reader pass on contact + article) · responsive (mobile/tablet/desktop) · media (books MP3, 44 article images) · 404.
Do NOT merge, change DNS, or retire Wix until this exact RC SHA passes.

## Cutover / rollback

Cutover (after QA + merge approval): 1) merge PR #5 → `main`; 2) deploy Worker with production name + routes `https://2nspira.com/*` and `https://www.2nspira.com/*`; 3) point Wix to the Worker (or DNS CNAME to Cloudflare) ; 4) verify 50 sample URLs; 5) retire Wix after a 72h soak.
Rollback: Wix site remains live and unmodified throughout; re-point routes/DNS back to Wix (single DNS change) — content is preserved in Wix until retirement.
