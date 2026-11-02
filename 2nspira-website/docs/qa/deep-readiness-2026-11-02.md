# 2Nspira deep readiness review — 2 November 2026

## Scope and attribution

Requested scope: WCAG 2.2 Level AA-oriented accessibility review, authenticated security, and isolated load/recovery testing. This is bounded engineering evidence, **not a complete WCAG conformance claim, legal opinion, forensic clearance, or production-capacity certification**.

Website baseline: `991df6a69fda171cca922dc5eb4028d83a3fe9cc`, matched to the live apex `/deployment.json` before testing. Website remediation commit: `aa977192`. Portal source baseline: `cc1b59e`; remediation: `61e2c66`. Portal live deployment inventory was inspected separately, but its source-to-runtime SHA match was not established. Do not interpret local portal results as verification of its deployed application.

Clean independent worktrees preserved unrelated unfinished changes. Local built Workers used only synthetic clients, an Admin, sessions and local D1 databases. Mail/payment-provider credentials were absent. No production stress traffic, real-client mutation, billing, email, schema, DNS, scheduler, or deployment change was performed.

## Findings and remediation

- Replaced insufficient account text contrast and unresolved legacy accent utility names with current design tokens and stronger text colors, including active navigation and destructive actions.
- Connected visible sign-in, registration and Admin form labels to their controls; named the mobile close control and announced login errors.
- Fixed client navigation that remained over mobile page content. Shared responsive account navigation now supports an inert closed state, focus placement/containment, Escape dismissal, focus restoration and background inertness. Public and account menu triggers have distinct accessible names.
- Corrected recurring-payment card reflow under narrow widths and increased text spacing.
- Patched website Next/React/vinext/Cloudflare dependencies and a scoped compatible `satori > fflate` override. Patched portal Next/OpenNext/Wrangler/workers-types within the adapter's published peer ranges, without forced/legacy peer installation.
- Fixed a reproduced portal build failure by enabling TypeScript extension imports under its existing `noEmit` configuration; reminder-worker source uses explicit `.ts` imports. Added the TypeScript/React types required by the actual clean build rather than relying on build-time auto-installation.

## Verification completed locally

- Website lint, canonical `build:ci` (including built Worker page/404 smoke checks), and TypeScript passed.
- Portal canonical OpenNext Worker build and TypeScript passed. Both installed dependency sets resolve their declared peer relationships.
- 12 portal regression tests, four reminder-worker tests and 65 meaningful Careers checks passed. Careers tests cover validation, authorization, storage, notification failure/idempotency, retention and legal-hold paths using synthetic data/stubbed delivery.
- 13 built-runtime security scenarios passed: authenticated projection/no-store; missing/malformed sessions across six client APIs; client/Admin boundary; cross-client payment-method, recurring, invoice and service denial with unchanged victim responses; allowed owner mutation and bounded repeated delete; real synthetic password sign-in/cookie flags/logout/revoked replay; invalid login JSON; valid Admin reads; expired valid-format client/Admin sessions; website proxy authentication and privacy behavior.
- 162 public page/viewport scans (54 routes at 1440, 768 and 390 CSS pixels), plus 30 synthetic signed-in scans (10 routes at the same three widths), detected no violations in the exercised axe WCAG A/AA rules and no page-level overflow. Public scan verified no page errors or missing JS/CSS assets. Third-party browser requests were blocked for the public scan; this does not assess external booking, videos, shops or linked tool apps.
- All 11 browser keyboard/task checks passed: public skip link/focus, public mobile menu, login labels/native validation/backend error/disabled submission, seven client/Admin account-menu workflows, and recoverable invalid/backend-failure Admin edits. Account workflows exercised 320px reflow with increased line/letter/word/paragraph spacing. Screenshots were inspected for corrected mobile services and recurring cards.
- An earlier scan overlapping an artifact rebuild produced missing-style target-size results; those results were not treated as product defects or clearance. The valid rerun used a stable served artifact and checked JS/CSS response success.
- Production-dependency audits: zero known advisories in each project. Full dependency audits retain **16 moderate website development-tool entries** (ESLint/minimatch chain) and **five moderate portal development-tool entries** (OpenNext/glob/minimatch chain). No critical/high entries remain in these reviewed lockfiles. Do not claim a completely clean full audit; unsafe audit-recommended downgrades were not applied.

## WCAG 2.2 AA evidence boundary

| Area | Evidence / limitation |
| --- | --- |
| Structure and labels (1.3.1, 3.3.2) | Programmatic form associations repaired; automated and targeted browser checks passed. |
| Contrast (1.4.3) | Reproduced account-text failures repaired; scanned states passed. Axe incomplete/manual contrast checks are not universal clearance. |
| Reflow/text spacing (1.4.10, 1.4.12) | Public scans at three widths; targeted signed-in workflows at 320px with increased text spacing passed. Not every state at every zoom setting was assessed. |
| Keyboard, focus, dismissal (2.1.1, 2.1.2, 2.4.7, 2.4.11) | Targeted browser keyboard checks, visible focus and unobscured corrected mobile content verified. Not a physical-device or screen-reader assessment. |
| Target size (2.5.8) | No violations detected by the selected automated rules on scanned states; motor-accessibility evaluation remains manual. |
| Error feedback and authentication (3.3.1, 3.3.8, 4.1.3) | Native required/email validation, labeled password input/autocomplete, login alert, disabled submission and recoverable failure flows exercised. Broader assistive-technology/password-manager behavior remains unverified. |
| Other criteria and complete processes | Captions/transcripts, PDFs/downloads, assistive technologies, physical devices, all content/states and third-party complete processes remain outside this bounded pass. |

## Isolated load and recovery

Mixed read-only public pages, authenticated website proxy reads and direct Admin reads ran against the local built Workers. **19262 requests, zero failures**, 185.34 seconds. Stages were sequential; browser QA also ran on the same workstation during part of the load run. These numbers describe this local synthetic environment, not production throughput or edge CPU headroom.

| Stage | Concurrency | Requests | Failures | Requests/s | p95 ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| step | 1 | 1556 | 0 | 103.72 | 16.07 |
| step | 8 | 3962 | 0 | 263.87 | 49.76 |
| step | 24 | 4485 | 0 | 298.33 | 133.33 |
| step | 48 | 4825 | 0 | 320.22 | 225.14 |
| endurance | 8 | 4393 | 0 | 36.55 | 37.02 |
| recovery | 1 | 41 | 0 | 8.16 | 31.83 |

Four 15-second increasing-concurrency steps were followed by a 120-second paced endurance stage (eight workers, 200ms pacing) and a five-second paced recovery check. No load requests were sent to production. No live payment/email provider was exercised.

## Release status and remaining work

**Fixed and locally verified; not hosted-preview or production verified.** Review PRs remain unmerged. Runtime/binding/schema checkpoints, hosted preview verification and explicit owner release authorization remain prerequisites to production promotion.

Actual VoiceOver/NVDA/TalkBack use, physical mobile devices, complete manual WCAG audit, external-service accessibility, hosted load/edge CPU/quota behavior, multi-hour endurance, provider payment/webhook execution, production account/WAF/rate-limit controls and off-device recovery were not established here. Client-managed service-field permissions/data classification remain a separate business-policy review; this task did not silently change financial permissions. Detailed raw evidence and synthetic fixture material remain private, outside Git.
