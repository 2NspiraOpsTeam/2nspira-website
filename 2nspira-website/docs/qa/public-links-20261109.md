# Public destination audit — 2026-11-09

Scope: 66 production sitemap pages, all returned HTTP 200; 172 distinct HTTP(S) anchor destinations extracted and requested, following redirects.

- Reproduced bookstore preview links on `/work` and `/websites`; replaced both with `https://books.2nspira.com`.
- Added a clearly named bookstore entry on Creative Studio → Read, without changing saved catalogue drafts or publishing unrelated content. Omit this supplemental entry if a published catalogue card already links to the bookstore.
- Source scan of public components/content found no other preview-host app links.
- Learning Grove and Harborstone workers.dev destinations are the intentionally hosted fictional demos, not staging replacements for client production systems. Their linked entry points returned 200.
- 147 destinations returned 2xx/3xx after redirects. 25 third-party destinations remain unverified: LinkedIn, Etsy, Amazon search, Academy of Management, McKinsey, World Economic Forum, and Columbia returned anti-automation/error responses or connection failure. These are not preview links; no speculative substitutions were made.
- All tested first-party 2nspira.com destinations returned successful responses. This verifies public navigation, not authenticated app operations or checkout.

Local validation: lint (four existing ai-team warnings), canonical build:ci with route smoke tests, TypeScript, rendered bookstore navigation on Work/Websites/Read at 1440/768/390px, no page errors or overflow, and Read click-through to the live bookstore. Mobile rendering inspected.
