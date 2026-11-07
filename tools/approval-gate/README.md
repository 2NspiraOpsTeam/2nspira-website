# Authenticated approval readiness — #175

This is a **dry-run-only candidate**, not a production authorization or deploy service. It has no merge/deploy commands, secrets or scheduler. Existing GitHub reviews and Actions are reused instead of adding a paid service or custom identity provider.

## Observed capabilities (2026-11-06)

- OpenClaw's Adam intake, acknowledgment, Telegram receipt and idempotent claim pilot passed.
- Education #176 and manufacturing #177 produced draft PRs while the prior task awaited approval. Both were subsequently merged and deployed by explicit direct operator authorization in Telegram. This is not an automated approval-loop test.
- GitHub connector exposes commit-linked PR review submission. A live `get_user_login` returned `2NspiraOpsTeam`, numeric ID `264654435`, also the author identity used by the agent CLI. Shared-account identity cannot independently attest that a human rather than an agent approved a release. GitHub also rejects author self-approval.
- This instance's `openclaw agents list --json` exposes **only `main` (Adam)**. Connected execution nodes contain Adam, not Maya/Brian/Cleo/Dax. No independent instance credentials or authorized remote management path for those agents were established. Do not create pretend local identities, copy shared tokens, or claim a team rollout.

## Review packet

A supported authenticated review must have state `APPROVED`, the exact `commit_id`, and a body containing only this JSON object (with real values):

```json
{"repository":"2NspiraOpsTeam/example","pr":10,"sha":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","environment":"production","action":"deploy","nonce":"unique-approval-nonce-0001"}
```

The authorized owner login **and numeric ID** are explicit operator configuration, not values inferred from issue text. The author cannot be the approver. An arbitrary comment, review COMMENT, issue label, CI success or conversational assent is not accepted by this verifier. A later dismissal/change request supersedes approval; review expiry is 24 hours. Target head, same-repo base, environment and action must match. Only the latest run of the configured verification workflow at that SHA can satisfy the CI gate. Optional private SQLite receipt recording atomically rejects reuse of both nonce and review ID. Never commit that ledger.

```sh
python3 -m unittest discover -s tools/approval-gate -v
python3 tools/approval-gate/gate.py /private/path/packet.json --owner-login VERIFIED_LOGIN --owner-id VERIFIED_NUMERIC_ID --workflow-path .github/workflows/verify.yml --consume-dry-run /private/path/receipts.sqlite3
```

All successful output explicitly has `dry_run_only: true` and `deploy_authorized: false`.

## Acceptance evidence and limits

13 local deterministic acceptance tests: exact packet, stale head, stale review, unauthorized identity, comment rejection, self-approval rejection, revoked approval, dismissed approval, latest failed check, missing trusted check, expired approval, wrong action, duplicate/replay. Fixture tests are **not** a live owner approval or protected CI/CD verification.

Remaining: independently authenticated human identity; live connector submission and exact-review readback; protected CI/CD integration; durable single-use consumption and revocation at the actual deploy boundary; rejection of stale/duplicate/unauthorized/failed-check requests in that protected workflow; exact deployment evidence. The local check intentionally cannot satisfy those by itself. A race-free production integration must bind approval to the artifact SHA and recheck at the protected deployment step, not authorize a moving branch. This draft must not be wired to production deploy commands as-is.

## Queue and team rollout gaps

The existing pilot permanently claims tasks, but its empty-pending watcher is not a continuous resumable queue. Interruption recovery, leases/concurrency, bounded retry/backoff, reassignment, per-agent pause/resume, blocked-task next-item pickup and independent identity routing remain incomplete. Preserve existing ledger/branches; never clear claims to force another start.

Fastest unblock: establish the authorized management connection to Maya's existing OpenClaw instance first, without credentials in GitHub or Telegram. Then inspect its existing scheduler/identity, adapt the proven five-minute intake, run one isolated assignment, verify one GitHub acknowledgment and one named Telegram receipt, work-start and progress evidence, and duplicate/failure recovery. Repeat for Brian, Cleo and Dax only after each host/identity is available. Adam remains accountable for the framework, not the owner of their projects.

No owner credential request has been issued from this draft. The precise owner-side requirement is an independently authenticated approver and an authorized connection to each existing agent instance; do not request secret values in public comments.
