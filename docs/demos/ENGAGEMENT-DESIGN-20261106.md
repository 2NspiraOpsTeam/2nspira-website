# Demo engagement and custom operations offering — November 6, 2026

Jeffrey requested stronger heroes, visual engagement, less presentation clutter, tasteful effects, clearer trust and page-specific SEO. Scope includes `/demos`, the three industry overviews and `/websites`.

## Implementation

- Server-rendered shared heroes with actual demo screenshots, clear value propositions, direct launches and connected three-step journeys. Motion is dependency-free, non-blocking and reduced-motion aware.
- Image-led industry discovery; education inventories and detailed walkthroughs use keyboard-operable native disclosures.
- Trust content links to the human team and delivery approach. Fictional-data and simulated-action boundaries remain accurate. No new client, certification, testimonial or measured-outcome claims.
- Unique page metadata, self-canonicals, industry-specific social previews, WebPage and BreadcrumbList schema referencing existing Organization/WebSite IDs. Existing sitemap coverage preserved.
- Websites explicitly covers business websites, web applications, mobile apps and custom internal operations solutions, with direct discovery of the three industry demos. Services discovery/schema updated to match.

## Release and verification

Base: `5cea1709933ec292ac5c576467e331217e17778f`, repository `2NspiraOpsTeam/2nspira-website`. Existing Cloudflare Workers Builds main pipeline owns production. No DNS, databases, credentials, client records or standalone demo applications changed.

Canonical gates: lint, build:ci (including built-Worker routing), TypeScript and dependency audit. Render five principal routes at 1440/768/390/320px, inspect screenshots, decode images, check overflow, keyboard disclosures, real navigation, reduced motion, unique metadata, parsed schema and sitemap coverage. Verify hosted candidate and production separately against exact deployment markers. Correct metadata does not establish search-engine indexing or third-party share-cache refresh.
