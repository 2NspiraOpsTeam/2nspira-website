# Independent QA — 2Nspira positioning

Reviewer scope: read-only application/source/live review; report ownership only. No production valid form submissions or emails. Browser tests use a separate headless Chrome context and intercept valid contact POSTs before they leave the browser.

## Baseline (2026-10-26)

- Headless installed Chrome via an ephemeral npm Playwright harness (no repository dependency changes).
- Live routes `/`, `/services`, `/work`, `/contact`, `/automation-systems-optimization`, `/ai-enablement`, `/fractional-cio`, `/websites`: HTTP 200 and one H1 each.
- Zero JavaScript page errors or failed requests observed during baseline page visits.
- Homepage horizontal overflow absent at 390, 768, and 1440px. Full-page screenshots: `/tmp/positioning-baseline-{390,768,1440}.png`.
- Mobile drawer opens, focuses Close menu, expands Services; Escape closes the submenu first and then the drawer.
- Empty contact form prevented POSTs. Locally intercepted successful POST rendered “Message sent”. These checks do not establish that the real relay delivers email.
- Confirmed baseline defect QA-01 (minor): fill required contact fields, focus Business challenge/message, press Ctrl+Enter; zero POSTs occur despite the advertised shortcut. Source contained no keyboard handler. Implementation removes the inaccurate hint; requires preview retest.
- Raw observations: `/tmp/positioning-qa-baseline.json`, `/tmp/positioning-qa-extra.json`.

## Existing verification support

- `scripts/verify-preview.py`: route/SEO/redirect/legal parity checks, assumes canonical `www` host and preview noindex. Review assumptions before reuse.
- `scripts/verify-release.mjs`: feature branch cleanliness, remote parity, main ancestry, lint, build, TypeScript.
- No declared browser automation dependency. Ephemeral harness `/tmp/positioning-regression.mjs` uses installed Chrome and writes JSON/screenshots outside source.

## Risk-specific preview regression plan

1. Verify requested homepage H1, six reusable problem cards, existing service destinations and three fragment IDs.
2. Smoke-test services/work/contact/about/coaching/resources/careers/shop/books/portal login; preserve existing routes.
3. Verify no horizontal overflow and capture screenshots at 320/390/768/1440px; review desktop/tablet/mobile card flow.
4. Open mobile navigation, verify focus, expand services, follow an actual link, ensure drawer closes.
5. Contact: native empty/invalid-email/partial-field validation; locally mock delivered/draft/network-error; duplicate clicks; reset; refresh; no actual notification delivery.
6. Collect page errors, failed requests, and HTTP errors independently. Mocked network error is expected and must be excluded from regression assessment.
7. Retest after fixes, repeat against hosted preview, and verify live artifact after release.

## Preview results

Hosted preview independently tested: `https://2nspira-website-preview.jcortez-36a.workers.dev` (lead identifies release commit `9d5aff94`, Worker version `1216de13`).

- **45/45 recorded browser checks passed** in `/tmp/positioning-preview-results.json`.
- Exact requested hero and six cards present; all six card routes HTTP 200 and all three integration/reporting/workflow anchors resolve to unique IDs.
- Preserved services/work/contact/about/coaching/resources/careers/shop/books/portal login routes HTTP 200.
- No horizontal overflow at 320/390/768/1440px. Screenshots `/tmp/positioning-preview-{width}.png` captured after scrolling for lazy content. Narrow-width card flow and CTA wrapping reviewed. Follow-up 390px capture `/tmp/positioning-preview-390-loaded.png` waits for all images; all five image elements report complete and nonzero naturalWidth.
- Mobile drawer opens with focus on Close menu; Services expands; selecting AI Enablement navigates and dismisses drawer.
- Contact native empty/invalid-email/partial validation prevented submission. Rapid double click yielded exactly one intercepted POST; delivered state and reset passed.
- Mocked draft and network-error paths honestly display fallback; Edit your message preserves typed challenge. Refresh returns clean idle form.
- Mocked HTTP 400 and 422 independently show inline alert, retain typed message, leave submit enabled, and do not launch draft fallback. Evidence `/tmp/positioning-validation-results.json`.
- QA-01 retest passed: inaccurate Ctrl+Enter hint absent.
- Zero JavaScript page errors and zero unexpected HTTP errors. One failed request is the deliberately aborted contact network-error test, not a real failed backend call.
- No production email sent; real relay delivery and mailbox receipt remain **unverified**, explicitly not inferred from mocked success.

Local Worker checks were superseded by hosted artifact testing because local preview required proxy-protocol headers and exhibited a viewport-resize overlay not reproduced on hosted preview. No unrelated server evidence is included.

## Release assessment

No critical/major regression found in independently tested hosted preview scope. Production post-deployment artifact verification is pending release. Authenticated billing/admin workflows and real email delivery are outside this messaging release test scope.
