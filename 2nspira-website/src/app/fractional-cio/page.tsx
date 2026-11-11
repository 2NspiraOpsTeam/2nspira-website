import ExecutiveLensesCarousel from "@/components/ExecutiveLensesCarousel";
import ServiceJourney from "@/components/ServiceJourney";
import styles from "./FractionalCio.module.css";
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
  title: "Executive Technology Advisory",
  shareTitle: "Clearer decisions. Technology that serves your goals.",
  description: "Unsure which technology investments will help your business? Get fractional CIO guidance to set priorities, manage risk, and support operations and growth.",
  path: "/fractional-cio"
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

const fractionalCioJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Executive Technology Advisory",
  description:
    "Unsure which technology investments will help your business? Get fractional CIO guidance to set priorities, manage risk, and support operations and growth.",
  url: "https://2nspira.com/fractional-cio",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};

export default function FractionalCioPage() {
  return (
    <main className={`${pageMain} ${polish.page} ${styles.page}`} id="main-content"><ServiceEffects>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fractionalCioJsonLd).replace(/</g, "\\u003c") }} />
      <section data-service-hero className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div>
            <p><EyebrowPill>Executive Technology Advisory</EyebrowPill></p>
            <h1 className="mt-6 text-[length:var(--type-display)] font-medium leading-[1.08] tracking-[-0.04em] text-ink">Technology leadership without the full-time executive overhead</h1>
            <p className={`mt-6 ${lead}`}>A selective premium engagement spanning AI enablement, business automation and digital platforms. Set priorities, guide investment and align delivery with experienced executive technology judgment.</p>
            <ServiceConversation service="advisory" label="Discuss your technology decisions" />
          </div>
          <Reveal variant="scale">
            <figure className={`${styles.heroImage} relative overflow-hidden rounded-[2rem] border border-line`}>
              <Image src="/images/advisory/collaborative-strategy.webp" alt="Illustrative executive strategy conversation around a shared table." width={1672} height={941} sizes="(min-width: 1024px) 560px, calc(100vw - 32px)" priority className="aspect-[4/3] w-full object-cover" />
              <figcaption className={styles.imageCaption}>Business goals. Technology direction. One shared agenda.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
      <nav aria-label="Explore Fractional CIO services" className={styles.sectionNav}>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-1 px-4 py-4 sm:px-6">
          {[["#fit-heading", "Is this for you?"], ["#approach-heading", "How we work"], ["#deliverables-heading", "What you take away"], ["#executive-profile", "Your technology partner"]].map(([href, label]) => <a key={href} href={href} className={`inline-flex min-h-11 items-center text-sm ${linkInline}`}>{label} <span aria-hidden="true" className="ml-2">↗</span></a>)}
        </div>
      </nav>
      <ServiceJourney service="advisory" />
      <section className={section} aria-labelledby="fit-heading">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal><figure className={styles.editorialImage}><Image src="/images/pages/fractional-cio-focus.webp" alt="Illustrative business leader reviewing technology information at a workstation." width={600} height={674} sizes="(min-width: 1024px) 520px, calc(100vw - 32px)" className="aspect-[4/3] w-full object-cover object-[center_35%]" /></figure></Reveal>
          <div><p className={eyebrow}>When the decisions get bigger</p><h2 id="fit-heading" className={`mt-4 ${h2}`}>Growing complexity. A leadership gap.</h2>
            <p className={`mt-4 ${lead}`}>You don’t need another tool. You need a clear way forward.</p>
            <ul className="mt-6 space-y-4">{["Technology spending is growing, but priorities are unclear.", "Vendors, systems, and teams are pulling in different directions.", "Modernization has stalled—or risk is getting harder to ignore."].map(text => <li key={text} className={styles.signal}><span aria-hidden="true">↗</span><p>{text}</p></li>)}</ul>
            <p className="mt-6 text-sm leading-7 text-muted">Executive direction and accountability—not outsourced help-desk support. Your team and vendors remain part of the picture.</p>
          </div>
        </div>
      </section>
      <section className={sectionBand} aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className={eyebrow}>Clarity → Direction → Execution</p><h2 id="approach-heading" className={`mt-4 max-w-3xl ${h2}`}>From competing priorities to coordinated progress</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">{approach.map((step, index) => <Reveal key={step.title} delay={index * 80} className="h-full"><article data-process-step className={`h-full p-7 ${card} ${styles.step}`}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><h3 className={`mt-5 ${h3}`}>{step.title}</h3><p className="mt-3 text-sm leading-7 text-body">{step.text}</p></article></Reveal>)}</div>
        </div>
      </section>
      <section className={section} aria-labelledby="deliverables-heading">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div><p className={eyebrow}>Practical direction, not shelfware</p><h2 id="deliverables-heading" className={`mt-4 ${h2}`}>Know what to do next—and why.</h2><p className={`mt-4 ${lead}`}>A shared roadmap connects your goals, investment, people, and delivery.</p>
            <Reveal><figure className={`mt-8 ${styles.editorialImage}`}><Image src="/images/advisory/advisory-ideas-to-impact.webp" alt="Conceptual illustration of an advisory conversation at a strategy wall." width={1672} height={941} sizes="(min-width: 1024px) 520px, calc(100vw - 32px)" className="aspect-[4/3] w-full object-cover" /></figure></Reveal>
          </div>
          <div><div className="grid gap-4">{outcomes.map((outcome, index) => <Reveal key={outcome.title} delay={index * 60}><article className={`p-6 ${cardFlat}`}><h3 className={h3}>{outcome.title}</h3><p className="mt-2 text-sm leading-7 text-body">{outcome.text}</p></article></Reveal>)}</div>
            <details className={styles.disclosure}><summary>Explore example working documents</summary><p className="mt-4 text-sm leading-7 text-muted">Depending on agreed scope; examples, not published client artifacts.</p><ul className="mt-4 space-y-4">{[["Technology roadmap", "Priorities, dependencies, owners, and delivery sequence."], ["Vendor assessment", "Service fit, responsibilities, and renewal questions."], ["Investment priorities", "Options weighed against value, cost, capacity, and risk."], ["Governance structure", "Decision rights, checkpoints, and escalation routes."]].map(([title, text]) => <li key={title}><h4 className="font-semibold text-ink">{title}</h4><p className="mt-1 text-sm leading-6 text-body">{text}</p></li>)}</ul></details>
          </div>
        </div>
      </section>
      <section className={sectionBand} aria-labelledby="lenses-heading"><div className="mx-auto max-w-6xl px-4 sm:px-6"><p className={eyebrow}>The connected view</p><h2 id="lenses-heading" className={`mt-4 ${h2}`}>See the whole business. Not just the technology.</h2><p className="mt-4 max-w-2xl leading-7 text-body">Eight executive lenses help reveal dependencies, clarify ownership, and put business impact first.</p>
        <ExecutiveLensesCarousel lenses={executiveLenses} />
      </div></section>
      <section id="executive-profile" className={section} aria-labelledby="executive-profile-heading"><div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr]">
        <Reveal><Image src="/images/leadership/jeffrey-cortez-linkedin-20261103.jpg" alt="Jeffrey V. Cortez" width={400} height={400} sizes="(min-width: 1024px) 320px, 240px" className="mx-auto aspect-square w-60 rounded-[2rem] object-cover lg:w-80" /></Reveal>
        <div><p className={eyebrow}>Your technology partner</p><h2 id="executive-profile-heading" className={`mt-4 ${h2}`}>Experienced judgment. Independent perspective.</h2><p className="mt-5 leading-7 text-body">Jeffrey V. Cortez brings 20+ years of technology leadership across education, financial services, conservation, and enterprise operations. His collaborative approach connects executive direction with practical implementation.</p><p className="mt-4 leading-7 text-body">Our recommendations follow your needs—not a platform or license we need to sell.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-2"><Link href="/about#executive-profile" className={`inline-flex min-h-11 items-center ${linkInline}`}>Meet Jeffrey →</Link><Link href="/work#internal-engineering" className={`inline-flex min-h-11 items-center ${linkInline}`}>Explore our engineering practice →</Link></div></div>
      </div></section>
      <ServiceQuestions items={[
        { question: "Is this the same as outsourced IT support?", answer: "No. Fractional CIO work provides executive direction, decision support, and accountability. Day-to-day technical support and hands-on implementation are different responsibilities and are not automatically included." },
        { question: "What does a starting engagement look like?", answer: "We begin with your priorities, current environment, and decisions that need attention. We agree the leadership scope, authority, responsibilities, and way of working before the engagement begins." },
        { question: "Can you work with our existing team and vendors?", answer: "Yes. The service is designed to connect leadership, internal capability, and partners around a shared direction. Your organization retains business decision ownership, and any delegated authority is agreed explicitly." },
      ]} />
      <section className={sectionBand} aria-labelledby="fractional-cio-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="fractional-cio-cta-heading" className={h2}>Bring executive clarity to your next technology decision</h2>
          <p className={`mx-auto mt-4 max-w-2xl ${lead}`}>Start with the priorities, decisions, or initiatives that need stronger technology leadership now.</p>
          <div className="mt-10">
            <ServiceConversation service="advisory" label="Discuss your technology decisions" centered />
          </div>
        </div>
      </section>

    </ServiceEffects></main>
  );
}
