import Link from "next/link";

type Props = { title: string; intro: string; audience: string; highlights: string[]; href: string; action: string; };

export default function AssessmentPage({ title, intro, audience, highlights, href, action }: Props) {
  return (
    <main className="flex-1 bg-zinc-50 py-16 dark:bg-black sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/resources" className="rounded text-sm font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400">← All resources</Link>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{intro}</p>
        <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">What you can explore</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-zinc-600 dark:text-zinc-300">{highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-white">Who it is for</h2>
          <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{audience}</p>
          <a href={href} className="mt-8 inline-flex rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">{action} →</a>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Free to use. Continue to the dedicated 2Nspira assessment app.</p>
        </section>
        <p className="mt-8 text-zinc-600 dark:text-zinc-300">Want help putting your insights into practice? <Link href="/contact" className="rounded font-semibold text-blue-700 underline dark:text-blue-400">Contact 2Nspira</Link>.</p>
      </div>
    </main>
  );
}
