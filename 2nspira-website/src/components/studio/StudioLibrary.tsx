"use client";
import { useState, useSyncExternalStore } from "react";
import type { Item, Category } from "@/lib/studio/model";
import { StudioCard } from "./StudioContent";
import { buttonSecondary } from "@/components/ui";
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
export default function StudioLibrary({ items, categories, initialCategory = "" }: { items: Item[]; categories: Category[]; initialCategory?: string }) {
  const ready=useSyncExternalStore(subscribe,clientReady,serverReady);
  const [category,setCategory]=useState(categories.some(c=>c.id===initialCategory)?initialCategory:"");
  const [format,setFormat]=useState("");
  const types=[...new Set(items.map(i=>i.type))];
  const matches=items.filter(i=>(!category||i.categoryIds.includes(category))&&(!format||i.type===format));
  function chooseCategory(value:string){setCategory(value);const u=new URL(window.location.href);if(value)u.searchParams.set('category',value);else u.searchParams.delete('category');u.hash='collections';window.history.replaceState(null,'',u);}
  return <div>
    <div className="my-7 grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
      <label className="text-sm font-medium text-ink">Category<select aria-label="Category" disabled={!ready} value={category} onChange={e=>chooseCategory(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-line bg-surface px-3"><option value="">All categories</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
      <label className="text-sm font-medium text-ink">Content type<select aria-label="Content type" disabled={!ready} value={format} onChange={e=>setFormat(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-line bg-surface px-3"><option value="">All types</option>{types.map(t=><option key={t}>{t}</option>)}</select></label>
      <button type="button" disabled={!ready||(!category&&!format)} className={`self-end ${buttonSecondary}`} onClick={()=>{chooseCategory('');setFormat('');}}>Clear filters</button>
    </div>
    <p role="status" className="mb-6 text-sm text-body">{matches.length} {matches.length===1?'item':'items'}</p>
    {matches.length ? <><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{matches.slice(0,9).map(i=><StudioCard key={i.id} item={i}/>)}</div>{matches.length>9&&<details key={`${category}:${format}`} className="mt-8 rounded-2xl border border-line bg-surface p-5 sm:p-7"><summary className="min-h-11 cursor-pointer py-3 font-medium">Explore {matches.length-9} more items</summary><div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{matches.slice(9).map(i=><StudioCard key={i.id} item={i}/>)}</div></details>}</> : <p className="rounded-2xl border border-line bg-surface p-7 text-body">No items match these filters. Clear the filters to explore everything.</p>}
    <noscript><p className="mt-5 text-sm text-body">Filters require JavaScript. All items remain available below; open “Explore more items” to browse the full collection.</p></noscript>
  </div>;
}
