import Link from "next/link";

export default function AiReadinessCard() {
  const highlights = [
    "Assess practical AI readiness gaps",
    "Support executive planning & decision-making",
    "Create a responsible adoption path",
  ];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          AI Readiness Assessment for Organizations
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Assess governance, workflows, and implementation preparedness.
        </p>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          An executive-facing assessment designed to help organizations evaluate
          strategy, governance, workflows, trust, and implementation preparedness
          for AI adoption.
        </p>
        <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-white">
          Key Insights:
        </h3>
        <ul className="mt-2 space-y-1 pl-4">
          {highlights.map((item) => (
            <li key={item} className="text-sm text-zinc-600 dark:text-zinc-400 list-disc">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href="/resources/ai-readiness-scorecard"
          className="inline-flex w-full justify-center rounded-lg bg-orange-700 px-4 py-2 text-sm font-medium text-white hover:bg-orange-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
        >
          Explore the AI Readiness Scorecard →
        </Link>
      </div>
    </div>
  );
}
