# Website chatbot: reusable free-tier demonstration

## Scope
- Public-site launcher; deliberately excluded from Admin, Portal and the standalone demo.
- `/chatbot-demo`: functional live-AI demonstration, with the same limited free API and Contact handoff as the public launcher. Questions are sent to Groq; no sensitive information.
- `/api/chat`: live provider adapter; **disabled without all three prerequisites**: `CHAT_API_KEY`, `CHAT_FREE_ONLY=verified`, and `CHAT_RATE_LIMIT` binding.
- Source information: `src/lib/chat/knowledge.ts`, curated from public service pages; no client database or tools. Questions are independent, not a multi-turn context session. UI conversation is held only in memory and cleared on close/refresh.

## Zero inference-spend activation gate
Use a dedicated **Groq Free organization, with no paid plan, automatic upgrades or billing**. Do not reuse a paid organizational key. Verify its actual plan and model access before setting `CHAT_FREE_ONLY=verified`; this flag is an operator attestation, NOT an API billing check. A dedicated website key was created on 2026-11-13 after confirming the organization’s current Free ($0) plan. It is stored only in the isolated preview Worker secret. No paid upgrade or payment method was added. Inference APIs ZDR was enabled and verified checked. Free tiers can change or disappear. Do not promise unlimited availability or absolute factual accuracy. Existing website hosting costs are separate; this code cannot guarantee zero hosting/security cost under arbitrary traffic.

Candidate: `qwen/qwen3.8-27b` on Groq. Provider documentation on 2026-11-13 lists it in limits, with non-thinking instruct mode (`reasoning_effort=none`). Live provider acceptance and bounded quality checks passed on 2026-11-13; this is not an objective best-model claim. No claim this is the objectively best model; evaluate service accuracy, prompt-injection resistance, response time and quota behavior before activation. No paid fallback, retries, routing or model switching.

Docs checked:
- https://console.groq.com/docs/rate-limits (actual account limits take precedence)
- https://console.groq.com/docs/model/qwen/qwen3.8-27b
- https://developers.cloudflare.com/workers-ai/platform/pricing/ (existing account uses standard/paid Workers; a free allowance alone does not prevent overage)
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/

## Controls and limitations
- Same-origin POST, JSON only; actual streamed body capped at 4096 bytes; question capped at 600 characters.
- Approximate Cloudflare rate limiter: 8 requests/minute per IP-derived hash AND 8 requests/minute shared per Cloudflare location. This is abuse mitigation, **not a global billing cap**. The provider's verified free-only plan is the cost boundary.
- Fixed public knowledge, fixed model, 384-token completion cap, 15s server timeout and 20s browser timeout. Server never accepts system prompts or conversation history from callers. No raw provider errors/credentials logged or exposed.
- No tools, external retrieval, file uploads, emails, bookings or account actions. Prompt guardrails are not a guarantee against hallucination; provide permanent human contact and public-source links.
- AI prose renders as text; only allowlisted same-site source URLs become links.
- Provider 429 and local rate limits show direct contact CTA. Service failure, missing credentials, malformed answers and network failure offer contact/retry without claiming success. No automatic retry after uncertain results.
- Double-click lock prevents duplicate in-flight UI submissions. Retry may cause a new inference (there are no irreversible business side effects).
- Native modal dialog contains focus; Escape/close returns it to the launcher. Dedicated demo is inline.
- Updated Privacy Policy explains question processing by Groq. Do not request confidential/personal information. Provider retention/privacy terms must be reviewed against each future client's needs.

## Validation/reuse
`node scripts/chatbot-test.mjs` runs isolated provider-stub contract tests, never real inference. Standard lint, `build:ci` and TypeScript checks still apply. `scripts/chatbot-browser-qa.mjs` covers responsive rendered flows and injected network/provider states; live-demo service-answer checks now call the real provider; error/retry/limit UI cases remain explicitly stubbed.

`node scripts/deploy-chatbot-preview.mjs` deploys only `2nspira-chatbot-demo`, no routes/DNS, no database bindings, no embedded provider credentials; provision its dedicated CHAT_API_KEY separately via Wrangler secret input. Run with CHAT_FREE_ONLY=verified only after operator plan verification. Blocks non-chat mutations and adds noindex. Production uses normal Git review/promotion, not a direct local deploy. Do not publish an unavailable live widget as a completed AI installation.
