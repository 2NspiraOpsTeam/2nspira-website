import type { Metadata } from "next";
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
  title: "Services",
  description:
    "Our three integrated capabilities: AI Enablement & Governance, Systems & Process Optimization, and Technology Transformation / Fractional Leadership.",
  alternates: {
    canonical: "/services",
  },
};

const capabilities = [
  {
    id: "service-heading-1",
    title: "AI Enablement & Governance",
    description:
      "Pragmatic AI strategy and governance frameworks. We help organizations evaluate readiness, establish responsible workflows, and implement practical solutions — not hype-driven pilots.",
    points: ["AI readiness assessment", "Governance frameworks", "Responsible implementation paths"],
    href: "/ai-enablement",
    linkLabel: "Explore AI enablement",
  },
  {
    id: "service-heading-2",
    title: "Systems & Process Optimization",
    description:
      "Streamlined operations powered by appropriate technology. We identify friction points, design efficient workflows, and implement sustainable improvements.",
    points: ["Process mapping & optimization", "Workflow automation", "Integration architecture"],
    href: null,
    linkLabel: null,
  },
  {
    id: "service-heading-3",
    title: "Technology Transformation / Fractional Leadership",
    description:
      "Strategic technology leadership when you need it most. Fractional CTO guidance, architecture reviews, team enablement, and transformation pathways.",
    points: ["Technology strategy & planning", "Fractional leadership", "Team enablement & mentoring"],
    href: "/fractional-cio",
    linkLabel: "Explore fractional CIO advisory",
  },
];

const outcomes = [
  {
    title: "Clear Strategic Direction",
    description:
      "Actionable roadmaps and prioritized next steps based on your organization's actual needs.",
  },
  {
    title: "Practical Implementation Paths",
    description:
      "Realistic timelines, appropriate technology choices, and achievable milestones.",
  },
  {
    title: "Sustainable Processes",
    description:
      "Workflows that endure beyond any single project or vendor relationship.",
  },
];

export default function ServicesPage() {
  return (
    <main className={pageMain}>
      {/* Hero */}
      <section
        className="border-b border-line bg-surface py-24 sm:py-28"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className={eyebrow}>What we do</p>
          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            Transform your organization with practical technology
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl ${lead}`}>
            Human-centered solutions for AI adoption, systems optimization, and
            technology leadership.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className={buttonPrimary}
              aria-label="Discuss your needs with 2Nspira"
            >
              Discuss your needs
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={section} aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="services-heading" className={h2}>
            Core Capabilities
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Three integrated capabilities designed to work together or
            independently.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {capabilities.map((item) => (
              <article
                key={item.id}
                className={`flex flex-col p-8 ${card}`}
                aria-labelledby={item.id}
              >
                <h3 id={item.id} className={h3}>
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-body">
                  {item.description}
                </p>
                <ul
                  className="mt-6 space-y-2.5 text-sm text-body"
                  aria-label={`${item.title} capabilities`}
                >
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                {item.href && item.linkLabel && (
                  <Link
                    href={item.href}
                    className={`mt-6 ${linkInline}`}
                  >
                    {item.linkLabel} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Common Outcomes */}
      <section className={sectionBand} aria-labelledby="outcomes-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="outcomes-heading" className={h2}>
            What to expect
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Our approach produces tangible outcomes that support long-term
            success.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3" role="list">
            {outcomes.map((item) => (
              <div key={item.title} className={`p-8 ${cardFlat}`} role="listitem">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className={`mt-2 ${caption}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={section} aria-labelledby="cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id="cta-heading" className={h2}>
            Ready to explore how 2Nspira can help?
          </h2>
          <p className={`mx-auto mt-4 max-w-xl ${lead}`}>
            Schedule a discovery call. No commitments required.
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
