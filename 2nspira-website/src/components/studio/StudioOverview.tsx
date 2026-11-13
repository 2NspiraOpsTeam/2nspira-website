import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, BookOpen, Sparkles, Headphones, ShoppingBag } from "lucide-react";
import { publicStudio, groupUrl, type Studio } from "@/lib/studio/model";
import { featuredVideo } from "@/content/videos";
import { h1, h2, lead, buttonPrimary, card } from "@/components/ui";

const stories = {
  watch: { Icon: Play, title: "A fresh way to see things.", text: "Watch Why AI Adoption Is Failing: The Trust Deficit Leaders Are Missing—a perspective on trust and human-centered leadership.", label: "Discover Watch", image: "/images/videos/hWk6mH_t0Cs.jpg", alt: "Why AI Adoption Is Failing: The Trust Deficit Leaders Are Missing" },
  listen: { Icon: Headphones, title: "A little space to exhale.", text: "Music & Ambience. Rain on an attic window, a mossy garden, or a quiet café. Step into an original soundscape and stay a while.", label: "Discover Listen", image: `/images/videos/${featuredVideo.id}.jpg`, alt: featuredVideo.title },
  read: { Icon: BookOpen, title: "Ideas that stay with you.", text: "A leadership book to return to. Insights that make you pause. Explore the human side of technology, trust, and change.", label: "Discover Read", image: "", alt: "" },
  shop: { Icon: ShoppingBag, title: "Find something worth keeping.", text: "Shop our published books, rare and collectible editions, and other creative products. Purchase through the existing Amazon, Etsy, and 2Nspira Books listings.", label: "Explore Shop", image: "/images/shop/rare-books-website.webp", alt: "The 2Nspira Books collectible bookstore" },
  play: { Icon: Sparkles, title: "Follow your curiosity.", text: "Follow the clues in the Breadcrumb investigation challenge, or reflect on how you contribute with the Strength Profile.", label: "Discover Play", image: "", alt: "" },
};
export default function StudioOverview({ content }: { content: Studio }) {
  const c = publicStudio(content);
  const groups=c.links.filter(l => l.groupId && !l.categoryId).map(l => ({...c.groups.find(g => g.id === l.groupId)!, name: l.name || c.groups.find(g => g.id === l.groupId)!.name, href: l.url || groupUrl(l.groupId)}));
  return <>
    <section data-editorial-hero className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">Creative Studio · {groups.map(g => g.name).join(". ")}.</p>
        <h1 className={`${h1} max-w-4xl`}>Make room for<br /><span className="text-accent">a little wonder.</span></h1>
        <p className={`${lead} max-w-2xl`}>{c.intro}</p>
        <nav aria-label="Creative Studio collections" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(g => { const story = stories[g.id as keyof typeof stories] || {Icon:Sparkles}; const Icon=story.Icon;
            return <Link key={g.id} href={g.href} className={`${card} p-6`}><span data-story-icon><Icon aria-hidden="true" className="h-6 w-6" /></span><span className="flex items-center justify-between text-2xl font-medium text-ink">{g.name}<ArrowUpRight aria-hidden="true" className="h-5 w-5 text-accent" /></span><span className="mt-3 block text-sm leading-7 text-body">{g.description}</span></Link>;
          })}
        </nav>
      </div>
    </section>
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
      {groups.map(g => {
        const story=stories[g.id as keyof typeof stories] || {image:"",alt:"",title:g.name,text:g.description,label:`Explore ${g.name}`};
        const categoryIds=c.categories.filter(cat=>cat.groupIds.includes(g.id)).map(cat=>cat.id);
        const items=c.items.filter(i=>i.categoryIds.some(id=>categoryIds.includes(id)));
        const featured=(g.id==='read' ? items.find(i=>i.categoryIds.includes('authored-books')) : items.find(i=>i.id==='breadcrumb')) || items.find(i=>i.featured) || items[0];
        const image=story.image || featured?.image;
        return <section data-studio-section key={g.id} id={g.id} aria-labelledby={`overview-${g.id}`} className="grid items-center gap-7 lg:grid-cols-2 lg:gap-12">
          {image && <figure className="overflow-hidden rounded-2xl bg-canvas-deep"><Image unoptimized src={image} alt={story.alt || featured?.imageAlt || ''} width={960} height={640} loading="lazy" sizes="(min-width: 1024px) 500px, calc(100vw - 64px)" className={`aspect-[3/2] w-full ${g.id==='read' ? 'object-contain p-5' : 'object-cover'}`} /></figure>}
          <div><p className="text-xs font-semibold uppercase tracking-widest text-accent">{g.name}</p><h2 id={`overview-${g.id}`} className={`mt-4 ${h2}`}>{story.title}</h2><p className="mt-5 max-w-xl leading-7 text-body">{story.text}</p><Link href={g.href} className={`mt-7 ${buttonPrimary}`}>{story.label} <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>{!["watch","listen","read","play","shop"].includes(g.id) && <ul className="mt-6 space-y-3">{items.map(item => <li key={item.id}><Link className="underline" href={item.url || `/creative-studio/${item.id}`}>{item.title}</Link></li>)}</ul>}</div>
        </section>;
      })}
      <aside className="rounded-[2rem] bg-ink p-8 text-white sm:p-12"><h2 className="text-3xl font-medium tracking-tight">What could we create together?</h2><p className="mt-4 max-w-xl leading-7 text-white/85">Have a story to tell or an experience to bring to life?</p><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center rounded text-white underline underline-offset-4">Let’s explore your idea →</Link></aside>
    </div>
  </>;
}
