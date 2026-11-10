# Platforms & Technologies

Public placement: /automation-systems-optimization#platforms-technologies, beneath the hero message. Jeffrey superseded the standalone page with a moving carousel and requested a less text-heavy, more engaging Automation page. /platforms-technologies permanently redirects to the section; it is not listed separately in the sitemap. Primary navigation unchanged. Admin: /admin/platforms-technologies.

The introduction uses Jeffrey’s approved client-first wording. The carousel identifies technology experience across our team, including prior technical background; it does not claim every logo represents a 2Nspira engagement, partnership, endorsement or certification. Jeffrey supplied the expanded enterprise-platform and certification background on 2026-11-10. Frameworks and compliance standards (NIST, ISO, SOC 2, HIPAA, etc.), Harvard and project-management qualifications are not technology-vendor logos or public certification badges. No certification badge claims were added.

Reuse: existing authenticated Admin shell, D1 access, bounded JSON parsing and versioned atomic save/history pattern. No new CMS, service, paid subscription or runtime dependency. Tables: platform_content and platform_history, migration 0006_platforms_technologies.sql. Private experience/source references are excluded from public output; hidden entries never reach public components. Identical lost-response retries are idempotent, stale edits conflict, failed saves preserve input, double activation is locked.

Admin supports editable heading/introduction, add/remove/order/hide, official asset URL/path, official source and private experience reference. New entries start hidden. Save Changes publishes; cancel/reload and unsaved-navigation protection are provided. Blank hidden drafts are allowed; visible entries require a name, logo, official source and experience reference. Removal is saved, with prior versions retained in audit history. External logos use HTTPS and are rendered only as image resources, not HTML. Seed logos are locally hosted official artwork with original geometry and colors. Atlassian icons come from the official @atlaskit/logo 23.3.1 distribution, extracted SVGs with XML namespace added for standalone image loading.

## Official logo sources

- Microsoft: https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png
- Apple: https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png
- Cisco: https://newsroom.cisco.com/etc/designs/r/newsroom/clientlibs/clientlib-header/resources/img/cisco-logo.svg
- Salesforce: https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-with-type-logo.svg
- Amazon Web Services: https://a0.awsstatic.com/libra-css/images/site/touch-icon-ipad-144-smile.png
- Microsoft Azure: https://azure.microsoft.com/svghandler/azure/?width=150&height=150
- Google Cloud: https://www.gstatic.com/cgc/super_cloud_gradient.png
- Oracle: https://www.oracle.com/favicon.ico
- SAP: https://raw.githubusercontent.com/SAP/ui5-webcomponents/main/packages/website/static/images/sap-logo-svg.svg
- Boomi: https://boomi.com/wp-content/uploads/2024/08/cropped-Boomi_Logo_Icon_Navy.png
- MuleSoft: https://www.mulesoft.com/c/public/exp/app/favicon.ico
- Databricks: https://www.databricks.com/en-website-assets/icons/icon-512x512.png?v=c9b9916c3b27dc51866c46b79a6e9b88
- Snowflake: https://docs.snowflake.com/images/favicon/favicon.svg
- Microsoft Fabric: https://raw.githubusercontent.com/MicrosoftDocs/fabric-docs/main/docs/media/fabric-icon.png
- Power BI: https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg
- Tableau: https://www.tableau.com/favicon.ico
- Azure Data Factory: https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V25.zip
- Microsoft 365 Copilot: https://learn.microsoft.com/en-us/copilot/media/hub-images/copilot-logo.png
- Claris FileMaker: https://www.claris.com/site/astro/claris-logo-dark.CyMNUhJo.svg
- Jira: https://www.npmjs.com/package/@atlaskit/logo/v/23.3.1
- Confluence: https://www.npmjs.com/package/@atlaskit/logo/v/23.3.1
- NVIDIA: https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/nvidia-brochure/images/nvidia-logo-black.svg
- Python: https://www.python.org/static/apple-touch-icon-144x144-precomposed.png
- Cloudflare: https://www.cloudflare.com/img/logo-cloudflare-dark.svg
- GitHub: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png
- Vercel: https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png
- React: https://react.dev/images/brand/logo_dark.svg
- Next.js: https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png
- TypeScript: https://www.typescriptlang.org/icons/icon-512x512.png
- Node.js: https://nodejs.org/static/logos/nodejsDark.svg

## Validation

- node scripts/platforms-test.mjs: 28 isolated handler/D1 checks (auth, origin, invalid URLs, visible-entry requirements, duplicate IDs, save/retry/conflict, public filtering, ordering, empty grid and history-failure rollback).
- PLAYWRIGHT_MODULE=... node scripts/platforms-browser-qa.mjs <origin>: public 1440/768/390/320px, logo decoding, columns/overflow, service link and CTA, anonymous denial; isolated local Admin save/cancel/validation/error/retry/double-click/refresh/add/remove/order/hide/empty tests.
- Canonical npm run build:ci, TypeScript, changed-file ESLint and production dependency audit.

## Persistence and release

Production database identity, schema/ledger and protected row counts inspected before migration. Private SQL backup retained outside Git. Only migration 0006 was pending and applied. All seven protected row-count comparisons unchanged; foreign-key check clean. No portal/client record mutations or certification claims. Preview schema: only additive platform tables and migration 0006 ledger entry applied after backup; unrelated missing migration 0003 deliberately not bulk-applied. Initial grid/Admin rendered checks passed before the requested carousel revision. Backend checks: 28 passed. Updated carousel/page checks: 61 passed, including responsive before/after scenarios, pause/resume, hover/focus/touch, seamless loop, runtime/initial reduced motion, JSON-LD and no-JS fallback. Exact-SHA hosted verification is recorded in the PR/release report.

## Automation page refinement

Shorter service cards, user-controlled before/after workflow scenarios (intake, approvals, reporting), a clearly labeled fictional manufacturing sample, a compact three-step approach and optional eight-lens disclosure replace repeated long-form explanations. Existing useful anchors, service metadata, booking/contact links and demo URLs are preserved. Effects reuse the existing service/card reveal conventions, with scoped hero/card polish and reduced-motion fallbacks. No automatic scenario switching, invented results or client claims.

The native horizontally scrollable logo strip progressively adds gentle automatic motion after hydration. Pause/resume control, hover/focus pause and pointer/touch pause are supported. Reduced motion and no-JavaScript visitors receive a single static scrollable list; the seamless repeated list is hidden from assistive technology. All official assets are loaded eagerly to prevent blank logos as the strip advances.
