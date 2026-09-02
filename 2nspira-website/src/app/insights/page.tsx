import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical perspectives, case studies, and guidance on AI adoption, systems optimization, and technology leadership from 2Nspira.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero */}
      <section className="bg-white py-24 dark:bg-black" aria-labelledby="insights-hero-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 id="insights-hero-heading" className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Insights
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-300">
            Practical perspectives on AI adoption, systems optimization, and technology leadership.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24" aria-labelledby="insights-content-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="insights-content-heading" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Coming soon
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This page will feature articles, case studies, and practical guidance on AI adoption, systems optimization, and technology leadership.
          </p>

          {/* Placeholder for future content */}
          <div className="mt-12 rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-950/50" role="complementary" aria-label="Upcoming content preview">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Insights Library</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Articles, case studies, and practical guidance
            </p>
          </div>

          {/* Suggested content structure */}
          <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50" role="complementary" aria-label="Content structure plan">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Structure for future content</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400" aria-label="Planned content categories">
              <li>• AI adoption case studies</li>
              <li>• Systems optimization frameworks</li>
              <li>• Technology leadership guidance</li>
              <li>• Practical AI governance patterns</li>
            </ul>
          </div>

          {/* Call to action */}
          <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Have insights to share?</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Have practical experience or case studies you’d like to contribute? We welcome submissions from organizations that have worked with 2Nspira.
            </p>
            <a href="/contact" aria-label="Contact us to share your insights" className="mt-4 inline-block rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Contact us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
