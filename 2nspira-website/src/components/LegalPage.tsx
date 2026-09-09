import Link from "next/link";
import type { ReactNode } from "react";
import { linkInline, pageMain } from "./ui";

type Block = { tag: string; text: string };

export default function LegalPage({ title, blocks }: { title: string; blocks: Block[] }) {
  const content: ReactNode[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (block.tag === "li") {
      const items = [block];
      while (blocks[index + 1]?.tag === "li") items.push(blocks[++index]);
      content.push(<ul key={index} className="my-5 list-disc space-y-2 pl-6">{items.map((item, n) => <li key={n}>{item.text}</li>)}</ul>);
    } else if (/^h[1-4]$/.test(block.tag)) {
      // Preserve wording; normalize numbered top-level sections to H2.
      const Heading = /^\d+\./.test(block.text) && !/^\d+\.\d/.test(block.text) ? "h2" : block.tag === "h2" ? "h2" : "h3";
      content.push(<Heading key={index} className="mb-4 mt-10 text-xl font-semibold text-ink">{block.text}</Heading>);
    } else {
      content.push(<p key={index} className="my-4 whitespace-pre-line">{block.text}</p>);
    }
  }
  return (
    <main className={pageMain}>
      <article className="mx-auto max-w-3xl px-4 py-16 text-base leading-8 text-body sm:px-6 sm:py-24">
        <h1 className="mb-10 text-4xl font-semibold tracking-tight text-ink">{title}</h1>
        {content}
        <Link href="/contact" className={`mt-8 inline-block ${linkInline}`}>Contact 2Nspira</Link>
      </article>
    </main>
  );
}
