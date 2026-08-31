import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | 2Nspira — AI Enablement, Systems Optimization & Technology Leadership",
  description:
    "Our three integrated capabilities: AI Enablement & Governance, Systems & Process Optimization, and Technology Transformation / Fractional Leadership.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero */}
      <section className="bg-white py-24 dark:bg-black" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl"
          >
            Transform your organization with practical technology
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-300">
            Human-centered solutions for AI adoption, systems optimization, and technology leadership.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              aria-label="Discuss your needs with 2Nspira"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Discuss your needs
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="services-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
          >
            Core Capabilities
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Three integrated capabilities designed to work together or independently.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Service 1 */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 transition-shadow hover:shadow-md" aria-labelledby="service-heading-1">
              <h3 id="service-heading-1" className="text-xl font-semibold text-zinc-900 dark:text-white">
                AI Enablement & Governance
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Pragmatic AI strategy and governance frameworks. We help organizations evaluate readiness, establish responsible workflows, and implement practical solutions — not hype-driven pilots.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400" aria-label="AI Enablement & Governance capabilities">
                <li>• AI readiness assessment</li>
                <li>• Governance frameworks</li>
                <li>• Responsible implementation paths</li>
              </ul>
            </article>

            {/* Service 2 */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 transition-shadow hover:shadow-md" aria-labelledby="service-heading-2">
              <h3 id="service-heading-2" className="text-xl font-semibold text-zinc-900 dark:text-white">
                Systems & Process Optimization
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Streamlined operations powered by appropriate technology. We identify friction points, design efficient workflows, and implement sustainable improvements.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400" aria-label="Systems & Process Optimization capabilities">
                <li>• Process mapping & optimization</li>
                <li>• Workflow automation</li>
                <li>• Integration architecture</li>
              </ul>
            </article>

            {/* Service 3 */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 transition-shadow hover:shadow-md" aria-labelledby="service-heading-3">
              <h3 id="service-heading-3" className="text-xl font-semibold text-zinc-900 dark:text-white">
                Technology Transformation / Fractional Leadership
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Strategic technology leadership when you need it most. fractional CTO guidance, architecture reviews, team enablement, and transformation pathways.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400" aria-label="Technology Leadership capabilities">
                <li>• Technology strategy & planning</li>
                <li>• Fractional leadership</li>
                <li>• Team enablement & mentoring</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Common Outcomes */}
      <section className="bg-zinc-50 py-16 dark:bg-black sm:py-24" aria-labelledby="outcomes-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="outcomes-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
          >
            What to expect
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Our approach produces tangible outcomes that support long-term success.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3" role="list">
            {[
              { title: "Clear Strategic Direction", description: "Actionable roadmaps and prioritized next steps based on your organization's actual needs." },
              { title: "Practical Implementation Paths", description: "Realistic timelines, appropriate technology choices, and achievable milestones." },
              { title: "Sustainable Processes", description: "Workflows that endure beyond any single project or vendor relationship." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 dark:bg-zinc-950/50" role="listitem">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="cta-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
          >
            Ready to explore how 2Nspira can help?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Schedule a discovery call. No commitments required.
          </p>
          <Link
            href="/contact"
            aria-label="Get in touch with 2Nspira"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
