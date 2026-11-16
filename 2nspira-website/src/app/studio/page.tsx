import ServiceEffects from "@/components/ServiceEffects";
import type { Metadata } from "next";
import PageIdentity from "@/components/PageIdentity";
import StudioOverview from "@/components/studio/StudioOverview";
import { permanentRedirect } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
export const metadata: Metadata = publicPageMetadata({
  title: "Creative Studio — Ideas, Soundscapes & Discovery",
  description:
    "Explore AI and leadership ideas, find rain and music for reading or winding down, and follow a Breadcrumb mystery. Choose your Creative Studio experience.",
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
    if(category?.groupIds.includes("shop") && !category.groupIds.includes("read"))permanentRedirect("/shop");
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
