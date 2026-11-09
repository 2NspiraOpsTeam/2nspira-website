import ServiceEffects from "@/components/ServiceEffects";
import type { Metadata } from "next";
import PageIdentity from "@/components/PageIdentity";
import StudioOverview from "@/components/studio/StudioOverview";
import { permanentRedirect } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
export const metadata: Metadata = publicPageMetadata({
  title: "Creative Studio — Watch. Listen. Read. Play.",
  description:
    "Watch original videos, listen to music and ambience, read ideas and books, and explore creative experiences for adults and families.",
  path: "/studio",
});
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const c = await publishedStudio();
  const q = await searchParams;
  if (typeof q.category === "string") {
    const category=c.categories.find(cat=>cat.id===q.category);
    const group=category?.groupIds.find(id=>["watch","listen","read","play"].includes(id));
    if(group)permanentRedirect(["watch","listen"].includes(group) ? `/studio/${group}` : `/studio/${group}?category=${encodeURIComponent(q.category)}#collections`);
  }
  return (
    <main id="main-content"><ServiceEffects editorial>
      <PageIdentity
        type="CollectionPage"
        name="Creative Studio"
        path="/studio"
      />
      <StudioOverview content={c} />
    </ServiceEffects></main>
  );
}
