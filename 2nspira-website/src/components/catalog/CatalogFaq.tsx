import Link from "next/link";
import { catalogQuestions, type CatalogPage } from "@/content/catalog/seo";
import { h2, linkInline } from "@/components/ui";

/** Useful buyer information, not a claim of FAQ rich-result eligibility. */
export default function CatalogFaq({ page }: { page: CatalogPage }) {
  return <section aria-labelledby="catalog-questions-title" className="mt-14 border-t border-line pt-10">
    <h2 id="catalog-questions-title" data-catalog-reveal className={h2}>Good to know</h2>
    <div className="mt-6 space-y-3" data-catalog-fade>
      {catalogQuestions[page].map(({ question, answer, link }) => <details key={question} className="rounded-xl border border-line bg-surface">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          {question}<span data-faq-icon aria-hidden="true" className="text-xl text-accent">+</span>
        </summary>
        <div className="px-5 pb-5 leading-7 text-body">
          <p>{answer}</p>
          {link && <Link href={link.href} className={`mt-3 min-h-[44px] ${linkInline}`}>{link.label}</Link>}
        </div>
      </details>)}
    </div>
  </section>;
}
