# Opportunity scoring rubric v1.0
Scored 2026-11-07 UTC (2026-11-06 America/New_York). Ranking is a prioritization judgment, not a revenue forecast.

Use eight integer scores 1–5. Higher is better. Formula: total = sum(weight × score / 5), out of 100; retain unrounded totals. Missing evidence defaults to 1, not an invented midpoint. Gates override score.

| Dimension | Weight | 1 | 2 | 3 | 4 | 5 |
|---|---:|---|---|---|---|---|
| Demand confidence D |25|Idea only|Indirect adoption/regulatory signal|Credible primary target-problem evidence|At least 3 qualified buyers express specific intent|At least 3 independent paying buyers/repeat use|
| Distribution feasibility C |15|No identifiable route|Plausible channel, access untested|Specific reachable channel, no response data|Approved test yields qualified responses|Repeatable observed acquisition|
| Build ease B |10|>20 person-days/unknown|11–20 days|6–10 days|2–5 days|≤1 day|
| Defensibility F |10|Generic copy|Workflow packaging, readily copied|Niche evidence/process advantage|Authorized unique data/integration advantage|Observed durable switching/network advantage|
| Margin potential M |10|Unknown/negative base case|<30% modeled|30–59% modeled|60–79% modeled|≥80% modeled|
| Time-to-first-test T |10|>30 days/unknown|15–30 days|8–14 days|4–7 days|≤3 days|
| Capability fit A |15|Unverified/new domain|Major skill gap|Some reusable capability|Strong adjacent capability|Direct fit with demonstrated engineering/QA/workflows|
| Legal/platform tractability L |5|Prohibited or unresolved blocker|Major permissions/specialist gaps|Material review needed, bounded lawful test|Standard permissions/privacy review|Synthetic/local-only test, no material external dependency|

Effort = human-equivalent person-days for initial useful product, not autonomous elapsed time. Test time excludes waiting for owner approval/recruitment. Margin base case = (price − human labor at $50/hour − incremental tools/API/payment fees)/price; labor rate, prices and cost estimates are assumptions. No observed margin is claimed.

Demand confidence labels: low D1–2, medium D3, medium-high D4, high D5. A legal obligation is not proof of buying intent. A competitor offer is supply evidence, not verified sales.

Gates: never progress from research to external validation without authorized participants/contact and budget; never launch or accept payment without explicit authorization. No independent review = no shipped-product QA signoff. D≤2 remains exploratory even with high aggregate score. Any source conflict affecting positioning blocks compliance claims until resolved.

Tie-break: higher D, then shorter test, then lower cash cap, then stable candidate ID. Re-score on new evidence; preserve prior version, source IDs, date, rationale and outcome. Retire after failed criteria or refresh stale sources; do not silently overwrite failures.

| Candidate | D | C | B | F | M | T | A | L | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| MI-001 |3|3|4|2|3|5|5|4|71|
| MI-002 |2|2|3|3|3|4|5|3|60|
| MI-003 |2|2|4|2|3|5|4|3|59|

Rationales:
- MI-001: direct survey pain, plausible accountant channel but untested, 2–5 day bounded build, copyable CSV workflow, modeled 50% margin, ≤3 day test, direct automation fit, customer financial data and reminder controls need review.
- MI-002: rule-driven need but no buyer intent, public-sector sales/access untested, 6–10 day package, reusable evidence/triage process, modeled 39.9% margin, 4–7 day test, direct QA fit, manual accessibility expertise and legal positioning require review.
- MI-003: adoption/rule signal only, EU buyer access untested, 2–5 day package, low moat, modeled 47.7% margin, ≤3 day test, adjacent training capability, current rule interpretation/source inconsistency must be resolved.
