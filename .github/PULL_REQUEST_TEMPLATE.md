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