import Link from "next/link";
import Image from "next/image";
import { publicStudio, type Studio } from "@/lib/studio/model";
import StudioTrail from "./StudioTrail";
import StudioLibrary from "./StudioLibrary";
import { StudioCard } from "./StudioContent";
import { h1,h2,lead,buttonPrimary,buttonSecondary } from "@/components/ui";
export default function StudioGroupContent({content,groupId,initialCategory=""}:{content:Studio;groupId:"read"|"play";initialCategory?:string}) {
 const c=publicStudio(content), read=groupId==='read';
 const categories=c.categories.filter(cat=>cat.groupIds.includes(groupId));
 const ids=categories.map(cat=>cat.id);
 const items=c.items.filter(i=>i.categoryIds.some(id=>ids.includes(id)));
 const priority=["coloring-books","activity-books","printables","art","interactive"];
 const libraryItems=read?items.filter(i=>!i.categoryIds.includes("authored-books")&&i.url.replace(/\/$/, "")!=="https://books.2nspira.com"):[...items].sort((a,b)=>Math.min(...a.categoryIds.map(id=>priority.indexOf(id)<0?99:priority.indexOf(id)))-Math.min(...b.categoryIds.map(id=>priority.indexOf(id)<0?99:priority.indexOf(id))));
 const featured=read?items.find(i=>i.categoryIds.includes('authored-books')):items.find(i=>i.id==='breadcrumb');
 return <>
  <section data-editorial-hero className="border-b border-line"><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"><StudioTrail active={groupId}/><p className="mt-10 text-xs font-semibold uppercase tracking-widest text-accent">Creative Studio · {read?'Read':'Play'}</p><h1 className={`${h1} max-w-4xl`}>{read?<>Read. Reflect.<br/><span className="text-accent">See things differently.</span></>:<>A curious mind.<br/><span className="text-accent">A playful spirit.</span></>}</h1><p className={`${lead} max-w-2xl`}>{read?'Leadership, trust, and the human side of technology. Discover our book and explore ideas worth spending time with.':'Follow a trail of clues, fill a page with color, or bring people together around a creative challenge.'}</p><div className="mt-6 flex flex-wrap gap-3"><a href="#collections" className={buttonSecondary}>{read?'Browse books & insights':'Browse coloring books & games'} ↓</a>{read&&<Link href="/insights" className={buttonSecondary}>Visit all blog & insights →</Link>}</div></div></section>
  <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
   {featured&&<section aria-labelledby="featured-heading" className="mb-16"><p className="text-xs font-semibold uppercase tracking-widest text-accent">{read?'The leadership bookshelf':'Featured interactive game'}</p><h2 id="featured-heading" className={`mb-7 mt-4 ${h2}`}>{read?'Trust is where it starts.':'Every clue leads somewhere.'}</h2><StudioCard item={featured} large/>{!read&&<p className="mt-4 text-sm leading-7 text-body">Breadcrumb is a browser-based investigation challenge for curious adults. Opens in a new tab; progress is saved in that browser.</p>}</section>}
   {read&&<section id="bookstore" aria-labelledby="bookstore-heading" className="mb-16 grid overflow-hidden rounded-3xl border border-line bg-accent-soft md:grid-cols-2">
    <a href="https://books.2nspira.com" aria-label="Explore 2Nspira Books" className="flex items-center justify-center bg-[#e8e3d8] p-8 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-4px] sm:p-10">
     <Image src="/images/pages/bookstore-bag-of-bones.webp" alt="The actual collectible copy of Stephen King's Bag of Bones, featured at 2Nspira Books" width={1200} height={1600} sizes="(min-width: 768px) 480px, 100vw" className="h-72 w-full object-contain drop-shadow-xl sm:h-96"/>
    </a>
    <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-12">
     <p className="text-xs font-semibold uppercase tracking-widest text-accent">The bookstore · 2Nspira Books</p>
     <h2 id="bookstore-heading" className={`mt-4 ${h2}`}>Extraordinary editions.<br/>Stories worth keeping.</h2>
     <p className="mt-5 max-w-xl leading-7 text-body">Explore our collection of rare, signed, and limited editions. Discover the details that make each copy special, with actual-copy photographs and individual condition notes.</p>
     <a href="https://books.2nspira.com" className={`mt-7 ${buttonPrimary}`}>Explore the bookstore →</a>
    </div>
   </section>}
   <section id="collections" aria-labelledby="collections-heading"><h2 id="collections-heading" className={h2}>{read?'Insights & articles':'Color, create, play.'}</h2><p className="mt-4 max-w-2xl leading-7 text-body">{read?'Ideas on leadership, trust, and technology, alongside practical resources. Follow a perspective that interests you.':'Coloring and activity books on Amazon, plus printable games and creative activities on Etsy. Format and purchase details are available on each destination.'}</p><StudioLibrary items={libraryItems} categories={read?categories.filter(cat=>libraryItems.some(i=>i.categoryIds.includes(cat.id))):categories} initialCategory={initialCategory}/></section>

   <aside className="mt-14 border-t border-line pt-8"><h2 className="text-2xl font-medium text-ink">Keep exploring.</h2><div className="mt-5"><StudioTrail active={groupId}/></div></aside>
  </div>
 </>;
}
