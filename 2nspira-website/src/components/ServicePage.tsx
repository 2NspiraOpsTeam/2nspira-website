import Link from "next/link";

type Props = { title: string; intro: string; audience: string; outcomes: string[]; steps: { title: string; text: string }[] };
export default function ServicePage({ title, intro, audience, outcomes, steps }: Props) {
  return (
    <main className="flex-1 bg-zinc-50 dark:bg-black">
      <section className="border-b border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-black sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link href="/services" className="rounded text-sm font-semibold text-blue-700 underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400">← All services</Link>
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{intro}</p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Start a conversation →</Link>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <section className="grid gap-8 md:grid-cols-2" aria-label="Who we help and outcomes">
          <div><h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Who this is for</h2><p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{audience}</p></div>
          <div><h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">What we help you achieve</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-zinc-600 dark:text-zinc-300">{outcomes.map(item => <li key={item}>{item}</li>)}</ul></div>
        </section>
        <section className="mt-16" aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="text-3xl font-semibold text-zinc-900 dark:text-white">From clarity to execution</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{steps.map((step,index) => <article key={step.title} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"><p className="font-semibold text-blue-700 dark:text-blue-400">0{index+1}</p><h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">{step.title}</h3><p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">{step.text}</p></article>)}</div>
        </section>
        <aside className="mt-12 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800 sm:p-8"><h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Start with a clearer picture</h2><p className="mt-3 text-zinc-600 dark:text-zinc-300">Explore our free assessments before your next leadership conversation.</p><Link href="/resources" className="mt-4 inline-block rounded font-semibold text-blue-700 underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400">Explore 2Nspira resources →</Link></aside>
      </div>
    </main>
  );
}
