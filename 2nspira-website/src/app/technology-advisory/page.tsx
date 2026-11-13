import { Compass, Route, Network, ShieldCheck, ArrowUpRight } from "lucide-react";
import BreadcrumbList from "@/components/BreadcrumbList";
import ExecutiveLensesCarousel from "@/components/ExecutiveLensesCarousel";
import ServiceJourney from "@/components/ServiceJourney";
import styles from "./TechnologyAdvisory.module.css";
import polish from "@/components/ServicePolish.module.css";
import ServiceEffects from "@/components/ServiceEffects";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceQuestions from "@/components/ServiceQuestions";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  card,
  cardFlat,
  eyebrow,
  h2,
  h3,
  lead,
  linkInline,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = publicPageMetadata({
  title: "Technology Advisory & Leadership",
  shareTitle: "Technology Advisory & Leadership",
  description: "Technology strategy, planning, vendor guidance and leadership support, including Fractional CIO engagements, aligned with your business goals.",
  path: "/technology-advisory"
});

const executiveLenses = [
  { title: "Strategy", text: "Connect technology priorities to the organization’s goals, operating model, and growth plans." },
  { title: "Investment", text: "Sequence spending around business value, capacity, dependencies, and responsible tradeoffs." },
  { title: "Infrastructure", text: "Assess the foundations required for secure, reliable, and resilient operations." },
  { title: "Platforms & Systems", text: "Clarify the role, fit, ownership, and integration of the tools the organization depends on." },
  { title: "Data", text: "Improve how information is governed, trusted, shared, and used in decision-making." },
  { title: "Operations", text: "Reduce friction across workflows, handoffs, vendors, and day-to-day technology delivery." },
  { title: "People", text: "Align leadership, internal capability, partners, roles, and accountability around the work." },
  { title: "Governance & Risk", text: "Make ownership, controls, standards, security, and risk decisions explicit and actionable." },
];

const approach = [
  { title: "Establish clarity", text: "Understand the current environment, priorities, investment, risks, people, and operational friction." },
  { title: "Set direction", text: "Define priorities, roadmap, architecture, ownership, governance, and the sequence of investment." },
  { title: "Lead execution", text: "Guide decisions, vendors, initiatives, teams, and accountability as the roadmap moves forward." },
];

const outcomes = [
  { title: "Sharper decisions", text: "A shared view of priorities, tradeoffs, ownership, and what should happen next." },
  { title: "More disciplined investment", text: "Technology spending connected to business value, timing, risk, and organizational capacity." },
  { title: "Stronger execution", text: "Clearer accountability across leaders, teams, vendors, systems, and critical initiatives." },
  { title: "A more resilient environment", text: "Less avoidable complexity, better governance, and a practical path for modernization." },
];

const technologyAdvisoryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Technology Advisory & Leadership",
  description:
    "Technology strategy, planning, vendor guidance and leadership support, including Fractional CIO engagements, aligned with your business goals.",
  url: "https://2nspira.com/technology-advisory",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};

export default function TechnologyAdvisoryPage() {
  return (
    <main className={`${pageMain} ${polish.page} ${styles.page}`} id="main-content"><ServiceEffects>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(technologyAdvisoryJsonLd).replace(/</g, "\\u003c") }} />
      <BreadcrumbList items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Technology Advisory & Leadership", url: "/technology-advisory" }]} />
      <section data-service-hero className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <nav aria-label="Breadcrumb" className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 pt-6 text-sm text-body sm:px-6"><Link href="/" className={linkInline}>Home</Link><span aria-hidden="true">/</span><Link href="/services" className={linkInline}>Services</Link><span aria-hidden="true">/</span><span aria-current="page">Technology Advisory &amp; Leadership</span></nav>
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-2 lg:gap-x-14">
          <div className="lg:col-span-2">
            <p className="hidden sm:block"><EyebrowPill>Technology Advisory & Leadership</EyebrowPill></p>
            <h1 className="mt-3 text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">Clear technology direction. Leadership that moves you forward.</h1>
          </div>

          <div>
            <p className={styles.heroKicker}>See the whole board. Make your next move count.</p>
            <p className={`mt-6 ${lead}`}>Technology strategy, practical planning, vendor guidance and leadership support for the decisions ahead. Engage us for focused advice or ongoing Fractional CIO leadership, with responsibilities agreed around your needs.</p>
            <ServiceConversation service="advisory" label="Discuss your technology decisions" />
          </div>
          <Reveal variant="scale">
            <figure className={`${styles.heroImage} relative overflow-hidden rounded-[2rem] border border-line`}>
              <Image src="/images/audiences/advisory-strategy-1280.webp" alt="Black and white chess knights facing one another across a board." width={1280} height={853} sizes="(min-width: 1024px) 560px, calc(100vw - 32px)" priority className="aspect-[4/3] w-full object-cover object-[center_65%]" />
              <figcaption className={styles.imageCaption}>A clear position. A considered move. A stronger next chapter.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
      <nav aria-label="Explore Technology Advisory & Leadership" className={styles.sectionNav}>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-1 px-4 py-4 sm:px-6">
          {[["#advisory-offerings", "Ways we can help"], ["#fit-heading", "Is this for you?"], ["#approach-heading", "How we work"], ["#deliverables-heading", "What you take away"], ["#executive-profile", "Featured technology partner"]].map(([href, label]) => <a key={href} href={href} className={`inline-flex min-h-11 items-center text-sm ${linkInline}`}>{label} <span aria-hidden="true" className="ml-2">↗</span></a>)}
        </div>
      </nav>
      <section className={styles.lensesSection} aria-label="The connected view"><div className="mx-auto max-w-6xl px-4 sm:px-6"><p className={eyebrow}>Strategy is a connected view</p><ExecutiveLensesCarousel lenses={executiveLenses} /></div></section>
      <section className={section} aria-labelledby="fit-heading">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal><figure className={styles.editorialImage}><Image src="/images/audiences/technology-infrastructure-1280.webp" alt="Interconnected servers and cabling inside a technology infrastructure cabinet." width={1280} height={853} sizes="(min-width: 1024px) 520px, calc(100vw - 32px)" className="aspect-[4/3] w-full object-cover" /><figcaption className={styles.editorialCaption}>Understand the connections before changing the system.</figcaption></figure></Reveal>
          <div><p className={eyebrow}>When the decisions get bigger</p><h2 id="fit-heading" className={`mt-4 ${h2}`}>Growing complexity. A leadership gap.</h2>
            <p className={`mt-4 ${lead}`}>Before choosing another tool, clarify the direction and support your organization needs.</p>
            <ul className="mt-6 space-y-4">{["Technology spending is growing, but priorities are unclear.", "Vendors, systems, and teams are pulling in different directions.", "Modernization has stalled—or risk is getting harder to ignore."].map(text => <li key={text} className={styles.signal}><span aria-hidden="true">↗</span><p>{text}</p></li>)}</ul>
            <p className="mt-6 text-sm leading-7 text-muted">Strategic advice, planning and leadership—not outsourced help-desk support. Your team and vendors remain part of the picture.</p>
          </div>
        </div>
      </section>
      <section id="advisory-offerings" className={`${section} scroll-mt-24`} aria-labelledby="advisory-offerings-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Advice, planning and leadership</p><h2 id="advisory-offerings-heading" className={`mt-4 ${h2}`}>The right level of support for your next step</h2><p className={`mt-4 max-w-3xl ${lead}`}>Start with a specific decision or build an ongoing leadership relationship. Scope, cadence and decision authority are agreed before work begins.</p>
        <div className={`mt-8 grid gap-4 md:grid-cols-2 ${styles.offerings}`}>{[
          { icon: Route, cue: "Choose the direction", title: "Technology strategy & planning", text: "Connect business goals to a practical technology roadmap, investment priorities and modernization sequence. Compare options, dependencies and risks before committing." },
          { icon: Network, cue: "Align the players", title: "Vendor guidance", text: "Assess solution fit, compare proposals and clarify vendor responsibilities, renewal questions and delivery expectations. Your organization retains purchasing and contract approval." },
          { icon: Compass, cue: "Keep progress on course", title: "Leadership support", text: "Bring experienced judgment to initiatives, governance and coordination across your team and partners. Establish clear owners, decision checkpoints and a workable review cadence." },
          { icon: ShieldCheck, cue: "Build lasting accountability", title: "Fractional CIO", text: "Ongoing, part-time senior technology leadership for organizations that need CIO-level direction without a full-time appointment. Align strategy, investment, governance and delivery oversight through an agreed remit; decision authority remains yours unless explicitly delegated." },
        ].map(offering => <article key={offering.title} className={`p-6 ${cardFlat} ${styles.offering}`}><div className={styles.offeringTop}><span className={styles.iconBadge}><offering.icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><p className={styles.offeringCue}>{offering.cue}</p></div><h3 className={`mt-5 ${h3}`}>{offering.title}</h3><p className="mt-3 text-sm leading-7 text-body">{offering.text}</p></article>)}</div>
      </div></section>
      <section className={sectionBand} aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={eyebrow}>Clarity → Direction → Execution</p><h2 id="approach-heading" className={`mt-4 max-w-3xl ${h2}`}>From competing priorities to coordinated progress</h2>
          <div className={`mt-10 grid gap-6 md:grid-cols-3 ${styles.process}`}>{approach.map((step, index) => <Reveal key={step.title} delay={index * 80} className="h-full"><article data-process-step className={`h-full p-7 ${card} ${styles.step}`}><div className={styles.stepHeader}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><ArrowUpRight size={24} aria-hidden="true" /></div><h3 className={`mt-5 ${h3}`}>{step.title}</h3><p className="mt-3 text-sm leading-7 text-body">{step.text}</p></article></Reveal>)}</div>
        </div>
      </section>
      <section className={section} aria-labelledby="deliverables-heading">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div><p className={eyebrow}>Practical direction, not shelfware</p><h2 id="deliverables-heading" className={`mt-4 ${h2}`}>Know what to do next—and why.</h2><p className={`mt-4 ${lead}`}>A shared roadmap connects your goals, investment, people, and delivery.</p>
            <Reveal><figure className={`mt-8 ${styles.editorialImage}`}><Image src="/images/advisory/strategic-bridge.webp" alt="The Golden Gate Bridge spanning the bay, connecting two shores." width={1280} height={720} sizes="(min-width: 1024px) 520px, calc(100vw - 32px)" className="aspect-[4/3] w-full object-cover" /><figcaption className={styles.editorialCaption}>Connect where you are with where you need to go.</figcaption></figure></Reveal>
          </div>
          <div><div className="grid gap-4">{outcomes.map((outcome, index) => <Reveal key={outcome.title} delay={index * 60}><article className={`p-6 ${cardFlat} ${styles.outcome}`}><span className={styles.outcomeNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3 className={h3}>{outcome.title}</h3><p className="mt-2 text-sm leading-7 text-body">{outcome.text}</p></div></article></Reveal>)}</div>
            <details className={styles.disclosure}><summary>Explore example working documents</summary><p className="mt-4 text-sm leading-7 text-muted">Depending on agreed scope; examples, not published client artifacts.</p><ul className="mt-4 space-y-4">{[["Technology roadmap", "Priorities, dependencies, owners, and delivery sequence."], ["Vendor assessment", "Service fit, responsibilities, and renewal questions."], ["Investment priorities", "Options weighed against value, cost, capacity, and risk."], ["Governance structure", "Decision rights, checkpoints, and escalation routes."]].map(([title, text]) => <li key={title}><h4 className="font-semibold text-ink">{title}</h4><p className="mt-1 text-sm leading-6 text-body">{text}</p></li>)}</ul></details>
          </div>
        </div>
      </section>
      <ServiceJourney service="advisory" />
      <section id="executive-profile" className={section} aria-labelledby="executive-profile-heading"><div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr]">
        <Reveal><div className={styles.partnerMark} aria-hidden="true"><div className={styles.compassRing}><Compass size={96} strokeWidth={1} /></div><span>Independent perspective</span><p>Direction with purpose.</p></div></Reveal>
        <div><p className={eyebrow}>Featured technology partner</p><h2 id="executive-profile-heading" className={`mt-4 ${h2}`}>Experienced judgment. Independent perspective.</h2><p className="mt-5 leading-7 text-body">Jeffrey V. Cortez is one of our featured technology partners. He brings 20+ years of technology leadership across education, financial services, conservation, and enterprise operations. His collaborative approach connects executive direction with practical implementation.</p><p className="mt-4 leading-7 text-body">Our recommendations follow your needs—not a platform or license we need to sell.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-2"><Link href="/about#executive-profile" className={`inline-flex min-h-11 items-center ${linkInline}`}>Meet Jeffrey →</Link><Link href="/work#internal-engineering" className={`inline-flex min-h-11 items-center ${linkInline}`}>Explore our engineering practice →</Link></div></div>
      </div></section>
      <ServiceQuestions items={[
        { question: "Is this the same as outsourced IT support?", answer: "No. Technology Advisory & Leadership covers strategy, planning, vendor guidance and leadership support. Fractional CIO is an ongoing leadership offering within that broader service. Day-to-day technical support and hands-on implementation are scoped separately and are not automatically included." },
        { question: "Do we need an ongoing Fractional CIO engagement?", answer: "No. You can start with a focused technology decision, planning exercise or vendor review. Fractional CIO is available when you need ongoing senior leadership; it is not a requirement for advisory work." },
        { question: "What does a starting engagement look like?", answer: "We begin with your priorities, current environment, and decisions that need attention. We agree the leadership scope, authority, responsibilities, and way of working before the engagement begins." },
        { question: "Can you work with our existing team and vendors?", answer: "Yes. The service is designed to connect leadership, internal capability, and partners around a shared direction. Your organization retains business decision ownership, and any delegated authority is agreed explicitly." },
      ]} />
      <section className={sectionBand} aria-labelledby="fractional-cio-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="fractional-cio-cta-heading" className={h2}>Bring clarity to your next technology decision</h2>
          <p className={`mx-auto mt-4 max-w-2xl ${lead}`}>Start with the priorities, decisions, or initiatives that need stronger technology leadership now.</p>
          <div className="mt-10">
            <ServiceConversation service="advisory" label="Discuss your technology decisions" centered />
          </div>
        </div>
      </section>

    </ServiceEffects></main>
  );
}
