import ServiceEffects from "@/components/ServiceEffects";
import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ServiceConversation from "@/components/ServiceConversation";
import ServiceFit from "@/components/ServiceFit";
import ServiceQuestions from "@/components/ServiceQuestions";
import { AccentRule, AmbientField, EyebrowPill } from "@/components/VisualAccents";
import {
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

export const metadata: Metadata = publicPageMetadata({
  "title": "Automation & Systems Optimization",
  "description": "Streamline operations with connected systems, trusted data, clearer workflows, and practical automation designed around how your organization actually works.",
  "path": "/automation-systems-optimization"
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

const interventions = [
  {
    title: "Connect systems and data",
    text: "Integrate applications through APIs, reduce duplicate entry, and create dependable movement of information across the workflow.",
  },
  {
    title: "Simplify the work",
    text: "Remove unnecessary steps, clarify handoffs, and standardize processes before automating them.",
  },
  {
    title: "Modernize pragmatically",
    text: "Improve infrastructure and legacy workflows in stages, preserving useful systems instead of forcing unnecessary rip-and-replace programs.",
  },
  {
    title: "Automate and apply AI selectively",
    text: "Introduce automation and AI only where the operating model, data, controls, and expected value make the change durable.",
  },
];

const systemTypes = [
  "CRM",
  "ERP & accounting",
  "Payment platforms",
  "Email & workspace systems",
  "Databases",
  "Internal applications",
  "Client & customer portals",
  "APIs",
  "Automation platforms",
  "Reporting & analytics",
];

const approach = [
  {
    title: "Understand the operating model",
    text: "Map how strategy, technology, data, work, people, and governance interact across the full journey—not one isolated task.",
  },
  {
    title: "Find the highest-leverage changes",
    text: "Identify where integration, simplification, modernization, clearer ownership, or better information will remove structural friction.",
  },
  {
    title: "Sequence practical improvement",
    text: "Connect and stabilize the environment first, then introduce automation and AI in phases the organization can operate and scale.",
  },
];

const automationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automation & Systems Optimization",
  description:
    "Operating-model optimization across strategy, infrastructure, platforms, systems, data, processes, people, and governance, followed by practical integration, automation, and AI implementation.",
  url: "https://2nspira.com/automation-systems-optimization",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};

export default function AutomationSystemsOptimizationPage() {
  return (
    <main className={pageMain} id="main-content"><ServiceEffects>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(automationJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="max-w-4xl">
            <p>
              <EyebrowPill>Automation &amp; Systems Optimization</EyebrowPill>
            </p>
            <h1 className="animate-rise mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Less repeated work. Better-connected systems.
            </h1>
            <p className={`animate-rise ${lead}`} style={{ animationDelay: "80ms" }}>
              Manual processes, duplicated work, and disconnected applications make growth harder. We help simplify operations, connect existing systems, and improve the reliability of the information your team uses.
            </p>
            <p
              className="animate-rise mt-5 max-w-3xl text-base leading-7 text-body"
              style={{ animationDelay: "120ms" }}
            >
              Keep the tools that serve you. We look at how work moves between
              people and systems, then agree what to simplify, connect, or automate.
              A new platform is not always the answer.
            </p>
            <div className="animate-rise mt-8" style={{ animationDelay: "160ms" }}>
              <ServiceConversation label="Talk through a workflow bottleneck" />
            </div>
          </div>

          <figure className="hero-settle mt-12 overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
            <Image
              src="/images/hero/automation-systems-optimization-hero.png"
              alt="A team collaborating around connected operations dashboards in a modern technology workspace."
              width={1855}
              height={848}
              sizes="(min-width: 1152px) 1152px, calc(100vw - 32px)"
              unoptimized
              fetchPriority="high"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <ServiceFit intro="For teams whose day-to-day work is harder than it needs to be. Start with a real bottleneck, not a wish list of tools." items={[
        { title: "The same data gets entered twice", text: "Your team copies information across apps or spreadsheets and has to check which version is right." },
        { title: "Handoffs depend on chasing people", text: "Updates, approvals, and follow-ups get stuck because ownership or status is unclear." },
        { title: "You’ve outgrown a workaround", text: "A process or legacy system still matters, but it needs a more reliable way to connect with the rest of the business." },
      ]} />
      <section className={sectionBand} aria-labelledby="improvements-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className={eyebrow}>From fragmentation to flow</p>
            <h2 id="improvements-heading" className={`mt-4 ${h2}`}>
              Improve the environment, then automate the right work
            </h2>
            <p className={`mt-4 ${lead}`}>
              The goal is not more automation. It is a reliable operating model
              with fewer workarounds, cleaner information, clearer ownership, and
              room to grow.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {interventions.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className={`relative h-full overflow-hidden p-7 sm:p-8 ${card}`}>
                  <AccentRule className="mb-6 w-10" />
                  <h3 className={h3}>{item.title}</h3>
                  <p className="mt-3 leading-7 text-body">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="operational-outcomes-heading">
        <h2 id="operational-outcomes-heading" className={h2}>Start where the work breaks down.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            { id: "workflow-automation", title: "Operations & Workflow Automation", text: "Manual processes, duplicated work, and workflows that no longer scale create avoidable administration. Map the work, simplify handoffs, and automate appropriate steps." },
            { id: "systems-integration", title: "Systems Integration & Modernization", text: "Disconnected applications and duplicated data make everyday work more complex. Connect the tools that still serve you, clarify ownership, and modernize where there is a practical reason." },
            { id: "data-analytics", title: "Data & Analytics", text: "When nobody trusts the reports, another dashboard is not enough. Address data integrity, reporting definitions, and access to timely information so leaders have better decision support." },
          ].map(item => <article key={item.id} id={item.id} className={`scroll-mt-28 p-6 ${cardFlat}`}><h3 className="text-xl font-semibold text-ink">{item.title}</h3><p className="mt-4 leading-7 text-body">{item.text}</p></article>)}
        </div>
      </section>

      <section className={section} aria-labelledby="systems-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className={eyebrow}>Across the technology landscape</p>
              <h2 id="systems-heading" className={`mt-4 ${h2}`}>
                Connect the systems the work already depends on
              </h2>
              <p className={`mt-4 ${lead}`}>
                We work across existing and new platforms, choosing the simplest
                responsible combination of configuration, integration, custom
                development, automation, and replacement.
              </p>
            </div>
            <Reveal>
              <div className={`grid grid-cols-2 gap-3 p-6 sm:grid-cols-3 sm:p-8 ${cardFlat}`} role="list" aria-label="System and integration examples">
                {systemTypes.map((system) => (
                  <div key={system} role="listitem" className="rounded-xl border border-line bg-canvas px-4 py-4 text-sm font-medium text-ink">
                    {system}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={sectionBand} aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="approach-heading" className={h2}>
            A practical path to connected operations
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {approach.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <article className={`h-full p-7 ${card}`}>
                  <p className="text-sm font-semibold tracking-widest text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className={`mt-4 ${h3}`}>{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-body">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="lenses-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className={eyebrow}>Eight connected lenses</p>
            <h2 id="lenses-heading" className={`mt-4 ${h2}`}>
              See the whole environment before changing the workflow
            </h2>
            <p className={`mt-4 ${lead}`}>
              A workflow problem rarely belongs to one tool. We evaluate the
              operating model across eight dimensions to understand root causes,
              dependencies, ownership, and the safest path forward.
            </p>
          </div>

          <details className="mt-8 rounded-2xl border border-line bg-surface p-5 sm:p-7"><summary className="cursor-pointer rounded font-semibold text-ink focus-visible:outline-2 focus-visible:outline-accent">Explore the eight connected lenses</summary>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operatingLenses.map((lens, index) => (
              <Reveal key={lens.title} delay={index * 60} className="h-full">
                <article className={`group h-full p-6 motion-safe:hover:-translate-y-1 ${card}`}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`mt-5 ${h3}`}>{lens.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-body">{lens.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          </details>
          <Reveal className="mt-8">
            <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-line bg-ink p-8 text-white shadow-[0_24px_70px_rgba(35,41,54,0.14)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  The 2Nspira difference
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  One operating workflow, not a collection of automation steps
                </h3>
                <p className="mt-4 leading-7 text-white/70">
                  We follow the work across teams, systems, decisions, and data.
                  That reveals where automation will help—and where integration,
                  process design, governance, or modernization must come first.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4" aria-label="Operating model lenses">
                {operatingLenses.map((lens) => (
                  <div key={lens.title} className="rounded-2xl border border-white/15 bg-white/5 px-3 py-4 text-center font-medium text-white/85">
                    {lens.title}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceQuestions items={[
        { question: "Will we need to replace our existing systems?", answer: "Not necessarily. We assess what works, what does not, and the available integrations before recommending changes. Platform constraints, data quality, and access requirements influence what is feasible." },
        { question: "What will the engagement deliver?", answer: "The agreed scope may include workflow mapping, integration planning, process changes, or implementation. We define the priorities, responsibilities, dependencies, and acceptance criteria before committing to delivery." },
        { question: "Can we start with one workflow?", answer: "Yes. Bring a specific example of repeated work or a difficult handoff. We consider its wider dependencies and agree a useful scope rather than assuming a full replacement or organization-wide automation program." },
      ]} />
      <section className={section} aria-labelledby="automation-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="automation-cta-heading" className={h2}>
            Make the operating model easier to run—and ready to scale
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl ${lead}`}>
            Start with the workflow, not the tool. We’ll help identify what to
            simplify, connect, modernize, automate, or leave alone.
          </p>
          <div className="mt-10">
            <ServiceConversation label="Talk through a workflow bottleneck" centered />
          </div>
        </div>
      </section>
    </ServiceEffects></main>
  );
}
