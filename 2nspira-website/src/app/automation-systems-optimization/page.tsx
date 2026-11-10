import PageSections from "@/components/PageSections";
import ManufacturingDemo from "@/components/ManufacturingDemo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Network, Workflow, ChartNoAxesCombined } from "lucide-react";
import { publicPageMetadata } from "@/lib/pageMetadata";
import ServiceEffects from "@/components/ServiceEffects";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceQuestions from "@/components/ServiceQuestions";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { cardFlat, h2, h3, lead, pageMain, section, sectionBand, linkInline } from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Business Process Automation & Connected Systems",
  shareTitle: "Less manual work. Smoother operations.",
  description: "Reduce manual work and disconnected spreadsheets. 2Nspira helps connect your systems, simplify handoffs, and improve the information your team relies on.",
  path: "/automation-systems-optimization"
});

const operatingLenses = [
  {
    title: "Strategy",
    text: "The outcomes, priorities, and constraints technology must support.",
  },
  {
    title: "Infrastructure",
    text: "The technical foundation required for secure, reliable operations.",
  },
  {
    title: "Platforms",
    text: "The core products and services the organization depends on.",
  },
  {
    title: "Systems",
    text: "How applications exchange information and support end-to-end work.",
  },
  {
    title: "Data",
    text: "Where information lives, how it moves, and whether it can be trusted.",
  },
  {
    title: "Processes",
    text: "The decisions, handoffs, and workflows that produce an outcome.",
  },
  {
    title: "People",
    text: "The roles, capabilities, and realities that determine adoption.",
  },
  {
    title: "Governance",
    text: "The ownership, controls, standards, and accountability that sustain change.",
  },
];

const automationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automation & Systems Optimization",
  description:
    "Reduce manual work and disconnected spreadsheets. 2Nspira helps connect your systems, simplify handoffs, and improve the information your team relies on.",
  url: "https://2nspira.com/automation-systems-optimization",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};


const pathways = [
  { id: "workflow-automation", icon: Workflow, title: "Less busywork", problem: "Still copying, chasing, and checking?", text: "Simplify repeat tasks and handoffs so your team can focus on the work that matters.", examples: "Approvals, reminders, customer onboarding, and recurring administration." },
  { id: "systems-integration", icon: Network, title: "Tools that work together", problem: "Your apps don’t talk to each other?", text: "Connect useful systems and reduce duplicate entry without replacing everything.", examples: "CRM, accounting, payments, email, internal apps, and customer portals." },
  { id: "data-analytics", icon: ChartNoAxesCombined, title: "Information you can use", problem: "Not sure which report to trust?", text: "Improve the information behind everyday decisions, not just the dashboard on top.", examples: "Data quality, reporting definitions, shared records, and timely operational updates." },
];

export default function AutomationSystemsOptimizationPage() {
  return <main className={pageMain} id="main-content"><ServiceEffects editorial>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(automationJsonLd).replace(/</g, "\\u003c") }} />
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <AmbientField />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Link href="/services" className={linkInline}>← All services</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <EyebrowPill>Automation &amp; Systems Optimization</EyebrowPill>
            <h1 className="mt-6 text-[length:var(--type-display)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">Less busywork.<br />More room to grow.</h1>
            <p className={lead}>When operations get complicated, your people feel it. We simplify repetitive work and connect the systems your business relies on.</p>
            <ServiceConversation label="Let’s simplify your operations" />
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
            <Image src="/images/hero/automation-systems-optimization-hero.png" alt="A team collaborating around connected operations dashboards in a modern technology workspace." width={1855} height={848} sizes="(min-width: 1024px) 552px, calc(100vw - 32px)" unoptimized fetchPriority="high" className="h-auto w-full" />
          </figure>
        </div>
      </div>
    </section>

    <PageSections items={[["pathways-heading", "What needs improving?"], ["approach-heading", "Our approach"], ["workflow-example-heading", "See a workflow"]]} />
    <section className={section} aria-labelledby="pathways-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Sound familiar?</p>
        <h2 id="pathways-heading" className={`mt-3 ${h2}`}>Make everyday work easier.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pathways.map(({ id, icon: Icon, title, problem, text, examples }) => <article key={id} id={id} className={`scroll-mt-28 p-6 sm:p-7 ${cardFlat}`}>
            <Icon data-story-icon className="mb-6 h-7 w-7 p-2.5 text-accent" aria-hidden="true" />
            <p className="mb-3 text-sm text-muted">{problem}</p>
            <h3 className={h3}>{title}</h3>
            <p className="mt-3 leading-7 text-body">{text}</p>
            <details className="mt-5 border-t border-line pt-2"><summary className="min-h-11 cursor-pointer rounded py-3 font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent">See examples</summary><p className="pb-3 text-sm leading-7 text-body">{examples}</p></details>
          </article>)}
        </div>
      </div>
    </section>

    <section className={section} aria-labelledby="platforms-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`${cardFlat} p-7 sm:p-10`}>
          <h2 id="platforms-heading" className={h2}>Your goals. The right technology.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-body">We start with your business needs—not a preferred vendor. Explore platforms and technologies we work with.</p>
          <Link href="/platforms-technologies" className={`${linkInline} mt-5`}>Platforms &amp; Technologies <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <section className={sectionBand} aria-labelledby="approach-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="approach-heading" className={h2}>Start with people. Improve the work.</h2>
        <p className={`max-w-2xl ${lead}`}>Practical technology, hands-on implementation, and support for the people who use it.</p>
        <ol className="mt-9 grid gap-8 md:grid-cols-3">
          {[
            { title: "Find the friction", text: "Walk through one real bottleneck with the people doing the work." },
            { title: "Make the right changes", text: "Simplify first. Connect or automate where it helps, keeping tools that still serve you." },
            { title: "Help your team move forward", text: "Test the workflow, clarify ownership, and help people use the improved process." },
          ].map((item, i) => <li key={item.title} data-process-step className={`p-6 ${cardFlat}`}><span data-step-number className="text-sm font-semibold text-accent">0{i + 1}</span><h3 className={`mt-3 ${h3}`}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p></li>)}
        </ol>
        <details className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-7">
          <summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">Behind the approach: our eight connected lenses</summary>
          <p className="mt-4 max-w-3xl leading-7 text-body">A bottleneck rarely belongs to one tool. We check the wider picture before recommending changes.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{operatingLenses.map(lens => <div key={lens.title}><h3 className="font-semibold text-ink">{lens.title}</h3><p className="mt-2 text-sm leading-6 text-body">{lens.text}</p></div>)}</div>
        </details>
        <p className="mt-6 text-sm leading-7 text-body">Exploring AI too? <Link href="/ai-enablement" className={linkInline}>Find a purposeful starting point <ArrowRight className="inline h-4 w-4" aria-hidden="true" /></Link></p>
      </div>
    </section>

    <section className={section} aria-labelledby="workflow-example-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Business process automation in practice</p>
      <h2 id="workflow-example-heading" className={`mt-3 ${h2}`}>From a request to a coordinated handoff.</h2>
      <p className="mt-4 max-w-3xl leading-7 text-body">Imagine customer onboarding spread across an inbox, a spreadsheet, and separate follow-up reminders. Workflow automation and systems integration can make ownership and the next step clearer.</p>
      <ol className="mt-8 grid gap-5 md:grid-cols-3">{[
        ["Capture once", "A structured request records the information needed to start, with validation and a clear acknowledgement."],
        ["Assign and follow through", "Route the work to an owner, make approval points visible, and send reminders when a defined action is due."],
        ["See what needs attention", "Track status in a shared record and surface exceptions for human review rather than hiding them in another inbox."]
      ].map(([title, text], i) => <li data-process-step className={`p-6 ${cardFlat}`} key={title}><p data-step-number className="text-sm font-semibold text-accent">0{i+1}</p><h3 className={`mt-3 ${h3}`}>{title}</h3><p className="mt-3 leading-7 text-body">{text}</p></li>)}</ol>
      <p className="mt-5 text-sm leading-7 text-muted">Illustrative application, not a completed client engagement. Integrations, permissions, failure handling, and success measures are assessed before implementation.</p>
      <Link href="/work#concepts-prototypes" className={`mt-5 inline-flex min-h-11 items-center ${linkInline}`}>Explore a connected-operations concept →</Link>
    </div></section>
    <ServiceQuestions items={[
      { question: "Do we need to replace our existing systems?", answer: "Not necessarily. We start with what works and check integration options before recommending a replacement." },
      { question: "Can we start with one workflow?", answer: "Yes. Bring one repeated task or difficult handoff. We’ll agree a useful scope and check its dependencies." },
      { question: "What will we get?", answer: "Depending on the agreed scope: a clearer workflow, connected systems, or implemented automation. Priorities, responsibilities, and acceptance criteria are defined before delivery." },
    ]} />
    <section className="mx-auto mb-16 max-w-6xl px-4 sm:px-6" aria-labelledby="automation-cta-heading">
      <div className="rounded-[2rem] bg-ink px-6 py-12 text-center sm:px-10">
        <h2 id="automation-cta-heading" className="text-3xl font-medium tracking-tight text-white sm:text-4xl">What’s slowing your team down?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">Bring one challenge. Let’s find a practical way forward.</p>
        <ServiceConversation label="Talk through your challenge" centered dark />
      </div>
    </section>
  <ManufacturingDemo />
    </ServiceEffects></main>;
}
