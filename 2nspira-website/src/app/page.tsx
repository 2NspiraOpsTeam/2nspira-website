import Link from "next/link";
import {
  buttonPrimary,
  buttonSecondary,
  card,
  cardFlat,
  caption,
  eyebrow,
  h2,
  h3,
  lead,
  pageMain,
  section,
  sectionBand,
} from "@/components/ui";

export default function Home() {
  const services = [
    {
      title: "AI Enablement & Governance",
      description:
        "Pragmatic AI strategy and governance frameworks for responsible implementation — readiness, guardrails, and workflows your people will actually use.",
      href: "/ai-enablement",
      linkLabel: "Explore AI enablement",
    },
    {
      title: "Systems & Process Optimization",
      description:
        "Streamlined operations powered by appropriate technology — mapping friction, designing efficient workflows, and building sustainable improvements.",
      href: null,
      linkLabel: null,
    },
    {
      title: "Technology Leadership",
      description:
        "Fractional CTO guidance, architecture reviews, and transformation pathways that align technology investment with business outcomes.",
      href: "/fractional-cio",
      linkLabel: "Explore fractional leadership",
    },
  ];

  const values = [
    { title: "People First", text: "Technology serves people, never the reverse." },
    { title: "Process Clarity", text: "Work flows your team can follow without a manual." },
    { title: "Data Integrity", text: "Decisions grounded in information you can trust." },
    { title: "Practical AI", text: "Adoption measured in outcomes, not pilots." },
  ];

  return (
    <main className={pageMain}>
      {/* Hero */}
      <section
        className="py-24 sm:py-32"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className={eyebrow}>Human-centered technology transformation</p>
          <h1
            id="hero-heading"
            className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
          >
            Technology that works the way your people do.
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl ${lead}`}>
            2Nspira helps organizations navigate technology change with clarity
            and purpose — AI enablement, systems optimization, and fractional
            technology leadership for teams that would rather trust their
            systems than manage them.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/services"
              className={buttonPrimary}
            >
              Explore our services
            </Link>
            <Link href="/contact" className={buttonSecondary}>
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        className={sectionBand}
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading" className={h2}>
            What we do
          </h2>
          <p className={`mt-4 max-w-2xl ${lead}`}>
            Three integrated capabilities designed to work together or
            independently.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((feature) => (
              <article
                key={feature.title}
                className={`flex flex-col p-8 ${card}`}
              >
                <h3 className={h3}>{feature.title}</h3>
                <p className={`mt-3 flex-1 text-sm leading-7 text-body`}>
                  {feature.description}
                </p>
                {feature.href && feature.linkLabel && (
                  <Link
                    href={feature.href}
                    className="mt-6 inline-flex items-center rounded text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 ease-gentle hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                  >
                    {feature.linkLabel} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className={section} aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="approach-heading" className={h2}>
            Our approach
          </h2>
          <p className={`mt-6 max-w-2xl ${lead}`}>
            Technology must serve people — not the other way around. Our
            human-centered philosophy ensures that AI systems, workflow changes,
            and technology implementations are designed for actual use.
          </p>

          <div
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
            aria-label="Our core values"
          >
            {values.map((value) => (
              <div key={value.title} className={`p-6 ${cardFlat}`} role="listitem">
                <p className="text-base font-semibold text-ink">{value.title}</p>
                <p className={`mt-2 ${caption}`}>{value.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/about" className={buttonSecondary}>
              Learn more about 2Nspira <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={sectionBand} aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 id="cta-heading" className={h2}>
            Ready to explore how 2Nspira can help?
          </h2>
          <p className={`mx-auto mt-6 max-w-xl ${lead}`}>
            Schedule a discovery call. No commitments required.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/contact" className={buttonPrimary}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
