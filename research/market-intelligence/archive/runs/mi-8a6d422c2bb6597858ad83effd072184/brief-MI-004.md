# MI-004 — business case v5, November 8 Eastern

English B2B webinar caption-QA and evidence handoff

**Conditional, not an approved launch. Expected revenue not estimable from measured data.**

## Strategic fit and next proof

Creative Studio adjacency without a verified publishing or client-distribution pipeline. Test terminology/change control, not commodity transcription.

Original synthetic10min example independently checked; after approval five producer sessions,3 current recurring pain reports AND2 scoped$149 requests pass;0 requests or3 native-tool sufficiency fails; mixed/recruitment shortfall inconclusive. Cap:$50/8h, no spend.

## Agent delivery chain / blockers

- research and provenance: proposed Brian. Tools/access: gh, public web_fetch/search, private research API client; available in Brian runtime.
- original creation/engineering: proposed Dax original assets with Maya domain copy. Tools/access: Git/local fixtures; editor/approved model access unverified in recipient runtime.
- independent QA: proposed Separate qualified finance/accessibility/EU-training/caption reviewer; Brian only if not builder and genuinely independent. Tools/access: Domain knowledge, manual test environment and consented fixtures; reviewer capacity not verified.
- approved distribution: proposed Maya; Jeffrey exact scope/channel/budget approval. Tools/access: Authorized client route/account connector not proven; no outreach this run.
- approved technical publishing: proposed Adam, Cleo release/ops as assigned. Tools/access: Git review and authorized runtime; no merge/deploy by this research task.
- support and iteration: proposed Adam technical, Maya customer follow-up subject to approval. Tools/access: Permissioned issue/support queue, client agreement unverified.
- measurement/reporting: proposed Brian research; Cleo dashboard; Adam shared API. Tools/access: Versioned D1/Git available from Brian; Cleo live binding/peer access unverified.

Authorized original media, retention permissions, full human playback and specialist caption quality; no voice cloning, translation, publication or accessibility certification.

## Formula-backed scenarios (not forecasts or actuals)

units=floor(min(months*leads_per_month*conversion,months*32/hours_per_sale)); bookings=units*price; revenue=bookings-refund_reserve (completion assumed); contribution=bookings-units*(labor+tools+3%fees+2%refunds); net=contribution-monthly_fixed*months-launch_cost

{
  "currency": "USD",
  "all_values": "hypotheses not quotes, realized margin, approved spend or measured demand",
  "mvp_effort": "2–5 person-days",
  "human_review_and_delivery_hours_per_sale": 1.5,
  "human_rate_usd_per_hour": 50,
  "price_per_unit_usd": 149,
  "tools_api_production_hosting_per_unit_usd": 10,
  "payment_platform_fee_rate_assumed": 0.03,
  "refund_rate_assumed": 0.02,
  "variable_cost_usd": 92.45,
  "contribution_per_unit_usd": 56.55,
  "contribution_margin": 0.3795,
  "launch_labor_hours": 24,
  "launch_cash_usd": 50,
  "launch_cost_usd": 1250,
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
          "human_delivery_labor_usd": 0.0,
          "tools_api_hosting_usd": 0,
          "gross_contribution_after_refunds_usd": 0.0,
          "fixed_support_maintenance_usd": 180,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -1430.0
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 0,
          "units": 0,
          "gross_bookings_usd": 0,
          "modeled_recognized_revenue_usd": 0.0,
          "refund_reserve_usd": 0.0,
          "payment_platform_fees_usd": 0.0,
          "human_delivery_labor_usd": 0.0,
          "tools_api_hosting_usd": 0,
          "gross_contribution_after_refunds_usd": 0.0,
          "fixed_support_maintenance_usd": 360,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -1610.0
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 0,
          "units": 0,
          "gross_bookings_usd": 0,
          "modeled_recognized_revenue_usd": 0.0,
          "refund_reserve_usd": 0.0,
          "payment_platform_fees_usd": 0.0,
          "human_delivery_labor_usd": 0.0,
          "tools_api_hosting_usd": 0,
          "gross_contribution_after_refunds_usd": 0.0,
          "fixed_support_maintenance_usd": 720,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -1970.0
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
      "break_even_month_after_launch": null,
      "outputs": [
        {
          "months_after_hypothetical_authorized_launch": 3,
          "qualified_leads": 15,
          "units": 3,
          "gross_bookings_usd": 447,
          "modeled_recognized_revenue_usd": 438.06,
          "refund_reserve_usd": 8.94,
          "payment_platform_fees_usd": 13.41,
          "human_delivery_labor_usd": 225.0,
          "tools_api_hosting_usd": 30,
          "gross_contribution_after_refunds_usd": 169.65,
          "fixed_support_maintenance_usd": 180,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -1260.35
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 30,
          "units": 6,
          "gross_bookings_usd": 894,
          "modeled_recognized_revenue_usd": 876.12,
          "refund_reserve_usd": 17.88,
          "payment_platform_fees_usd": 26.82,
          "human_delivery_labor_usd": 450.0,
          "tools_api_hosting_usd": 60,
          "gross_contribution_after_refunds_usd": 339.3,
          "fixed_support_maintenance_usd": 360,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -1270.7
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 60,
          "units": 12,
          "gross_bookings_usd": 1788,
          "modeled_recognized_revenue_usd": 1752.24,
          "refund_reserve_usd": 35.76,
          "payment_platform_fees_usd": 53.64,
          "human_delivery_labor_usd": 900.0,
          "tools_api_hosting_usd": 120,
          "gross_contribution_after_refunds_usd": 678.6,
          "fixed_support_maintenance_usd": 720,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -1291.4
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
      "break_even_month_after_launch": 24,
      "outputs": [
        {
          "months_after_hypothetical_authorized_launch": 3,
          "qualified_leads": 30,
          "units": 6,
          "gross_bookings_usd": 894,
          "modeled_recognized_revenue_usd": 876.12,
          "refund_reserve_usd": 17.88,
          "payment_platform_fees_usd": 26.82,
          "human_delivery_labor_usd": 450.0,
          "tools_api_hosting_usd": 60,
          "gross_contribution_after_refunds_usd": 339.3,
          "fixed_support_maintenance_usd": 180,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -1090.7
        },
        {
          "months_after_hypothetical_authorized_launch": 6,
          "qualified_leads": 60,
          "units": 12,
          "gross_bookings_usd": 1788,
          "modeled_recognized_revenue_usd": 1752.24,
          "refund_reserve_usd": 35.76,
          "payment_platform_fees_usd": 53.64,
          "human_delivery_labor_usd": 900.0,
          "tools_api_hosting_usd": 120,
          "gross_contribution_after_refunds_usd": 678.6,
          "fixed_support_maintenance_usd": 360,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -931.4
        },
        {
          "months_after_hypothetical_authorized_launch": 12,
          "qualified_leads": 120,
          "units": 24,
          "gross_bookings_usd": 3576,
          "modeled_recognized_revenue_usd": 3504.48,
          "refund_reserve_usd": 71.52,
          "payment_platform_fees_usd": 107.28,
          "human_delivery_labor_usd": 1800.0,
          "tools_api_hosting_usd": 240,
          "gross_contribution_after_refunds_usd": 1357.2,
          "fixed_support_maintenance_usd": 720,
          "launch_cost_usd": 1250,
          "net_after_launch_and_maintenance_usd": -612.8
        }
      ]
    }
  ],
  "sensitivity": [
    "Reachable qualified leads and conversion: entirely assumed; zero qualified leads yields zero bookings.",
    "Human delivery hours/rate: double labor subtracts 75.0USD per unit; specialist premiums may erase modeled contribution.",
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
    "example_id": "EX-007",
    "candidate_id": "MI-004",
    "supplier": "Wistia",
    "sources": [
      {
        "source_id": "wistia",
        "url": "https://support.wistia.com/en/articles/8274062-transcripts-and-captions",
        "final_url": "https://support.wistia.com/en/articles/8274062-transcripts-and-captions",
        "http_status": 200,
        "accessed_at": "2026-11-08T06:06:40.583Z",
        "timezone": "UTC",
        "truncated": true,
        "extract_path": "examples-fetch-results.json",
        "publication_date": "unknown — not displayed in fetched primary-page extract"
      }
    ],
    "comparability": "Direct native substitute for caption QA tasks; evidence handoff service not demonstrated.",
    "public_scope": "Computer-generated captions/transcripts, glossary, caption/text editor, timing and line-break corrections, SRT/VTT upload/download, optional human-reviewed service.",
    "public_price": "Machine captions included free in current Wistia plans (underlying hosting plan separate); professional 1,000 credits/minute within 4 business days; rush 1,600 credits/minute within 1 business day. Dollar conversion not verified.",
    "business_model": "Video-platform subscription with usage-credit professional-caption add-on.",
    "observed_channel": "Existing-account self-service ordering and help-center workflow.",
    "displayed_outcomes_users_reviews": "Supplier table states automated 95% accuracy and professional human-reviewed 99%; these are product claims, not observed independent test scores. No niche customer/user/review outcome displayed in extract.",
    "revenue": {
      "status": "private / not publicly verifiable from reviewed primary pages",
      "amount": null,
      "success_verified": false
    },
    "limitations": "Extract truncated; relevant order/editor sections retained. Native glossary/timing/editor features substantially overlap proposed QA, so differentiation cannot be generic corrections.",
    "lawful_original_adaptation": "Create original synthetic terminology/speaker/timing defect fixture, change log and export checklist. Treat native editor as baseline; use only licensed media."
  },
  {
    "example_id": "EX-008",
    "candidate_id": "MI-004",
    "supplier": "Rev",
    "sources": [
      {
        "source_id": "rev2",
        "url": "https://www.rev.com/services/closed-captions",
        "final_url": "https://www.rev.com/services/closed-captions",
        "http_status": 200,
        "accessed_at": "2026-11-08T06:06:52.024Z",
        "timezone": "UTC",
        "truncated": false,
        "extract_path": "examples-fetch-results.json",
        "publication_date": "unknown — not displayed in fetched primary-page extract"
      }
    ],
    "comparability": "Direct human captioning/QA substitute with public per-minute price.",
    "public_scope": "English/Spanish human-reviewed captions; timing/word/speaker-name editing; collaboration editor; major caption formats; platform integrations.",
    "public_price": "Human captions starting at $1.99/minute; automated tier displayed $0.25/minute. Dollar denomination displayed but ISO currency/taxes not resolved in extract; checkout not tested. No normalization to proposed $149/30-minute package.",
    "business_model": "Per-minute human/AI services plus optional subscriptions.",
    "observed_channel": "Direct self-service minute purchase/subscription and video/cloud integrations.",
    "displayed_outcomes_users_reviews": "Supplier claims 99%+ human accuracy and 12-hour-or-less delivery; AI 95+% in five minutes or less. These are advertised service levels, not verified delivered webinar outcomes.",
    "revenue": {
      "status": "private / not publicly verifiable from reviewed primary pages",
      "amount": null,
      "success_verified": false
    },
    "limitations": "Not specifically webinar change-control evidence service. Accessibility claims are vendor claims; page qualifies standard-caption compliance where bottom-third visuals are absent. Initial outdated URL returned 404, corrected primary page fetched.",
    "lawful_original_adaptation": "Use original terminology glossary, speaker map and timestamped correction log on owned synthetic recording. Do not reuse captions/content or guarantee legal compliance."
  },
  {
    "example_id": "EX-009",
    "candidate_id": "MI-004",
    "supplier": "3Play Media",
    "sources": [
      {
        "source_id": "3play",
        "url": "https://www.3playmedia.com/services/captioning/",
        "final_url": "https://www.3playmedia.com/platform/captioning/",
        "http_status": 200,
        "accessed_at": "2026-11-08T06:06:45.978Z",
        "timezone": "UTC",
        "truncated": false,
        "extract_path": "examples-fetch-results.json",
        "publication_date": "unknown — not displayed in fetched primary-page extract"
      }
    ],
    "comparability": "Direct review/quality competitor; target scale and handoff scope differ.",
    "public_scope": "Human professional captioning, caption editor, full-review option, placement checking, ASR with optional human escalation, API/FTP/S3 and 30+ platform integrations.",
    "public_price": "No numeric public price displayed on reviewed page; connect-with-team route. No quote requested.",
    "business_model": "Managed captioning/platform service with optional review and integrations; contract/billing basis not displayed.",
    "observed_channel": "Website contact-sales; platform integrations and automated file workflows.",
    "displayed_outcomes_users_reviews": "Supplier claims minimum 99% accuracy, actual average 99.6%, full review typically 99.9%. Displayed selected case claims: This American Life +6.68% unique visitors; Discovery Digital Networks +13.48% views in 14 days; Dell +20% customers. Underlying studies not fetched; not causal, niche-specific or independent proof.",
    "revenue": {
      "status": "private / not publicly verifiable from reviewed primary pages",
      "amount": null,
      "success_verified": false
    },
    "limitations": "Supplier-selected case summaries and legal guarantees not independently verified. Broad enterprise media service, not specifically small B2B webinars. No pricing or paid-volume verification.",
    "lawful_original_adaptation": "Create independent QA rubric and original error/evidence handoff, human escalation rules and delivery acceptance checklist. Do not copy proprietary accuracy scoring or imply their guarantees."
  }
]

All directly address captioning/review, but none demonstrates identical small-B2B-webinar evidence-handoff package. Revenue/profit not publicly verified; supplier marketing is not independent demand proof.
