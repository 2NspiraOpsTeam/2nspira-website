import AudienceContent from "@/components/audiences/AudienceContent";
import { publishedContent } from "@/lib/audiences/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
export const metadata = publicPageMetadata({
  title: "Who We Serve | Business Transformation for Your Industry",
  description:
    "Explore how 2Nspira can help education, manufacturing and property management organizations simplify operations and improve experiences.",
  path: "/who-we-serve",
});
export default async function Page() {
  return <AudienceContent content={await publishedContent()} />;
}
