# QA Documentation

This directory contains durable technical QA reports, test results, and release validation evidence.

## Contents
- QA reports for specific commits/SHAs
- Build, lint, typecheck, and test logs
- Security scan results
- Dependency vulnerability reports
- Performance benchmark data
- Browser compatibility test results
- Accessibility audit reports
- Release validation evidence

Each QA report should follow the format established in Brian's QA findings and include:
- Exact candidate SHA tested
- Baseline SHA (if applicable)
- Build/typecheck/lint/test results
- Specific verification points (Resources remediation, contact form, etc.)
- Deterministic evidence (files, lines, screenshots)
- Findings classified by severity (BLOCKER/HIGH/MEDIUM/LOW/OBSERVATION)
- Final disposition (PASS/PASS WITH OBSERVATIONS/FAIL)

## Related
See `docs/decisions/` for architectural decisions that may impact QA focus.
See AGENTS.md for the full QA role definition and protocols.