# AI Team visual refresh — 2026-11-05

Scope: Jeffrey requested a more engaging, image-led `/ai-team` with modern effects and less text, plus Careers in an About dropdown.

- Reuse maintained lucide-react icons, shared Reveal progressive enhancement and site design tokens; no new animation dependency or platform.
- Hero uses newly generated, Jeffrey-approved `ai-team-high-contrast-20261105.webp` (OpenAI image generation, 2026-11-05); closing section reuses the owner-supplied realistic team banner. Abstract AI artwork; no real-client claims introduced.
- Concise role summaries replace repeated biographies/persona/quotes in the initial view. Biographies, full responsibilities and boundaries remain in native disclosures.
- Shared desktop/mobile About navigation: Our Story, Team & Delivery, AI Team, Careers. Careers removed from top level; destinations unchanged.
- Human decision-making, role-scope limitations and authorized integrations remain explicit.

Validation: lint, canonical build:ci with Worker smoke gate, TypeScript and diff whitespace checks passed. Rendered local checks passed at 1440, 768, 390 and 320px: decoded images, no horizontal overflow, five disclosures pointer-open/keyboard-close, About link bounds, Escape focus restoration. Reduced-motion rendering has no running animation; refresh defaults disclosures closed; no browser exceptions. Desktop and mobile screenshots inspected. Local database prerequisite migrations applied only locally for destination checks; production data untouched.

Delivery: review branch, not a production release. Hosted preview and production redesign not verified.
