import Link from "next/link";
import { buttonPrimary, buttonSecondary, cardFlat, eyebrow, h2, h3, lead, sectionBand } from "@/components/ui";

const benefits = [
  ["Make the next step obvious", "Clear navigation, readable content and considered mobile layouts help people find what matters."],
  ["Build for performance", "Review page weight, images and delivery, then measure the result. No blanket speed or ranking guarantees."],
  ["Design for more people", "Keyboard navigation, meaningful labels, contrast and responsive behavior belong in the design—not an afterthought."],
  ["Keep useful content editable", "Agree who edits what, how changes are reviewed and how content is recovered before choosing a CMS."],
  ["Protect your search foundations", "Inventory existing URLs, map redirects, preserve important content and verify metadata and sitemaps at migration."],
  ["Leave room to evolve", "Start with a maintainable website. Add apps, integrations and internal workflows when the need is clear."],
];
const process = [
  ["Assess", "Review your current website, content, audience and integrations."],
  ["Plan & quote", "Agree scope, content ownership, acceptance checks, migration and a separate build price."],
  ["Rebuild", "Use a standardized Cloudflare-based delivery foundation, with a separately validated content-management layer."],
  ["Test & migrate", "Check desktop/mobile, accessibility, forms, redirects and search foundations before an approved cutover."],
  ["Manage & improve", "Monitor the agreed service, maintain recovery procedures and prioritize changes within your support scope."],
];
const plans = [
  { name: "Essentials", price: 79, editors: 3, support: "Self-service content editing", extras: "Baseline maintenance, hosting, monitoring and backups" },
  { name: "Business", price: 149, editors: 5, support: "30 minutes of monthly content support", extras: "Everything proposed in Essentials" },
  { name: "Fully Managed", price: 299, editors: 10, support: "2 hours of monthly content support", extras: "Everything proposed in Business, priority support and quarterly review" },
];

export default function Modernization() {
  return <>
    <section id="why-modernize" className={sectionBand} aria-labelledby="modernize-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Keep what works. Improve what holds you back.</p>
        <h2 id="modernize-heading" className={`mt-4 ${h2}`}>More than a fresh coat of paint.</h2>
        <p className={`max-w-3xl ${lead}`}>A modernization should make the website easier to use, easier to manage and ready for the next stage of your organization.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{benefits.map(([title,text]) => <article key={title} className={`p-6 ${cardFlat}`}><h3 className={h3}>{title}</h3><p className="mt-3 leading-7 text-body">{text}</p></article>)}</div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="modernization-process">
      <p className={eyebrow}>A considered path forward</p><h2 id="modernization-process" className={`mt-4 ${h2}`}>From yesterday’s website to your next chapter.</h2>
      <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{process.map(([title,text],i) => <li key={title} className={`p-5 ${cardFlat}`}><p className={eyebrow}>0{i+1}</p><h3 className={`mt-4 ${h3}`}>{title}</h3><p className="mt-3 leading-7 text-body">{text}</p></li>)}</ol>
    </section>
    <section className={sectionBand} aria-labelledby="content-editing-heading"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
      <div><p className={eyebrow}>Your content. A clearer editing experience.</p><h2 id="content-editing-heading" className={`mt-4 ${h2}`}>Update the words without rebuilding the website.</h2></div>
      <div className="space-y-4 leading-7 text-body"><p>We propose a client editor dashboard for agreed content fields, editor roles and a reviewed publishing workflow. The goal: routine updates without editing application code.</p><p><strong>Technical validation in progress:</strong> Payload CMS is a candidate, not a deployed product or promised inclusion. Its database, storage, hosting, authentication, backups and Cloudflare integration need a working pilot before we commit to the architecture.</p><p>Your proposal will define content export, ownership and handover. We will not describe a proposed dashboard as a feature you can use today.</p></div>
    </div></section>
    <section id="proposed-managed-plans" className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="managed-pricing-heading">
      <p className={eyebrow}>Internal review draft · Not an offer</p><h2 id="managed-pricing-heading" className={`mt-4 ${h2}`}>Transparent Pricing. No Surprises.</h2>
      <p className={`max-w-3xl ${lead}`}>Proposed managed website plans. Prices and inclusions require operational cost validation and final approval before publication or sale.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{plans.map(plan => <article key={plan.name} className={`p-6 ${cardFlat}`}><p className={eyebrow}>Proposed plan</p><h3 className={`mt-3 ${h3}`}>{plan.name}</h3><p className="mt-5 text-4xl font-semibold text-ink">${plan.price}<span className="text-base font-normal">/month</span></p><ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-body"><li>{plan.editors} editors</li><li>{plan.support}</li><li>{plan.extras}</li></ul></article>)}</div>
      <div className="mt-6 max-w-4xl space-y-3 text-sm leading-7 text-body"><p><strong>Website design and modernization are quoted separately.</strong> Proposed additional editors: $10/month each. These are service prices, not claims of a paid CMS software license.</p><p>Domain registration, third-party subscriptions, transaction fees, applicable taxes, integrations, major redesigns and work beyond the agreed support allowance are separate unless included in your quote. Any overage requires an agreed rate and approval; unused support time, response targets, backup retention and restore scope must be defined in the service agreement.</p></div>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact#contact-message" className={buttonPrimary}>Request a Website Assessment</Link><a href="#website-and-app-development" className={buttonSecondary}>Explore apps &amp; operations</a></div>
    </section>
  </>;
}
