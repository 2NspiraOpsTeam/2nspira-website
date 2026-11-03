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

## Visual challenge cards — November 3

Redesigned the four challenge paths as image-led cards using the existing licensed technology photography documented above (no new dependencies or assets). Each has a photographic header, a short category label, a white copy panel and a circular directional affordance. The complete card remains one native link; all copy is visible without hover. Decorative images use empty alternative text to avoid duplicating the link content. Keyboard focus, touch navigation and reduced-motion preferences are retained. No other homepage sections or production configuration changed.

Jeffrey additionally requested that the mentoring, service-exploration and AI Scorecard links become their own section. Added “More ways to move forward” with three distinct native-link cards and icons from the existing lucide-react dependency. These are removed from the challenge section; no new form or submission behavior is introduced.

Verified preview release `73274f05d376896366e6610be99e15233f3b836b`, Worker version `b2c52835-db8c-4971-97d7-a5a4e28b8795`. Lint, TypeScript, canonical build and routing smoke passed. Hosted checks passed at 1440/1024/768/390/320px for four image-led challenge cards, three dedicated next-step cards, loaded section images, all seven destination HTTP responses and zero horizontal overflow. Keyboard activation/visible focus, touch mentoring navigation, refresh persistence and reduced-motion handling passed; no browser page errors observed. Desktop, tablet and mobile screenshots inspected; photo focal positions refined to preserve faces. Preview noindex/no-store and blocked mutation behavior verified. Production manifest separately remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`; production was not released.

## Service-aligned, unique homepage photography — November 3

Jeffrey requested service-specific subjects and no duplicated homepage photos. Expertise keeps distinct AI/development and automation imagery; websites now shows a person viewing a website, Fractional CIO shows a close-up leader guiding a laptop discussion, and mentoring uses the existing business-guidance photo. Challenge cards use four separate photographs, not the expertise images; the wider planning-meeting photograph is reserved for the leadership challenge. Existing licensed assets were preferred; no new library or generated imagery was required.

New local assets (Pexels License https://www.pexels.com/license/):
- `service-cio.jpg`: Christina Morillo, https://www.pexels.com/photo/1181396/
- `service-website.jpg`: Antoni Shkraba, https://www.pexels.com/photo/4348404/
- `challenge-operations.jpg`: fauxels, https://www.pexels.com/photo/3184639/

These depict stock subjects, not identified employees, clients or actual engagements. Layout, copy, service destinations, timeline and production remain unchanged.

Verified release `801b6e7`: lint, canonical build/routing smoke and TypeScript passed. Hosted desktop/tablet/mobile checks at 1440/1024/768/390/320px passed; all homepage image source paths are unique and all hosted homepage asset checksums match local files. Service and challenge crops inspected; keyboard, touch, destinations, refresh and reduced motion passed with no page errors or horizontal overflow. Production separately remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`.

## Cohesive editorial typography — November 3

Jeffrey requested a more tasteful, synchronized site-wide type system and an Apple-inspired treatment using the existing homepage content. Retained the existing self-hosted Geist family and Tailwind/shared UI primitives rather than adding fonts or dependencies. Shared display/section/card tokens, medium-weight headings, balanced heading wraps, restrained tracking and consistent line-height now connect public pages. Removed the resource-page serif heading exception and homepage serif accents. Restored a full 16px mobile root, increased homepage small body/link text, and reduced oversized feature headings. Content, destinations and approved history remain unchanged.

Jeffrey also specified exactly two distinct people engaged in a high-level mentoring conversation in a modern office. New generated illustrative photography is not presented as an actual client engagement. Preview only.

### Website and app development

Jeffrey additionally requested app development on `/websites`. Added three clear website/web-app/mobile-app pathways, updated the hero, service name, metadata and Service schema, and added an app-development FAQ. Existing website/web-platform proof is explicitly distinguished from the prospective mobile offering; no shipped mobile project or app-store approval is claimed. No app implementation or release is part of this change.

Verified final preview release `3c8f544b8cd82727d492f344faeb4edf9cfc7e65`, Worker `c86ec3e9-f628-4edd-8200-04fa4a0cab8f`. Lint, canonical build with route smoke, TypeScript, and 23 source/staged photography checksums passed. Hosted browser checks passed for 27 public routes at 1440/768/390/320px (108 route/viewport checks), with no horizontal overflow or page errors. Homepage images remain unique and byte-match their local assets. Refresh, visible keyboard focus and preview noindex/mutation guards passed. Website app-pathway cards, metadata, parseable Service schema, FAQ open/close and rendered mentoring photo passed. Desktop/mobile section screenshots inspected. Production manifest independently remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`; no production release. Account flows and form submissions were not exercised (design sandbox blocks mutations).

## AI page simplification and service naming — November 3

Jeffrey requested a more engaging AI page with less middle-page text, plus the service name “Websites, Apps & Digital Platforms.” Shortened the AI introduction, audience and outcomes; replaced six deliverable cards with three concise pathways and native expandable scope details. Removed the overlapping operating-model overview, principle essays and second maturity journey; retained the three-step approach, optional eight-area framework, FAQs and assessment/conversation destinations. Reused existing components and native details without new dependencies. Synchronized desktop/mobile navigation, footer and Services schema; updated the service card's customer need and app-development wording.

Preview implementation `b8b9c94`, Worker `d032214c-93c4-4451-adbf-2b3d6eeb4271`. Lint, canonical build/routing smoke and TypeScript passed. Hosted checks passed on AI, Services, Websites and Fractional CIO at 1440/768/390/320px (16 route/width checks), without horizontal overflow or browser errors. New detail controls passed click/keyboard open/close and refresh checks; the eight-area framework opens and closes. Parsed rendered JSON-LD, checked reduced-motion rendering and inspected desktop/mobile full-page screenshots. Preview release identity, noindex and mutation blocking passed. Production manifest remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`; no production changes or form submissions.

## AI credibility evidence — 2026-11-03

Added an opt-in credibility section to AI Enablement linking to Jeffrey’s published multi-agent workflow field notes, the background/Columbia qualification described in that article, and selected digital-platform work. Existing published biography is the source for the qualification; no independent degree verification or AI client outcomes are claimed. Other service callers do not supply the optional section.

Implementation `5a056f530717e335fdc11c3d14ba05cd5fae4db3`; preview Worker `1723587f-3bd7-4526-b254-ad1a3f09d6bd`. Lint, canonical build/routing smoke, TypeScript, and 22 homepage-image staging checks passed. Hosted 16 route/width checks passed at 1440/768/390/320px, including credibility headings/cards and destination HTTP status, existing mouse/keyboard disclosures, refresh, JSON-LD parsing, overflow, reduced motion, release manifest, noindex and mutation guard. Desktop/mobile credibility screenshots inspected. Production manifest independently remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`. No production release or form/account testing.

## Focused acquisition messaging — 2026-11-03

Jeffrey requested a focused conversion iteration, retaining the design and structure. Added four problem/benefit-led audience entries using his supplied direction; made the hero specific about operations, technology decisions, AI and digital experiences; clarified the existing purpose section around technology leadership, implementation and people. Renamed the shared 2026 milestone to “Bringing AI and Executive Technology Leadership Together” (also reflected on About). Removed the homepage's separate closing contact band; the shared footer retains one booking/message invitation without changing other pages.

Teams Management is explicitly labeled a published project, with inspectable public capabilities and links to the delivered site and scope overview. No testimonial, measured outcome or before/after result was supplied, so none was invented. Conversion improvement remains a hypothesis, not measured performance. Existing components, native links and licensed assets were sufficient; no dependencies, new tracking or form behavior added.

Implementation `d233446`; isolated preview Worker `129ff649-91f6-4a57-a885-c7f83ec05c85`. Lint, TypeScript, canonical build and routing smoke checks passed. Production release is outside this change's scope.

Hosted QA passed 12 route/width checks across Home, About and AI at 1440/768/390/320px, without overflow or browser errors. Audience links, visible keyboard focus/activation, refresh persistence, single closing invitation and reduced-motion rendering passed. Desktop/mobile audience screenshots inspected. Teams Management public destination returned 200 with residential/retail content. Preview commit, noindex/no-store and mutation block verified. Production manifest independently remains `991df6a69fda171cca922dc5eb4028d83a3fe9cc`. Booking was not submitted and preview form/account submissions remain intentionally blocked; conversion impact and measured client outcomes are unverified.


## Executive leadership imagery — 2026-11-03

Jeffrey requested two replacements: executives in a boardroom for the Fractional CIO service card, and seven staff listening to one executive for the leadership challenge panel. Built-in image generation produced illustrative editorial photography, not actual staff or client engagements. Local assets: `public/images/homepage/executive-boardroom-v1.jpg` and `public/images/homepage/executive-staff-briefing-v1.jpg`. Prompts: realistic professional boardroom with five senior executives; wide professional workplace with exactly seven seated staff listening to one standing executive, all heads within the central band. No logos or embedded copy. Preview only; content and links unchanged.
