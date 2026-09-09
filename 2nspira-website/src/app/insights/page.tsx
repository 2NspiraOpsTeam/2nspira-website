import type { Metadata } from "next";
import Link from "next/link";
import BlogLibrary from "@/components/BlogLibrary";
export const metadata: Metadata = { title: "Executive Insights", description: "Essays by Jeffrey Cortez on AI strategy, trust, technology leadership, and human-centered modernization.", alternates: { canonical: "/insights" } };
export default function InsightsPage() {
  return <main className="flex-1 bg-zinc-50 dark:bg-black"><section className="border-b border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-black"><div className="mx-auto max-w-4xl px-4 sm:px-6"><p className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Ideas for leaders</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">Executive Insights</h1><p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">Where technology strategy meets human intent. Essays and reflections on cutting through systemic noise to establish trust as the operating system.</p><Link href="/blog/categories/trust-is-the-operating-system" className="mt-6 inline-block rounded font-semibold text-blue-700 underline dark:text-blue-400">Explore Trust Is the Operating System →</Link></div></section><BlogLibrary /></main>;
}
