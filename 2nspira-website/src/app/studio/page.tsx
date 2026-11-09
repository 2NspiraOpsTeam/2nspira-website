import type { Metadata } from "next";
import PageIdentity from "@/components/PageIdentity";
import StudioContent from "@/components/studio/StudioContent";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
export const metadata: Metadata = publicPageMetadata({
  title: "Creative Studio — Watch. Read. Play.",
  description:
    "Watch original videos, read ideas and books, and explore creative activities for adults and families.",
  path: "/studio",
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
        path="/studio"
      />
      <StudioContent
        content={c}
        initialCategory={typeof q.category === "string" ? q.category : ""}
      />
    </main>
  );
}
