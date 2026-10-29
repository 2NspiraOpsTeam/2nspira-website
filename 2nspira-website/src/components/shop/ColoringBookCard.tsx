import Image from "next/image";
import { buttonPrimary, caption, card, h2 } from "@/components/ui";

import type { ColoringBook } from "@/content/shop/coloring-books";

type ColoringBookCardProps = ColoringBook & {
  headingLevel?: "h2" | "h3";
};

export default function ColoringBookCard({ id, title, image, imageAlt, paragraphs, href, comingSoon, headingLevel = "h3" }: ColoringBookCardProps) {
  const Heading = headingLevel;
  return (
    <section id={id} data-coloring-book data-catalog-card aria-labelledby={`${id}-title`}
      className={`grid gap-10 p-6 sm:p-10 md:grid-cols-[1fr_2fr] ${card}`}>
      <Image src={image} alt={imageAlt} width={1000} height={1000} unoptimized
        className="mx-auto h-auto w-full max-w-xs rounded-xl shadow-[0_18px_45px_rgba(35,41,54,0.16)] transition-transform duration-500 ease-gentle motion-safe:hover:-translate-y-1" />
      <div>
        <Heading id={`${id}-title`} className={h2}>{title}</Heading>
        <p className="mt-4 text-sm font-medium text-accent">Paperback coloring book · Adults &amp; teens</p>
        <p className="mt-3 text-sm text-body">By 2Nspira Books</p>
        <div className="mt-6 space-y-4 leading-8 text-body">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {comingSoon ? (
          <div className="mt-6 rounded-xl border border-line bg-accent-soft p-4">
            <p className="font-semibold text-ink">Coming soon</p>
            <p className="mt-1 text-sm leading-6 text-body">Not yet available to order. The Amazon purchase link will appear here after release.</p>
          </div>
        ) : href ? (
          <>
            <a href={href} rel="sponsored" className={`mt-6 min-h-[44px] ${buttonPrimary}`}>Buy on Amazon</a>
            <p className={`mt-3 ${caption}`}>As an Amazon Associate I earn from qualifying purchases.</p>
          </>
        ) : null}
      </div>
    </section>
  );
}
