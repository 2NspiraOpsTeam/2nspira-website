import { h2 } from "./ui";

export type ServiceQuestion = { question: string; answer: string };

/** Native disclosures preserve keyboard, no-JavaScript and crawler access. */
export default function ServiceQuestions({ items }: { items: ServiceQuestion[] }) {
  return <section aria-labelledby="service-questions-heading" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
    <h2 id="service-questions-heading" className={h2}>Before we talk</h2>
    <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface px-5 sm:px-8">
      {items.map(item => <details key={item.question} className="group py-2">
        <summary className="cursor-pointer rounded py-4 pr-2 text-base font-semibold leading-7 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{item.question}</summary>
        <p className="max-w-3xl pb-5 text-base leading-8 text-body">{item.answer}</p>
      </details>)}
    </div>
  </section>;
}
