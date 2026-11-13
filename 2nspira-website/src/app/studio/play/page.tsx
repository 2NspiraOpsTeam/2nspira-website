import { notFound } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
import PageIdentity from "@/components/PageIdentity";
import ServiceEffects from "@/components/ServiceEffects";
import StudioGroupContent from "@/components/studio/StudioGroupContent";
export const dynamic="force-dynamic";
export const metadata=publicPageMetadata({title:"Play — Breadcrumb & Strength Profile",description:"Follow the clues in the Breadcrumb investigation challenge, or discover your strengths with the free 2Nspira Strength Profile.",path:"/studio/play"});
export default async function Page({searchParams}:{searchParams:Promise<{category?:string}>}){
 const c=await publishedStudio();const q=await searchParams;
 if(!c.groups.some(g=>g.id==='play'))notFound();
 return <main id="main-content"><ServiceEffects editorial><PageIdentity type="CollectionPage" name="Creative Studio — Play" path="/studio/play"/><StudioGroupContent content={c} groupId="play" initialCategory={typeof q.category==='string'?q.category:''}/></ServiceEffects></main>;
}
