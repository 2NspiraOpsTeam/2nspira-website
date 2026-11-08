> Historical v5 brief retained verbatim below (November8 morning). Current #199 allocation, third independent MI-003 supplier group and acquisition-adjusted economics supersede metadata/count/model limitations only; see nightly-brief.md and current register. Original source access dates and domain/legal uncertainties remain unchanged.

# MI-001 — business case v5, November 8 Eastern

Approval-first receivables exception desk for small B2B service firms

**Conditional, not an approved launch. Expected revenue not estimable from measured data.**

## Strategic fit and next proof

CSV exception review beyond native reminders; adjacent to operations software, but no verified finance-client cross-sell or bookkeeper access.

Retain 30-invoice technical gate and approved five-user comparison in recommended-experiment.md.

## Agent delivery chain / blockers

- research and provenance: proposed Brian. Tools/access: gh, public web_fetch/search, private research API client; available in Brian runtime.
- original creation/engineering: proposed Adam with Brian specifications. Tools/access: Git/local fixtures; editor/approved model access unverified in recipient runtime.
- independent QA: proposed Separate qualified finance/accessibility/EU-training/caption reviewer; Brian only if not builder and genuinely independent. Tools/access: Domain knowledge, manual test environment and consented fixtures; reviewer capacity not verified.
- approved distribution: proposed Maya; Jeffrey exact scope/channel/budget approval. Tools/access: Authorized client route/account connector not proven; no outreach this run.
- approved technical publishing: proposed Adam, Cleo release/ops as assigned. Tools/access: Git review and authorized runtime; no merge/deploy by this research task.
- support and iteration: proposed Adam technical, Maya customer follow-up subject to approval. Tools/access: Permissioned issue/support queue, client agreement unverified.
- measurement/reporting: proposed Brian research; Cleo dashboard; Adam shared API. Tools/access: Versioned D1/Git available from Brian; Cleo live binding/peer access unverified.

Privacy, balances and dispute status; human finance authorization; never move money or automatically contact debtors.

## Formula-backed scenarios (not forecasts or actuals)

units=floor(min(months*leads_per_month*conversion,months*32/hours_per_sale)); bookings=units*price; revenue=bookings-refund_reserve (completion assumed); contribution=bookings-units*(labor+tools+3%fees+2%refunds); net=contribution-monthly_fixed*months-launch_cost

{
  "currency": "USD",
  "all_values": "hypotheses not quotes, realized margin, approved spend or measured demand",
  "mvp_effort": "2–5 person-days",
  "human_review_and_delivery_hours_per_sale": 4,
  "human_rate_usd_per_hour": 50,
  "price_per_unit_usd": 499,
  "tools_api_production_hosting_per_unit_usd": 24,
  "payment_platform_fee_rate_assumed": 0.03,
  "refund_rate_assumed": 0.02,
  "variable_cost_usd": 248.95,
  "contribution_per_unit_usd": 250.05,
  "contribution_margin": 0.5011,
  "launch_labor_hours": 24,
  "launch_cash_usd": 100,
  "launch_cost_usd": 1300,
  "fixed_maintenance_support_monthly_usd": 60,
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
          "fixed_support_maintenance_usd": 180,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": -1480.0
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
          "fixed_support_maintenance_usd": 360,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": -1660.0
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
          "fixed_support_maintenance_usd": 720,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": -2020.0
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
      "break_even_month_after_launch": 7,
      "outputs": [
        {
          "months_after_hypothetical_authorized_launch": 3,
          "qualified_leads": 15,
          "units": 3,
          "gross_bookings_usd": 1497,
          "modeled_recognized_revenue_usd": 1467.06,
          "refund_reserve_usd": 29.94,
          "payment_platform_fees_usd": 44.91,
          "human_delivery_labor_usd": 600,
          "tools_api_hosting_usd": 72,
          "gross_contribution_after_refunds_usd": 750.15,
          "fixed_support_maintenance_usd": 180,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": -729.85
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 30,
          "units": 6,
          "gross_bookings_usd": 2994,
          "modeled_recognized_revenue_usd": 2934.12,
          "refund_reserve_usd": 59.88,
          "payment_platform_fees_usd": 89.82,
          "human_delivery_labor_usd": 1200,
          "tools_api_hosting_usd": 144,
          "gross_contribution_after_refunds_usd": 1500.3,
          "fixed_support_maintenance_usd": 360,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": -159.7
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 60,
          "units": 12,
          "gross_bookings_usd": 5988,
          "modeled_recognized_revenue_usd": 5868.24,
          "refund_reserve_usd": 119.76,
          "payment_platform_fees_usd": 179.64,
          "human_delivery_labor_usd": 2400,
          "tools_api_hosting_usd": 288,
          "gross_contribution_after_refunds_usd": 3000.6,
          "fixed_support_maintenance_usd": 720,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": 980.6
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
      "break_even_month_after_launch": 3,
      "outputs": [
        {
          "months_after_hypothetical_authorized_launch": 3,
          "qualified_leads": 30,
          "units": 6,
          "gross_bookings_usd": 2994,
          "modeled_recognized_revenue_usd": 2934.12,
          "refund_reserve_usd": 59.88,
          "payment_platform_fees_usd": 89.82,
          "human_delivery_labor_usd": 1200,
          "tools_api_hosting_usd": 144,
          "gross_contribution_after_refunds_usd": 1500.3,
          "fixed_support_maintenance_usd": 180,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": 20.3
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 60,
          "units": 12,
          "gross_bookings_usd": 5988,
          "modeled_recognized_revenue_usd": 5868.24,
          "refund_reserve_usd": 119.76,
          "payment_platform_fees_usd": 179.64,
          "human_delivery_labor_usd": 2400,
          "tools_api_hosting_usd": 288,
          "gross_contribution_after_refunds_usd": 3000.6,
          "fixed_support_maintenance_usd": 360,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": 1340.6
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 120,
          "units": 24,
          "gross_bookings_usd": 11976,
          "modeled_recognized_revenue_usd": 11736.48,
          "refund_reserve_usd": 239.52,
          "payment_platform_fees_usd": 359.28,
          "human_delivery_labor_usd": 4800,
          "tools_api_hosting_usd": 576,
          "gross_contribution_after_refunds_usd": 6001.2,
          "fixed_support_maintenance_usd": 720,
          "launch_cost_usd": 1300,
          "net_after_launch_and_maintenance_usd": 3981.2
        }
      ]
    }
  ],
  "sensitivity": [
    "Reachable qualified leads and conversion: entirely assumed; zero qualified leads yields zero bookings.",
    "Human delivery hours/rate: double labor subtracts 200USD per unit; specialist premiums may erase modeled contribution.",
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

[
  {
    "example_id": "EX-001",
    "candidate_id": "MI-001",
    "supplier": "Chaser",
    "sources": [
      {
        "source_id": "chaser",
        "url": "https://www.chaserhq.com/chaser-pricing",
        "final_url": "https://www.chaserhq.com/chaser-pricing",
        "http_status": 200,
        "accessed_at": "2026-11-08T06:06:15.076Z",
        "timezone": "UTC",
        "truncated": false,
        "extract_path": "examples-fetch-results.json",
        "publication_date": "unknown — not displayed in fetched primary-page extract"
      }
    ],
    "comparability": "Direct AR workflow comparator; service/setup model differs.",
    "public_scope": "Compact: 4 users, 30 follow-up templates, 4 automated receivables workflows; accountant/bookkeeper partner route displayed.",
    "public_price": "From $259/month Compact; $779 Core; $1,169 Complete. Country selector and monthly/yearly (10% saving) both present; currency/country, active billing selection, tax and checkout total unresolved. Do not normalize to USD or compare directly to $499 setup.",
    "business_model": "Tiered recurring receivables SaaS; trial.",
    "observed_channel": "Direct website trial/call; accountant and bookkeeper partner program linked.",
    "displayed_outcomes_users_reviews": "Supplier page says over 10,000 users worldwide and markets 60+ hours/month saved. These are supplier assertions, not verified cohort outcomes or revenue.",
    "revenue": {
      "status": "private / not publicly verifiable from reviewed primary pages",
      "amount": null,
      "success_verified": false
    },
    "limitations": "Broad automation, not a demonstrated approval-first small-service-firm exception desk; plan eligibility text mixes £ and USD thresholds. No independent efficacy test.",
    "lawful_original_adaptation": "Create original synthetic invoice queue, editable follow-up drafts, approval record and exception labels. Do not copy vendor templates, UI or branding."
  },
  {
    "example_id": "EX-002",
    "candidate_id": "MI-001",
    "supplier": "Wave",
    "sources": [
      {
        "source_id": "wave",
        "url": "https://www.waveapps.com/pricing",
        "final_url": "https://www.waveapps.com/pricing",
        "http_status": 200,
        "accessed_at": "2026-11-08T06:06:10.713Z",
        "timezone": "UTC",
        "truncated": false,
        "extract_path": "examples-fetch-results.json",
        "publication_date": "unknown — not displayed in fetched primary-page extract"
      }
    ],
    "comparability": "Direct low-cost substitute for reminders; partial comparator to exceptions.",
    "public_scope": "Starter invoicing and bookkeeping; Pro adds automated late-payment reminders, transaction import/categorization and receipt capture.",
    "public_price": "FAQ quotes Pro $19 USD / $25 CAD plus applicable taxes per business. Billing period is not explicit in that FAQ extract; do not infer checkout cadence. Payment-processing fees and add-ons separate.",
    "business_model": "Freemium accounting SaaS plus subscriptions, payments and advisory add-ons.",
    "observed_channel": "Self-service website and accountant/collaborator account access; no referral conversion verified.",
    "displayed_outcomes_users_reviews": "Compensated Mitch Seekins testimonial claims 80% time saved; page explicitly discloses free annual subscription and $150 gift card. Supplier says invoices marked paid 3x faster when online payments enabled versus cash/check; not causal or exception-desk evidence.",
    "revenue": {
      "status": "private / not publicly verifiable from reviewed primary pages",
      "amount": null,
      "success_verified": false
    },
    "limitations": "Accounting-native substitute rather than outsourced exception review. Extract contains duplicated regional/plan variants; no checkout tested.",
    "lawful_original_adaptation": "Use Wave/native reminders as baseline in original synthetic test. Build only distinct reconciliation/approval evidence, not a cloned invoicing product."
  },
  {
    "example_id": "EX-003",
    "candidate_id": "MI-001",
    "supplier": "Upflow",
    "sources": [
      {
        "source_id": "upflowhome",
        "url": "https://upflow.io/",
        "final_url": "https://upflow.io/",
        "http_status": 200,
        "accessed_at": "2026-11-08T06:06:53.230Z",
        "timezone": "UTC",
        "truncated": false,
        "extract_path": "examples-fetch-results.json",
        "publication_date": "unknown — not displayed in fetched primary-page extract"
      },
      {
        "source_id": "upflow",
        "url": "https://upflow.io/pricing",
        "final_url": "https://upflow.io/pricing",
        "http_status": 200,
        "accessed_at": "2026-11-08T06:06:28.899Z",
        "timezone": "UTC",
        "truncated": true,
        "extract_path": "examples-fetch-results.json",
        "publication_date": "unknown — not displayed in fetched primary-page extract"
      }
    ],
    "comparability": "Strongest functional comparator: explicit exceptions and autonomy controls; target scale differs.",
    "public_scope": "B2B AR platform with suggestion-only through autonomous agent controls, multichannel collections, complex-payment matching, exception workflows and ERP audit trail.",
    "public_price": "Homepage offers AR visibility/analytics free forever. Paid collections price not recoverable in incomplete pricing extract; pricing title says plans by invoiced revenue/no seat fees. Terms: taxes excluded, plans prepaid, usage postpaid; order form governs.",
    "business_model": "Freemium analytics entry into AR/payments platform; paid commercial terms not fully observed.",
    "observed_channel": "Website free analytics and embedded demo; B2B finance-team positioning.",
    "displayed_outcomes_users_reviews": "Homepage claims 30% average DSO reduction in 3 months and 98% auto-match rate; Jason Lopez (ex Lattice Controller) testimonial says automate 99% of collections. Supplier-selected claims; methodology not displayed.",
    "revenue": {
      "status": "private / not publicly verifiable from reviewed primary pages",
      "amount": null,
      "success_verified": false
    },
    "limitations": "Pricing body incomplete after 750,000 bytes. Larger/more integrated platform than CSV-first service. No attribution or independent outcome/revenue verification.",
    "lawful_original_adaptation": "Design original suggestion-only exception workflow and audit trail on synthetic data; benchmark whether manual approvals add value. No copying agents, code or testimonials."
  }
]

Chaser/Upflow direct functional; Wave low-cost native substitute. No identical human-run approval-first exception-desk offer demonstrated. Revenue/profit not publicly verified; supplier marketing is not independent demand proof.
