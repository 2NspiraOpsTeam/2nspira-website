import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white py-24 dark:bg-black sm:py-32">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              Human-centered technology transformation and practical AI adoption
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              We help organizations navigate technology change with clarity and purpose —
              specializing in AI enablement, systems optimization, and fractional technology leadership.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/services"
                className="rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
              >
                Explore our services
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white"
              >
                Contact us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-zinc-50 dark:bg-black sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              What we do
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Three integrated capabilities designed to work together or independently.
            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "AI Enablement & Governance",
                  description: "Pragmatic AI strategy and governance frameworks for responsible implementation.",
                },
                {
                  title: "Systems & Process Optimization",
                  description: "Streamlined operations powered by appropriate technology solutions.",
                },
                {
                  title: "Technology Leadership",
                  description: "Fractional CTO guidance, architecture reviews, and transformation pathways.",
                },
              ].map((feature) => (
                <div key={feature.title} className="rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-950/50">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-24 bg-white dark:bg-black sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Our approach
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              We believe technology must serve people — not the other way around. Our human-centered philosophy ensures that AI systems, workflow changes, and technology implementations are designed for actual use.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {[
                "People First",
                "Process Clarity",
                "Data Integrity",
                "Practical AI"
              ].map((value) => (
                <div key={value} className="rounded-xl bg-zinc-50 p-6 dark:bg-zinc-950/30">
                  <p className="font-medium text-zinc-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/about"
                className="inline-flex items-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
              >
                Learn more about 2Nspira
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white dark:bg-black sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Ready to explore how 2Nspira can help?
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Schedule a discovery call. No commitments required.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
