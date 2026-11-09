import { notFound } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { studioVideoIds } from "@/lib/studio/media";
export const dynamic="force-dynamic";
import { publicPageMetadata } from "@/lib/pageMetadata";
import WatchContent from "@/components/studio/WatchContent";
export const metadata=publicPageMetadata({title:"Watch — Visual Stories, AI & Leadership",description:"Watch 2Nspira’s original visual stories and perspectives on trust, AI, and human-centered leadership.",path:"/studio/watch"});
export default async function Page(){const c=await publishedStudio();if(!c.groups.some(g=>g.id==="watch"))notFound();return <WatchContent mode="watch" availableVideoIds={studioVideoIds(c,"watch")}/>;}
