import { notFound } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { studioVideoIds } from "@/lib/studio/media";
export const dynamic="force-dynamic";
import { publicPageMetadata } from "@/lib/pageMetadata";
import WatchContent from "@/components/studio/WatchContent";
export const metadata=publicPageMetadata({title:"Watch — 2Nspira on YouTube",description:"Explore the 2Nspira YouTube channel: music videos, soundscapes, creative stories, and perspectives on leadership.",path:"/studio/watch"});
export default async function Page(){const c=await publishedStudio();if(!c.groups.some(g=>g.id==="watch"))notFound();return <WatchContent mode="watch" availableVideoIds={studioVideoIds(c,"watch")} channel={c.items.find(i=>i.type.toLowerCase()==="channel")}/>;}
