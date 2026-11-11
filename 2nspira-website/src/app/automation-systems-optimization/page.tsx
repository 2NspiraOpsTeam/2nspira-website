import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Network, Workflow, ChartNoAxesCombined } from "lucide-react";
import PlatformCarousel from "@/components/platforms/PlatformCarousel";
import WorkflowPreview from "@/components/automation/WorkflowPreview";
import styles from "@/components/automation/AutomationPage.module.css";
import { publishedContent } from "@/lib/platforms/server";
import { BOOKING_URL } from "@/lib/booking";
import { publicPageMetadata } from "@/lib/pageMetadata";
import PageSections from "@/components/PageSections";
import ServiceEffects from "@/components/ServiceEffects";
import ServiceQuestions from "@/components/ServiceQuestions";
import { EyebrowPill } from "@/components/VisualAccents";
import { cardFlat, h2, h3, lead, pageMain, section, sectionBand, linkInline, buttonPrimary, buttonSecondary } from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Business Process Automation & Connected Systems",
  shareTitle: "Less manual work. Smoother operations.",
  description: "Reduce manual work and disconnected spreadsheets. 2Nspira helps connect your systems, simplify handoffs, and improve the information your team relies on.",
  path: "/automation-systems-optimization"
});

const automationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Business Automation",
  description:
    "Reduce manual work and disconnected spreadsheets. 2Nspira helps connect your systems, simplify handoffs, and improve the information your team relies on.",
  url: "https://2nspira.com/automation-systems-optimization",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};


const pathways = [
  { id: "workflow-automation", icon: Workflow, title: "Less busywork", text: "Simplify repeat tasks so your team can focus on useful work.", examples: "Approvals · Reminders · Onboarding" },
  { id: "systems-integration", icon: Network, title: "Tools that work together", text: "Connect what already works. Reduce the copying in between.", examples: "CRM · Payments · Customer portals" },
  { id: "data-analytics", icon: ChartNoAxesCombined, title: "Information you can use", text: "Bring scattered information into a clearer, more consistent view.", examples: "Shared records · Reporting · Data quality" },
];
const approach = [
  { title: "Find the friction", text: "Start with one bottleneck and the people doing the work." },
  { title: "Connect what matters", text: "Simplify first. Keep useful tools and improve the handoffs." },
  { title: "Test. Learn. Improve.", text: "Check the outcome, support your team and agree what comes next." },
];
const lenses = ["Strategy", "Infrastructure", "Platforms", "Systems", "Data", "Processes", "People", "Governance"];
export const dynamic = "force-dynamic";
export default async function AutomationSystemsOptimizationPage() {
  const platforms = await publishedContent();
  return <main className={pageMain} id="main-content"><ServiceEffects editorial>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(automationJsonLd).replace(/</g, "\\u003c") }} />
    <section className={`${styles.hero} overflow-hidden border-b border-line`}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link href="/services" className={linkInline}>← All services</Link>
        <div className="mt-8 grid items-center gap-9 lg:grid-cols-2">
          <div>
            <EyebrowPill>Business Automation</EyebrowPill>
            <h1 className="mt-6 text-[length:var(--type-display)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">Less busywork.<br />More room to grow.</h1>
            <p className={lead}>Simplify repetitive work. Connect the systems you rely on. Give your people more room to focus.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonPrimary} aria-label="Let’s simplify your operations (Google Calendar, opens in a new tab)">Let’s simplify your operations <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
              <a href="#workflow-example-heading" className={buttonSecondary}>See a workflow ↓</a>
            </div>
            <p className="mt-3 text-xs leading-6 text-muted">30-minute introductory call · Google Meet · Booking opens Google Calendar</p>
          </div>
          <figure className={styles.visual}>
            <Image src="/images/hero/automation-systems-optimization-hero.png" alt="A team reviewing connected operations dashboards together." width={1855} height={848} sizes="(min-width: 1024px) 552px, calc(100vw - 32px)" unoptimized fetchPriority="high" className="h-auto w-full" />
          </figure>
        </div>
        <div id="platforms-technologies" className="mt-12 min-w-0 scroll-mt-28 border-t border-line pt-9 sm:mt-14">
          <h2 className={h2}>{platforms.heading}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-body">{platforms.intro}</p>
          <PlatformCarousel platforms={platforms.platforms} />
        </div>
      </div>
    </section>
    <PageSections items={[["pathways-heading", "What we improve"], ["workflow-example-heading", "See the difference"], ["approach-heading", "How we work"]]} />
    <section className={section} aria-labelledby="pathways-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <EyebrowPill>Make everyday work easier</EyebrowPill>
        <h2 id="pathways-heading" className={`mt-5 ${h2}`}>Less friction. Better flow.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pathways.map(({ id, icon: Icon, title, text, examples }) => <article key={id} id={id} data-service-card data-catalog-card className={`${styles.pathway} scroll-mt-28 p-6 sm:p-7 ${cardFlat}`}>
            <span data-service-rule aria-hidden="true" />
            <span data-service-icon><Icon className="h-6 w-6" aria-hidden="true" /></span>
            <h3 className={h3}>{title}</h3>
            <p className="mt-3 leading-7 text-body">{text}</p>
            <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-muted">{examples}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section className={sectionBand} aria-labelledby="workflow-example-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <EyebrowPill>Explore a familiar challenge</EyebrowPill>
        <h2 id="workflow-example-heading" className={`mt-5 ${h2}`}>Same work. A smoother way through.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-body">Choose a workflow to see what better-connected work could look like.</p>
        <WorkflowPreview />
      </div>
    </section>
    <section className={section} aria-labelledby="manufacturing-demo-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`grid overflow-hidden lg:grid-cols-2 lg:items-center ${cardFlat}`} data-catalog-card>
          <Link href="/demos/manufacturing" className="block focus-visible:outline-2 focus-visible:outline-accent"><Image src="/images/work/northstar-manufacturing-demo.webp" alt="Manufacturing sample showing connected production, inventory and quality dashboards." width={1600} height={1000} sizes="(min-width: 1024px) 560px, calc(100vw - 32px)" unoptimized className="h-auto w-full" /></Link>
          <div className="p-6 sm:p-9">
            <EyebrowPill>Try an interactive sample</EyebrowPill>
            <h2 id="manufacturing-demo-heading" className={`mt-5 ${h2}`}>Connected operations. See for yourself.</h2>
            <p className="mt-4 leading-7 text-body">Explore production, inventory and quality in our manufacturing demo.</p>
            <p className="mt-3 text-xs leading-6 text-muted">Fictional company and sample data—not a client deployment. The assistant uses local rules, not a live AI model.</p>
            <Link href="/demos/manufacturing" className={`${linkInline} mt-5`}>Explore the demo <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
            <p className="mt-3"><Link href="/work#concepts-prototypes" className="text-sm text-accent underline underline-offset-4">See our concepts and prototypes</Link></p>
          </div>
        </div>
      </div>
    </section>
    <section className={sectionBand} aria-labelledby="approach-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="approach-heading" className={h2}>Start small. Make it useful.</h2>
        <ol className={`${styles.timeline} mt-9 grid gap-8 md:grid-cols-3`}>
          {approach.map((step, i) => <li key={step.title} className="relative" data-catalog-fade>
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/20 bg-white text-sm font-semibold text-accent">0{i + 1}</span>
            <h3 className={`mt-5 ${h3}`}>{step.title}</h3>
            <p className="mt-3 max-w-sm leading-7 text-body">{step.text}</p>
          </li>)}
        </ol>
        <details className="mt-8 rounded-2xl border border-line bg-white p-5">
          <summary className="min-h-11 cursor-pointer rounded py-2 font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">The wider picture we consider</summary>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-body">A bottleneck rarely belongs to one tool. We consider eight connected lenses before recommending a change.</p>
          <ul className="mt-4 flex flex-wrap gap-2">{lenses.map(lens => <li key={lens} className="rounded-full border border-line px-3 py-2 text-sm text-ink">{lens}</li>)}</ul>
        </details>
        <p className="mt-5 text-sm text-body">Exploring AI too? <Link href="/ai-enablement" className={linkInline}>Start with purposeful AI enablement →</Link></p>
      </div>
    </section>
    <ServiceQuestions items={[
      { question: "Do we need to replace our existing systems?", answer: "Not necessarily. We start with what works and check integration options before recommending a replacement." },
      { question: "Can we start with one workflow?", answer: "Yes. Bring one repeated task or difficult handoff. We’ll agree a useful scope and check its dependencies." },
      { question: "What will we get?", answer: "A clearer workflow, connected systems or implemented automation—depending on the agreed scope. Responsibilities and acceptance criteria are defined before delivery." },
    ]} />
    <section className="mx-auto mb-16 max-w-6xl px-4 sm:px-6" aria-labelledby="automation-cta-heading">
      <div className="rounded-[2rem] bg-ink px-6 py-10 sm:px-10">
        <h2 id="automation-cta-heading" className="text-3xl font-medium tracking-tight text-white sm:text-4xl">What’s slowing your team down?</h2>
        <p className="mt-4 max-w-xl leading-7 text-white/80">Bring one challenge. Let’s find a practical way forward.</p>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonPrimary} aria-label="Let’s discuss your needs (Google Calendar, opens in a new tab)">Let’s discuss your needs <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
          <Link href="/contact#contact-message" className="inline-flex min-h-11 items-center text-sm text-white underline underline-offset-4">Prefer to send a message?</Link>
        </div>
        <p className="mt-3 text-xs leading-6 text-white/75">30-minute introductory call · Google Meet · Booking opens Google Calendar</p>
      </div>
    </section>
  </ServiceEffects></main>;
}
