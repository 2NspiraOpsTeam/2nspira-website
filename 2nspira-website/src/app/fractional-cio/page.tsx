import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
  buttonPrimary,
  card,
  cardFlat,
  eyebrow,
  h2,
  h3,
  lead,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Fractional CIO Advisory & Modernization Strategy",
  description:
    "Get experienced fractional CIO leadership to align technology strategy, investment, modernization, governance, and execution with your business goals.",
  alternates: {
    canonical: "/fractional-cio",
  },
};

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
  name: "Fractional CIO Advisory & Modernization Strategy",
  description:
    "Senior technology leadership, modernization strategy, and practical mentoring for executives and founders navigating growth, complexity, and consequential technology decisions.",
  url: "https://2nspira.com/fractional-cio",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};

export default function FractionalCioPage() {
  return (
    <main className={pageMain} id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fractionalCioJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p><EyebrowPill>Fractional CIO / Technology Leadership</EyebrowPill></p>
          <h1 className="animate-rise mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Technology leadership without the full-time executive overhead
          </h1>
          <p className={`animate-rise ${lead}`} style={{ animationDelay: "80ms" }}>
            Senior, independent leadership to connect technology decisions with business priorities, investment, operations, people, and risk.
          </p>
          <p className="animate-rise mt-5 max-w-3xl text-base leading-7 text-body" style={{ animationDelay: "120ms" }}>
            This is not outsourced IT support or generic technical consulting. It is executive judgment for organizations that need clarity, direction, and accountable execution without hiring a full-time CIO.
          </p>
          <div className="animate-rise mt-8" style={{ animationDelay: "160ms" }}>
            <Link href="/contact" className={buttonPrimary}>Discuss your technology priorities</Link>
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="leadership-heading">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className={eyebrow}>Executive technology leadership</p>
            <h2 id="leadership-heading" className={`mt-4 ${h2}`}>What a Fractional CIO actually does</h2>
            <p className={`mt-4 ${lead}`}>A Fractional CIO turns business priorities into technology decisions the organization can fund, own, and execute.</p>
            <p className="mt-5 leading-8 text-body">
              We assess the environment, frame tradeoffs, establish a practical roadmap, guide vendors and initiatives, and strengthen leadership accountability. The work sits above day-to-day support while remaining close enough to execution to keep strategy grounded.
            </p>
            <div className={`mt-8 p-6 sm:p-7 ${cardFlat}`}>
              <AccentRule className="mb-5" />
              <h3 className={h3}>Independent judgment</h3>
              <p className="mt-3 leading-7 text-body">
                2Nspira is not tied to selling a particular platform, license, or implementation. Recommendations are shaped by organizational needs, existing investments, risk, and the simplest responsible path forward.
              </p>
            </div>
          </div>
          <Reveal>
            <figure className="group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
              <Image src="/images/advisory/advisory-ideas-to-impact.webp" alt="Conceptual visualization of an executive advisory and mentoring conversation at a strategy wall." width={1672} height={941} className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.015]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-accent/10 opacity-60" aria-hidden="true" />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="lenses-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className={eyebrow}>Eight executive lenses</p>
            <h2 id="lenses-heading" className={`mt-4 ${h2}`}>See the whole environment before setting the agenda</h2>
            <p className={`mt-4 ${lead}`}>Technology leadership requires a connected view. We examine eight dimensions together so decisions account for dependencies, constraints, ownership, and business impact.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {executiveLenses.map((lens, index) => (
              <Reveal key={lens.title} delay={index * 60} className="h-full">
                <article className={`group h-full p-6 hover:-translate-y-1 ${card}`}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={`mt-5 ${h3}`}>{lens.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-body">{lens.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="fit-heading">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <article className={`h-full p-7 sm:p-8 ${card}`}>
              <AccentRule className="mb-6" />
              <h2 id="fit-heading" className={h2}>When Fractional CIO leadership makes sense</h2>
              <p className="mt-5 leading-8 text-body">
                The organization has reached a point where technology decisions carry executive consequences, but the need or budget does not justify a full-time CIO. Growth, modernization, technical debt, vendor complexity, unclear ownership, or a stalled initiative often make the leadership gap visible.
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className={`h-full p-7 sm:p-8 ${card}`}>
              <AccentRule className="mb-6" />
              <h2 className={h2}>Leadership that connects the organization</h2>
              <p className="mt-5 leading-8 text-body">
                Effective technology direction connects business ambition, financial discipline, operational reality, IT capability, and vendor delivery. We create a common decision frame so those groups can move together instead of optimizing in isolation.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className={eyebrow}>Clarity → Direction → Execution</p>
            <h2 id="approach-heading" className={`mt-4 ${h2}`}>A disciplined path from complexity to progress</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {approach.map((step, index) => (
              <Reveal key={step.title} delay={index * 80} className="h-full">
                <article className={`h-full p-7 ${card}`}>
                  <p className="text-sm font-semibold tracking-widest text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className={`mt-4 ${h3}`}>{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="outcomes-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className={eyebrow}>Tangible outcomes</p>
            <h2 id="outcomes-heading" className={`mt-4 ${h2}`}>Leadership that improves decisions and execution</h2>
            <p className={`mt-4 ${lead}`}>The objective is not a strategy document. It is an organization better equipped to make, fund, and carry out technology decisions.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <Reveal key={outcome.title} delay={index * 70}>
                <article className={`h-full p-7 ${cardFlat}`}>
                  <h3 className={h3}>{outcome.title}</h3>
                  <p className="mt-3 leading-7 text-body">{outcome.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="fractional-cio-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="fractional-cio-cta-heading" className={h2}>Bring executive clarity to your next technology decision</h2>
          <p className={`mx-auto mt-4 max-w-2xl ${lead}`}>Start with the priorities, decisions, or initiatives that need stronger technology leadership now.</p>
          <div className="mt-10">
            <Link href="/contact" className={buttonPrimary}>Start a leadership conversation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
