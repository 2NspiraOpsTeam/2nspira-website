# Consulting navigation and Who We Serve review

## Organization
- Primary: Services · Work · Demos · About · Contact. Book a Conversation uses the existing Google booking URL.
- About: Our Story, Team & Delivery, Who We Serve, AI Team, Careers, expandable Creative Studio (Watch / Read / Shop plus other existing studio destinations).
- Work: existing project examples, plus a separately approved clients/project-relationships grid. Initially hidden.
- Who We Serve: Education, Manufacturing, Property Management visible. Small/growing businesses, nonprofits/community, retail/e-commerce and Creative Businesses & Media retained hidden in Admin.
- Creative Businesses & Media links digital-platform services and labels Creative Studio as our internal project; currently paused per latest direction.
- Creative Studio and Careers remain in footer. Client login remains in footer; its URL is unchanged.
- Homepage: business challenges before services; existing work/demos retained; standalone studio promotion removed; booking CTA prominent.

## Admin
`/admin/who-we-serve` edits introduction, industries and the Work relationship grid. Array order controls display order. Add entries, hide/show, edit descriptions and links, and set approved logo URLs without code changes. Blank hidden entries can be saved. Visible relationships require explicit approval, verification evidence and logo-permission references. Private references and hidden records are not passed to public components. Save Changes directly updates visible content. Revisions and actor history retained; stale revisions rejected; identical lost-response retries are idempotent. Backend errors preserve unsaved input.

## Consolidated missing information / publication prerequisites
1. For each proposed Work organization: approved display name; exact relationship (2Nspira engagement, predecessor-company work, individual/founder experience, volunteer project, partnership or internal project); verified scope and evidence; approved project URL if available.
2. For each logo: authorized logo asset/HTTPS URL and permission reference, including any required credit or display restrictions. No names or logos are seeded as approved. The grid can remain hidden at launch.
3. Screenshot attachment was not available in the received turn; the supplied structural description was used.
4. Production rollout needs the additive `0005_who_we_serve.sql` schema applied to the verified production database before deploying the schema-dependent code. Applied after Jeffrey’s production authorization: production schema and migration ledger verified, database exported, only migration 0005 applied, protected career/application/team/studio row counts unchanged and foreign-key check clean. Preview was separately backed up and checked. Older missing preview migration 0003 is deliberately not bulk-applied.
5. Jeffrey subsequently authorized production publication. Release only after local/preview checks and production schema preservation checks pass.

## Verification
Run `node scripts/audiences-test.mjs`, canonical `npm run build:ci`, typecheck, changed-file ESLint, and `PLAYWRIGHT_MODULE=<installed playwright-core entry> node scripts/audiences-browser-qa.mjs <base URL>`.
Local browser checks use synthetic local admin/database state only. Hosted checks are read-only. Do not use synthetic saves on a database shared with production.

## Observed local checks
- 22 isolated handler/D1 checks passed (including audit-failure rollback).
- 32 rendered page/Admin checks passed at desktop, tablet, 390px and 320px; save, cancel, blank validation, failed-save retention, refresh and double activation covered.
- Canonical Worker build/smoke, typecheck, changed-file ESLint and dependency audit passed (zero vulnerabilities).
- 94 consulting navigation/route checks passed at 1440, 1024, 768, 390 and 320 pixels, including nested Studio controls, footer access and preserved destination routes.
