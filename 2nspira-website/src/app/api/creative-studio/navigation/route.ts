import { publishedStudio } from "@/lib/studio/server";
import { studioNavigation } from "@/lib/studio/model";
export async function GET() {
  return Response.json(
    { links: studioNavigation(await publishedStudio()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
