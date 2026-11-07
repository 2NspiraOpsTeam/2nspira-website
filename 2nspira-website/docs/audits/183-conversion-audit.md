# #183 — Conversion, credibility and navigation audit (in progress)

Observed November 7, 2026 against production at a 390 × 844 viewport in headless Chrome. Source baseline: `c1d1f39`. This is an initial audit, not a completed P0 sign-off. No production changes or contact messages sent.

## Measured observations

- `/`, `/work`, `/websites`, `/contact`, `/services` and `/videos` returned 200, each with one observed H1 and a self-referencing canonical. No page errors or document-level horizontal overflow in these six mobile renderings.
- `/studio` returned 404 in production, expected while #182 is preview-only. Do not link production traffic to it until that approved release is verified. PR #196 adds hub/navigation/homepage discovery together.
- Contact has distinct booking and message entry choices. Booking destination emitted by the page: `https://calendar.app.google/54Gv2GFrkUFsNs4i9`. This observation does **not** prove booking availability, form delivery or conversion tracking.
- Homepage H1 remains “A clearer vision. A stronger business.” Website page H1 remains “Your Website Was Built for Yesterday. Let’s Build It for What’s Next.” This establishes current wording, not evidence that a proposed variant improves conversion.
- The prior shell-only requests received 403, while rendered browser navigation succeeded. Do not classify that as a visitor outage.

Structured route/title/H1/canonical/links/error/overflow evidence: `183-mobile-route-baseline.json`. Screenshots accompany this document. These are rendered checks, not Core Web Vitals or SEO ranking evidence.

## Prioritized next checks

| Priority | Work | Impact / effort | Current state |
| --- | --- | --- | --- |
| P0 | All top-level/outbound links and booking destination | High / small | Initial routes only; full link audit pending |
| P0 | Contact success, validation, spam and delivery | High / medium | No live message sent; isolated delivery/retry strategy needed |
| P0 | Accessibility, desktop/tablet/mobile navigation and measured performance | High / medium | Mobile baseline only; full scan and real CWV pending |
| P1 | Hero variants below, single primary CTA plus work proof | Medium / small | Draft hypotheses, not approved public copy |
| P1 | Clear Teams-only review attribution and permission-backed 2Nspira proof | High / medium | Verify existing attribution; do not invent testimonials/metrics |
| P1 | Reduce repetitive homepage narrative, retain key evidence | Medium / medium | Proposed content hierarchy audit pending |
| P1 | Privacy-conscious service CTA, booking click and form-success events | High / medium | Tracking/access baseline not established |
| P2 | Metadata/sitemap/structured-data and service-entry audit | Medium / medium | Canonical baseline only; full audit pending |

## Hero hypotheses for owner review (not live)

1. **Human-led expertise. AI-enabled progress.** Practical websites, connected systems, and technology guidance built around your people. Primary: Discuss your challenge. Secondary: Explore our work.
2. **Clearer operations. Stronger digital experiences.** Combine human judgment and AI-assisted delivery to build what your organization needs next. Same primary/secondary destinations.
3. **Technology that works for your organization.** Human-led consulting and AI-enabled development, from your public website to the workflows behind it. Same primary/secondary destinations.

No lift, ranking, lead-volume, or performance improvement is claimed. Website-service wording should be reconciled with #180; Studio placement with #182. Main services/People + Platforms/contact routes stay intact. Full issue acceptance remains unfinished.
