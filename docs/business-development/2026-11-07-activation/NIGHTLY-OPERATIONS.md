# Maya nightly business-development operations — #185 / #178

Owner: Maya. Authorization: Jeffrey, Telegram Nov 6, 2026, “I approve” and “See if you can put into play GitHub request 185 and 178”. Existing OpenClaw scheduler is reused, not a separate CRM or paid platform. Local scheduling implements the operating work; Adam still owns shared GitHub routing and exact-version authenticated approval integration (#175/#178).

## Protected schedule (America/New_York)
- 23:00, 00:00, 01:00: bounded campaign sessions. Review prior checkpoint; funnel/analytics if truly connected; prioritize Queens/NYC website customers and referral partners; verify public source evidence and prepare exact personalized review packets. Missing analytics is unknown, not zero visits. Stop within 25 minutes per session.
- 02:00: RFP discovery, primary issuers; websites, internal tools, iOS and other aligned services; reconcile against existing tracker and prior submissions before adding anything. Up to 25 minutes.
- 03:00, 04:00, 05:00, 06:00: resumable qualification and proposal drafting. Finish best-fit eligible packages first, up to five only if genuine capacity/evidence permits; zero qualified is valid. Up to 25 minutes each. Protect 07:00 report.
- 07:00: consolidated GitHub report under #185 and #178 and concise private Telegram briefing; distinguish researched companies from buyer interest and real qualified inquiries. Up to 15 minutes.

These are bounded sessions, not promises of uninterrupted hourly work. Keep daytime responsiveness and existing research/reply/Etsy schedules intact.

## Read and preserve
Read RUNBOOK.md, STATE.json, prospects.csv, suppression.csv and relevant relationships.jsonl/checkpoints. Reuse canonical prospects.csv: no duplicate CRM. Never publish private contact information, mail, suppression records, reference identities or attachments to public GitHub. Public business-domain/source summaries and aggregate counts are okay. Canonical schema is retained; campaign export supplies supplemental company/partner type, evidence/freshness, priority, stage, next action and approval reference without pretending a second system is authoritative.

## Concurrency and recovery
Use the existing project `.run-lock` atomic directory for all canonical mutations. Create an owner.json with job ID/run token/start time. If held, do not modify data, remove the lock, or launch another mutating worker: record skipped overlap in that automation's scratch and stop. Release only your own token in finally. Never auto-break another run's lock; report an apparently stale lock for reconciliation. Keep an independent report-only run read-only if lock is held and label data freshness.
For each run, first reconcile prior checkpoint/output. Use operations/nightly-activation-2026-11-07/run-ledger.json keyed by phase + local date + scheduled hour; checkpoint started/completed/partial/blocked, output paths, actual counts, next action, GitHub report marker and verification URL. Atomic file replacement under lock. A retry must resume partial work or verify existing outputs, not rediscover/duplicate sends or reports. A completed slot is a no-op. Allow at most two transient retries with bounded backoff; save partial work and alert meaningful failures, not endless loops. Do not count an acknowledged job as business results.
Respect existing five-new-contacts/day aggregate cap across all workflows. At cap, improve existing opportunities and company-level sources without collecting additional named/email contacts. Suppression and known relationships always apply. Validate sender-specific workflow only when needed; do not reopen signatures or mail tests without a concrete problem.

## Latest approval rules — override legacy broad outreach permission for #185
Research and draft independently. Every website campaign outreach packet requires exact version, recipients, channel and send window owner approval. All final proposals need exact version, price, scope, destination and method approval. This activation is NOT blanket send/submit authority. Until Adam verifies the connected authenticated approval lifecycle, keep send actions disabled: READY FOR REVIEW or APPROVED PENDING SEND, never “sent”. No deployment, merge, ad spend, commercial promises or referee contact. Never fabricate personnel/availability, references, certifications, outcomes, ROI or pricing. Preserve owner holds and already submitted MEDA/Iditarod; no duplicate inquiries to HAC.

## Deliverables and evidence
Campaign: 4-week plan, /websites draft + three-point review offer, three UNPRICED package concepts (existing $495/year maintenance is different from proposed/unapproved $79/month CMS), sourced ranked customer/partner records, exact outreach messages, funnel schema and baseline unknowns. Match independently owned website copy work in #180/#183 before changes; no production edits.
RFP: current solicitation/addenda ledger, deadline/time zone and submission route, eligibility evidence, editable tailored narrative, compliance matrix, pricing assumptions isolated, final PDF if required and after independent visual/text QA, one-page owner decision sheet. If any mandatory evidence or attachment is missing, label PARTIAL / BLOCKED, not submission-ready.

## Daily report
Post one date-marked report per issue (search existing comments for marker before retry; reconcile uncertain outcomes before any repost). Report actual new/updated research, owner-review drafts, approved pending send, verified sends, replies, meetings, qualified inquiries, wins, RFP states/deadlines and 1–3 decisions. Unknown metrics remain unknown. Link GitHub-accessible sanitized review material; local private paths must be explicitly labeled local. Send a single concise Telegram summary to Jeffrey (default account, telegram:8183646427), identifying Maya. Avoid overnight routine notifications except urgent deadlines/failures; the 07:00 briefing is requested. Never claim shared routing/approval is verified just because local schedules pass.

## Rollback
Disable only the four automation IDs in activation-state.json. Keep files, tracker history and outputs. Existing daytime jobs are preserved. Changes to legacy sending authority remain explicitly scoped to this campaign.
