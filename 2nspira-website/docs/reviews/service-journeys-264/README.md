# #264 — Three-service customer journey review

Owner: Adam. Date: 2026-11-16. **Review only: no merge or production deployment authorized.**

## Verified baseline, not stale search results

Production marker: `8e71f3ebb501e386f397a844d7a182404972963c` (`main`). Dedicated branch starts at that exact revision. All seven requested routes returned HTTP 200 in actual HTML and rendered browser checks. Each had one H1, a route-owned canonical and description; parseable structured data was checked in the browser. Actual DOM and desktop/mobile screenshots were captured; baseline screenshots and JSON inventories are in this directory. No older crawl was used as evidence of a current defect.

| Page / area | Current live observation | Stale crawl distinction | Targeted correction / recommendation | Priority / owner |
| --- | --- | --- | --- | --- |
| `/` | Approved headline; three service cards go to `/websites`, `/custom-software-development`, `/ai-enablement`. | Prior four/five-service crawl is not current homepage evidence. | Preserve homepage unchanged; keyboard-test all paths. | P0 / Adam |
| `/services` | Three main cards; advisory/support separately presented. Title still generic; schema main list contains five entries and Websites schema includes software. | Current main cards already align. | Name the three offerings in metadata; three-entry core list; website-specific schema description. Supporting services remain separately described. | P1 / Adam |
| `/websites` | New/redesign scope, approved examples, inquiry CTA exist. Technology-led subheading and prominent adjacent platform journey can make a simple website feel insufficient. | Not an absent website service. | Buyer-led introduction; make website-only scope explicitly welcome; call related software by its current name. | P1 / Adam |
| `/custom-software-development` | Correct operational story, but generic collaboration photo and repeated text/cards. Teams proof wording can imply private-platform delivery. Hero action opens booking rather than service-selected contact. | Current page exists and is not the old automation landing page. | Dedicated editorial layout; HTML workflow visualization; concise capability cards and disclosures; real published website separated from fictional manufacturing demo; contextual Discuss Your Project CTA. | P1 / Adam |
| `/ai-enablement` | Business-first readiness/pilot/support cards, roadmap and human-review visual already present. Technical details already lower/disclosed. Hero prioritizes scorecard; cross-link still calls Websites “Websites & Custom Digital Platforms.” | Do not rework already improved content as if older dense AI page were live. | Add direct project CTA; align metadata/schema name and split website/software cross-links. Preserve scorecard and purchase paths. | P1 / Adam |
| `/work` | Published client websites and internal demos labeled separately; Teams public site and sample backend image have distinct labels. | Not evidence that a private tenant platform is complete. | Preserve portfolio; explicitly classify Teams as adjacent website experience on Software page. No new deployment/outcome/testimonial claims. | P1 / Adam |
| `/contact` | Optional context fields; name/email/message required; query-selected service and session draft restoration. Safe unknown-result state prevents blind resubmission. | No evidence of broken live delivery from page rendering alone. | Keep form logic unchanged. Test intercepted local responses; propose optional-field consolidation only, not implement substantial form redesign. | P1 / Adam |
| Header/footer | Three core entries already share `serviceLinks`; advisory/support are separate. | Not a current four-service navigation defect. | Preserve taxonomy/destinations; verify menus at all widths. | P0 / Adam |
| Booking | Public Google page loads with time slots and Meet conferencing, but says **60 min** and lists older categories (including coaching/mobile). Site promises 30 minutes. | This is a reproduced live mismatch, not a crawl. | Omit website duration claims in contact/shared CTAs. Proposed booking description below; do not change Calendar, duration, availability, questions or notifications in this PR. | P1 / Adam; Jeffrey reviews external copy/settings |

## SEO and routes

`264-seo.json` records server-visible titles, canonicals, robots and first-hop redirects. Browser canonical `.href` normalizes homepage origin to a trailing slash; raw HTML uses `https://2nspira.com`, the same root resource. Sitemap returned 200 and contains all seven canonical routes; production robots allows public pages and disallows `/api/`. `/works` → `/work`, `/book-online` → `/contact`, legacy FileMaker packages → `/services`, all 308. `/automation-systems-optimization` remains a useful, self-canonical supporting capability page (200); no blanket redirect or content deletion. No routes, DNS, schemas or sitemap paths changed.

Search Console indexed canonical/coverage: **not verified**; no authenticated GSC property access established in this run. No ranking, conversion or Core Web Vitals improvement is claimed. Field CWV and real-user funnel measurements remain unverified; this change adds no animation library or new raster asset. Existing Reveal progressively enhances visible server content and respects reduced motion. The workflow figure is semantic HTML/CSS, not a raster infographic.

## Verification

- `npm ci --no-audit --no-fund`; `npm run lint`: zero errors, four existing AI-team warnings.
- `npm run build:ci`: passed including route manifest and missing-route 404 smoke.
- `npx tsc --noEmit`: passed. `npm audit --omit=dev`: zero vulnerabilities.
- `264-qa.mjs`: 320/390/768/1440, seven routes, no horizontal overflow, one H1, canonical/description/JSON-LD, three homepage paths with keyboard activation, destination refresh, contextual contact selection/refresh, service menu labels/fit and keyboard navigation, disclosures open/close, reduced motion, no page exceptions. Images on service pages decoded with a bounded wait; screenshots visually inspected for Software desktop/mobile.
- Local `/work` initially failed because the fresh local D1 had no audience table; applied **existing 0005 migration locally only** (empty seed fallback), then reran QA. No production database writes.
- `264-contact.mjs`: mobile/desktop empty and invalid inputs, valid/partial drafts, refresh restoration, mocked 422, delayed success/disabled/double-submit guard, clear/reset, success refresh, network uncertainty and blocked retry after refresh. **All contact POSTs intercepted; no real inquiry sent.** Backend email delivery not tested. No cancel/save buttons exist; session draft autosave and clear tested.
- Public booking 200, visible slots and Google Meet; no appointment created. Duration and service-description mismatch documented above.
- Keyboard focus uses existing shared focus rings and native disclosures. Sampled palette contrast (body `#46505f`, ink `#1f2430`, accent `#4a6fa5` on white) meets normal-text 4.5:1; not a comprehensive accessibility certification.

Scripts accept the base URL argument; set `PLAYWRIGHT_MODULE` if Playwright is installed elsewhere. Contact script must only run against local/preview, retains request interception.

## Proposed first-contact simplification (not implemented)

Keep name, email and a brief message initially visible; put organization, organization type, URL, timeline and budget into one optional “Add project context” disclosure. Preserve drafts, service context and duplicate-delivery handling. Review separately before changing form structure.

## Proposed booking description (not published)

Discuss your priorities with 2Nspira. Bring a website need, an operational workflow that could work better, or a question about responsible AI adoption.

- Websites: business website design, redesign, launch and scoped ongoing care.
- Custom Software Development: portals, dashboards, integrations and operational systems; FileMaker development and modernization where appropriate.
- Organizational AI Enablement: readiness, training, governance and a practical starting workflow with human review.

You do not need a technical brief. Tell us what you want to improve and we will explore a suitable next step. Any engagement scope, responsibilities and support are agreed separately. We meet via Google Meet; your booking confirmation includes details. Explore https://2nspira.com/services. Please do not share sensitive records or credentials.

## Proposed privacy-conscious measurement (not installed)

`homepage_service_select` (service key), `service_cta_click` (service key, CTA location), `booking_click` (service/referring route), `inquiry_success` (confirmed server success only). Use an allowlisted route/service vocabulary, no names, email, free text, query strings, record identifiers or session replay. Aggregate counts with short retention; avoid repeated success events on reload. Establish consent/legal basis and analytics owner before implementation. No existing analytics or conversion uplift is asserted.
