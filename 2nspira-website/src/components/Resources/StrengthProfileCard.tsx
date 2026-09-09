import Link from "next/link";

export default function StrengthProfileCard() {
  const highlights = [
    "Identify natural operating strengths",
    "Reflect on role fit and work energy",
    "Support coaching and career conversations",
  ];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Professional Strengths Assessment
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Identify your natural operating strengths and work-fit profile.
        </p>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          A comprehensive assessment to help you understand how you naturally
          create value, collaborate, and thrive at work.
        </p>
        <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-white">
          Why Use It:
        </h3>
        <ul className="mt-2 space-y-1 pl-4">
          {highlights.map((item) => (
            <li key={item} className="text-sm text-zinc-600 dark:text-zinc-400 list-disc">
              {item}
            </li>
          ))}
        </ul>
      </div >
      <div className="mt-6">
        <Link
          href="/resources/strength-profile"
          className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
        >
          Explore the Strength Profile →
        </Link>
      </div>
    </div>
  );
}