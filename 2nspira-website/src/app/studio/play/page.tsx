import { notFound } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
import PageIdentity from "@/components/PageIdentity";
import ServiceEffects from "@/components/ServiceEffects";
import StudioGroupContent from "@/components/studio/StudioGroupContent";
export const dynamic="force-dynamic";
export const metadata=publicPageMetadata({title:"Play — Breadcrumb, Coloring Books & Games",description:"Play Breadcrumb, explore coloring and activity books, and find printable games on Amazon and Etsy.",path:"/studio/play"});
export default async function Page({searchParams}:{searchParams:Promise<{category?:string}>}){
 const c=await publishedStudio();const q=await searchParams;
 if(!c.groups.some(g=>g.id==='play'))notFound();
 return <main id="main-content"><ServiceEffects editorial><PageIdentity type="CollectionPage" name="Creative Studio — Play" path="/studio/play"/><StudioGroupContent content={c} groupId="play" initialCategory={typeof q.category==='string'?q.category:''}/></ServiceEffects></main>;
}
