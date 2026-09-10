import Link from "next/link";
import type { ReactNode } from "react";

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
      content.push(<Heading key={index} className="mb-4 mt-10 text-xl font-semibold text-zinc-900 dark:text-white">{block.text}</Heading>);
    } else {
      content.push(<p key={index} className="my-4 whitespace-pre-line">{block.text}</p>);
    }
  }
  return (
    <main className="flex-1 bg-white py-16 dark:bg-black sm:py-24">
      <article className="mx-auto max-w-3xl px-4 text-base leading-8 text-zinc-700 dark:text-zinc-300 sm:px-6">
        <h1 className="mb-10 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{title}</h1>
        {content}
        <Link href="/contact" className="mt-8 inline-block rounded font-semibold text-blue-700 underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400">Contact 2Nspira</Link>
      </article>
    </main>
  );
}
