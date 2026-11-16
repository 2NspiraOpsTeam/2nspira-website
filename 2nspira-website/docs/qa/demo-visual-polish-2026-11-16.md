# Demo visual polish — 2026-11-16

Requested by Jeffrey alongside the AI carousel additions:
- Property Management: replace green with premium navy/warm gold. The standalone fictional demo owns its palette and workflow QA; matching current desktop workspace/resident screenshots replace the old website images. Property showcase module backgrounds and collection surround use slate/ivory/gold tones.
- Demo collection: Education preview surround changes from lavender/pink to soft sky blue (#e4eef8); Manufacturing green remains unchanged.
- Education landing: reuse CatalogEffects (no new dependencies) for once-only heading/card entrance effects and hover/focus depth on four role cards, the learning snapshot and three module groups. Retain the existing restrained hero entrance. Keyboard focus cancels active entrances; reduced motion is static and content is server-rendered without JavaScript.

Local QA: canonical lint/build:ci/Worker smoke/typecheck; 320/390/768/1440 rendered layouts, image decoding, collection filter/refresh, disclosures and reduced-motion checks. Observed Web Animations entrance calls and hover transform; axe WCAG A/AA checks pass. No-JavaScript headings/cards remain visible. Desktop/mobile screenshots reviewed. Standalone property demo: npm run verify and all 70 existing browser checks pass (9 routes, responsive/a11y, connected workflows, retry/duplicate submission, persistence/recovery, privacy boundaries).

No fabricated results, real contacts, payment/email integrations, new persistence models or dependencies. Runtime/deployment verification remains a separate release gate recorded in the PR.
