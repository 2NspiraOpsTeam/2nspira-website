import { notFound } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { studioVideoIds } from "@/lib/studio/media";
export const dynamic="force-dynamic";
import { publicPageMetadata } from "@/lib/pageMetadata";
import WatchContent from "@/components/studio/WatchContent";
export const metadata=publicPageMetadata({title:"Watch — AI, Trust & Leadership",description:"Watch Why AI Adoption Is Failing: The Trust Deficit Leaders Are Missing. Explore the human side of AI adoption.",path:"/studio/watch"});
export default async function Page(){const c=await publishedStudio();if(!c.groups.some(g=>g.id==="watch"))notFound();return <WatchContent mode="watch" availableVideoIds={studioVideoIds(c,"watch")}/>;}
