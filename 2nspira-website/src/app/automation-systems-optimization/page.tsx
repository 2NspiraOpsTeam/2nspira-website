import type { Metadata } from "next";
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
  title: "Automation & Systems Optimization",
  description:
    "Optimize the operating model first. Connect systems, data, processes, and teams—then automate and apply AI where they create practical value.",
  alternates: {
    canonical: "/automation-systems-optimization",
  },
};

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
    <main className={pageMain} id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(automationJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/hero/automation-systems-optimization-hero.jpg"
            alt="Abstract connected digital infrastructure representing interconnected business systems"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p>
            <EyebrowPill>Automation &amp; Systems Optimization</EyebrowPill>
          </p>
          <h1 className="animate-rise mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Optimize the operating model first. Automate what makes sense.
          </h1>
          <p className={`animate-rise ${lead}`} style={{ animationDelay: "80ms" }}>
            Make your systems work together, not around each other. We help
            organizations move from fragmented tools and manual work toward a
            connected, governed, and scalable technology environment.
          </p>
          <p
            className="animate-rise mt-5 max-w-3xl text-base leading-7 text-body"
            style={{ animationDelay: "120ms" }}
          >
            Automation is not the starting point. We first understand how the
            organization operates, then decide where systems should connect,
            processes should simplify, data should move, infrastructure should
            modernize, and AI can add practical value.
          </p>
          <div className="animate-rise mt-8" style={{ animationDelay: "160ms" }}>
            <Link href="/contact" className={buttonPrimary}>
              Request a consultation
            </Link>
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

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operatingLenses.map((lens, index) => (
              <Reveal key={lens.title} delay={index * 60} className="h-full">
                <article className={`group h-full p-6 hover:-translate-y-1 ${card}`}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`mt-5 ${h3}`}>{lens.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-body">{lens.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

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
            <Link href="/contact" className={buttonPrimary}>
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
