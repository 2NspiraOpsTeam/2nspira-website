# AI demo: voice input and visible execution

User request: make the AI effective, show what happens after approval, and add voice activation.

## Implementation
- Browser-native English speech recognition, explicit start/stop, editable 2,000-character transcript; no automatic processing or voice approval. Unsupported browsers retain typing. Disclosure covers browser speech processing; no paid transcription integration.
- Dedicated After approval workspace derives case, linked task and exact simulated outbox from authoritative server state. Pending/rejected/approved/sent states remain distinct; tasks are created, not falsely marked complete. Approval alone does not send a reply.
- Successful approvals scroll the resulting workspace into view; return-to-queue link supports the next approval. Contextual conversion CTA explains an introductory workflow discussion.
- Tightened AI prompt after two live production samples returned excessive internal/sandbox language and one suggested investigation was already underway. New guidance separates business-ready copy from UI disclosures and keeps tasks owned by the assigned team.

## Verification
- 41 existing handler checks pass: persistence, revision conflicts, approval dependencies, repeated operations, malformed/provider failure, session isolation, expiry and budget (provider mocked).
- `scripts/operations-experience-qa.mjs`: rendered 1440/768/390/320, post-approval records/outbox, refreshed persistence, editing, Escape/cancel, reset, blank input and provider failure. Browser speech stub verifies dictation, no automatic submission, denied permission, stop/retry and unsupported fallback. No page exceptions; no overflow.
- Initial real AI baseline: two synthetic production samples completed in 880/904ms; not a latency guarantee. No outbound mail or financial operation.
- Lint passes with four pre-existing ai-team warnings. Canonical build and smoke gate pass; typecheck passes.
- Preview database lacked both demo tables; applied only additive existing 0007 migration to isolated 2nspira-careers-preview, verified tables/index/foreign keys and recorded migration ledger. No production schema changes.
- Final-head hosted QA and real AI prompt checks recorded on PR after publication.

## Limits
Real microphone/audio-to-transcript recognition needs device-level testing; browser tests stub the speech API and do not prove speech service availability. Native recognition is browser-dependent. No production release authorized or performed.
