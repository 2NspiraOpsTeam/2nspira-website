import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero */}
      <section className="bg-white py-24 dark:bg-black">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Transform your organization with practical technology
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-300">
            Human-centered solutions for AI adoption, systems optimization, and technology leadership.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
            >
              Discuss your needs
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Core Capabilities
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Three integrated capabilities designed to work together or independently.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Service 1 */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 transition-shadow hover:shadow-md">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                AI Enablement & Governance
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Pragmatic AI strategy and governance frameworks. We help organizations evaluate readiness, establish responsible workflows, and implement practical solutions — not hype-driven pilots.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• AI readiness assessment</li>
                <li>• Governance frameworks</li>
                <li>• Responsible implementation paths</li>
              </ul>
            </article>

            {/* Service 2 */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 transition-shadow hover:shadow-md">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Systems & Process Optimization
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Streamlined operations powered by appropriate technology. We identify friction points, design efficient workflows, and implement sustainable improvements.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Process mapping & optimization</li>
                <li>• Workflow automation</li>
                <li>• Integration architecture</li>
              </ul>
            </article>

            {/* Service 3 */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 transition-shadow hover:shadow-md">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Technology Transformation / Fractional Leadership
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Strategic technology leadership when you need it most. fractional CTO guidance, architecture reviews, team enablement, and transformation pathways.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Technology strategy & planning</li>
                <li>• Fractional leadership</li>
                <li>• Team enablement & mentoring</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Common Outcomes */}
      <section className="bg-zinc-50 py-16 dark:bg-black sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            What to expect
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Our approach produces tangible outcomes that support long-term success.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Clear Strategic Direction",
                description: "Actionable roadmaps and prioritized next steps based on your organization's actual needs."
              },
              {
                title: "Practical Implementation Paths",
                description: "Realistic timelines, appropriate technology choices, and achievable milestones."
              },
              {
                title: "Sustainable Processes",
                description: "Workflows that endure beyond any single project or vendor relationship."
              }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 dark:bg-zinc-950/50">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Ready to explore how 2Nspira can help?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Schedule a discovery call. No commitments required.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
