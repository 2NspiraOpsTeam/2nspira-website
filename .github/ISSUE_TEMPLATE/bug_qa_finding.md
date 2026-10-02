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