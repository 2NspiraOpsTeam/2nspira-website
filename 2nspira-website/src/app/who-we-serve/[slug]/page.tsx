import { notFound } from "next/navigation";
import AudiencePage from "@/components/audiences/AudiencePage";
import { publishedContent } from "@/lib/audiences/server";
import { audienceRoutes } from "@/lib/audiences/routes";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
async function audience(slug: string) {
  const content = await publishedContent();
  const row = content.industries.find(i => i.page && audienceRoutes[i.id] === `/who-we-serve/${slug}`);
  if (!row) notFound();
  return row;
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const row = await audience(slug);
  return publicPageMetadata({ title: row.page!.seoTitle, description: row.page!.seoDescription, path: audienceRoutes[row.id] });
}
export default async function Page({ params }: Props) {
  const row = await audience((await params).slug);
  const url = `https://2nspira.com${audienceRoutes[row.id]}`;
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`, url, name: row.page!.seoTitle, description: row.page!.seoDescription, isPartOf: { "@id": "https://2nspira.com/#website" }, about: { "@id": "https://2nspira.com/#organization" } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g,"\\u003c") }}/><AudiencePage audience={row}/></>;
}
