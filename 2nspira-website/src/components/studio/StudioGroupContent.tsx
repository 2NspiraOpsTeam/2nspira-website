import Link from "next/link";
import { publicStudio, type Studio } from "@/lib/studio/model";
import StudioTrail from "./StudioTrail";
import StudioLibrary from "./StudioLibrary";
import { StudioCard } from "./StudioContent";
import { h1,h2,lead,buttonSecondary } from "@/components/ui";
export default function StudioGroupContent({content,groupId,initialCategory=""}:{content:Studio;groupId:"read"|"play";initialCategory?:string}) {
 const c=publicStudio(content), read=groupId==='read';
 const categories=c.categories.filter(cat=>cat.groupIds.includes(groupId));
 const ids=categories.map(cat=>cat.id);
 const items=c.items.filter(i=>i.categoryIds.some(id=>ids.includes(id)));
 const priority=["coloring-books","activity-books","printables","art","interactive"];
 const libraryItems=read?items:[...items].sort((a,b)=>Math.min(...a.categoryIds.map(id=>priority.indexOf(id)<0?99:priority.indexOf(id)))-Math.min(...b.categoryIds.map(id=>priority.indexOf(id)<0?99:priority.indexOf(id))));
 const featured=read?items.find(i=>i.categoryIds.includes('authored-books')):items.find(i=>i.id==='breadcrumb');
 return <>
  <section data-editorial-hero className="border-b border-line"><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"><StudioTrail active={groupId}/><p className="mt-10 text-xs font-semibold uppercase tracking-widest text-accent">Creative Studio · {read?'Read':'Play'}</p><h1 className={`${h1} max-w-4xl`}>{read?<>Read. Reflect.<br/><span className="text-accent">See things differently.</span></>:<>A curious mind.<br/><span className="text-accent">A playful spirit.</span></>}</h1><p className={`${lead} max-w-2xl`}>{read?'Leadership, trust, and the human side of technology. Discover our book and explore ideas worth spending time with.':'Follow a trail of clues, fill a page with color, or bring people together around a creative challenge.'}</p><div className="mt-6 flex flex-wrap gap-3"><a href="#collections" className={buttonSecondary}>{read?'Browse books & insights':'Browse coloring books & games'} ↓</a>{read&&<Link href="/insights" className={buttonSecondary}>Visit all blog & insights →</Link>}</div></div></section>
  <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
   {featured&&<section aria-labelledby="featured-heading" className="mb-16"><p className="text-xs font-semibold uppercase tracking-widest text-accent">{read?'The leadership bookshelf':'Featured interactive game'}</p><h2 id="featured-heading" className={`mb-7 mt-4 ${h2}`}>{read?'Trust is where it starts.':'Every clue leads somewhere.'}</h2><StudioCard item={featured} large/>{!read&&<p className="mt-4 text-sm leading-7 text-body">Breadcrumb is a browser-based investigation challenge for curious adults. Opens in a new tab; progress is saved in that browser.</p>}</section>}
   <section id="collections" aria-labelledby="collections-heading"><h2 id="collections-heading" className={h2}>{read?'The reading room':'Color, create, play.'}</h2><p className="mt-4 max-w-2xl leading-7 text-body">{read?'Our leadership book, blog articles, and practical resources. Follow an idea that interests you.':'Coloring and activity books on Amazon, plus printable games and creative activities on Etsy. Format and purchase details are available on each destination.'}</p><StudioLibrary items={libraryItems} categories={categories} initialCategory={initialCategory}/></section>
   {read&&!items.some(i=>i.url.replace(/\/$/, "")==="https://books.2nspira.com")&&<section aria-labelledby="bookstore-heading" className="mt-14 rounded-2xl border border-line bg-accent-soft p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest text-accent">Rare & collectible books</p><h2 id="bookstore-heading" className={`mt-3 ${h2}`}>Discover 2Nspira Books</h2><p className="mt-4 max-w-2xl leading-7 text-body">Explore rare, signed, and limited editions, with photographs and condition details for each individual copy.</p><a href="https://books.2nspira.com" className={`mt-6 ${buttonSecondary}`}>Visit the bookstore →</a></section>}
   <aside className="mt-14 border-t border-line pt-8"><h2 className="text-2xl font-medium text-ink">Keep exploring.</h2><div className="mt-5"><StudioTrail active={groupId}/></div></aside>
  </div>
 </>;
}
