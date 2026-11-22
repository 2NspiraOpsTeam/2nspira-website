# Issue-body overlap scan

All 23 open issue titles checked; matching body lines below.

## #189 Brian: Ongoing every-other-day LinkedIn content for four staff
https://github.com/2NspiraOpsTeam/2nspira-website/issues/189
- - Work independently on content research/drafting even if an individual post awaits review, and keep Brian's primary market opportunity research (#188) moving concurrently.

## #188 Brian: Nightly Market Opportunity Intelligence Engine and research briefs
https://github.com/2NspiraOpsTeam/2nspira-website/issues/188
- **Brian is the sole accountable owner of 2Nspira's Market Opportunity Intelligence Engine**: proactively discover, validate, rank and recommend new commercial opportunities that AI agents could pursue end-to-end. Complement—not duplicate—Maya's marketing/RFP/client acquisition and Dax's existing Etsy/KDP listing execution. Preserve Brian's independent QA/validation responsibility for assigned work
- Look for demand and gaps across digital products (Etsy printables, templates), Amazon KDP publications, original music/audio, video/short-form content, creative studio offerings, useful niche apps, workflow automation, websites, and other legitimate AI-native service/product opportunities. Expand beyond these categories only when evidence warrants it. Search public sources in compliance with their
- 1. Review existing Business Hub opportunity backlog and prior research to prevent duplicate recommendations. Until #186 API is operational, maintain versioned structured research records and links in GitHub; do not pretend shared database is active.
- 3. For each viable idea prepare an **opportunity brief**: customer/persona, pain point/job-to-be-done, proposed product/service, supporting evidence and citations, alternatives/competitors, demand signal vs hypothesis, distribution channel, pricing hypothesis (clearly labeled), estimated build/production effort, platform/policy/IP risks, likely contribution of agents, and fastest low-cost real-wor
- - Maya owns outreach, partnerships, sales pipeline, RFPs and communication drafts. Brian supplies opportunity recommendations; Maya decides acquisition execution on approved priorities.
- - Dax owns detailed Etsy/KDP listings and SEO audit (#184). Brian may identify a new category/format/niche but should not replace Dax's listing optimization audit.
- Create a lightweight opportunity register (candidate ID, category, demand evidence links, confidence, ranking, stage, owner proposal, experiment, date checked, outcome), a reproducible scoring rubric and first set of 3 briefs. Integrate register into D1 Business Hub once available and authorized. Suggested cadence: a short daily report and a weekly deeper opportunity review/decision memo, with pre

## #187 Cleo: Build Executive Dashboard UI and customer/project views (independent draft)
https://github.com/2NspiraOpsTeam/2nspira-website/issues/187
- - Primary executive scorecard: qualified leads, proposals awaiting approval, contracts won, monthly recurring revenue, and projects delivered; supporting views for opportunity funnel, task statuses/agent ownership, customer/project history, QA status, decisions needing owner approval, and last night's agent output.
- Feature branch and draft PR, screenshots or secure preview, responsive and accessibility tests, proposed API contract, synthetic fixture dataset, clear progress and blocked-dependency notes. No production deployment or merger without specific owner approval. Do not create fictitious testimonials or claim synthetic data is real.

## #186 Adam: Shared Business Hub customer context, agent access and nightly work queues
https://github.com/2NspiraOpsTeam/2nspira-website/issues/186
- Common entities: organizations/customers, contacts, leads, partnerships, opportunities/RFPs, projects, tasks, notes/activity, documents/links, proposals/approvals, agent runs, audit events. Provide a stable customer ID, deduplication, timestamps, source provenance, and permission checks.
- Acceptance: inventory existing schemas, design data model/API and permission matrix, build minimal customer record and linked issue workflow, cross-agent read/write validation with denied-access tests and audit log, then test nightly queues, Telegram notifications, and approval boundaries. No prospect outreach, RFP submission, spending, contracts, or production deployment without explicit approval

## #185 Maya owns end-to-end website client acquisition campaign — 5 qualified inquiries/month
https://github.com/2NspiraOpsTeam/2nspira-website/issues/185
- - **2:00–3:00 AM:** Switch to existing RFP discovery workflow, as specified in #178.
- - **3:00–morning:** Qualify RFPs, verify eligibility/deadlines, draft up to five strong proposals as capacity permits, and compile morning report; **by 7 AM** GitHub report of verified opportunities, proposal drafts, and marketing pipeline. Do not force five proposals.
- Related: #178 nightly RFP routine; #183 website conversion audit; #182 Creative Studio.
- This builds on the 11 PM–2 AM marketing block and does not replace the 2 AM–7 AM RFP routine.
- **Protect the established RFP workflow** (#178, discovery ~2 AM, qualification ~3 AM, polished draft proposals, 7 AM report) and prior marketing activities. Balance available overnight capacity with quality; do not promise that 5 fully researched accounts are always feasible.
- **Daily briefing:** new/updated qualified customer prospects, new partner candidates, outreach drafts awaiting approval, pipeline stage movement, RFP shortlist/submission-ready proposals, and 1–3 decisions owner needs to make. Detail source URLs and report genuine data gaps.

## #184 Dax (queued): Etsy + KDP organic discoverability and keyword research audit
https://github.com/2NspiraOpsTeam/2nspira-website/issues/184
- Determine whether low sales for 2Nspira Creative Studio Etsy digital products and Amazon KDP books are primarily due to low discovery, weak listing click-through, low purchase conversion, or weak product-market fit. Current lack of private seller metrics means **root cause is a hypothesis**, not a finding.
- - Collect exact public Etsy shop/listing URLs, product IDs, and Amazon book ASINs (verify before analyzing). Audit 2nspira.com/shop and its outbound purchase links. Preserve existing URL inventory and screenshots.
- - Request *later, not while owner is driving*: Etsy Shop Manager views, visits, favorites, orders and revenue for 30/90 days per listing; KDP sales and royalty reports plus advertising impressions/clicks if available. Do not infer actual views/orders from public search.
- - Use Etsy public search autocomplete, category/filter pages, Google Trends (relative interest, location and date clearly labeled), Google search results, and any seller-accessible free Etsy Marketplace Insights searches later.
- - Inspect 5–10 comparable Etsy listings and 5–10 Amazon titles per product category where possible: title pattern, price, cover, number/quality of preview images, review counts, formats, buyer benefit, differentiators. Do not scrape in violation of site rules or purchase access tools without approval.
- - Audit Etsy titles for descriptive buyer-first phrasing, all **13 tags** where relevant, correct categories and attributes, natural language descriptions, and accurate digital vs physical disclosure.
- - Audit KDP titles/subtitles and metadata against Amazon KDP guidelines, categories, keyword slots, description, Look Inside/preview and A+ Content eligibility; do not keyword stuff or change book titles against publishing rules.
- - Provide a **ranked report** for each product: suspected bottleneck; evidence; opportunity keywords with sources/confidence; 5 competitor comparisons; proposed title/description/tag changes; new preview/storyboard; estimated effort; priority.
- - Deliver exact **before/after proposed listing copy** for top 3 products, with 13 Etsy tag suggestions (length and relevance checked) and KDP keyword/category proposals as applicable. Treat as proposed, not published.

## #183 Adam: Conversion, credibility, navigation & SEO improvement audit
https://github.com/2NspiraOpsTeam/2nspira-website/issues/183
- **P0**: Audit all top-level links, contact submissions, booking link, mobile navigation, broken links, accessibility and Core Web Vitals (real measurements). Fix critical defects by separate PR.

## #182 Adam: Build Creative Studio hub, dropdown and homepage showcase
https://github.com/2NspiraOpsTeam/2nspira-website/issues/182
- - Run build/typecheck/lint as available and test accessibility, navigation, working media, and links.

## #181 Adam: Audit AI-agent discoverability and machine accessibility (research + draft only)
https://github.com/2NspiraOpsTeam/2nspira-website/issues/181
No thematic keyword match.

## #180 Adam: Refine /websites into Websites & Digital Systems (draft only)
https://github.com/2NspiraOpsTeam/2nspira-website/issues/180
- - **Websites That Build Trust and Drive Growth:** design, SEO foundations, performance, accessibility, customer engagement; use verified client work (e.g. Teams Management only where approved and accurate).
- 4. Brief **How We Build** section: human expertise plus AI-assisted development, discovery, testing, accessibility, maintenance and support. Avoid unsupported promises or metrics.
- First audit existing page, preserve working content and SEO equity (URL, relevant metadata/internal links); propose improved title/meta description, H1-H3 hierarchy and navigation. Test desktop/mobile, anchor navigation, scroll/hover, CTA and demo links, accessibility and performance. Supply before/after screenshots, rationale, and a preview or draft PR in GitHub. Keep scope a focused refinement, 

## #179 Adam: Audit Property Management marketing page and interactive demo; improve guided customer journey (draft only)
https://github.com/2NspiraOpsTeam/2nspira-website/issues/179
- - Use a real browser (Playwright or equivalent) to inspect desktop and mobile, scroll sections, hover states, animations, links, CTAs, accessibility, responsiveness and errors.

## #178 Configure Maya's nightly RFP discovery and proposal drafting workflow
https://github.com/2NspiraOpsTeam/2nspira-website/issues/178
- Implement this as a recurring OpenClaw responsibility for Maya, integrated with the team-wide queue framework in #175. **Before creating a new workflow, inspect Maya's existing RFP search routines, past submitted proposals, templates, company profile, team credentials, and opportunity pipeline; reuse rather than overwrite existing work.**
- - Approximately 2 AM: Search legitimate public/private procurement sources accessible to Maya for relevant RFPs (AI enablement, technology strategy, websites, modernization, education, nonprofit, and other 2Nspira-aligned services).
- - For up to five strong eligible opportunities, Maya should **autonomously begin proposal drafts overnight**, using previously submitted 2Nspira proposals and verified organizational information as source material. Tailor each proposal to the RFP instructions, evaluation criteria, and client needs. Produce editable draft documents and a compliance checklist; clearly flag unknowns, missing attachme
- - By approximately 7 AM: Publish a GitHub morning report with a ranked shortlist (including zero if none qualified), opportunity links, deadlines, fit rationale, estimated effort, risks, and links to completed draft proposal documents. Distinguish fully drafted, partial, and blocked proposals. Prioritize quality over forcing five.
- 3. Dry-run one real opportunity, demonstrate source verification and a tailored editable proposal draft with compliance checklist, and share links.
- Maya should aim to deliver **polished, submission-ready** RFP response packages rather than rough outlines. Quality and compliance take priority over number completed. Each package should include:
- - RFP-specific cover letter/executive summary, understanding of the customer's needs, tailored approach, scope/deliverables, schedule, relevant verified work samples/references, governance/QA, and compelling differentiators appropriate to evaluation criteria.
- 4. Capture confirmation number, timestamp, submitted file versions and recipients/portal, and update GitHub pipeline to **submitted**. Verify receipt when possible. Escalate portal errors, registration steps, payment or deadline concerns rather than improvising.

## #177 Adam: Audit and improve Manufacturing Operations demo customer journey (draft only)
https://github.com/2NspiraOpsTeam/2nspira-website/issues/177
No thematic keyword match.

## #176 Adam: Add 3-minute guided student journey to Education demo (draft only)
https://github.com/2NspiraOpsTeam/2nspira-website/issues/176
- 6. Keep school privacy, integration, and accessibility claims accurate; no invented performance metrics, real student data, or unverified guarantees.

## #175 Team-wide OpenClaw ↔ GitHub assignment routing and authenticated ChatGPT approvals
https://github.com/2NspiraOpsTeam/2nspira-website/issues/175
No thematic keyword match.

## #174 Draft Websites page refresh: Website Modernization + transparent managed CMS pricing
https://github.com/2NspiraOpsTeam/2nspira-website/issues/174
- 2. Why modernize: usability, performance, accessibility, content editing, SEO migration safeguards, future extensibility. Avoid unverified speed/cost guarantees.
- **Single accountable owner: Adam (OpenClaw agent, Mac Studio).** Adam owns the complete draft implementation end-to-end: copy, responsive layout, CMS feasibility, accessibility and QA, operational cost review, and draft pull request. Do not automatically delegate or create cross-agent handoffs. Consult another agent only if specifically requested or genuinely blocked; retain ownership and report s

## #100 Review Websites service positioning and accessible homepage spotlight
https://github.com/2NspiraOpsTeam/2nspira-website/issues/100
- 4. **Website first. Connections where they matter:** distinguish website design/content/navigation/technical discovery work from separately scoped forms, CRM/data integrations, payments, portals, automation or AI. A labeled illustrative workflow can show inquiry -> agreed handoff -> operational visibility; not every feature is included in every engagement.
- Reference: https://www.w3.org/WAI/tutorials/carousels/ (user control/accessibility and discoverability caveat).
- **Decision requested:** approve/revise the page direction and manual homepage spotlight. After agreement, Cleo implements in a scoped feature branch/PR, validates content, metadata, desktop/mobile, contact paths, accessibility and motion/no-JS fallbacks, then releases through protected GitHub/Cloudflare with exact-SHA live verification. Business/package questions remain explicitly pending and do n

## #91 Align business social services and prioritize qualified client discovery
https://github.com/2NspiraOpsTeam/2nspira-website/issues/91
No thematic keyword match.

## #77 Prevent delayed older Workers builds from overwriting newer production releases
https://github.com/2NspiraOpsTeam/2nspira-website/issues/77
- **Observation:** Catalog merge d34b8b5f3bdaf1acf58c2508939e4406cb2ed2ad was verified live (manifest AND runtime) on Worker d8d81750-ba72-4a90-8290-b4294452494d, deployed 2026-10-17 02:26:38 UTC. An older commit b0a0ab586f385e8c47378ca96efde65d0547b50f later deployed as Worker b0ded849-7fb5-4915-8ccc-3bacbbefb95a at 02:29:51 UTC. Fresh manifest and runtime then both reverted to b0a0ab5, removing th

## #37 Portal demo sign-in returns 401 in production
https://github.com/2NspiraOpsTeam/2nspira-website/issues/37
No thematic keyword match.

## #7 B2 Requirement Handoff: Adam's Acknowledgement Request
https://github.com/2NspiraOpsTeam/2nspira-website/issues/7
No thematic keyword match.

## #2 Phase 5: Secondary Pages & Feature Development
https://github.com/2NspiraOpsTeam/2nspira-website/issues/2
- ## Summary\nImplement Phase 5 - secondary pages and feature development for the 2Nspira website.\n\n## Acceptance Criteria\n- [ ] Services page exists at /services with three capability cards\n- [ ] About page exists at /about explaining human-centered philosophy\n- [ ] Insights page exists at /insights (initial structure)\n- [ ] Contact page exists at /contact with form validation\n- [ ] Header c

## #1 QA FINDING: Cloudflare Workers Build Failure - Missing Vite Configuration
https://github.com/2NspiraOpsTeam/2nspira-website/issues/1
No thematic keyword match.
