import AudienceContent from "@/components/audiences/AudienceContent";
import { publishedContent } from "@/lib/audiences/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
export const metadata = publicPageMetadata({
  title: "Who We Serve | Business Transformation for Your Industry",
  description:
    "Technology support for startups, technology teams, retailers, professional services, education, manufacturing, property management and nonprofits. Explore practical ways we can help.",
  path: "/who-we-serve",
});
export default async function Page() {
  return <AudienceContent content={await publishedContent()} />;
}
