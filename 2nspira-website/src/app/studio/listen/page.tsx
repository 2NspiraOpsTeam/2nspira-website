import { notFound } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { studioVideoIds } from "@/lib/studio/media";
export const dynamic="force-dynamic";
import { publicPageMetadata } from "@/lib/pageMetadata";
import WatchContent from "@/components/studio/WatchContent";
export const metadata=publicPageMetadata({title:"Listen — Rain & Music for Reading and Winding Down",description:"Find original rain soundscapes and instrumental music for reading, study or winding down. Browse soundtrack details and durations in imagined listening spaces.",path:"/studio/listen"});
export default async function Page(){const c=await publishedStudio();if(!c.groups.some(g=>g.id==="listen"))notFound();return <WatchContent mode="listen" availableVideoIds={studioVideoIds(c,"listen")}/>;}
