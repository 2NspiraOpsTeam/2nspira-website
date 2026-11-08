# MI-002 — business case v5, November 8 Eastern

Title II evidence-and-remediation handoff pack for public-sector web vendors

**Conditional, not an approved launch. Expected revenue not estimable from measured data.**

## Strategic fit and next proof

Strongest website-modernization/maintenance adjacency; hypothesized existing-client/partner route, not confirmed client access or funded pipeline.

Synthetic five-template evidence demo, specialist cost check, then three consented existing-client/agency interviews only after authorization. Pass:2 specific scope/price-qualified quote requests and reviewer-backed delivery cost <=$975. Fail:0 requests or unfillable manual-review role;1 request or insufficient recruitment inconclusive. Proposed cap:$150 cash/12 human hours; no expenditure.

## Agent delivery chain / blockers

- research and provenance: proposed Brian. Tools/access: gh, public web_fetch/search, private research API client; available in Brian runtime.
- original creation/engineering: proposed Adam with Brian specifications. Tools/access: Git/local fixtures; editor/approved model access unverified in recipient runtime.
- independent QA: proposed Separate qualified finance/accessibility/EU-training/caption reviewer; Brian only if not builder and genuinely independent. Tools/access: Domain knowledge, manual test environment and consented fixtures; reviewer capacity not verified.
- approved distribution: proposed Maya; Jeffrey exact scope/channel/budget approval. Tools/access: Authorized client route/account connector not proven; no outreach this run.
- approved technical publishing: proposed Adam, Cleo release/ops as assigned. Tools/access: Git review and authorized runtime; no merge/deploy by this research task.
- support and iteration: proposed Adam technical, Maya customer follow-up subject to approval. Tools/access: Permissioned issue/support queue, client agreement unverified.
- measurement/reporting: proposed Brian research; Cleo dashboard; Adam shared API. Tools/access: Versioned D1/Git available from Brian; Cleo live binding/peer access unverified.

Qualified keyboard/screen-reader/manual reviewer required; legal applicability needs entity-level review; no compliance certification.

## Formula-backed scenarios (not forecasts or actuals)

units=floor(min(months*leads_per_month*conversion,months*32/hours_per_sale)); bookings=units*price; revenue=bookings-refund_reserve (completion assumed); contribution=bookings-units*(labor+tools+3%fees+2%refunds); net=contribution-monthly_fixed*months-launch_cost

{
  "currency": "USD",
  "all_values": "hypotheses not quotes, realized margin, approved spend or measured demand",
  "mvp_effort": "6–10 person-days",
  "human_review_and_delivery_hours_per_sale": 16,
  "human_rate_usd_per_hour": 50,
  "price_per_unit_usd": 1499,
  "tools_api_production_hosting_per_unit_usd": 100,
  "payment_platform_fee_rate_assumed": 0.03,
  "refund_rate_assumed": 0.02,
  "variable_cost_usd": 974.95,
  "contribution_per_unit_usd": 524.05,
  "contribution_margin": 0.3496,
  "launch_labor_hours": 64,
  "launch_cash_usd": 150,
  "launch_cost_usd": 3350,
  "fixed_maintenance_support_monthly_usd": 110,
  "fixed_cost_assumption": "1h labor+$10 tools monthly; MI-0022h+$10. Uncontracted; no verified supplier cost. Tools include incremental agent compute; subscriptions could increase costs. Taxes/owner overhead excluded; scope overruns extra. Refund reserve removes revenue once, not twice.",
  "model_formula": "units=floor(min(months*leads_per_month*conversion,months*32/hours_per_sale)); bookings=units*price; revenue=bookings-refund_reserve (completion assumed); contribution=bookings-units*(labor+tools+3%fees+2%refunds); net=contribution-monthly_fixed*months-launch_cost",
  "forecast_expected_revenue": "NOT ESTIMABLE: no verified reachable audience, traffic, conversion or launch authorization",
  "scenarios": [
    {
      "name": "conservative",
      "inputs": {
        "hypothetical_qualified_leads_per_month": 0,
        "unvalidated_conversion": 0,
        "verified_reachable_audience": null,
        "verified_traffic": null,
        "verified_leads": null,
        "capacity_human_hours_per_month": 32,
        "capacity_confirmed": false
      },
      "break_even_month_after_launch": null,
      "outputs": [
        {
          "months_after_hypothetical_authorized_launch": 3,
          "qualified_leads": 0,
          "units": 0,
          "gross_bookings_usd": 0,
          "modeled_recognized_revenue_usd": 0.0,
          "refund_reserve_usd": 0.0,
          "payment_platform_fees_usd": 0.0,
          "human_delivery_labor_usd": 0,
          "tools_api_hosting_usd": 0,
          "gross_contribution_after_refunds_usd": 0.0,
          "fixed_support_maintenance_usd": 330,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": -3680.0
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 0,
          "units": 0,
          "gross_bookings_usd": 0,
          "modeled_recognized_revenue_usd": 0.0,
          "refund_reserve_usd": 0.0,
          "payment_platform_fees_usd": 0.0,
          "human_delivery_labor_usd": 0,
          "tools_api_hosting_usd": 0,
          "gross_contribution_after_refunds_usd": 0.0,
          "fixed_support_maintenance_usd": 660,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": -4010.0
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 0,
          "units": 0,
          "gross_bookings_usd": 0,
          "modeled_recognized_revenue_usd": 0.0,
          "refund_reserve_usd": 0.0,
          "payment_platform_fees_usd": 0.0,
          "human_delivery_labor_usd": 0,
          "tools_api_hosting_usd": 0,
          "gross_contribution_after_refunds_usd": 0.0,
          "fixed_support_maintenance_usd": 1320,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": -4670.0
        }
      ]
    },
    {
      "name": "base",
      "inputs": {
        "hypothetical_qualified_leads_per_month": 5,
        "unvalidated_conversion": 0.2,
        "verified_reachable_audience": null,
        "verified_traffic": null,
        "verified_leads": null,
        "capacity_human_hours_per_month": 32,
        "capacity_confirmed": false
      },
      "break_even_month_after_launch": 9,
      "outputs": [
        {
          "months_after_hypothetical_authorized_launch": 3,
          "qualified_leads": 15,
          "units": 3,
          "gross_bookings_usd": 4497,
          "modeled_recognized_revenue_usd": 4407.06,
          "refund_reserve_usd": 89.94,
          "payment_platform_fees_usd": 134.91,
          "human_delivery_labor_usd": 2400,
          "tools_api_hosting_usd": 300,
          "gross_contribution_after_refunds_usd": 1572.15,
          "fixed_support_maintenance_usd": 330,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": -2107.85
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 30,
          "units": 6,
          "gross_bookings_usd": 8994,
          "modeled_recognized_revenue_usd": 8814.12,
          "refund_reserve_usd": 179.88,
          "payment_platform_fees_usd": 269.82,
          "human_delivery_labor_usd": 4800,
          "tools_api_hosting_usd": 600,
          "gross_contribution_after_refunds_usd": 3144.3,
          "fixed_support_maintenance_usd": 660,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": -865.7
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 60,
          "units": 12,
          "gross_bookings_usd": 17988,
          "modeled_recognized_revenue_usd": 17628.24,
          "refund_reserve_usd": 359.76,
          "payment_platform_fees_usd": 539.64,
          "human_delivery_labor_usd": 9600,
          "tools_api_hosting_usd": 1200,
          "gross_contribution_after_refunds_usd": 6288.6,
          "fixed_support_maintenance_usd": 1320,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": 1618.6
        }
      ]
    },
    {
      "name": "optimistic",
      "inputs": {
        "hypothetical_qualified_leads_per_month": 10,
        "unvalidated_conversion": 0.2,
        "verified_reachable_audience": null,
        "verified_traffic": null,
        "verified_leads": null,
        "capacity_human_hours_per_month": 32,
        "capacity_confirmed": false
      },
      "break_even_month_after_launch": 4,
      "outputs": [
        {
          "months_after_hypothetical_authorized_launch": 3,
          "qualified_leads": 30,
          "units": 6,
          "gross_bookings_usd": 8994,
          "modeled_recognized_revenue_usd": 8814.12,
          "refund_reserve_usd": 179.88,
          "payment_platform_fees_usd": 269.82,
          "human_delivery_labor_usd": 4800,
          "tools_api_hosting_usd": 600,
          "gross_contribution_after_refunds_usd": 3144.3,
          "fixed_support_maintenance_usd": 330,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": -535.7
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 60,
          "units": 12,
          "gross_bookings_usd": 17988,
          "modeled_recognized_revenue_usd": 17628.24,
          "refund_reserve_usd": 359.76,
          "payment_platform_fees_usd": 539.64,
          "human_delivery_labor_usd": 9600,
          "tools_api_hosting_usd": 1200,
          "gross_contribution_after_refunds_usd": 6288.6,
          "fixed_support_maintenance_usd": 660,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": 2278.6
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 120,
          "units": 24,
          "gross_bookings_usd": 35976,
          "modeled_recognized_revenue_usd": 35256.48,
          "refund_reserve_usd": 719.52,
          "payment_platform_fees_usd": 1079.28,
          "human_delivery_labor_usd": 19200,
          "tools_api_hosting_usd": 2400,
          "gross_contribution_after_refunds_usd": 12577.2,
          "fixed_support_maintenance_usd": 1320,
          "launch_cost_usd": 3350,
          "net_after_launch_and_maintenance_usd": 7907.2
        }
      ]
    }
  ],
  "sensitivity": [
    "Reachable qualified leads and conversion: entirely assumed; zero qualified leads yields zero bookings.",
    "Human delivery hours/rate: double labor subtracts 800USD per unit; specialist premiums may erase modeled contribution.",
    "Fixed support and one-off build amortization: low volume can make a nominally positive unit margin unprofitable."
  ],
  "actuals": {
    "experiments_run": 0,
    "units_sold_verified": 0,
    "revenue_verified": false,
    "bookings_or_sales_analytics": "not measured; no sales by these experiments",
    "forecast_vs_actual": "not applicable; no authorized launch/date; compare only after actuals recorded"
  }
}

## Examples That Work — supplier evidence, not verified success

[]

Examples/monetization evidence pending bounded primary review; supplier existence does not establish commercial success.


## Focused primary-source second pass

# MI-002 focused second pass — November 8, 2026 Eastern

Brian accountable. Updated same ID/buyer/problem/channel; adjacent segment hypotheses, not new prospects. Research completed; package viability, staffing, purchases and revenue NOT proven. No audit of a customer's site, outreach, bid, spend or production change. Compared with prior MI-002: fresh official scope/deadline check, three primary supplier comparables with two price benchmarks, stronger manual-staffing and existing-maintenance boundaries. No verified RFP/award or qualified buyer intent. Score60 remains provisional/exploratory.

## Applicability / segments

- State/local agencies, public schools, public libraries and public higher education: TitleII scope per DOJ. Population/entity status determines compliance date, not our chosen package. Special district governments have the2028date. School-district classification/population requires specific review; do not assume every school is special district.
- Private small businesses/nonprofits/private schools: not automatically TitleII entities. A nonprofit delivering a public service under government arrangement can be part of the public entity's obligations. TitleIII/other laws/contract requirements need separate competent review; no universal exemption or universal2027deadline inferred.
- Existing modernization/maintenance clients: highest adjacency, but no client roster, current statement of work, consent, eligible public entity or funded need verified. Do not label all current clients affected.
- Web-agency partners: subcontractor evidence/ticket/retest handoff could fit; specific partners, rights, budget and reachable channel unverified. Maya owns actual customer/RFP research and any approved contact; current #178 OTV/ICLS pipelines not duplicated or counted as this service's buyers.

Official DOJ source: https://www.ada.gov/resources/2024-03-08-web-rule/ checked2026-11-08T06:08:30.418Z. Original fact-sheet dateApril8,2024; updated text says April20,2026 IFR extends dates to April26,2027 for public entities>=50,000population and April26,2028 for smaller public entities/any special district. Generally WCAG2.1AA web/mobile standard; contractor-delivered government web content included. Limited archived/document/third-party exceptions do not erase existing effective-communication/equal-access obligations. Relevant scope/deadline passages directly inspected; full extract truncated. This summary is research, not legal advice/certification or independent full-rule analysis. Company may recommend WCAG2.2AA while reporting TitleII's2.1AA baseline separately; not interchangeable legal claims.

## Examples That Work — three comparable offers, not three proven winners

Primary English-language supplier pages checked Nov8,2026; service availability/credentials/claims not independently tested. Public revenue, profit, paid volume and conversion are **not publicly verifiable** from these pages. No price quotes requested. Dollar symbols are displayed; ISO currency/taxes/checkout unresolved, so do not silently normalize to USD. Sampling public suppliers creates selection/marketing bias; no broad-demand inference.

1. **Accessible.org** — https://accessible.org/pricing/ checked2026-11-08T06:10:38.854Z; page explicitly updatedOctober29,2026. Manual representative-sample audits advertised $100–$250primary page/screen and $25–$100light; most audits$1,250–$2,750. Advertised DHS Trusted Testers; screen-reader/keyboard/code/zoom checks and detailed spreadsheet. Fix validation/technical support$195/hour(min2hours); user testing$550session or$450with audit; WCAG VPAT add-on$350. Remediation$750–$4,500 advertised separately. These are supplier price/scope claims, not actual booked contract/outcome evidence; no sold-unit count. Direct website/cart/calculator commercial services model. Certification is THEIR offer, not permission to make ours. Extract truncated; cited current pricing precedes a separate discontinued-services section, whose old prices are NOT current comparables.
2. **HalfAccessible** — https://halfaccessible.com/pricing/ checked2026-11-08T06:10:41.065Z; page publication date unknown (title2026not publication proof). $500Quick:up to5templates, automated/manual spot checks, top10issues,30mincall. $2,000Complete:up to25templates/keyflows, full JAWS/NVDA/VoiceOver/keyboard, severity/fix guidance, retest, statement draft,90dayssupport. Fixes/PDF/VPAT separate. Founder IAAP credentials/10+years are supplier claims, not independently checked. Website booking/contact distribution, fixed-project services plus custom programs. One positive testimonial in extract but no public paid volume/revenue; not evidence of our niche's willingness to pay. Extract truncated; relevant pricing inspected. Their broad legal coverage/lawsuit claims are NOT adopted as law.
3. **Deque** — requested https://www.deque.com/services/accessibility-audits/ redirected to https://www.deque.com/accessibility-services/audits-compliance-testing/ checked2026-11-08T06:10:31.149Z. Manual+automated assessment, prioritized dashboard, developer guidance/remediation and optional VPAT-based ACR. Advertises1–2weeks and experts who have conducted10,000+audits; supplier-reported aggregate, not independent paid-sales count. Named Articulate testimonial on page; underlying case not inspected, so no verified impact. No numeric public service price; direct contact/enterprise services route. Important counterexample to novelty: evidence-to-remediation handoff is already offered.

Supplementary substitute https://www.accessibilitychecker.org/pricing/ checked2026-11-08T06:10:32.783Z: platform Lite$69/domain/month billed annually(up to25URLs), also$89monthlydisplay; managed remediation custom. Automated evidence/manual-guidance workflow overlaps proposed packaging; no certification/legal claims adopted. Extract truncated and plan variants coexist; no checkout or purchase. This is not our qualified manual-review supplier quote.

**Repeatable pattern / lawful adaptation:** Bound scope by unique templates and interactive flows; combine manual judgment with tooling; deliver actionable findings; quote fixes and retests separately. Public suppliers already do this. 2Nspira must demonstrate an original within-relationship developer-ticket/retest workflow rather than clone reports, protected test materials or claim novel certification. Original synthetic fixtures, own report layout and authorized tooling; verify licenses before customer data processing. Brand names used for factual comparison only.

## Proposed packages / exclusions — hypotheses, not approved offers

| Package | Proposed price USD | Deliverables / effort assumptions | Modeled contribution before overhead/build/tax |
|---|---:|---|---|
| Readiness triage |499|2agreed templates; inventory, automated findings plus manual spot checks, top10prioritized tickets, limitations;4human hours@$50 +$25tools +5%fee/refund reserve|249.05(49.9%)|
| Five-template evidence handoff (primary scenario) |1499|5agreed templates and selected key flows; automated+qualified manual keyboard/screen-reader/form/error checks; URL/component inventory; dated reproduction evidence; WCAG2.1AA mapping/2.2recommendations separately; prioritized dev tickets,30minhandoff; one bounded verification pass of agreed fixes, no code implementation;16human hours@$50 +$100tools +5%reserve|524.05(35.0%)|
| Bounded retest add-on |399|One agreed change set affecting<=2templates; before/after evidence and residual issues;4hours@$50+$25tools+5%reserve|154.05(38.6%)|

Assumed hour allocation primary16:2inventory/scope,8qualified manual assessment,3evidence/tickets,1handoff,2bounded verification. $50/h is a modeling proxy, not a specialist quote. At$100/h for8specialist hours, contribution falls$400to$124.05; an additional4hours at$50 makes it negative. Public Accessible.org$195/h technical-support benchmark is NOT a staffing quote, but shows how unrealistic assuming cheap specialist capacity may be. All packages conditional; fix/retest scope overrun triggers re-quote, never reduced testing or misleading completeness. Initial reusable package6–10person-days; model64hours+$150cash launch and$110monthlysupport. No funds authorized. Lower-price competitors mean$1499cannot be justified on price alone.

Exclude whole-site certification, blanket legal compliance, overlay guarantees, formal VPAT/ACR, all PDFs/media, translation, native mobile apps, authenticated third-party tools, code fixes and unlimited retests unless expressly scoped and separately priced. Selected template audit is not whole-site conformance. Reports themselves must be accessible and document non-tested content/browser/AT environments.

## Staffing and ownership — conditional

Brian research/specification; Adam proposed implementation/technical fixture owner; Maya customer/RFP qualification; Cleo proposed release/ops/report accessibility support if assigned; independent qualified accessibility practitioner performs/interprets manual checks and reviews evidence. No agent acceptance, qualified practitioner or paid-tool access verified. Brian cannot independently approve a product he built. No end-to-end autonomous delivery claim. Required tools:approved scanner, browser/keyboard/screen-reader environments with proper licenses, Git ticket/report handoff, consented staging access, secure evidence retention and exact owner-approved scope. Team AI can cluster/suggest but cannot replace human AT assessment/legal judgment.

## Existing maintenance integration

Owner referenced$495/year maintenance; actual contract/inclusions/client allowances were not inspected. Public https://2nspira.com/websites checked2026-11-08T06:04:54.497Z instead displays explicitly internal-review proposed$79/$149/$299monthlyplans, not proven sold or approved plans. Preserve current agreements; do not infer that audit/remediation/retest is included. At illustrative$50/h, entire$495buys9.9hours before hosting/othercosts—insufficient for16-hour handoff alone. Proposed:monitor/log bounded issues within confirmed allowance, then separate scoped audit/remediation/retest change order. No live plan/price/site change.

## Non-speculative demand search / gaps

No primary RFP, award notice or consenting buyer interview was verified in this bounded second pass. Strict.gov/.eduaccessibility+RFP queries returned0results; broader.gov/ county searches returned provider_error. Neither failure nor0searchresults proves absent demand. Current #178 has other modernization/intake opportunities, not proof of a funded five-template accessibility pack. No budget/award, active deadline or reachable buyer fabricated. Next safe research: Maya's already-authorized source pipeline for an issuer-original notice with accessibility-specific paid scope, preserving existing opportunity ID. No contact or new bid by this task.

## Small reversible experiment — proposal only

First make an original synthetic5template evidence/ticket/retest sample and independently verify it; confirm qualified manual-review availability and cost before customer promises. After exact participant/channel/budget approval, Maya could show it to3eligible existingclients/agency partners. Pass:2request a specifically scoped$1499quote with budget/decision path AND independent costed delivery<= $975including fees/reserve; fail0requests or unfillable manual-review role;1request/mixedor3notrecruited inconclusive. Proposed cap$150cash+12human hours; no subscription, outreach or actual spending authorized. This is MI-002 secondary proposal; MI-001 remains leading experimental candidate. Requests indicate intent, not revenue.

## Exact exceptions and recovery

Accessibility.Works guessed path404; use verified three suppliers above, no price invented. Search provider intermittentlyfailed; zero-resultqueries not absence evidence. Initial delegated output claimed saved artifacts but files were absent and conceptual comparables unsupported; Brian discarded that output and independently created this sourced replacement. Research self-review is not independent QA. Artlist403/KDPcommunityLoading retained in rotation record; no access-control bypass. Raw fetches/timestamps in accessibility-sources.json and combined source-snapshots.json.


## Structured comparable cards

[
  {
    "example_id": "EX-010",
    "candidate_id": "MI-002",
    "supplier": "Accessible.org",
    "sources": [
      {
        "source_id": "P10",
        "url": "https://accessible.org/pricing/",
        "accessed_at": "2026-11-08T06:10:38.854Z",
        "http_status": 200,
        "publication_date": "2026-10-29 price update"
      }
    ],
    "public_price": "$100–$250 primary page; most audits $1250–$2750; support $195/h min2; dollars displayed, ISO/tax unverified",
    "public_scope": "Manual representative sample, Excel findings, separate remediation/retest/support",
    "observed_outcomes": "No paid volume/revenue/outcome count verified; supplier credential claims only",
    "revenue": "not publicly verifiable",
    "success_verified": false,
    "market_period": "English-language supplier page current Nov8; client region/measurement period not fully established",
    "business_model": "project/manual audit services; direct website quote/booking",
    "comparability": "Direct scoped accessibility assessment/evidence competitor; not identical five-template existing-client handoff",
    "limitations": "Supplier claims, selection bias, credentials not independently checked; no purchasing or account testing",
    "lawful_original_adaptation": "Original synthetic template evidence/ticket/retest fixture; no copying reports or certification claims"
  },
  {
    "example_id": "EX-011",
    "candidate_id": "MI-002",
    "supplier": "HalfAccessible",
    "sources": [
      {
        "source_id": "P11",
        "url": "https://halfaccessible.com/pricing/",
        "accessed_at": "2026-11-08T06:10:41.065Z",
        "http_status": 200,
        "publication_date": "unknown"
      }
    ],
    "public_price": "$500 Quick5template spotcheck; $2000 Complete25template/fullmanual/retest; dollars displayed ISO/tax unverified",
    "public_scope": "Founder-led manual+automated assessment, severity/fix guidance; separate fixes/VPAT",
    "observed_outcomes": "Positive supplier-hosted testimonial, no paid volume/revenue verified",
    "revenue": "not publicly verifiable",
    "success_verified": false,
    "market_period": "English-language supplier page current Nov8; client region/measurement period not fully established",
    "business_model": "project/manual audit services; direct website quote/booking",
    "comparability": "Direct scoped accessibility assessment/evidence competitor; not identical five-template existing-client handoff",
    "limitations": "Supplier claims, selection bias, credentials not independently checked; no purchasing or account testing",
    "lawful_original_adaptation": "Original synthetic template evidence/ticket/retest fixture; no copying reports or certification claims"
  },
  {
    "example_id": "EX-012",
    "candidate_id": "MI-002",
    "supplier": "Deque",
    "sources": [
      {
        "source_id": "P12",
        "url": "https://www.deque.com/accessibility-services/audits-compliance-testing/",
        "accessed_at": "2026-11-08T06:10:31.149Z",
        "http_status": 200,
        "publication_date": "unknown"
      }
    ],
    "public_price": "No numeric price on reviewed page",
    "public_scope": "Manual+automated audit, prioritized dashboard, developer/remediation guidance, optional ACR",
    "observed_outcomes": "Supplier advertises10000+audits by experts and1–2weeks; no independently verified paid count/revenue",
    "revenue": "not publicly verifiable",
    "success_verified": false,
    "market_period": "English-language supplier page current Nov8; client region/measurement period not fully established",
    "business_model": "project/manual audit services; direct website quote/booking",
    "comparability": "Direct scoped accessibility assessment/evidence competitor; not identical five-template existing-client handoff",
    "limitations": "Supplier claims, selection bias, credentials not independently checked; no purchasing or account testing",
    "lawful_original_adaptation": "Original synthetic template evidence/ticket/retest fixture; no copying reports or certification claims"
  }
]
