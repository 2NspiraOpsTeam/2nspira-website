import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  buttonPrimary,
  card,
  cardFlat,
  caption,
  eyebrow,
  h2,
  h3,
  lead,
  linkInline,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Websites & Web Applications",
  description:
    "We design and build websites and web applications that work for your business — from bilingual marketing sites to internal tools. See the work we've shipped for clients.",
  alternates: {
    canonical: "/websites",
  },
};

const capabilities = [
  {
    title: "Websites & marketing sites",
    text: "Clear, fast, accessible sites built to convert and stay easy to maintain.",
  },
  {
    title: "Web applications",
    text: "Trackers, dashboards, and internal tools shaped around real workflows.",
  },
  {
    title: "Build vs. buy guidance",
    text: "A practical recommendation before budget is committed.",
  },
  {
    title: "Performance, SEO & accessibility",
    text: "The technical foundations that keep a digital product healthy after launch.",
  },
];

const outcomes = [
  "A site or tool that reflects how your business actually operates.",
  "A clear build-vs-buy recommendation before any spend is committed.",
  "Systems and code that stay maintainable after the project ends.",
  "Performance and search visibility handled from day one.",
];

const steps = [
  {
    title: "Understand the job",
    text: "We start with the audience, the workflow, and the outcome the site or tool has to deliver.",
  },
  {
    title: "Build it right",
    text: "Clean architecture, structured content, and the performance and accessibility fundamentals baked in — not retrofitted.",
  },
  {
    title: "Verify and hand over",
    text: "We test real user flows, confirm live behavior, and hand over something your team can update without fear.",
  },
];

const propertyOperationsTransformation = [
  {
    number: "01",
    before: "Manual listings",
    after: "AI-assisted publishing",
  },
  {
    number: "02",
    before: "Manual applicant review",
    after: "Structured digital workflow",
  },
  {
    number: "03",
    before: "Paper lease agreements",
    after: "Digital lease generation and e-signature",
  },
  {
    number: "04",
    before: "Physical copies and manual distribution",
    after: "Automatic emailed signed copies",
  },
];

type ShowcaseSite = {
  name: string;
  url: string;
  tag: string;
  description: string;
  scope: string[];
};

const showcase: ShowcaseSite[] = [
  {
    name: "2Nspira",
    url: "https://2nspira.com",
    tag: "Services & advisory",
    description:
      "Technology leadership, AI readiness, insights, and practical assessment tools in one clear digital home.",
    scope: ["Advisory platform", "Resource library", "Assessment tools"],
  },
  {
    name: "CalmLoop",
    url: "https://calmloop.vercel.app",
    tag: "Consumer web app",
    description:
      "A low-pressure companion offering gentle routine ideas for neurodivergent children and their families.",
    scope: ["Family-focused UX", "Sensory-aware design", "Web app"],
  },
  {
    name: "Breadcrumb",
    url: "https://breadcrumb-challenge.vercel.app",
    tag: "Interactive experience",
    description:
      "A fast OSINT challenge game engineered to run anywhere without a server or database.",
    scope: ["Interactive game", "Zero-infrastructure", "Fast delivery"],
  },
  {
    name: "GeVitals",
    url: "https://gevitals.com",
    tag: "Bilingual professional site",
    description:
      "A bilingual clinic website combining migrated content, video, publishing, and local discovery.",
    scope: ["Bilingual experience", "Content migration", "Local SEO"],
  },
  {
    name: "Open Goal Soccer",
    url: "https://opengoalsoccer.com",
    tag: "Mission-driven archival site",
    description:
      "An accessible digital archive preserving an inclusive youth soccer program’s mission and community story.",
    scope: ["Archival redesign", "Content preservation", "Accessibility"],
  },
];

const websitesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Websites & Web Applications",
  description:
    "We design and build websites and web applications that work for your business — from bilingual marketing sites to internal tools. Includes an honest build-vs-buy recommendation before any spend.",
  url: "https://2nspira.com/websites",
  provider: { "@id": "https://2nspira.com/#organization" },
  areaServed: "Worldwide",
};

export default function WebsitesPage() {
  return (
    <main className={pageMain} id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websitesJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p className={eyebrow}>
            <Link href="/services" className="hover:text-accent">
              ← All services
            </Link>
          </p>
          <h1 className="animate-rise mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Websites &amp; Web Applications
          </h1>
          <p className={`animate-rise ${lead}`} style={{ animationDelay: "80ms" }}>
            We design and build websites and web applications that work for your
            business — from bilingual marketing sites to internal tools your team
            will actually use. And before anything is built, we give you an honest
            build-vs-buy recommendation.
          </p>
          <div
            className="animate-rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "150ms" }}
          >
            <Link href="/contact" className={buttonPrimary}>
              Start a conversation
            </Link>
            <a href="#our-work" className={buttonSecondaryClasses}>
              See what we’ve built
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <figure
            className="hero-settle group relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_20px_60px_rgba(35,41,54,0.10)]"
            aria-label="A website layout and a web application dashboard"
          >
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-white/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <Image
              src="/images/pages/websites-hero.webp"
              alt="A modern website layout and an analytics dashboard on two floating screens."
              fill
              sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
              unoptimized
              fetchPriority="high"
              className="object-cover object-center transition-transform duration-700 ease-gentle group-hover:scale-[1.02]"
            />
          </figure>
        </div>
      </section>

      {/* Capabilities */}
      <section className={section} aria-labelledby="capabilities-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="capabilities-heading" className={h2}>
            What we build
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Every engagement is scoped around the outcome — not a template.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className="h-full">
                <article
                  className={`group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift ${card}`}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent transition-transform duration-300 group-hover:scale-110">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`mt-5 ${h3}`}>{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-body">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase — the heart of the page */}
      <section
        id="our-work"
        className={`${sectionBand} relative overflow-hidden`}
        aria-labelledby="showcase-heading"
      >
        <div
          className="pointer-events-none absolute -left-28 top-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-40 h-80 w-80 rounded-full bg-accent-soft/70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="showcase-heading" className={h2}>
                Work we’ve shipped
              </h2>
              <p className={`mt-4 max-w-2xl ${lead}`}>
                Digital experiences and operating systems built to make work
                clearer, faster, and easier to manage.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Portfolio overview">
              <span className="rounded-full border border-line bg-canvas/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-body backdrop-blur">
                2 operations initiatives
              </span>
              <span className="rounded-full border border-line bg-canvas/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-body backdrop-blur">
                5 live experiences
              </span>
            </div>
          </div>

          <Reveal className="mt-12">
            <article
              id="water-bear-mecca"
              className="group overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_24px_70px_rgba(35,41,54,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(35,41,54,0.14)]"
              aria-labelledby="water-bear-mecca-heading"
            >
              <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                <div className="relative flex flex-col justify-between overflow-hidden bg-ink p-8 text-white sm:p-10">
                  <div
                    className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl transition-transform duration-700 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                      Property operations modernization
                    </p>
                    <h3
                      id="water-bear-mecca-heading"
                      className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      Water Bear Mecca
                    </h3>
                    <p className="mt-4 text-xl font-medium leading-8 text-white">
                      From listing to signed lease
                    </p>
                    <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                      An initiative connecting AI-assisted publishing, structured
                      applicant review, digital leasing, and document delivery.
                    </p>
                  </div>
                  <div className="relative mt-8 flex flex-wrap gap-2">
                    {["Fewer handoffs", "Clearer status", "Standardized records"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <p className={eyebrow}>The operating shift</p>
                  <div className="mt-5 grid auto-rows-fr gap-3 sm:grid-cols-2">
                    {propertyOperationsTransformation.map((item) => (
                      <div
                        key={item.number}
                        className="group/shift relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:border-accent/30 hover:bg-canvas"
                      >
                        <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover/shift:scale-x-100" />
                        <p className="text-xs font-semibold tracking-[0.18em] text-accent">
                          {item.number}
                        </p>
                        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-body/70 line-through decoration-line">
                          {item.before}
                        </p>
                        <p className="mt-2 font-semibold leading-6 text-ink">
                          {item.after}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-line pt-5">
                    <ul
                      className="flex flex-wrap gap-2"
                      aria-label="Water Bear Mecca modernization scope"
                    >
                      {[
                        "AI-assisted listings",
                        "Applicant review",
                        "Digital leasing",
                        "E-signatures",
                        "Automated delivery",
                        "Operational visibility",
                      ].map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-4 ${caption}`}>
                      A phased modernization initiative moving through design,
                      rollout, and operational verification.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-8" delay={80}>
            <article
              id="manufacturing-pilot"
              className="group overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_20px_60px_rgba(35,41,54,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(35,41,54,0.12)]"
              aria-labelledby="manufacturing-pilot-heading"
            >
              <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                <div className="relative overflow-hidden bg-ink p-8 text-white sm:p-10">
                  <div
                    className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl transition-transform duration-700 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                      Manufacturing operations
                    </p>
                    <h3
                      id="manufacturing-pilot-heading"
                      className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      Manufacturing Operations Command Center
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                      A connected operations workspace that gives manufacturing
                      teams visibility across production, materials, quality,
                      equipment, and accountability — without relying on
                      disconnected spreadsheets, paper logs, and manual handoffs.
                    </p>
                  </div>
                  <div className="relative mt-8 grid grid-cols-2 gap-2 text-xs font-medium text-white/75">
                    {["Production", "Inventory", "Quality", "Equipment"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-xl border border-white/10 bg-white/10 px-3 py-3"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <p className={eyebrow}>
                    What your operations team could manage in one place
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      [
                        "01",
                        "Production control",
                        "Schedules, priorities, work queues, blockers, and throughput",
                      ],
                      [
                        "02",
                        "Materials & inventory",
                        "Stock levels, shortages, purchasing, and job readiness",
                      ],
                      [
                        "03",
                        "Quality & traceability",
                        "Inspections, issues, evidence, ownership, and job history",
                      ],
                      [
                        "04",
                        "Equipment & maintenance",
                        "Downtime, service history, preventive maintenance, and asset readiness",
                      ],
                    ].map(([number, title, text]) => (
                      <div
                        key={number}
                        className="rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/30 hover:bg-canvas"
                      >
                        <p className="text-xs font-semibold tracking-[0.18em] text-accent">
                          {number}
                        </p>
                        <h4 className="mt-3 font-semibold text-ink">{title}</h4>
                        <p className="mt-1 text-sm leading-6 text-body">{text}</p>
                      </div>
                    ))}
                  </div>
                  <ul
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label="Manufacturing operations capabilities"
                  >
                    {[
                      "Role-based dashboards",
                      "Audit-ready records",
                      "Workflow automation",
                      "Real-time reporting",
                    ].map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-canvas-deep px-3 py-1.5 text-xs font-medium text-body"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-body/60 md:hidden">
            Swipe to explore more work →
          </p>
          <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 md:mt-10 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
            {showcase.map((site, index) => (
              <Reveal
                key={site.name}
                delay={index * 60}
                className="h-full min-w-[82%] snap-start md:min-w-0"
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift ${card}`}
                  aria-labelledby={`showcase-${site.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div
                    className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-accent-soft opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      {site.tag}
                    </p>
                    <span className="text-xs font-semibold tracking-[0.18em] text-body/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    id={`showcase-${site.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="relative mt-4 text-2xl font-semibold tracking-tight text-ink"
                  >
                    {site.name}
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-6 text-body">
                    {site.description}
                  </p>
                  <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`${site.name} scope`}>
                    {site.scope.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-canvas-deep px-3 py-1 text-[0.7rem] font-medium text-body"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative mt-5 self-start ${linkInline}`}
                  >
                    Visit {site.name} →
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <aside className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${cardFlat}`}>
              <div>
                <h3 className={h3}>Have a project in mind?</h3>
                <p className={`mt-2 ${caption}`}>
                  Tell us the outcome. We’ll help identify the simplest useful path.
                </p>
              </div>
              <Link
                href="/contact"
                className={`${buttonPrimary} shrink-0 self-start sm:self-auto`}
              >
                Discuss your project
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Who it's for + outcomes */}
      <section className={section} aria-labelledby="fit-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="fit-heading" className={h2}>
                Who this is for
              </h2>
              <p className={`mt-4 ${lead}`}>
                Leaders and teams who need a presence or a tool that actually
                works — and who want a straight answer on whether to build or buy
                before a single dollar is spent.
              </p>
            </div>
            <div>
              <h2 className={h2}>What you get</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-body">
                {outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className={sectionBand} aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="approach-heading" className={h2}>
            How we work
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className={`p-6 ${card}`}>
                <p className="text-sm font-semibold tracking-widest text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={`mt-4 ${h3}`}>{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-body">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={section}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className={h2}>
            Ready to build something that works?
          </h2>
          <p className={`mx-auto mt-4 max-w-xl ${lead}`}>
            Tell us the outcome you need — we’ll tell you the simplest way to get
            there.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className={buttonPrimary}
              aria-label="Get in touch with 2Nspira"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const buttonSecondaryClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 ease-gentle hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";
