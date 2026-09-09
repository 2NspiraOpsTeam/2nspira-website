import type { Metadata } from "next";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
import { eyebrow, lead, linkInline, pageMain } from "@/components/ui";

export const metadata: Metadata = {
  title: "Executive Insights",
  description:
    "Essays by Jeffrey Cortez on AI strategy, trust, technology leadership, and human-centered modernization.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <main className={pageMain} id="main-content">
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p className={eyebrow}>Ideas for leaders</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Executive Insights
          </h1>
          <p className={lead}>
            Where technology strategy meets human intent. Essays and
            reflections on cutting through systemic noise to establish trust as
            the operating system.
          </p>
          <Link
            href="/blog/categories/trust-is-the-operating-system"
            className={`mt-6 ${linkInline}`}
          >
            Explore Trust Is the Operating System →
          </Link>
        </div>
      </section>
      <BlogLibrary />
    </main>
  );
}
