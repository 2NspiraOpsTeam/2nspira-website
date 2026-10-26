# Careers job board

## Runtime and access

The existing vinext website serves `/careers`, `/careers/:id` and `/admin/careers`. Admin API requests revalidate the website's existing `admin_session` with the portal's protected `/api/admin/stats` endpoint. Client cookies, absent/invalid sessions, and cross-origin mutations are rejected. The dedicated `CAREERS_DB` contains openings, applicant settings, application snapshots, private document chunks and notification outcomes; it does not share billing or client tables.

Production database: `2nspira-careers`. Preview database: `2nspira-careers-preview`. Both preview deployment scripts replace the production binding with the preview database. Never publish synthetic QA roles or applicant details to production.

## Publication prerequisites

The initial Business Development Lead — Client Acquisition record is an unpublished draft containing Jeffrey’s supplied description, NYC-metropolitan-area eligibility (including nearby NJ/CT), full-time employee arrangement, $100,000 annual base plus $30,000 target incentives, benefits, and six owner-provided questions. Its cover letter is required; a résumé PDF or professional profile is accepted. The hiring notification contact is hiring@2nspira.com. Privacy/accommodation contacts and the retention policy remain unconfirmed. Do not publish it until these and the jurisdiction review are complete. Every published role requires those details, responsibilities, qualifications, a completed location-specific posting review, configured email delivery, applicant privacy/accommodation contacts and an owner-approved retention period.

Review jurisdiction-specific pay transparency (including benefits/other compensation where required), remote-work eligibility, contractor classification, required EEO/accommodation notices, application deadlines and recordkeeping obligations before publication. Actual jurisdiction requirements cannot be finalized without eligible work locations. No salary-history, protected-characteristic, confidential-client or unpaid custom-strategy questions are requested by the supplied questionnaire.

## Uploads and privacy

Uploaded documents are PDF only, maximum 3 MiB per document, with server-side extension/type/signature and total body limits. Documents are stored privately in bounded D1 chunks and fetched only through the authenticated Admin API. Downloads use fixed filenames, attachment disposition, no-store, nosniff and a restrictive CSP; PDFs are not embedded in Admin. Signature validation is not malware scanning: treat downloads as untrusted. Contact fields and questionnaire answers are validated, rendered as text, and never included in hiring notification emails. Applicant links accept HTTP(S) only and open as external links.

Applicants acknowledge the published privacy notice. A retention review date is snapshotted per application. **Retention is reviewed manually; there is no automatic deletion promise or scheduled purge.** Admin can permanently delete a candidate and its documents after checking legal recordkeeping/holds. Provider/platform backups may have independent retention. Confirm the final privacy policy and retention obligations before collecting real applications.

## Email configuration and semantics

Runtime secrets: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, and an approved `CAREERS_FROM_EMAIL` sender authorized by that Google account. `PORTAL_URL` remains the existing authentication source. No credentials are committed; do not use fake QA credentials on a hosted deployment.

An accepted application and two outbox entries are committed atomically. Applicant email confirms receipt, not hiring or interview. The designated hiring contact receives a sign-in link/reference, not application contents or attachments. Each mail entry is claimed before sending. Safe pre-send failures/provider rejections remain pending and can be retried from Admin; uncertain send outcomes remain unknown/sending and are not automatically resent. `sent` means provider acceptance, not verified inbox delivery. Review provider evidence before resolving uncertain outcomes. Publication checks credential presence, not live deliverability: conduct a separately approved synthetic hosted delivery test before publishing a real opening.

## Reliability

Client in-flight lock and server idempotency key/hash prevent duplicate creation and email on same-content retries. Different content under a previously accepted key is rejected. Opening revisions guard simultaneous edits and stale questionnaires. Submission commits condition on the opening still being published at the same revision. Closing removes the public role and rejects new applications, preserving existing candidates and questionnaire snapshots.

Per-hour hashed network identifiers rate-limit public submissions. No raw IP is stored. PDF content is not logged. SQL is parameterized. Application API and downloads are private/no-store/noindex. Admin HTML contains no candidate records; its data is loaded only after API authorization.

## Verification

`npm run test:careers` invokes the actual TypeScript service/route handlers with isolated real local D1. It mocks only portal authentication and Gmail transport, and uses synthetic applicants/PDFs. The canonical gate remains `npm run lint`, `SMOKE_PORT=<free-port> npm run build:ci`, and `npx tsc --noEmit`. Browser QA must cover the rendered listing, role form, uploads, all question types, candidate documents/status persistence, validation/errors and responsive widths; it is distinct from real hosted authentication and inbox-delivery verification.

## Initial role: jurisdiction flags (checked 2026-10-25)

- New York/NYC: confirm covered-employer thresholds and good-faith salary disclosure. NY DOL explicitly allows a fixed rate where there is no salary range; keep the $100,000 base separate from contingent incentives. [NY DOL FAQ](https://dol.ny.gov/pay-transparency-act-frequently-asked-questions).
- New Jersey: covered postings require pay, a general benefits description and other compensation; the supplied draft contains these categories. Confirm applicability/employer coverage and that benefits accurately reflect the offered plan. [NJ DOL](https://www.nj.gov/labor/myworkrights/wages/pay-transparency/).
- Connecticut: Public Act 26-12 expands job-posting disclosures to wage ranges and general benefits. Confirm the effective provisions and applicability before posting to CT residents; do not rely solely on older 2021 disclosure-on-request guidance. [Governor’s official summary](https://portal.ct.gov/governor/news/press-releases/2026/05-2026/governor-lamont-signs-legislation-protecting-workers-rights).
- Finalize approved accommodation/privacy contacts, actual benefit eligibility, and legal retention/recordkeeping obligations. Payroll, medical-plan enrollment and the incentive plan are outside this job-board implementation; the system does not create those arrangements.
