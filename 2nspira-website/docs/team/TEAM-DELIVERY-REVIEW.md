# Team & Delivery — content review and publication

Status: draft. No public team claims should be inferred from the unpublished draft.

## Existing-solution preflight

Reuse the site's existing design tokens, authenticated Admin shell, Cloudflare D1 binding, bounded JSON parsing, and portal session contract. No new CMS service, paid platform, or dependency is required. Add an independent content table in the existing site-owned database; do not alter applicant or portal records. The API accepts active portal administrators; the existing hiring-only restriction remains the default for Careers.

## Sources and limits (2026-11-05)

- Jeffrey: existing owner-approved biography and portrait in `LeadershipProfile.tsx`, based on his supplied resume on November 3. Reuse only its established claims.
- Mason: supplied LinkedIn profile read through the authorized, signed-in browser. About section supports AI lab evaluation, agent orchestration, and AI-assisted development. No project outcomes inferred. Education wording updated per the owner request below.
- Sebastian: supplied LinkedIn About supports Lead Developer, business/engineering tradeoffs, and team coordination. Education wording updated from the LinkedIn About section per the owner request below.
- Ethan: supplied LinkedIn About supports RAG, n8n/Copilot/OpenClaw integration, automation, infrastructure, and troubleshooting. No inferred degrees or measured outcomes.
- Ashley: supplied LinkedIn About supports marketing coordination, operations, priorities, and follow-up. No inferred delivery ownership or degrees.
- Valentina and Joaquin: supplied links show “This page doesn’t exist” in the authorized browser. Jeffrey subsequently supplied Brian's profile summaries directly on November 5. These are owner-supplied backgrounds, not independently verified qualifications. Valentina's supplied role is Head of Business Development. Joaquin's company title is undocumented: bioengineering is explicitly a descriptive focus, not a job title. No contact emails are included in the public draft.
- AI assistants: Adam's observed authorized functions; Brian/Maya's documented internal SMA execution/reliability and clarity/experience lenses. Dax and Cleo are named by the owner, but detailed functions remain unconfirmed. All five function descriptions remain subject to owner review.
- Project examples: reuse existing public `/work` material, its exact publication classifications, and already published internal engineering field notes. Teams Management is a published client website; manufacturing is an internal fictional/synthetic demonstration; multi-agent field notes are an internal project. No numerical outcomes or personal attribution inferred. Private tenant/Admin functions are not public demonstrations.

## One consolidated list needed before publication

1. **Mason, Sebastian, Ethan, Ashley, Valentina, Joaquin:** approve the condensed LinkedIn-based biographies for Mason/Sebastian/Ethan/Ashley, and the final presentation of Valentina/Joaquin’s supplied biographies; provide an approved portrait or stable photo URL and permission to reuse it. Provide relevant personal work-example links or confirm actual contributions to named projects. Names are supplied; do not request them again.
2. **Joaquin:** title resolved by Jeffrey on November 5: Research & Strategic Communications Specialist, editorially aligned from his requested Research, Strategy and Communications title. Biography and contribution evidence remain separate.
3. **Human delivery ownership:** name the actual lead for client communication, project planning, development, and QA; describe each responsibility. One person may lead multiple areas. Do not infer these assignments from job titles.
4. **AI assistants:** approve Adam, Maya, and Brian's draft support descriptions; supply Dax and Cleo's actual functions, limitations, and human supervision. None can be the accountable human lead.
5. **Sharing/qualification evidence:** the three initial examples reuse the existing public Work page and field notes, without adding client claims. If expanding them into new case studies or adding personal delivery attribution, provide the relevant evidence and permission. Supply supporting resumes or qualification evidence where an RFP requires them, rather than treating a profile summary as independent credential verification. No additional credentials or outcomes are required to publish the concise capability-focused page if those claims are omitted.

## Operation

- Admin → Team & Delivery; editor at `/admin/team-delivery`.
- Named fields, no raw JSON editing. Add people/projects/AI assistants; upload JPG/PNG/WebP portraits directly (automatically resized to WebP), or use approved HTTPS URLs/site-relative image paths. Unpublished uploads require Admin access and are not publicly served. Never hotlink an expiring LinkedIn photo URL or treat visibility as reuse permission.
- Save draft preserves the previous published snapshot. Preview is inside the authenticated Admin editor and shows incomplete profiles for review. Reload/cancel requires confirmation before discarding unsaved work; refresh warns about unsaved edits. Saved content survives refresh.
- Publishing is disabled and server-rejected until required biographies/photos/evidence/approvals and all four human assignments are present. The server uses an atomic revision comparison to reject stale edits, duplicate submissions, and uncertain retries. A revision conflict requires reload/review, not blind overwrite.
- Public `/team-delivery` returns 404 until a reviewed snapshot exists. Footer link and sitemap entry appear only after publication. Admin data/API responses are no-store and noindex. No public draft API exists.
- Apply only `0003_team_delivery.sql` after inspecting deployed schema/ledger and obtaining a restore point. Do not blindly apply unrelated pending migrations. No production schema change or content publication is implied by local checks.

## Future RFPs

This page is supporting material only. Include every requested biography and qualification directly in the proposal; confirm the named delivery leads, availability, and evidence for that engagement. Never substitute a website link for required proposal content, or submit AI personas as human staff.

## Verification performed

- `npm run lint`, canonical `npm run build:ci` (including built-Worker route smoke), and `npx tsc --noEmit`: passed.
- Scoped Team & Delivery handler/D1 suite: 37 checks passed on synthetic local data. Covers active-admin access, CSRF, validation, publication gates, atomic competing saves, stale/duplicate revisions, draft-versus-published persistence, image limits/type checks, private draft portraits and public approved portraits.
- Existing Careers regression suite: 65 checks passed; hiring-only authorization remains unchanged by default.
- Production dependency audit: zero vulnerabilities at the tested lockfile (`npm audit --omit=dev --audit-level=high`).
- Rendered local built-Worker QA at 1440/768/390: editor, full seven-person/five-agent private preview, and public publication path. Public checks deliberately used a clearly synthetic local profile, not approved real delivery assignments.
- Verified loading/error/reload, valid/invalid/partial content, save/cancel/refresh, failed-save safe retry, rapid duplicate Save (one PUT), portrait upload/resize/persistence/private access, required publication disabled state, and preservation of the public snapshot after later draft saves.
- Nine axe WCAG A/AA tagged scans (editor, draft preview, synthetic public page × three widths): no automated violations. No page overflow or browser page errors observed. Visual inspection of desktop/mobile screenshots and profile/upload editor performed. Narrow Admin sidebar: focus entry, contained Tab, Escape restoration and inert closed navigation verified. These checks are not a complete accessibility certification.
- Scoped client-artifact search found none of the supplied draft-profile names/LinkedIn identifiers in emitted JavaScript. Draft content comes only from the authenticated API.
- Existing public Work page and engineering-field-notes URL returned HTTP 200. No client communication, production content mutation, production migration, merge, or deployment performed. Hosted preview and production workflows remain unverified for this change.

## LinkedIn portrait update (2026-11-05)

Jeffrey explicitly directed use of LinkedIn images after approving the drafted wording and requesting publication. Retrieved the matching top-card profile portraits for Mason, Sebastian, Ethan, and Ashley from the authorized signed-in browser; stored optimized 400×400 WebP copies locally in the site, without expiring CDN hotlinks. Jeffrey’s existing approved portrait is unchanged. Valentina and Joaquin’s supplied profile URLs remain unavailable in that browser; no substitute identity or portrait was inferred. Human delivery assignments and Dax/Cleo functions remain unconfirmed. This image update does not establish those facts or publish the page.

Portrait update verification: lint, canonical build with built-Worker smoke, and typecheck passed. Rendered authenticated local preview with the updated draft at 1440/768/390: all five available portraits decoded, no horizontal overflow or page errors. Mobile screenshot visually reviewed. API content was intercepted with the updated draft for this isolated image QA; no production content was changed.

## Owner correction and supplied portraits (2026-11-05)

Jeffrey confirmed Valentina and Joaquin have no LinkedIn pages. Removed both nonexistent profile links; their owner-supplied on-site biographies are the profile source, with direct section anchors `#valentina-maria` and `#joaquin-nicolas`. Joaquin’s Bioengineering heading is a professional focus, not a confirmed company title. No LinkedIn account creation is requested or implied. Replaced Ethan’s portrait with the upload explicitly labeled Ethan. Replaced Sebastian’s portrait with the file explicitly named Sebastian; other uploaded portraits require filename/order identification before assignment. No facial matching or identity inference is used. Publication and remaining delivery facts are not established by these photo uploads.

On-site profile correction QA: lint, canonical build and route smoke, and typecheck passed. Rendered isolated Admin draft preview at 1440/768/390: five assigned portraits decode, both profile anchors exist, neither Valentina nor Joaquin has a LinkedIn link, no page errors or horizontal overflow. Mobile screenshot reviewed. This is local draft verification, not preview/production publication.

## Fully labeled owner portrait batch (2026-11-05)

Assigned the files explicitly named Sebastian, Valentina, Joaquin, Ashley, and Mason; retained the previously labeled Ethan portrait and Jeffrey’s existing portrait. Owner uploads are resized to a maximum 800-pixel edge without generative changes. All seven portraits decoded in the isolated authenticated local draft preview at 1440/768/390; no page errors or horizontal overflow. Mobile screenshot reviewed. No identities inferred from unlabeled images. This verifies local draft presentation only; hosted preview and production publication remain unverified.

## AI Team briefing — 2026-11-05

Jeffrey supplied the five-agent role brief directly. Added a dedicated `/ai-team`
page with symbolic initial avatars, individual specialties, personas, taglines,
expandable responsibilities, working styles, and agent-specific boundaries.
Role scope is explicitly distinguished from operational verification. Brian's
checks do not replace professional security auditing; Dax is not presented as
an autonomous production operator. Human direction and accountability remain
central. No human profile approval or delivery-lead assignment is inferred.

Updated the existing draft's five agent descriptions and marked the supplied
role descriptions approved. No production content snapshot was written.
Discovery links: AI Enablement, footer, sitemap, and Team & Delivery section.
Reuses site components and native HTML details/summary; no CMS, package, paid
service, generated portrait, or schema change added for this request.

Validation: lint, canonical build:ci and route smoke, TypeScript, and 37 existing
Team & Delivery handler/D1 checks passed. Built Worker browser QA passed at
1440, 768, 390, and 320px: five profiles, pointer and keyboard disclosure toggles,
refresh reset, no horizontal overflow or page exceptions. Mobile screenshot
visually reviewed. These are local checks, not production verification.
The shared ChatGPT URL returned only a generic share shell; the direct briefing
is the content source. The larger Team & Delivery publication still requires
human delivery ownership and its existing profile/evidence publication gates.

## Owner-approved banner and role alignment — 2026-11-05
Jeffrey approved the supplied six-person banner as the main Team & Delivery banner and its displayed specialties as the six matching human profile roles. Preserved existing biographies and separate profile/publication approvals; this approval does not establish engagement-specific delivery ownership. Banner uses its full aspect ratio without cropping; accessible text lists all six specialties.

## Updated owner banner — 2026-11-05
Replaced the main banner with Jeffrey’s supplied Six-Person Professional Portrait Banner. Existing roles, individual portraits, accessible description and uncropped responsive layout are unchanged. Draft only; no production publication.

## LinkedIn title alignment (2026-11-05)

Jeffrey requested titles match LinkedIn rather than the supplied banner specialties. Read the signed-in LinkedIn profiles live: Mason and Ethan — AI Engineer; Sebastian — Lead Developer; Ashley — Marketing & Operations Specialist; Jeffrey — Technology Executive. Keep specializations in the existing skills/biographies rather than substituting them for job titles. Valentina and Joaquin have no LinkedIn profiles per Jeffrey: restore owner-supplied Head of Business Development for Valentina and descriptive Bioengineering · Biology & Technology for Joaquin (not a verified company title). The banner source is unchanged; a presentation-only top-aligned crop omits its conflicting embedded names/specialty strip. Accessible text no longer repeats outdated roles. This supersedes the earlier banner-role assignments; draft only.

Title-alignment QA: lint, canonical build/route smoke and TypeScript passed. Local rendered Admin draft preview at 1440/768/390/320 verified all seven exact role labels, decoded portraits, banner crop ratio, no horizontal overflow, and no page errors. Hosted preview and production not verified for this revision.


## Owner-directed Joaquin title — November 5, 2026

Jeffrey assigned Joaquin Research, Strategy and Communications and requested industry-aligned wording. Updated the draft title to **Research & Strategic Communications Specialist**. This supersedes the earlier descriptive Bioengineering heading and the outstanding title-confirmation gate; it is an owner-assigned role, not a LinkedIn-verified title. Existing biography and skills remain unchanged; no new qualifications or delivery claims are inferred. Draft only.

Validation: lint, canonical build with route smoke, and typecheck passed. Local rendered Admin draft at 1440/768/390/320 shows the exact new title with no horizontal overflow or page errors; mobile screenshot inspected. Hosted preview and production not verified.

## Owner organizational-chart titles — November 5, 2026

Jeffrey explicitly assigned the chart titles, superseding prior LinkedIn alignment and Joaquin wording: Joaquin — Strategy Lead; Sebastian — AI Engineering Lead; Ethan — Operations Lead; Valentina — Experience & Design Lead; Mason — Quality & Governance Lead; Ashley — Partnerships & Client Lead. AI titles: Maya — Research & Insights Agent; Adam — Development Agent; Dax — Operations Agent; Cleo — Design & Content Agent; Brian — Quality & Validation Agent. Applied to both draft profiles and the dedicated AI Team page. Jeffrey’s title, biographies, portraits, permissions, human accountability and operational boundaries remain unchanged. These are owner-assigned company titles, not independently verified LinkedIn titles or engagement-specific assignments. No banner replacement or production publication implied.

Chart-title verification: lint, canonical build/route smoke and TypeScript passed. Local rendered draft and AI Team page checked at 1440/768/390/320px: all eleven supplied titles present, portraits decoded, no horizontal overflow or browser exceptions; AI disclosures work by pointer and keyboard. Mobile AI page screenshot reviewed. Draft API intercepted for isolated QA. Hosted preview and production not verified.


## LinkedIn education alignment — November 5, 2026

Jeffrey requested the same educational backgrounds as LinkedIn. Added the previously captured signed-in profile wording: Mason — Harvard University (institution only); Sebastian — undergraduate studies at Harvard University and a master’s degree at MIT (no field or dates inferred); Ethan — Columbia Engineering and studies at Queens College (no degree inferred); Ashley — nursing and marketing studies at Hunter College (no degree inferred). These are LinkedIn-reported backgrounds, not independently verified credentials. The direct education-detail views did not expose usable entries during this check, so no additional qualifications were added. Valentina and Joaquin have no LinkedIn profiles per Jeffrey; their existing owner-supplied backgrounds remain unchanged. Jeffrey’s established biography and all AI profiles remain unchanged. Draft only; no publication or engagement-specific qualification approval implied.

Education-update validation: lint, canonical build and built-Worker route smoke, and TypeScript passed. Isolated local Admin draft preview (mocked content API) checked at 1440/768/390/320px: exact biographies present, all portraits decoded, no horizontal overflow or page exceptions. Mobile screenshot inspected. Hosted preview and production not verified.


## Owner-supplied realistic banner — November 5, 2026

Jeffrey supplied a replacement team collaboration image. The draft now uses `team-realistic-owner-20261105.png` at its full 1774×887 ratio, retaining all six people and the human/AI collaboration labels. The previous asset and individual portraits are preserved. This image replacement does not publish the draft or change biographies or titles.

Validation: lint, canonical build/Worker smoke checks, and TypeScript passed. Local rendered draft checks passed at 1440, 768, 390, and 320px: replacement decoded, all seven individual portraits retained, biographies unchanged, no overflow or browser exceptions. Desktop/mobile banner screenshots inspected; full composition retained. Embedded text scales down on mobile; equivalent profile titles remain available as page text. Hosted preview and production not verified for this revision.
