import Link from "next/link";
import { buttonPrimary, card, caption } from "../ui";

export default function AiReadinessCard() {
  const highlights = [
    "Assess practical AI readiness gaps",
    "Support executive planning & decision-making",
    "Create a responsible adoption path",
  ];

  return (
    <div className={`group flex h-full flex-col p-8 hover:-translate-y-1 ${card}`}>
      <span className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">Organizational readiness</span>
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-ink">
          AI Readiness Assessment for Organizations
        </h2>
        <p className={`mt-2 ${caption}`}>
          Assess governance, workflows, and implementation preparedness.
        </p>
        <p className="mt-4 text-sm leading-6 text-body">
          An executive-facing assessment designed to help organizations evaluate
          strategy, governance, workflows, trust, and implementation preparedness
          for AI adoption.
        </p>
        <h3 className="mt-6 text-base font-semibold text-ink">Key Insights:</h3>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          {highlights.map((item) => (
            <li key={item} className="text-sm text-body">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href="/resources/ai-readiness-scorecard"
          className={`${buttonPrimary} w-full`}
        >
          Explore the AI Readiness Scorecard →
        </Link>
      </div>
    </div>
  );
}
