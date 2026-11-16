# #266 — AI Operations Hub

Owner: Adam alone. Scope: a new dedicated demonstration at `/demos/ai-operations` and its own entry in `/demos`. No homepage, service-page placements, existing-demo replacements, DNS, email transport or customer-data changes.

## Design and existing-solution preflight

Reused the existing React/vinext Worker, D1 binding, rate-limit binding, and Groq provider rather than adding a workflow platform, SDK, paid service or provider. An off-the-shelf automation product would introduce unnecessary credentials/infrastructure and would not itself supply the narrowly scoped, approval-gated public demonstration. Small custom workflow code uses existing platform primitives.

**Naming correction:** existing AI is Groq, not xAI Grok. `src/lib/chat/provider.ts` now owns the shared transport, fixed `qwen/qwen3.8-27b` model, timeout, bounded completion, no tool calls and no retries. Chat keeps its existing prompts, 384-token ceiling, response contract and guards; Operations uses separate prompts, strict validated JSON and 1,200 output tokens. A new integration would require a new provider/credential; none was added. Existing live `/api/chat` answered a synthetic service question successfully before release. This proves current provider availability, not new-demo quality; deployed demo checks are recorded separately below.

## Workflow contract

- Five selectable messages and fictional custom input (1–2,000 characters). Real model output only; provider or schema failure is an honest error, never a fabricated completion.
- Only the two hardcoded synthetic invoice records are given to AI. No real invoice lookup, refund, balance mutation, HR, project or inbox integration.
- Analysis persists proposals, not cases/tasks. Explicit case approval generates and persists a CASE ID. Separate task approval requires the case and generates a TASK ID. Case/task records are actual session JSON in D1, not browser-only display state. Record assignment follows the human-reviewed team. Approved case/task contents are immutable.
- Reply approval binds to the current saved draft. Editing revokes approval, rejection requires revision, and simulated send is independently guarded. A sent draft cannot be altered or resent. There is no mail transport imported or available as a tool to AI.
- Every write uses server-side compare-and-swap revision checks; stale/concurrent retries cannot duplicate a case, task or simulated send. The reviewer is a clearly labeled **demo role**, not an enterprise authenticated identity.
- Audit identifies System / AI / Demo reviewer and records timestamp, review revision, IDs and simulated send. No staged progress: analysis shows waiting, then actual returned proposals.
- Processing another request replaces current sandbox records/approvals; UI discloses this. Reset deletes the prior session. No other visitor is affected.

## Isolation, minimization and cost controls

Cookie: random 256-bit capability, `__Host-ops_demo`, Secure, HttpOnly, SameSite=Strict, Path=/, Max-Age=3600. D1 stores only its SHA-256 hash. Access checks expiry on every read/write. No GET creates a session; POST requires exact same-origin JSON, actual body stream <=12,000 bytes, and rate-limit binding. Session data is unavailable after one hour and expired rows are purged on subsequent POST activity. Raw input, proposals and audit stay only in that isolated short-lived session; visitors are warned not to enter personal/sensitive data and that Groq processes inputs. Provider retention is outside the session TTL.

Eight actions/minute per hashed-IP visitor; analysis also reserves the website shared limiter. An atomic durable D1 upsert reserves **at most 100 requests per UTC day**, each with bounded input and 1,200 output tokens (<=120,000 possible output tokens/day; input tokens additional). Failed or competing requests consume their reservations conservatively. Existing verified-free-only attestation and key are required; no paid fallback, new provider or automatic retries. Provider free quotas may be lower. A 20-second provider deadline prevents indefinite request waits. A disconnected in-progress session can be reset; it does not fabricate recovery.

SQL is parameterized. Untrusted messages are encoded as user data, isolated from the system prompt. No model tools, credentials in prompts, side-effect dispatch or HTML rendering. Structured output is length/type validated and React renders it as escaped text. Prompt injection can influence proposed text, so a human must read it; it cannot authorize actions or reveal unavailable secrets. Session access and D1 revision gates, not model obedience, enforce authority.

## Persistence migration

`migrations/careers/0007_operations_demo.sql` adds only `operations_demo_sessions`, its expiry index and `operations_demo_budget`. No existing tables are altered and no real billing/client records are touched. Existing database binding is reused, but table namespace, capabilities and records are separate from careers/chat.

Before applying: verified current schema and migrations 0001–0006; only 0007 was pending; foreign-key check clean. A private D1 backup and protected row-count baseline were captured outside Git. Local migration executed successfully. Production migration 0007 applied successfully on 2026-11-16 at 14:11 UTC. Ledger confirmed; foreign-key check clean; protected counts unchanged (career jobs 3, applications 0, platform content 0). No existing rows were modified.

## Reproducible checks

From `2nspira-website/`:

```
node scripts/operations-test.mjs
node scripts/chatbot-test.mjs
npm run lint
npm run build:ci
npx tsc --noEmit
```

Operations: **41 checks passed**, using actual SQLite for SQL/CAS/budget behavior and a mocked model. Includes origin/body guards, missing configuration, quota, invalid input, no pre-approval mutation, dependent task approval, stale/duplicate clicks, immutable records, edited reply re-approval, rejection, duplicate send, reset/old capability revocation, refresh persistence, session expiry, provider errors, malformed output and hostile input. Chat: **19/19 regression checks passed**, provider mocked. No real outbound email was sent.

Rendered QA: start the built Worker on 4266 with `--persist-to /tmp/266-d1`; run `node docs/reviews/266/browser-qa.mjs`. It uses the actual workflow handler and SQLite with **mocked AI responses**, not canned production responses. Tested 1440/768/390/320px, no overflow/page exceptions, case/task approvals, dialog Escape, reply edit/save/approve/simulated send, refresh, reset, custom clear/empty/disabled and honest provider failure. Screenshots in `screenshots/` show this synthetic QA run. Local built Worker GET also confirmed D1 session API returns 200. Live provider and D1 mutation proof are separate below.

Axe-core WCAG 2 A/AA + 2.1 AA run against the demo main surface; discovered a 4.49:1 character-counter contrast and darkened it. After the corrected build, automated main-surface scans reported **zero violations** at 1440/390/320px. This is automated scope plus keyboard/interaction checks, not a claim of comprehensive accessibility certification.

## Release evidence

Pending final publication marker and live real-AI/browser checks. No separate staging preview is required under the issue’s latest explicit owner authorization; automatic preview checks, if any, are incidental. Broader marketing promotion remains excluded.
