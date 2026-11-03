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

## Photography and minimalism revision — November 3

All five expertise cards now use real people photography, with no Learn more labels, numbered markers, or arrow overlays. Image and title links remain keyboard accessible. Hero and audience imagery also replaced. Photos by fauxels on Pexels, downloaded and served locally under the free commercial-use Pexels License (https://www.pexels.com/license/). These are stock subjects, not identified 2Nspira employees or clients.

Asset source IDs (https://www.pexels.com/photo/<id>/): strategy 3184291; ai-collaboration 3184339; systems-team 3184423; digital-team 3184293; leadership 3184306; mentoring 3184287. Sources reviewed November 3, 2026; no AI generation used for replacements.

Who we serve explicitly includes schools and educational organizations, and nonprofits and community organizations, per Jeffrey’s request.

## Impact timeline — November 3

Replaced the foundation/value list with a reference-matched photo/story panel and vertical year markers. Jeffrey supplied the 2019 EKM founding, 2022 community reinvention after COVID, 2025 2Nspira reinvention, and 2026 competitive positioning. Native grouped radios provide click/touch and arrow-key selection without hydration or third-party paid widgets; the first milestone is the default on a fresh visit. Existing licensed stock imagery illustrates milestones, not archival event photos. Mobile places the year controls before the selected story.

## Non-people timeline imagery — November 3

At Jeffrey’s request, all five shared homepage/About timeline images now depict places and technology, with no people: New York skyline (2019), empty library (2022), development code (2024), server racks (2025), and cloud-layer architecture (2026). Expertise photos, layout, and editorial copy remain unchanged. Stock illustrations do not portray actual client facilities or company events. Local 1600px JPEG assets avoid hotlink dependencies.

Pexels sources, covered by https://www.pexels.com/license/:
- `history-new-york.jpg`: https://www.pexels.com/photo/466685/
- `history-community.jpg`: https://www.pexels.com/photo/256541/
- `history-web-development.jpg`: https://www.pexels.com/photo/546819/
- `history-technology.jpg`: https://www.pexels.com/photo/325229/
- `history-architecture.jpg`: https://www.pexels.com/photo/325185/

## Technology-at-work imagery — November 3

Jeffrey requested different people photos throughout the homepage: hands-on technology rather than business meetings, taking visual direction from Marketing Alliance’s desaturated photography and muted colors. Replaced the hero, five expertise images, and audience image with seven distinct local Pexels assets. Applied restrained desaturation only to these people photos; project screenshots, non-people timeline images, page layout and service copy are unchanged. “What we do” is now “Best Practices” per Jeffrey.

Pexels License: https://www.pexels.com/license/ . Stock subjects are not represented as employees, clients or endorsements.
- `tech-hero.jpg`: https://www.pexels.com/photo/1181316/
- `tech-ai.jpg`: https://www.pexels.com/photo/3861958/
- `tech-automation.jpg`: https://www.pexels.com/photo/3862632/
- `tech-websites.jpg`: https://www.pexels.com/photo/1181472/
- `tech-leadership.jpg`: https://www.pexels.com/photo/3862618/
- `tech-mentoring.jpg`: https://www.pexels.com/photo/3861973/
- `tech-community.jpg`: https://www.pexels.com/photo/1181263/

Photography credits: Christina Morillo (1181316, 1181472, 1181263) and ThisIsEngineering (3861958, 3862632, 3862618, 3861973). Source images inspected before assignment.

## Published verification — technology photography

Preview code commit `c9961a05741bddf7357177c36ff72338ca256f55`; Worker version `dde2b05d-4c5a-4920-90aa-b1ab9df93de1`. Lint, canonical build plus routing smoke, TypeScript and diff checks passed. All 12 new photo files match their staged and hosted SHA-256 bytes. Fresh hosted rendering passed 35 people-photo/viewport and 25 homepage timeline/viewport checks at 1440/1024/768/390/320px, with no page overflow or browser errors. Desktop/tablet/mobile screenshots inspected; focal crops adjusted for two service photos and the server-rack timeline photo. Shared About timeline also passed its 30-panel homepage/About regression run, including keyboard, focus, double-click, refresh, touch, redirect and unchanged copy/metadata. Service destination links and the Best Practices label are present. Production manifest separately remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`. No production release or layout redesign.

## Problem-led customer positioning — November 3

Jeffrey supplied a combined audience/problem-led positioning direction. The homepage now introduces growing businesses, operations/technology leaders, schools, nonprofits and entrepreneurs through the situation of outgrowing old ways of working. Four native linked cards route operational complexity, AI direction, website limitations and technology leadership to existing service pages. Mentoring remains a distinct path; the existing AI Readiness Scorecard offers a lower-commitment next step. Contact wording now invites visitors to talk through their challenge. Existing service components, imagery, approved project claims, timeline and dark footer are retained; no new libraries or custom interactive controls were needed.

Commercial prioritization is a hypothesis, not a validated market finding. No outreach, new analytics tracking, outcome claims or production release is part of this preview change. Existing project proof remains unchanged pending actual delivered-capability evidence.

Implementation `44bdd62`; preview Worker version `dcd0a43e-1881-438b-9831-c0ae43a94cba`. Lint, canonical build/routing smoke, TypeScript and source/staged image checksum checks passed.

Hosted verification passed at 1440/1024/768/390/320px: all four cards and seven destinations, keyboard activation and visible focus, refresh persistence, no horizontal overflow or browser errors. Twelve hosted photo checksums match the source manifest. Desktop/mobile rendered screenshots inspected. Preview noindex and mutation-blocking guards passed. Production manifest remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`. Inquiry conversion performance is not yet measured; preview forms intentionally cannot send.
