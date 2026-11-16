import { notFound } from "next/navigation";
import { publishedStudio } from "@/lib/studio/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
import PageIdentity from "@/components/PageIdentity";
import ServiceEffects from "@/components/ServiceEffects";
import StudioGroupContent from "@/components/studio/StudioGroupContent";
export const dynamic="force-dynamic";
export const metadata=publicPageMetadata({title:"Read — Leadership Books & Insights",description:"Think through leadership, trust and AI at work with books, articles and practical resources. Find a perspective for the decisions you face.",path:"/studio/read"});
export default async function Page({searchParams}:{searchParams:Promise<{category?:string}>}){
 const c=await publishedStudio();const q=await searchParams;
 if(!c.groups.some(g=>g.id==='read'))notFound();
 return <main id="main-content"><ServiceEffects editorial><PageIdentity type="CollectionPage" name="Creative Studio — Read" path="/studio/read"/><StudioGroupContent content={c} groupId="read" initialCategory={typeof q.category==='string'?q.category:''}/></ServiceEffects></main>;
}
