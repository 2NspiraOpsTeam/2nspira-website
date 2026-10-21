import { CheckCircle2 } from "lucide-react";
import { cardFlat, h2, h3, lead } from "./ui";

export default function ServiceFit({ title = "Does this sound familiar?", intro, items }: {
  title?: string; intro: string; items: { title: string; text: string }[];
}) {
  return <section aria-labelledby="client-fit-heading" className="border-b border-line bg-canvas-deep py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 id="client-fit-heading" className={h2}>{title}</h2>
      <p className={`max-w-3xl ${lead}`}>{intro}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{items.map(item => <article key={item.title} data-catalog-card className={`p-6 ${cardFlat}`}>
        <CheckCircle2 size={25} strokeWidth={1.6} aria-hidden="true" className="mb-5 text-accent" />
        <h3 className={h3}>{item.title}</h3><p className="mt-3 leading-7 text-body">{item.text}</p>
      </article>)}</div>
    </div>
  </section>;
}
