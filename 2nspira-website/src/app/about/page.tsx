import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about 2Nspira's approach to human-centered technology transformation, practical AI adoption, systems optimization, and our core values.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const values = [
    { title: "People First", description: "Technology decisions start with human needs, not tool features." },
    { title: "Process Clarity", description: "Workflows should enable people — not create friction." },
    { title: "Data Integrity", description: "Accurate data is the foundation of good decisions." },
    { title: "Practical AI", description: "AI solutions must be usable, sustainable, and aligned with real needs." },
  ];

  const philosophySections = [
    { heading: "Human-centered philosophy", body: "We start with people — their needs, their workflows, and the context in which they work. Technology should reduce friction, not create new problems. Our approach ensures that AI systems, workflow changes, and technology implementations are designed for actual use — not theoretical ideals." },
    { heading: "Practical AI philosophy", body: "We distinguish between “AI adoption” and “practical AI use.” Most organizations need the latter: targeted applications that solve specific problems, integrated into existing workflows. Our approach focuses on usable solutions with clear value, not experimental pilots that disappear after proof-of-concept." },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero */}
      <section className="bg-white py-24 dark:bg-black" aria-labelledby="about-hero-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 id="about-hero-heading" className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Human-centered technology transformation
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-300">
            Practical AI adoption and systems optimization for organizations.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24" aria-labelledby="about-section-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="about-section-heading" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            What is 2Nspira?
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            2Nspira helps organizations navigate technology change with clarity and purpose. We focus on practical AI adoption, systems optimization, and human-centered technology leadership.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-zinc-50 py-16 dark:bg-black sm:py-24" aria-labelledby="philosophy-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="philosophy-heading" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Our approach
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            We believe technology must serve people — not the other way around.
          </p>

          {/* Values Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4" role="list">
            {values.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-950/50" role="listitem">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Philosophy Deep Dive */}
          {philosophySections.map((section, i) => (
            <div key={i} className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50">
              <h3 id={`philosophy-${i + 1}`} className="text-xl font-semibold text-zinc-900 dark:text-white">{section.heading}</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400" aria-labelledby={`philosophy-${i + 1}`}>{section.body}</p>
            </div>
          ))}

          {/* Relationship Diagram */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">How these elements work together</h3>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Effective technology transformation requires all four elements in balance:
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Four balanced elements of transformation">
              {["People", "Process", "Data", "Technology"].map((item, i) => (
                <div key={i} className="flex items-center justify-center rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-950/50" role="listitem">
                  <span className="text-lg font-semibold text-zinc-900 dark:text-white">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Change one element without attention to the others, and the system becomes unbalanced.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24" aria-labelledby="about-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="about-cta-heading" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Interested in how 2Nspira can support your organization?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Schedule a discovery call. No commitments required.
          </p>
          <a href="/contact" aria-label="Get in touch with 2Nspira" className="mt-8 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}
