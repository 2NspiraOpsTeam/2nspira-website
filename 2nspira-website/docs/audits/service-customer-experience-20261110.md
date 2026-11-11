# Service-specific customer experience audit

Date: November 10, 2026 (Pacific). Owner: Adam. Status: recommendations for Jeffrey's review; **no application changes or production deployment**.

## Executive decision

Preserve the visual identity, components and infrastructure. Improve service recognition, evidence and conversion within the existing layouts. The largest sales gap is Managed Services & Support, which has no standalone landing page. The largest immediate content risk is the live website page's internal draft pricing and native-mobile promotion. The existing website-first PR addresses those content issues, but its preview has a separate Team & Delivery failure that must be resolved before release.

Do not interpret an unverified claim as false, or internal demonstrations as client results. No new testimonials, credentials, delivery commitments, commercial terms or case-study outcomes are proposed as established facts.

## Scope and method

Audited the five buying journeys through homepage, Services, dedicated landing pages (or support section), Our Work, Who We Serve, Team & Delivery and Contact. Compared production with the pending website-first preview, rather than attributing preview improvements to production.

- Production: https://2nspira.com — marker `53aa3c23b6cd7bda51800cafa506a38c1a735b4b`.
- Preview: https://2nspira-website-preview.jcortez-36a.workers.dev — marker `3a5d8d3d6cb909483bff2925246d770b49ce73b7`.
- Existing implementation: [PR #225](https://github.com/2NspiraOpsTeam/2nspira-website/pull/225), still open during audit.
- Rendered Chrome review at 1440px desktop and 390px mobile: 10 shared/service routes per host, 40 observations. Production 20/20 HTTP 200; preview 18/20 HTTP 200, with Team & Delivery returning 500 at both widths. No horizontal overflow observed on those pages. HTTP success is not full accessibility or sales-quality proof.
- Read rendered text and destinations, inspected mobile service screenshots, and reviewed source for shared navigation, support positioning and inquiry prefill. Additional checks are recorded below.
- Supplementary mobile review: 28 audience/about/demo/AI-team/resource/legacy-route visits across both hosts reached HTTP 200 final destinations; coaching and mentoring URLs resolved to Services. Opened both mobile menus and service submenus: all five offers are listed, but support links to the Services anchor. Scrolled and decoded every main-content image on the four dedicated service pages on both hosts: no broken images observed. These checks do not establish full demo functionality.
- This is a service-journey audit, not an exhaustive audit of every historical article, private portal, authenticated workflow or external client implementation. Historical editorial references must not be indiscriminately deleted as service marketing.
- Scores are expert customer-perspective judgments, not usability-study results or measured conversion rates. 1 = missing/confusing; 2 = significant gaps; 3 = understandable but incomplete; 4 = strong with a specific gap; 5 = clear, direct and sufficient for this buying question.

### Six buying questions

Q1 recognize my service; Q2 understand my problem; Q3 identify deliverables; Q4 see credible delivery evidence; Q5 understand engagement; Q6 request information/proposal.

| Service | Production Q1–Q6 | Total /30 | Preview Q1–Q6 | Total /30 | Production clarity /5 | Credibility /5 |
|---|---|---:|---|---:|---:|---:|
| Websites & Custom Digital Platforms | 2,4,3,4,3,4 | 20 | 5,4,4,4,4,4 | 25 | 3.00 | 4 |
| Business Automation & Integrations | 4,4,3,3,3,4 | 21 | 4,4,3,3,3,4 | 21 | 3.50 | 3 |
| AI Enablement | 4,4,4,3,4,4 | 23 | 4,4,4,3,4,4 | 23 | 4.00 | 3 |
| Executive Technology Advisory | 3,4,3,3,3,4 | 20 | 3,4,3,3,3,4 | 20 | 3.25 | 3 |
| Managed Services & Support | 2,3,2,2,2,3 | 14 | 2,3,2,2,2,3 | 14 | 2.25 | 2 |

Clarity = mean of Q1, Q2, Q3, Q5; credibility = Q4. Preview credibility scores are unchanged because relabeling proof does not independently substantiate it. Stronger website preview scores do not clear the cross-site Team & Delivery release blocker.

## 1. Websites & Custom Digital Platforms

**Persona / objective:** Small-business owner, nonprofit leader or operations manager buying a credible public website or a scoped browser-based business platform.

**Journey:** Homepage problem card or service menu → `/websites` → client websites or platform examples → `/work`/demo → contact or booking. Live page leads with modernization and includes mobile apps; preview separates professional websites from custom platforms and leads with the requested service name.

**Strengths:** Published website examples; identifiable property/clinic/community needs; private systems distinguished from public examples; existing proposal/contact infrastructure. Preview has specific website/platform capabilities, process, ownership/support FAQ and project-specific intake.

**Weaknesses / missing proof:** Live title and app language obscure the intended offer. Internal review pricing is public. Preview has no contextual Team & Delivery or Who We Serve link in its main content. Platform evidence includes private-system descriptions and internal demos, not independently verified production access or client outcomes. A prospect must infer how their sector maps to the work.

| Question | Live score | Specific evidence / preview difference |
|---|---:|---|
| Q1 | 2 | Live hero says “Your Website Was Built for Yesterday” and “WEBSITES · APPS · CUSTOM OPERATIONS SOLUTIONS”; preview uses the exact service title and two offers (5). |
| Q2 | 4 | Modernization explains editing, performance, migration and customer tasks. Preview improves new-site/platform relevance but lacks sector-specific routes (4). |
| Q3 | 3 | Live mixes websites, web apps, native apps and proposed CMS/support plans. Preview separates website and platform deliverables (4). |
| Q4 | 4 | Teams Management and GeVitals are linked as published work; in-house work and fictional demos are labeled. Presence of a site does not independently prove every private capability (4). |
| Q5 | 3 | Live assess/plan/rebuild/test/manage stages compete with unapproved commercial material. Preview defines scope, build, launch and separate support (4). |
| Q6 | 4 | Live booking and messaging available. Preview adds “Discuss Your Project,” optional URL/timeline/budget and website/platform prefill; actual delivery was not tested in this audit (4). |

**Recommendations:** P1: finish review of PR #225, after the P0 preview blocker below. Add one compact “Relevant to your organization / Your delivery team” row linking to Who We Serve and Team & Delivery. Keep examples adjacent to their matching offer. Describe an illustrative handover checklist (content ownership, access, agreed acceptance checks, support handoff), explicitly as proposed scope, not a universal contract.

**Proposed copy:** “Professional websites. Custom platforms. A clear plan from scope to launch.” CTA: “Discuss your website or platform.” Secondary: “See relevant work.” Do not replace the approved preview headline unnecessarily.

## 2. Business Automation & Integrations

**Persona / objective:** Operations director or business owner seeking less duplicate entry and reliable handoffs across existing systems.

**Journey:** Homepage “Our operations have become too complicated” → `/automation-systems-optimization` → workflow switcher → manufacturing demonstration / Our Work → booking or generic message.

**Strengths:** Clear human problem, familiar intake/approval/reporting examples, phased start, existing-system preservation, explicit fictional-demo limitations.

**Weaknesses / missing proof:** Naming varies among Business Automation, systems optimization, operations solutions and Business Process Automation & Connected Systems. A platform-logo strip occupies early attention without proving an actual integration. No concise visible handover list specifying mapping, implementation, error handling, monitoring and ownership. Manufacturing sample demonstrates an interface/workflow, not a verified external connector deployment. No contextual Who We Serve or Team & Delivery link.

| Question | Score (both hosts) | Specific evidence |
|---|---:|---|
| Q1 | 4 | “BUSINESS AUTOMATION” and “Less busywork. More room to grow.” communicate the category; “Integrations” is not the consistent service name. |
| Q2 | 4 | Intake, approvals, reporting, copying and chasing handoffs match real buyer pain; examples remain sector-neutral. |
| Q3 | 3 | Workflow, systems integration and data themes are present; “What will we get?” remains scope-dependent rather than an inspectable deliverable set. |
| Q4 | 3 | Interactive fictional sample and concepts link provide inspectable engineering, not client integration results; vendor logos are not credentials. |
| Q5 | 3 | “Find the friction / Connect what matters / Test. Learn. Improve.” is understandable but omits exception handling, access and operating handoff detail. |
| Q6 | 4 | Top/bottom booking and bottom message fallback work as destinations; generic contact does not retain automation context. |

**Recommendations:** P1: canonical display name “Business Automation & Integrations” (short nav “Automation & Integrations”), preserving the existing URL. Add a compact “What a scoped workflow engagement can include” list: workflow map; agreed connector/data permissions; implemented workflow; test/exception checklist; named operating owner and handover. Include only capabilities the team is ready to scope. Add a clearly labeled fictional integration walkthrough showing trigger → record → approval → failure/retry → handover, using existing demo components; do not imply an external connector is live if it is simulated. Context links: manufacturing/property/small-business audiences, Our Work and Team & Delivery. P2: keep technology logos after need, scope and proof.

**Proposed copy:** “Connect the tools you already use. Reduce repeated work and make the next step visible.” CTA: “Discuss a workflow or integration.” Intake prompts: “Which tools are involved?” and “Where does the handoff fail?” Optional and non-sensitive.

## 3. AI Enablement

**Persona / objective:** Executive, operations leader or education/nonprofit manager seeking responsible adoption beyond isolated AI experiments.

**Journey:** Homepage AI card → `/ai-enablement` → six capability dimensions / five-stage roadmap → readiness scorecard, internal field notes or demo → booking / Contact.

**Strengths:** Business-first framing; governance, training and human oversight; five named potential deliverables behind disclosures; measurement framework; internal engineering explicitly distinguished from independent client outcomes. Demo accurately says its assistant uses local rules, not a live model.

**Weaknesses / missing proof:** Long mobile reading journey before buying decision; tool logos and six dimensions precede concrete scope. No published client AI adoption evidence was established by this review. Personal AI assistance on the same page broadens buyer focus. AI-team link is not the same as a direct human Team & Delivery link; audience mapping is not contextual.

| Question | Score (both hosts) | Specific evidence |
|---|---:|---|
| Q1 | 4 | AI Enablement / organizational transformation is prominent; personal-assistant offering introduces a second buyer segment. |
| Q2 | 4 | Leadership, people, workflows, safeguards and adoption address organizational problems, but sector-specific examples require navigation elsewhere. |
| Q3 | 4 | Readiness assessment, roadmap, governance/enablement plan, implementation playbooks and scorecard are named as potential outputs; not immediately visible without disclosures. |
| Q4 | 3 | Internal AI field notes and synthetic manufacturing demo support hands-on practice; neither demonstrates independently validated client transformation. |
| Q5 | 4 | Discover/Align/Prepare/Transform/Evolve and scope caveat explain progression; starter-engagement boundaries could be clearer. |
| Q6 | 4 | Free scorecard, focused conversation and message fallback; no AI-specific message prefill. |

**Recommendations:** P1: surface a short “Where we can start / What you receive” block above the framework: readiness review, adoption/governance support, or one scoped workflow pilot. Keep wording conditional on agreed scope. Link human delivery roles and relevant audiences alongside existing internal proof. P2: retain personal assistance as a clearly secondary disclosure/link, and move logos below customer outcomes. Publish only actual approved sample artifacts; if newly authored, label “illustrative template—not a client deliverable.”

**Proposed copy:** “Choose a practical starting point: assess readiness, equip your team, or test one governed workflow.” CTA: “Discuss your AI priorities.” Do not promise all five stages, guaranteed savings or model accuracy.

## 4. Executive Technology Advisory

**Persona / objective:** CEO, founder, executive director or technology leader needing independent priorities, investment guidance and delivery oversight without a full-time CIO hire.

**Journey:** Homepage leadership card / Services advisory card → `/fractional-cio` → fit, approach, sample-document descriptions and Jeffrey profile → internal engineering or generic manufacturing demo → booking/message.

**Strengths:** Recognizable leadership gap; clear distinction from help-desk support; strategy-to-execution approach; named human lead and biography route. Working-document descriptions acknowledge they are examples, not published client artifacts.

**Weaknesses / missing proof:** Main category label remains “Fractional CIO & Technology Leadership,” not the requested Executive Technology Advisory. Eight lenses and benefits are not themselves delivery evidence. No inspected advisory artifact or client advisory outcome. Generic manufacturing demo competes with executive proof. Cadence, decision rights and an initial engagement's concrete outputs remain to be scoped; no contextual Who We Serve / Team & Delivery links.

| Question | Score (both hosts) | Specific evidence |
|---|---:|---|
| Q1 | 3 | Navigation/card says Executive Technology Advisory; landing eyebrow/H1 use fractional CIO / leadership without executive overhead. |
| Q2 | 4 | Unclear priorities, vendor misalignment, stalled modernization and risk match executive concerns. |
| Q3 | 3 | Roadmap, vendor assessment, investment priorities and governance structure are described in disclosure; no sample document or defined starter scope. |
| Q4 | 3 | Jeffrey's stated experience and profile support relevance; credentials and advisory results were not independently verified here. Generic technical demo is indirect proof. |
| Q5 | 3 | Establish clarity / set direction / lead execution explains approach, but cadence, authority and reporting need more concrete explanation. |
| Q6 | 4 | “Discuss your technology decisions,” 30-minute booking and message fallback are clear; message loses service context. |

**Recommendations:** P1: exact service title in landing eyebrow or H1, retaining fractional CIO as explanation and keeping the stable URL. Show an illustrative executive decision brief or roadmap outline, clearly labeled and not attributed to a client. Add “How an engagement is agreed”: priorities, human lead, decision authority, review cadence, deliverables and boundaries, all confirmed in proposal. Add Team & Delivery and technology-leader audience links. P2: replace the generic demo placement with the existing relevant human profile/working-document section; keep demo as optional broader engineering proof.

**Proposed copy:** “Executive Technology Advisory — clear priorities, better-informed investment and accountable delivery.” CTA: “Discuss your technology priorities.” No guaranteed savings, availability or retainer scope.

## 5. Managed Services & Support

**Persona / objective:** Existing website/platform owner or growing organization seeking reliable maintenance, hosting coordination, monitoring and a clear route for changes/support.

**Journey:** Homepage lower support card / footer → `/services#ongoing-support` → brief support paragraph → generic `/contact`. There is no dedicated sales experience capable of standing on its own.

**Strengths:** Explicit coverage/fees agreement; no implied unlimited or 24/7 support. Connects implementation to ongoing improvement. Existing internal client-services platform can illustrate service coordination without exposing private records.

**Weaknesses / missing proof:** No standalone landing page, specific support intake option, support lifecycle, visible service boundaries or inspectable sample reporting. Positioning “After implementation” leaves takeover of an existing system ambiguous. Hosting/maintenance/monitoring/enhancements/advisory are listed without distinctions. No service-specific relevant work, audience or delivery-team route.

| Question | Score (both hosts) | Specific evidence |
|---|---:|---|
| Q1 | 2 | Footer/support card names the service, but primary discovery emphasizes three pillars and support resolves to an anchor, not a landing page. |
| Q2 | 3 | “Keep your technology supported as your organization evolves” is relevant but does not distinguish reliability, content changes, incidents or legacy takeover. |
| Q3 | 2 | Hosting, maintenance, monitoring, enhancements and retainers are broad categories with no example scoped service checklist. |
| Q4 | 2 | Own portal/service-management description is adjacent internal experience, not independently established support performance or a service report. |
| Q5 | 2 | Coverage and fees are agreed; onboarding, request handling, reporting, ownership, escalation and exit/handover are not explained. |
| Q6 | 3 | “Discuss ongoing support” reaches Contact, but the preview project-type list omits this service and service context is not carried. |

**Recommendations:** P1 (highest structural priority): propose `/managed-services-support`, using existing service components. Sections: who it fits; support areas scoped to agreement; onboarding and access review; request → triage → authorized change → verification → report; exclusions/third-party dependencies; responsible human team; sample report; CTA. Clarify whether non-2Nspira builds are accepted only after Jeffrey's business decision; do not promise takeover, response times, uptime, backup retention or emergency coverage. Add support to intake and make header/footer/home/service discovery reach the new page. P2: anonymized illustrative monthly service report, not a fabricated client report.

**Proposed copy:** “Keep your website and platforms supported—with clear responsibilities and an agreed scope.” CTA: “Discuss managed support.” Optional intake: system/site, current provider, priority and desired coverage. Never request credentials in the public form.

## Cross-site findings and proposed navigation

Keep the current three-pillars-plus-advisory/support commercial structure; make all five offers findable without adding a mega-menu or redesign. Do not reintroduce a Who We Serve dropdown.

| Customer-facing area | Confirmed gap | Proposed small change | Priority |
|---|---|---|---|
| Preview Team & Delivery | `/team-delivery` returned 500 on desktop and mobile; production returned 200 | Diagnose preview runtime/data prerequisite, fix in a reviewable change; repeat both hosts/widths. Do not assume source or D1 cause without logs. | P0 release blocker, preview only |
| Live Websites | Native iOS/Android offering and “INTERNAL REVIEW DRAFT · NOT AN OFFER” pricing publicly visible | Review existing PR #225 removal; do not duplicate its patch or merge as part of this audit. | P1 urgent |
| Service naming | Business Automation / systems optimization; Executive Advisory / Fractional CIO; live Digital Platforms / websites & apps | Canonical full names in pages/metadata/cards; consistent short nav labels; retain stable historical URLs. | P1 |
| Support discovery | Footer anchor plus generic intake | Dedicated page and explicit support intake, preserving three primary pillars. | P1 |
| Contextual cross-links | All four dedicated preview service pages link to Our Work; none link in main content to Who We Serve or `/team-delivery` | One compact relevant-audience / delivery-team row, not three duplicated card grids. Shared footer access does not replace contextual relevance. | P1 |
| Inquiry context | Preview URL prefill implemented only for websites/platforms; no support option | Add allowlisted service parameters for all five; preserve draft values and existing API delivery/idempotency protections. | P1 |
| Proof relevance | Internal demo repeatedly used for unrelated service confidence | Match each page to appropriate published work, human qualifications or clearly labeled illustrative artifacts. | P1 |
| Homepage evidence | Teams resident reviews concern property-management service, not 2Nspira delivery (caption does disclose this) | Keep clear attribution; consider moving adjacent to client context rather than using as apparent agency endorsement. Do not rewrite as agency testimonials. | P2 |
| Resource terminology | `/resources` still shows “Coaching & career conversations” and “Coaching” as assessment/resource language on both hosts, not a restored mentoring service | Clarify as self-reflection / role-fit resources if approved; preserve legitimate historical/editorial uses. No coaching service link was found in the tested service menus. | P2 |
| Homepage length | Many repeated routes to purpose, founders, services and work before/after key evidence | Consolidate repeated prompts within existing components only if approved; preserve imagery and identity. | P2 |

Proposed short service menu: **Websites & Platforms; Automation & Integrations; AI Enablement; Executive Advisory; Managed Support**. Full landing-page names follow Jeffrey's five-service list. This is a proposal, not an assertion that navigation has already changed. Creative Studio stays separate publishing/IP. “Mobile-friendly” and “responsive” remain valid website capabilities; remove standalone native iOS/Android/app-store service promotion, not legitimate browser/mobile usability language.

## Confirmed versus requires verification

**Confirmed:** Rendered content/status findings above; live obsolete website offers; preview website-first improvements; preview Team & Delivery failure; generic support destination; preview intake choices and website/platform-only prefill; main-content cross-link gaps. Source-only obsolete identifiers or historical editorial uses are not proof of current active service promotion.

**Requires verification before publication or promises:** client permission for any additional artifacts/logos; precise project scope/production features; claimed qualifications, histories and broad client relationships; human engagement availability and role assignments; advisory/AI client results; support eligibility for inherited systems; actual support capacity, response windows, escalation, backup/restore terms and third-party costs. Current pages' existing claims were recorded, not newly endorsed or independently verified.

**Not tested in this audit:** live contact-email submission/inbox delivery; booking completion or calendar availability; authenticated Admin/client systems; actual external integrations; measured service reliability; full WCAG conformance; tablet/all-device coverage; customer conversion or timed 30-second comprehension with participants. Existing PR #225 reports prior simulated form checks; those are separate evidence, not this audit's live-delivery verification.

## Reviewable implementation sequence

1. P0: repair preview Team & Delivery and record root cause and desktop/mobile successful response/rendering. This is not evidence of a production outage.
2. P1: approve/revise PR #225 for website naming, obsolete app removal and removal of internal pricing; retain its existing local/preview QA evidence and retest the cross-site blocker.
3. P1: prepare a small follow-up implementation PR for canonical labels, five-service inquiry context, support page, and contextual human-team/audience links. Use existing layouts, native disclosures and delivery infrastructure. No new library or platform is needed; existing components already support this content scope.
4. P1/P2: review service-specific illustrative scope/artifact content; obtain business decisions only where an actual commitment is involved. Add genuine evidence as available, not invented case studies.
5. Before any separately approved production deployment: responsive rendered journeys for all five services, keyboard navigation/disclosures, deep links, metadata/schema, retired redirects, loading/validation/backend error states, draft refresh, clear/cancel behavior where provided, duplicate/retry guards with mocked transport, and exact deployment marker verification. No real prospect/client communications for QA.

This audit PR changes documentation only. Application implementation remains proposed for review; production deployment and merging PR #225 are not authorized by this report.

## Evidence inventory

[Machine-readable route, navigation and image observations](service-customer-experience-20261110-evidence.json) records the tested hosts, statuses, final destinations, headings, service-menu links and image decode outcomes. Original rendered text informed the quoted evidence above. HTTP 200 final destinations for legacy routes mean the browser followed redirects; first-hop redirect codes were not measured in this audit. Screenshots were inspected locally; no client/private system access was used.
