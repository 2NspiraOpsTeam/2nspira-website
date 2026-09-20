import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    text: "Clean, fast, accessible sites that communicate clearly and convert visitors — built to be simple to update and easy to maintain.",
  },
  {
    title: "Web applications",
    text: "Purpose-built tools for real workflows — trackers, dashboards, and internal systems designed around how your team actually works.",
  },
  {
    title: "Build vs. buy guidance",
    text: "An honest assessment of whether to build a custom solution or buy an existing one — so you spend budget where it earns its keep.",
  },
  {
    title: "Performance, SEO & accessibility",
    text: "Fast load times, structured data, and accessible markup — engineered so the site stays healthy long after launch.",
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
    detail:
      "Structured property details become clear, consistent listing drafts ready for review and publication.",
  },
  {
    number: "02",
    before: "Manual applicant review",
    after: "Structured digital workflow",
    detail:
      "Applicant information moves through a consistent review process with clearer status, ownership, and follow-through.",
  },
  {
    number: "03",
    before: "Paper lease agreements",
    after: "Digital lease generation and e-signature",
    detail:
      "Approved terms flow into digital lease documents, electronic signatures, and automated document delivery.",
  },
  {
    number: "04",
    before: "Physical copies and manual distribution",
    after: "Automatic emailed signed copies",
    detail:
      "Completed lease documents are delivered to the appropriate parties automatically, improving recordkeeping and reducing administrative follow-up.",
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
      "A consulting and think-tank site for technology leadership, AI readiness, and responsible AI enablement — with a resource library, insights, and assessment tools.",
    scope: ["Marketing site", "Resource library", "Assessment tools", "Structured data & SEO"],
  },
  {
    name: "CalmLoop",
    url: "https://calmloop.vercel.app",
    tag: "Consumer web app",
    description:
      "A fast, low-pressure companion for families supporting autistic and neurodivergent children — gentle routine suggestions built around how a moment is feeling right now.",
    scope: ["Web app", "Family-focused UX", "Sensory-aware design", "Free to run & maintain"],
  },
  {
    name: "Breadcrumb",
    url: "https://breadcrumb-challenge.vercel.app",
    tag: "Interactive experience",
    description:
      "A zero-cost interactive OSINT challenge game — plain HTML, CSS, and JavaScript engineered to run anywhere without a server or database.",
    scope: ["Interactive game", "Zero-infrastructure hosting", "Performance-focused build"],
  },
  {
    name: "GeVitals",
    url: "https://gevitals-website.jcortez-36a.workers.dev",
    tag: "Bilingual professional site",
    description:
      "A fully bilingual (ES/EN) practice website for a naturopathic clinic in Santo Domingo, Dominican Republic — content migrated from a prior platform, with videos, blog, and local-search optimization.",
    scope: ["Bilingual site (ES/EN)", "Content migration", "Video showcase", "Local SEO"],
  },
  {
    name: "Open Goal Soccer",
    url: "https://opengoalsoccer.com",
    tag: "Mission-driven archival site",
    description:
      "A preserved and modernized digital home for an inclusive, autism-friendly youth soccer organization — honoring its mission, program history, and community story in an accessible archival experience.",
    scope: ["Archival redesign", "Content preservation", "Accessible responsive build", "Cloudflare deployment"],
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
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Websites &amp; Web Applications
          </h1>
          <p className={lead}>
            We design and build websites and web applications that work for your
            business — from bilingual marketing sites to internal tools your team
            will actually use. And before anything is built, we give you an honest
            build-vs-buy recommendation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
            className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line shadow-soft"
            aria-label="A website layout and a web application dashboard"
          >
            <Image
              src="/images/pages/websites-hero.webp"
              alt="A modern website layout and an analytics dashboard on two floating screens."
              fill
              sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
              unoptimized
              fetchPriority="high"
              className="object-cover object-center"
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
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {capabilities.map((item) => (
              <article key={item.title} className={`p-8 ${card}`}>
                <h3 className={h3}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 text-body`}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase — the heart of the page */}
      <section id="our-work" className={sectionBand} aria-labelledby="showcase-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="showcase-heading" className={h2}>
            Work we’ve shipped
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Selected live projects and operational modernization work designed
            around how organizations actually run.
          </p>

          <article
            id="water-bear-mecca"
            className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_24px_70px_rgba(35,41,54,0.10)]"
            aria-labelledby="water-bear-mecca-heading"
          >
            <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
              <div className="relative overflow-hidden bg-ink p-8 text-white sm:p-10 lg:p-12">
                <div
                  className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                    Client project · Property operations modernization
                  </p>
                  <h3
                    id="water-bear-mecca-heading"
                    className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    Water Bear Mecca
                  </h3>
                  <p className="mt-4 text-xl font-medium leading-8 text-white">
                    Digitizing the property-management workflow from listing to
                    signed lease
                  </p>
                  <p className="mt-5 text-base leading-8 text-white/75">
                    2Nspira is helping Water Bear Mecca modernize property
                    operations by using AI-assisted listing workflows, structured
                    applicant review, and digital lease execution with electronic
                    signatures and automated document delivery.
                  </p>

                  <div className="mt-8 border-t border-white/15 pt-6">
                    <p className="text-sm font-semibold text-white">
                      The modernization objective
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      Replace disconnected manual handoffs with one clearer,
                      repeatable operating flow while keeping human review at the
                      decisions that matter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <p className={eyebrow}>
                  The operating model this initiative is building toward
                </p>
                <div className="mt-6 space-y-4">
                  {propertyOperationsTransformation.map((item) => (
                    <div
                      key={item.number}
                      className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 text-xs font-semibold tracking-[0.2em] text-accent">
                          {item.number}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                            <p className="text-sm font-medium text-body line-through decoration-line">
                              {item.before}
                            </p>
                            <span
                              className="hidden text-accent sm:inline"
                              aria-hidden="true"
                            >
                              →
                            </span>
                            <p className="font-semibold text-ink">{item.after}</p>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-body">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="text-sm font-semibold text-ink">
                    Modernization initiative scope
                  </p>
                  <ul
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label="Water Bear Mecca modernization scope"
                  >
                    {[
                      "AI-assisted unit listing workflows",
                      "Applicant review automation",
                      "Digital leasing workflows",
                      "Electronic signatures",
                      "Automated document delivery",
                      "Operational visibility and standardization",
                    ].map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-canvas-deep px-3 py-1.5 text-xs font-medium text-body"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-4 ${caption}`}>
                    Capabilities move through design, phased rollout, and
                    operational verification as the modernization initiative
                    progresses.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article
            id="manufacturing-pilot"
            className="mt-8 overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_24px_70px_rgba(35,41,54,0.10)]"
            aria-labelledby="manufacturing-pilot-heading"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-ink p-8 text-white sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                  Featured enterprise pilot · Client anonymized
                </p>
                <h3
                  id="manufacturing-pilot-heading"
                  className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Manufacturing Operations Command Center
                </h3>
                <p className="mt-5 text-base leading-8 text-white/75">
                  A custom operations platform designed to replace fragmented paper
                  logs and spreadsheets with one shared view of production,
                  inventory, quality, and equipment readiness.
                </p>
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5">
                  <p className="text-sm font-semibold text-white">The operating challenge</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Critical information lived across disconnected tools, limiting
                    visibility between the production floor, operations managers,
                    and leadership.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <p className={eyebrow}>What the pilot brings together</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      number: "01",
                      title: "Production visibility",
                      text: "A shared view of work in progress, priorities, blockers, and completion status.",
                    },
                    {
                      number: "02",
                      title: "Inventory & maintenance",
                      text: "Stock awareness, reorder signals, equipment schedules, and service history in one workflow.",
                    },
                    {
                      number: "03",
                      title: "Quality traceability",
                      text: "Consistent digital records for issues, supporting evidence, ownership, and follow-through.",
                    },
                    {
                      number: "04",
                      title: "Role-based decisions",
                      text: "Focused views for frontline teams, managers, and executives without duplicating data.",
                    },
                  ].map((item) => (
                    <div key={item.number} className="rounded-2xl border border-line bg-surface p-5">
                      <p className="text-xs font-semibold tracking-[0.2em] text-accent">
                        {item.number}
                      </p>
                      <h4 className="mt-3 font-semibold text-ink">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-body">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="text-sm font-semibold text-ink">Enterprise design principles</p>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Enterprise design principles">
                    {["Role-based access", "Audit-ready records", "Modular integrations", "Phased rollout"].map(
                      (item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-canvas-deep px-3 py-1.5 text-xs font-medium text-body"
                        >
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                  <p className={`mt-5 ${caption}`}>
                    Client identity and confidential operational details are intentionally omitted.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {showcase.map((site) => (
              <article
                key={site.name}
                className={`flex flex-col p-8 ${card}`}
                aria-labelledby={`showcase-${site.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  {site.tag}
                </p>
                <h3
                  id={`showcase-${site.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-3 text-2xl font-semibold tracking-tight text-ink"
                >
                  {site.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-body">
                  {site.description}
                </p>
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={`${site.name} scope`}
                >
                  {site.scope.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-canvas-deep px-3 py-1 text-xs font-medium text-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 self-start ${linkInline}`}
                >
                  Visit {site.name} →
                </a>
              </article>
            ))}
          </div>

          <aside className={`mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${cardFlat}`}>
            <div>
              <h3 className={h3}>Have a project in mind?</h3>
              <p className={`mt-2 ${caption}`}>
                From a single marketing page to a full internal tool — tell us the
                outcome you need.
              </p>
            </div>
            <Link
              href="/contact"
              className={`${buttonPrimary} shrink-0 self-start sm:self-auto`}
            >
              Discuss your project
            </Link>
          </aside>
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
