import type { Metadata } from "next";
import PageIdentity from "@/components/PageIdentity";
import StudioContent from "@/components/studio/StudioContent";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
export const metadata: Metadata = publicPageMetadata({
  title: "Creative Studio — Watch, Read & Shop",
  description:
    "Explore 2Nspira’s YouTube channel, articles, resources, authored books, rare editions, and creative products.",
  path: "/creative-studio",
});
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const c = await publishedStudio();
  const q = await searchParams;
  return (
    <main id="main-content">
      <PageIdentity
        type="CollectionPage"
        name="Creative Studio"
        path="/creative-studio"
      />
      <StudioContent
        content={c}
        initialCategory={typeof q.category === "string" ? q.category : ""}
      />
    </main>
  );
}
