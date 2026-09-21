import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { lead, linkInline, pageMain } from "@/components/ui";

export const metadata: Metadata = {
  title: "Executive Insights",
  description:
    "Essays by Jeffrey Cortez on AI strategy, trust, technology leadership, and human-centered modernization.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <main className={pageMain} id="main-content">
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <AmbientField />
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
          <p><EyebrowPill>Ideas for leaders</EyebrowPill></p>
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

      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
      <figure className="group relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_60px_rgba(35,41,54,0.10)]">
        <Image
          src="/images/pages/insights-editorial.webp"
          alt="Conceptual editorial still life of a notebook, pen, and coffee beside a window."
          width={1344}
          height={768}
          className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.015]"
        />
      </figure>
      </div>

      <BlogLibrary />
    </main>
  );
}
