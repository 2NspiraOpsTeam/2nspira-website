# #174 — Website modernization draft

Adam is sole owner. Draft only; the broad 2026-11-06 approval authorized proceeding with this work, not publishing a future unreviewed pricing/CMS offering. Production /websites is unchanged by this branch.

## Implemented

Modernization hero and request-assessment CTA using the existing Google Calendar booking path (not an unverified free assessment product). Benefits, five-step migration process, proposed editor dashboard, visibly proposed managed-plan cards, separate build quote and exclusions, ownership/exit, WordPress rebuild and availability FAQ. Existing website/app/internal-operations capabilities, case studies and demos remain available. Page-specific metadata updated; no structured Offer or purchasable subscription is added.

## CMS feasibility

Existing maintained options were reviewed first. Payload is a candidate, not a delivered editor. Official installation documentation requires supported Node/Next.js releases and a compatible database; database docs list MongoDB, Postgres and SQLite adapters. Those statements do not demonstrate compatibility with this marketing site's vinext/Workers runtime, auth, media or existing D1 schemas. No new paid host/database is selected and no service is purchased. A separate Node-hosted headless service is an alternative to coupling CMS admin into the marketing runtime, but needs a prototype, cost/security review and owner-approved service scope.

Sources retrieved 2026-11-06:
- https://payloadcms.com/docs/getting-started/installation
- https://payloadcms.com/docs/database/overview

No CMS runtime pilot, permissions test, editor recovery/backup/restore rehearsal or content publication round-trip was performed. CMS launch remains blocked on that validation.

## Cost review — assumptions, not approved prices

Proposed monthly prices: Essentials $79 (3 editors), Business $149 (5 editors; 0.5h support), Fully Managed $299 (10 editors; 2h support), extra editor $10. Build work separately quoted.

At an **illustrative internal labor cost of $60/hour** (not an approved billing rate), included support consumes $0/$30/$120, leaving $79/$119/$179 before infrastructure, baseline maintenance, monitoring, backups, incident handling, payment fees, tax and margin. If shared baseline operations take another 0.5h/site/month, those balances fall to $49/$89/$149. At $100/hour, Fully Managed's 2h support plus 0.5h operations leaves only $49 before other costs. Support demand, not static hosting alone, can dominate cost. These examples do not establish profitability or a service guarantee.

Required before sale: real provider usage allowances, labor/incident budget, backup/restore frequency and retention, editor licensing/limits, approved overage rates, response targets, support rollover policy, ownership/code/export/handover terms and actual CMS service costs. Do not treat draft approval as acceptance of undefined commercial terms.

## Locally verified

Clean install; ESLint 0 errors (4 pre-existing ai-team warnings); canonical vinext build with built-Worker smoke routing and missing-route 404; TypeScript. Built Worker /websites rendered at 1440/768/390/320 with exact hero, single H1, proposed-price wording, keyboard-operated FAQ, parsed JSON-LD, no horizontal overflow or page errors, and zero automated WCAG 2A/AA/2.1AA main-content violations. Screenshots in this directory.

No new form backend is added. Booking link points to existing approved Google Calendar; no assessment request was submitted and delivery of a report is not claimed. No production website release or hosted preview verification yet. Local built-Worker preview only.
