import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/pageMetadata";
import WatchContent from "@/components/studio/WatchContent";
export const metadata: Metadata = publicPageMetadata({
  title: "Videos: Original Soundscapes, AI & Creative Stories",
  description: "Explore 2Nspira’s original rain soundscapes, immersive visual worlds, and perspectives on AI and leadership. Watch our latest videos and discover our creative range.",
  path: "/videos",
});

export default function VideosPage(){return <WatchContent/>;}
