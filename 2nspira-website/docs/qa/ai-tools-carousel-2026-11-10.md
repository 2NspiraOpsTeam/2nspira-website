# AI tools carousel — 2026-11-10

Requested and confirmed by Jeffrey: ChatGPT, Claude, Grok, OpenClaw, OpenRouter, n8n, Perplexity, GitHub Copilot, Microsoft Foundry, Microsoft 365 Copilot, Ollama, Claude Code, OpenCode, Hermes Agent, Hugging Face and Lovable. Duplicated requests for OpenRouter/Perplexity are represented once. Current names distinguish GitHub Copilot from Microsoft 365 Copilot and Microsoft Foundry from Azure Data Factory. User confirmation supplies tool-experience evidence, not vendor partnership/certification or client-result claims.

Reuse PlatformCarousel and existing service-page design rather than adding a library, animation package or new persistence model. Visible names remain beneath logos. Tools are described as hosted assistants, development and workflow tools, and local/open-weight ecosystems; the page does not misclassify every product as an open-weight model. Existing AI strategy/readiness copy, metadata and booking flows remain intact. The section is linked from the existing page shortcuts at `/ai-enablement#ai-tools`.

## Official asset provenance

| Tool | Official asset source |
|---|---|
| ChatGPT | https://chatgpt.com/cdn/assets/favicon-180x180.9e0103ce69.png |
| Claude | https://claude.com/icon.svg |
| Grok | https://grok.com/images/android-chrome-512x512.png |
| OpenClaw | https://openclaw.ai/favicon.svg (domain also linked by the official openclaw/openclaw README) |
| OpenRouter | https://openrouter.ai/favicon/glyph.png |
| n8n | https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png |
| Perplexity | https://www.perplexity.ai/favicon.svg |
| GitHub Copilot | https://raw.githubusercontent.com/primer/octicons/main/icons/copilot-48.svg |
| Microsoft Foundry | https://ai.azure.com/favicon.ico — largest 256px frame losslessly converted to PNG; current product name verified at https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry |
| Microsoft 365 Copilot | Existing verified `/images/platforms/copilot.png`; source https://learn.microsoft.com/en-us/copilot/media/hub-images/copilot-logo.png |
| Ollama | https://ollama.com/public/apple-touch-icon.png |
| Claude Code | https://code.claude.com/docs/mintlify-assets/_mintlify/favicons/claude-code/pLsy-mRpNksna2sx/_generated/favicon/apple-touch-icon.png — referenced by https://code.claude.com/docs/en/overview |
| OpenCode | https://opencode.ai/apple-touch-icon-v3.png |
| Hermes Agent | https://web-assets.nousresearch.com/marketing/7769355cb680994415a51a745c8fd0ad3ffd3fad/assets/hermes-agent/icon.png — linked by https://hermes-agent.nousresearch.com |
| Hugging Face | https://huggingface.co/front/assets/huggingface_logo-noborder.svg |
| Lovable | https://lovable.dev/apple-touch-icon.png |

All assets served locally; SVG files inspected for scripts/external content. No generated brand approximations.

## High-refresh motion defect

Reproduced against the preceding production client carousel with a mobile viewport, DPR 1 and deterministic animation callback timestamps: 16ms frames moved (33→61px in 500ms); 8ms frames remained at 0px while `data-moving=true`. Adding each fractional step to the quantized DOM scroll offset discarded the movement at high refresh rates.

Fix: carry the unconsumed subpixel remainder between frames, preserving existing pause, focus, touch, reduced-motion and loop behavior. This shared fix covers client, platform and new AI carousels. It does not override the user’s reduced-motion preference or touch pause. Timing simulation reproduces the rendering defect; it is not verification on Jeffrey’s physical phone.

Verification results and exact hosted release identifiers are recorded in the release PR.

## Local verification

- Canonical lint: zero errors, four pre-existing ai-team image warnings. Build:ci (including built Worker route/404 smoke) and typecheck pass.
- `ai-tools-carousel-qa.mjs`: 55 checks pass at 1440/1024/768/390/320px: all 16 assets/names, no overflow, autoplay/pause/loop, keyboard scroll, actual emulated touch swipe/resume, reduced motion and no-JavaScript content. Real DOM scroll quantization tested at 16/8/4ms callback intervals across AI, client and technology carousels.
- Existing client carousel regression: 141 checks pass after the shared subpixel fix.
- Desktop/mobile screenshots reviewed, including middle/end scroll positions so all logos are visually inspected. Replaced the Claude Code Docs wordmark with its official icon to avoid an incidental “Docs” label.
- Scope excludes dependencies, persistence/schema, client content, navigation and billing changes. The prior audience/navigation release is already live separately as PR #220.
