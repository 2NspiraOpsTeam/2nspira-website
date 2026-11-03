# Homepage redesign preview

Dedicated Worker: `2nspira-homepage-preview` (workers.dev only). No production routes, DNS, database or backend service bindings. The existing shared website preview is not replaced. All responses are noindex/no-store; robots disallows crawling. Account/API paths and non-read requests are blocked before application dispatch. Forms intentionally cannot send.

Build and publish from this design branch:

```sh
npm ci --no-audit --no-fund
npm run lint
npm run build:ci
npx tsc --noEmit
node scripts/deploy-homepage-preview.mjs
```

Do not merge to main or run deploy:production to update the design preview.

Initial baseline: current production commit `991df6a69fda171cca922dc5eb4028d83a3fe9cc` (2026-11-03). Homepage redesigned on the dedicated design branch: photographic hero, five image-led services, audiences, purpose, Teams Management, founding-year credibility, supporting work, and conversation CTA. Existing approved site assets reused; no invented numerical results or team identities.

Design direction: image-led services, authentic human visuals, explicit audiences, purpose, featured Teams Management story, and “Since 2019” founding credibility (confirmed by Jeffrey). Use verified outcomes only.
