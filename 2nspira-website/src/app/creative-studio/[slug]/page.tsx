import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { buttonPrimary, h1, lead } from "@/components/ui";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
async function getItem(params: Props["params"]) {
  const { slug } = await params;
  const c = await publishedStudio();
  const i = c.items.find((i) => i.id === slug);
  if (!i) notFound();
  return i;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = await getItem(params);
  return publicPageMetadata({
    title: i.title,
    description: i.description,
    path: i.url || `/creative-studio/${i.id}`,
  });
}
export default async function Page({ params }: Props) {
  const i = await getItem(params);
  if (i.url) permanentRedirect(i.url);
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6"
    >
      <Link href="/studio" className="underline text-accent">
        ← Creative Studio
      </Link>
      <article>
        <p className="mt-10 text-sm uppercase tracking-widest text-body">
          {i.type}
        </p>
        <h1 className={`mt-4 ${h1}`}>{i.title}</h1>
        {i.author && <p className="mt-5 text-body">By {i.author}</p>}
        <p className={lead}>{i.description}</p>
        {i.image && (
          <Image
            unoptimized
            src={i.image}
            alt={i.imageAlt}
            width={1200}
            height={800}
            className="my-8 h-auto w-full rounded-2xl"
          />
        )}
        <div className="mt-8 space-y-6 text-body leading-8">
          {i.body.split(/\n\s*\n/).map((p, n) => (
            <p key={n} className="whitespace-pre-wrap">
              {p}
            </p>
          ))}
        </div>
        {i.purchaseUrl && (
          <div className="mt-10">
            <a
              href={i.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonPrimary}
            >
              Purchase{" "}
              {i.type.toLowerCase() === "book" ? "this book" : "this item"} ↗
            </a>
            <p className="mt-3 text-sm text-body">
              Purchase page opens in a new tab.
            </p>
          </div>
        )}
      </article>
    </main>
  );
}
