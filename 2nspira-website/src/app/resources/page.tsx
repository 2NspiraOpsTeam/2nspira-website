import type { Metadata } from "next";
import Link from "next/link";
import AiReadinessCard from "@/components/Resources/AiReadinessCard";
import StrengthProfileCard from "@/components/Resources/StrengthProfileCard";

export const metadata: Metadata = {
  title: "Resources | Assessments and Practical Tools",
  description: "Explore free 2Nspira strengths assessments and AI readiness scorecards for clearer decisions and practical next steps.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main className="flex-1 bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-black sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">2Nspira Resources</p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">Practical tools. Clearer next steps.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">Explore free assessments built to help professionals, teams, and organizations understand their strengths, evaluate readiness, and move forward with confidence.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-label="Featured assessments">
        <div className="grid gap-8 md:grid-cols-2">
          <StrengthProfileCard />
          <AiReadinessCard />
        </div>
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Designed for practical use</h2>
          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">Use these tools to support career reflection, coaching conversations, team development, and responsible AI planning. Each assessment gives you a starting point for a better conversation.</p>
          <Link href="/contact" className="mt-6 inline-block rounded font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400">Talk through your next steps with 2Nspira →</Link>
        </div>
      </section>
    </main>
  );
}