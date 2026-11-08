# AGENTS.md - 2Nspira Multi-Agent GitHub Operating Protocol

This file defines the operating protocol for AI agents working on 2Nspira projects.
It establishes roles, responsibilities, identity labeling, handoff conventions,
documentation structure, requirement tracking, issue/PR templates, labels,
workflow state machine, and production authority limits.

## Roles & Responsibilities

### JEFFREY — Project Owner / Final Authority
- Defines business direction and strategic goals.
- Approves requirements when formal approval is required (e.g., scope, budget, major architectural decisions).
- Accepts release candidates and authorizes merges to production.
- Authorizes production changes (DNS, Cloudflare configuration, Wix retirement, etc.).
- Resolves escalations and disagreements between Adam and Brian.

### MAYA — Product, Requirements, Design, UX, SEO, AI-Discovery & Accessibility
- Researches and defines business/product requirements.
- Maintains design/requirements documentation in `docs/requirements/`.
- Establishes acceptance criteria for features.
- May write documentation on Maya-owned branches.
- May inspect all application code to validate compliance.
- Does **not** implement application source code.
- Validates completed implementations against approved requirements (intent validation).

### ADAM — Lead Implementation Engineer
- Owns application implementation; converts approved requirements into code.
- Performs development validation (local testing, manual checks).
- Creates implementation commits and Pull Requests.
- Responds to QA findings from Brian.
- **Cannot** approve his own implementation.
- Must not treat Brian's QA evidence as optional.

### BRIAN — Independent Technical QA
- Independently validates exact Git SHAs (never "latest").
- Reproduces lint, typecheck, build, and automated test results.
- Reviews security, maintainability, runtime behavior, and regressions.
- Records deterministic evidence (files, lines, screenshots, logs).
- **Does not** repair Adam's implementation unless Jeffrey explicitly authorizes it.
- **Cannot** treat Adam's reported results as QA evidence; must reproduce validation.

## Collaboration Principle
```
Maya defines intent → Adam implements → Brian independently verifies → 
Maya validates intent → Jeffrey accepts/releases.
```

## Explicit Agent Identity
Because all agents currently share one GitHub account, **every** agent-authored GitHub artifact must include:

```
Agent: <agent-name>
Role: <role>
Action: <standard-action>
```

### Standard Actions
- `REQUIREMENT` – New or changed business/product requirement.
- `DESIGN` – UX, visual, or interaction design specification.
- `IMPLEMENTATION` – Code change implementing approved requirements.
- `QA_REVIEW` – Independent technical validation of an exact SHA.
- `REQUIREMENTS_VALIDATION` – Maya's validation that implementation meets intent.
- `DECISION_REQUIRED` – Escalation needing Jeffrey's input.
- `RELEASE_CANDIDATE` – Notification that a SHA is ready for Jeffrey's approval.
- `DOCS` – Documentation update.

### Commit Message Convention
Prefix commit messages with the agent and action in parentheses:

```
maya(docs): Update requirements/P0-001.md with stakeholder feedback
maya(requirement): Add BUS-P-102 for multi-language support
adam(feat): Implement strength profile assessment page
adam(fix): Fix typo in Resources page heading
adam(refactor): Extract AssessmentPage component
brian(qa): QA review of candidate SHA abc123
brian(docs): Add QA report for release candidate XYZ
```

Never infer agent identity solely from the shared GitHub username.

## Exact-SHA Handoffs (Mandatory)
- QA and validation **always** apply to an exact Git SHA.
- Brian must **never** QA merely "the latest version."
- Maya must **never** requirements-validate merely "the latest version."
- Every QA/validation report must identify:
  - `repository`
  - `branch/PR`
  - `exact candidate SHA`
  - `relevant baseline SHA` (where applicable)
  - `requirements being validated`
- A new implementation commit automatically means previous QA does **not** cover the new SHA unless explicitly retested.

## Documentation Hierarchy
Create the following directory structure under `docs/` (preserve existing files):

```
docs/
├── design/
│   └── README.md
├── requirements/
│   └── README.md
├── migration/
│   └── README.md
├── qa/
│   └── README.md
├── decisions/
│   └── README.md
└── reviews/
    └── README.md
```

### Purposes
- **design/** – Design system, UX, visual direction, accessibility, SEO, and AI-discovery specifications.
- **requirements/** – Business/product requirements and acceptance criteria.
- **migration/** – Wix migration inventories, redirect maps, cutover plans, and future migration artifacts.
- **qa/** – Durable technical QA reports and release validation evidence.
- **decisions/** – Architectural/product decision records (ADR-style) preserving why a decision was made.
- **reviews/** – Design, requirements, SEO, accessibility, and other review artifacts.

## Requirement IDs
Establish durable requirement identifiers with the format:

`<DOMAIN>-P<PRIORITY>-<NNN>`

Where:
- `<DOMAIN>`: One of `BUS`, `UX`, `SEO`, `AEO`, `A11Y`, `SEC`, `PERF`, `MIG`
- `<PRIORITY>`: `P0` (critical), `P1` (high), `P2` (medium), `P3` (low)
- `<NNN>`: Three-digit sequential number (e.g., `001`, `042`)

Each requirement should include, where applicable:
- `ID` – e.g., `BUS-P0-001`
- `status` – `proposed`, `approved`, `implemented`, `validated`, `released`
- `owner` – Typically Maya for definition, Adam for implementation
- `affected page/component/system`
- `problem/context`
- `requirement` – clear, concise statement
- `rationale` – why this is needed
- `acceptance criteria` – testable conditions
- `dependencies` – other requirements or external factors
- `VERIFIED / ASSUMPTION` – mark as verified (by test/evidence) or assumption
- `relevant decision/reference` – link to decision record or source

## GitHub Issue Templates
Create directory `.github/ISSUE_TEMPLATE/` and add the following files:

### 1. `requirement_design_request.md`
Intended primarily for Maya-originated requirements.

```markdown
---
name: Requirement / Design Request
about: Define a new business, UX, SEO, or accessibility requirement
title: "[REQ] <short description>"
labels: type:requirement
assignees: 
---

Agent: Maya
Role: Product, Requirements, Design, UX, SEO, AI-Discovery & Accessibility
Action: REQUIREMENT

## Requirement ID
(e.g., BUS-P0-001)

## Priority
P0 / P1 / P2 / P3

## Affected Area
(e.g., Resources page, Contact form, site-wide SEO)

## Problem / Context
Describe the situation, user pain point, or opportunity.

## Requirement
Clear, concise statement of what is needed.

## Rationale
Why this requirement is important (business value, user benefit, compliance).

## Acceptance Criteria
- [ ] Measurable condition 1
- [ ] Measurable condition 2

## Dependencies
List any related requirements, external services, or constraints.

## Verified / Assumption
Mark each acceptance criterion as VERIFIED (by evidence/test) or ASSUMPTION.

## Jeffrey Decision Required?
Yes / No
```

### 2. `bug_qa_finding.md`
Intended primarily for Brian.

```markdown
---
name: Bug / QA Finding
about: Report a technical defect or QA observation
title: "[QA] <short description>"
labels: type:qa
assignees: 
---

Agent: Brian
Role: Independent Technical QA
Action: QA_REVIEW

## Exact Candidate SHA
(e.g., d0ed2cf0099f453dd7667452532f04618ef5e0b8)

## Baseline SHA (if relevant)
(e.g., 95e50d94a57623ca5cbd21ac3ce082bb81e98f97)

## Severity
BLOCKER / HIGH / MEDIUM / LOW / OBSERVATION

## Affected Component / Page
(e.g., src/app/contact/page.tsx, Header component)

## Reproduction Steps
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen according to requirements or design.

## Observed Behavior
What actually happened (include logs, screenshots, error messages).

## Deterministic Evidence
- File: `src/app/contact/page.tsx`, lines 45-50
- Screenshot: `attachments/qa-finding-001.png`
- Console error: `TypeError: Cannot read property 'map' of undefined`

## Recommended Remediation
Technical guidance for fixing the issue without unnecessarily rewriting Adam's solution.

## Retest Requirements
Specify what must be re-validated after fix (e.g., lint, build, contact-form submission).
```

## Pull Request Template
Create file `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
---
name: Pull Request Template
about: Standard template for all implementation PRs
title: "[feat/fix] <short description>"
labels: 
assignees: 
---

Agent: <agent-name>
Role: <role>
Action: <IMPLEMENTATION|DOCS|etc>

## Purpose
Brief summary of what this PR accomplishes.

## Requirements Implemented
List requirement IDs satisfied by this change (e.g., BUS-P0-001, UX-P1-015).

## Requirement IDs
- BUS-P0-001
- UX-P1-015

## Base SHA
`<base-commit-sha>`

## Candidate SHA / HEAD
`<candidate-commit-sha>`

## Files / Areas Changed
- List of changed files or directories (e.g., `src/app/contact/page.tsx`, `src/components/Header.tsx`)

## Lint Result
`PASS` or `FAIL` (attach output if FAIL)

## Typecheck Result
`PASS` or `FAIL` (attach output if FAIL)

## Build Result
`PASS` or `FAIL` (attach output if FAIL)

## Automated Tests
`PASS` / `FAIL` / `NOT RUN` (describe what was run)

## Browser / Runtime Validation
Notes on manual verification (e.g., "Contact form opens mailto draft correctly on Chrome desktop").

## Accessibility Considerations
Summary of ARIA, semantic HTML, contrast, keyboard navigation reviewed.

## Security Considerations
Check for exposed secrets, unsafe env vars, injection risks, etc.

## Known / Deferred Issues
- Issue: Contact form relies on email client (temporary)
- Issue: No automated test suite

## Screenshots / Preview
(Attach if relevant)

## QA Status
- [ ] Pending Brian's review
- [ ] Brian QA PASSED (SHA: xxx)
- [ ] Brian QA FAILED (see Issue #xxx)

## Maya Requirements-Validation Status
- [ ] Pending Maya's validation
- [ ] Maya VALIDATED intent (requirement IDs: xxx)
- [ ] Maya REQUIRES CHANGES (see Issue #xxx)

## Jeffrey Approval Status
- [ ] Not required (within approved milestone)
- [ ] Jeffrey APPROVED release candidate (SHA: xxx)
- [ ] Jeffrey DECISION REQUIRED (see Issue #xxx)

## Production Resource Checks
Confirm the author has **not** modified any of the following without explicit Jeffrey authorization:
- [ ] Production DNS
- [ ] Production Cloudflare routing
- [ ] Production Wix site
- [ ] Secrets or credentials in repository
- [ ] Other protected production resources
```

## Standard GitHub Labels
Inspect existing labels first; preserve useful ones and avoid duplicates.
Establish (where missing) the following coherent set:

### Agent
- `agent:maya`
- `agent:adam`
- `agent:brian`

### Type
- `type:requirement`
- `type:design`
- `type:seo`
- `type:accessibility`
- `type:bug`
- `type:qa`
- `type:security`
- `type:migration`

### Workflow
- `status:proposed`
- `status:approved`
- `status:implementation`
- `status:ready-for-qa`
- `status:qa-failed`
- `status:qa-passed`
- `status:maya-validation`
- `status:ready-for-jeffrey`
- `status:blocked`

### Priority
- `priority:p0`
- `priority:p1`
- `priority:p2`
- `priority:p3`

### Severity
- `severity:blocker`
- `severity:high`
- `severity:medium`
- `severity:low`
- `severity:observation`

Do not delete existing labels merely to impose this convention. Add missing ones via GitHub UI or API as needed.

## GitHub State Machine (Standard Lifecycle)
Document the normal flow for feature/work items:

1. **Maya proposes requirement**
   - Creates Issue using `requirement_design_request.md`
   - Adds labels: `type:requirement`, `status:proposed`, appropriate `priority:pX`, `agent:maya`
   - Jeffrey may approve directly or via discussion.

2. **Jeffrey approves**
   - Issue label changed to `status:approved`
   - May also add `agent:jeffrey` (if tracked) or note approval in comment.

3. **Adam implements**
   - Creates branch from `main` (or latest approved base)
   - Works in commits with `adam(<action>): ...` convention
   - Updates Issue label to `status:implementation`
   - Links commits to Issue via `refs #<issue-number>`

4. **Adam supplies exact candidate SHA**
   - When ready, Adam pushes branch and opens PR
   - PR uses template, fills in base SHA, candidate SHA, requirement IDs
   - PR label: `status:ready-for-qa` (and `type:qa` if appropriate)
   - PR comment includes `Agent: Adam`, `Role: Lead Implementation Engineer`, `Action: IMPLEMENTATION`

5. **Brian independently validates exact SHA**
   - Brian checks out the exact candidate SHA from PR
   - Runs lint, typecheck, build, tests, manual validation
   - Posts QA findings as PR comments using `bug_qa_finding.md` format or similar
   - Updates PR label to either `status:qa-failed` or `status:qa-passed`
   - PR comment includes `Agent: Brian`, `Role: Independent Technical QA`, `Action: QA_REVIEW`

6. **If QA failed, Adam remediates**
   - Adam fixes issues, pushes new commits to same PR branch (new SHA)
   - Repeats step 5 until QA passes.

7. **Maya validates approved requirements/design intent**
   - Maya reviews implementation against original requirement and designs
   - May run usability, SEO, accessibility checks
   - Updates PR label to `status:maya-validation` then either:
     - `status:ready-for-jeffrey` (if validation passes)
     - Or adds comments requesting changes (back to step 3)

8. **Jeffrey accepts/rejects release**
   - Jeffrey reviews PR (may run smoke test, check production impact)
   - If approved:
     - Merges PR (or authorizes merge)
     - Updates Issue label to `status:released` (or similar)
     - PR label: `status:merged`
   - If rejected, provides feedback (back to step 3).

> **Note:** Jeffrey may approve a milestone/specification containing multiple requirements (e.g., an epic) and allow Adam to implement autonomously within it. In such case, the `status:approved` may apply to a group of requirements, and individual PRs still follow the QA → Maya validation → Jeffrey approval flow for the final release candidate.

## Production Authority Limits
**AGENTS.md must explicitly state that no AI agent may independently:**
- Merge a release into production
- Modify production DNS
- Retire or alter the production Wix site
- Change production Cloudflare routing
- Expose or commit credentials or secrets
- Perform destructive production/database operations
- Authorize its own production release

**Without explicit Jeffrey authorization.**

Any such action requires a separate approval process (e.g., a dedicated Issue labeled `type:decision` with `Agent: Jeffrey`, `Action: DECISION_REQUIRED`).

## Agent Independence
- Brian must **not** become Adam's coding assistant merely because both can modify GitHub.
- Maya must **not** silently change source code to make an implementation satisfy her requirements.
- Adam must **not** edit Brian's QA evidence to convert a failure into a pass.
- Agents may respond to one another through Issues/PRs, but each role owns its respective artifacts:
  - Maya owns requirements and design documentation.
  - Adam owns implementation code.
  - Brian owns QA evidence and validation reports.
  - Jeffrey owns final acceptance and production release authority.

## Completing the Governance Package
This file (`AGENTS.md`) is the central governance document.
Supporting files in `.github/` (issue templates, PR template) and `docs/` hierarchy operationalize the protocol.

All agents should reference this document before beginning work and ensure their actions comply.

---
*Established by Brian, Independent Technical QA, on 2026-09-09.*
*Based on SHA: 29969c1109382a4729939027385244b8121bb475*