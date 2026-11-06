import { notFound } from "next/navigation";
import { publishedContent } from "@/lib/team/server";
import TeamContent from "@/components/team/TeamContent";
import { publicPageMetadata } from "@/lib/pageMetadata";
export const dynamic = "force-dynamic";
export const metadata = publicPageMetadata({
  title: "Team & Delivery",
  description:
    "Meet the people and AI delivery assistants behind 2Nspira’s business transformation work, with clear human accountability and evidenced project examples.",
  path: "/team-delivery",
});
export default async function TeamPage() {
  const c = await publishedContent();
  if (!c) notFound();
  return (
    <main id="main-content">
      <TeamContent content={c} />
    </main>
  );
}
