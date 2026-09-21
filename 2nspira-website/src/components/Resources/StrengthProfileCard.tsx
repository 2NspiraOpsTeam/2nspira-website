import Link from "next/link";
import { buttonPrimary, card, caption } from "../ui";

export default function StrengthProfileCard() {
  const highlights = [
    "Identify natural operating strengths",
    "Reflect on role fit and work energy",
    "Support coaching and career conversations",
  ];

  return (
    <div className={`group flex h-full flex-col p-8 hover:-translate-y-1 ${card}`}>
      <span className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">Professional clarity</span>
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-ink">
          Professional Strengths Assessment
        </h2>
        <p className={`mt-2 ${caption}`}>
          Identify your natural operating strengths and work-fit profile.
        </p>
        <p className="mt-4 text-sm leading-6 text-body">
          A comprehensive assessment to help you understand how you naturally
          create value, collaborate, and thrive at work.
        </p>
        <h3 className="mt-6 text-base font-semibold text-ink">Why Use It:</h3>
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
          href="/resources/strength-profile"
          className={`${buttonPrimary} w-full`}
        >
          Explore the Strength Profile →
        </Link>
      </div>
    </div>
  );
}
