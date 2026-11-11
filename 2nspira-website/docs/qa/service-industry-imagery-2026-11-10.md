# Website technologies, industry imagery and homepage cards — 2026-11-10

Requested by Jeffrey: six technology logos on /websites; images on every Who We Serve industry section; non-people imagery on the homepage advisory/support cards; engaging sections and tasteful effects on /websites.

## Sources and claims
- Existing Next.js, React, TypeScript, Cloudflare and GitHub assets reused. No partnership or endorsement implied.
- Stripe SVG: https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/stripe.svg (Simple Icons, CC0; brand marks remain their owners' trademarks). Stripe is explicitly qualified as applicable to payment-enabled projects.
- New stock imagery from Unsplash (https://unsplash.com/license), locally downloaded and resized to WebP, not hotlinked:
  - Education: https://images.unsplash.com/photo-1503676260728-1c00da094a0b
  - Manufacturing: https://images.unsplash.com/photo-1581092921461-eab62e97a780
  - Property: https://images.unsplash.com/photo-1460317442991-0ec209397118
  - Managed infrastructure: https://images.unsplash.com/photo-1558494949-ef010cbdcc31
  - Advisory chess strategy: https://images.unsplash.com/photo-1586165368502-1bad197a6461
- Nonprofit card reuses existing homepage/history-community-organizations.jpg; creative card reuses existing pages/insights-editorial.webp, optimized as responsive WebP variants.
- Four existing audience image sets retained. New images illustrate industries, not named clients or engagements. Homepage additions contain no people.
- Existing PlatformCarousel supplies pause/resume, hover/focus pause, manual scroll and reduced-motion/no-JavaScript behavior. Existing Reveal supplies progressive enhancement without hiding server content. No added dependency, schema, admin-data or configuration changes.

## Validation
- Build: `npm run build:ci` (includes built-Worker route smoke checks), passed.
- Types: `npx tsc --noEmit`, passed.
- Lint: no errors; four pre-existing warnings on ai-team page.
- Production dependency audit: zero vulnerabilities.
- Local D1 required existing audience/platform fixture tables; initialized those tables locally only with existing migration SQL. No production persistence writes.
- Homepage challenge-photo grid replaced by compact four-link “What do you need?” strip, with a section height assertion and touch-target checks.
- Rendered browser results recorded below after settlement. No forms, email or booking submissions.

- Local rendered QA: 254 checks passed at 1440/768/390/320px across all three pages, including all industry images, homepage imagery/compact shortcuts, journey links, disclosures, touch targets, overflow, carousel motion/pause/resume/focus/keyboard scrolling, reduced motion and no-JavaScript fallback. Desktop and mobile screenshots visually inspected.
