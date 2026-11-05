# Team & Delivery — content review and publication

Status: draft. No public team claims should be inferred from the unpublished draft.

## Existing-solution preflight

Reuse the site's existing design tokens, authenticated Admin shell, Cloudflare D1 binding, bounded JSON parsing, and portal session contract. No new CMS service, paid platform, or dependency is required. Add an independent content table in the existing site-owned database; do not alter applicant or portal records. The API accepts active portal administrators; the existing hiring-only restriction remains the default for Careers.

## Sources and limits (2026-11-05)

- Jeffrey: existing owner-approved biography and portrait in `LeadershipProfile.tsx`, based on his supplied resume on November 3. Reuse only its established claims.
- Mason: supplied LinkedIn profile read through the authorized, signed-in browser. About section supports AI lab evaluation, agent orchestration, and AI-assisted development. No project outcomes or educational credentials copied.
- Sebastian: supplied LinkedIn About supports Lead Developer, business/engineering tradeoffs, and team coordination. Do not repeat Harvard/MIT claims without supporting qualifications evidence.
- Ethan: supplied LinkedIn About supports RAG, n8n/Copilot/OpenClaw integration, automation, infrastructure, and troubleshooting. No inferred degrees or measured outcomes.
- Ashley: supplied LinkedIn About supports marketing coordination, operations, priorities, and follow-up. No inferred delivery ownership or educational credentials.
- Valentina and Joaquin: supplied links show “This page doesn’t exist” in the authorized browser. Jeffrey subsequently supplied Brian's profile summaries directly on November 5. These are owner-supplied backgrounds, not independently verified qualifications. Valentina's supplied role is Head of Business Development. Joaquin's company title is undocumented: bioengineering is explicitly a descriptive focus, not a job title. No contact emails are included in the public draft.
- AI assistants: Adam's observed authorized functions; Brian/Maya's documented internal SMA execution/reliability and clarity/experience lenses. Dax and Cleo are named by the owner, but detailed functions remain unconfirmed. All five function descriptions remain subject to owner review.
- Project examples: reuse existing public `/work` material, its exact publication classifications, and already published internal engineering field notes. Teams Management is a published client website; manufacturing is an internal fictional/synthetic demonstration; multi-agent field notes are an internal project. No numerical outcomes or personal attribution inferred. Private tenant/Admin functions are not public demonstrations.

## One consolidated list needed before publication

1. **Mason, Sebastian, Ethan, Ashley, Valentina, Joaquin:** approve the condensed LinkedIn-based biographies for Mason/Sebastian/Ethan/Ashley, and the final presentation of Valentina/Joaquin’s supplied biographies; provide an approved portrait or stable photo URL and permission to reuse it. Provide relevant personal work-example links or confirm actual contributions to named projects. Names are supplied; do not request them again.
2. **Joaquin:** confirm the exact company title if a company title is desired. The current descriptive heading deliberately does not invent one.
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
