import Link from "next/link";
import { ArrowDown, ArrowUpRight, AudioLines, Clapperboard, Lightbulb } from "lucide-react";
import ServiceEffects from "@/components/ServiceEffects";
import StudioTrail from "./StudioTrail";
import PageIdentity from "@/components/PageIdentity";
import VideoPlayer from "@/components/VideoPlayer";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, buttonSecondary, card, cardFlat, eyebrow, h1, h2, lead, linkInline, pageMain } from "@/components/ui";
import { videos, youtubeChannel } from "@/content/videos";

type Mode = "watch" | "listen" | "all";
type Video = typeof videos[number];
function MediaLink({ video, listen = false }: { video: Video; listen?: boolean }) {
  return <a className={`mt-4 min-h-11 gap-2 ${linkInline}`} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" aria-label={`${listen ? "Listen" : "Watch"} on YouTube: ${video.title} (opens in a new tab)`}>{listen ? "Listen" : "Watch"} on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>;
}
function MediaCard({ video, listen }: { video: Video; listen: boolean }) {
  return <article data-catalog-card id={video.category === "leadership" ? "leadership-videos" : undefined} className={`min-w-0 scroll-mt-28 p-4 sm:p-5 ${card}`}>
    <VideoPlayer id={video.id} title={video.title} duration={video.duration} />
    <h3 className="mt-5 text-xl font-semibold leading-snug text-ink">{video.title}</h3>
    <p className="mt-3 leading-7 text-body">{video.description}</p>
    <MediaLink video={video} listen={listen} />
  </article>;
}
export default function WatchContent({ mode = "all", availableVideoIds }: { mode?: Mode; availableVideoIds?: string[] }) {
  const listen=mode==='listen', watch=mode==='watch', studio=mode!=='all';
  const collection=videos.filter(v=>availableVideoIds ? availableVideoIds.includes(v.id) : mode==='all'||(listen?v.category==='ambience':v.category==='leadership'));
  const featured=collection[0], rest=collection.slice(1);
  const path=studio?`/studio/${mode}`:'/videos';
  return <main id="main-content" className={pageMain}><ServiceEffects editorial>
    <PageIdentity type="CollectionPage" name={listen ? "Listen — Music & Ambience" : "2Nspira Videos"} path={path} />
    <section className="relative overflow-hidden border-b border-line bg-surface" aria-labelledby="videos-title">
      <AmbientField />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-10"><StudioTrail active={studio?mode:"videos"} /></div>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div data-catalog-reveal>
            <p><EyebrowPill>Creative Studio · {listen ? "Listen — Music & Ambience" : watch ? "Watch" : "The full video collection"}</EyebrowPill></p>
            <h1 id="videos-title" className={h1}>{listen ? <>Find your<br/><span className="text-accent">quiet place.</span></> : watch ? <>Ideas you can see.<br/><span className="text-accent">Perspectives to explore.</span></> : <>Ideas you can see.<br/>Atmospheres you can feel.</>}</h1>
            <p className={lead}>{listen ? "Original instrumental music, rain soundscapes, imagined places, and a little room to exhale. Choose an atmosphere for reading, rest, or a quiet moment." : watch ? "Visual stories about technology, trust, and the human side of leadership. Take a moment to see things differently." : "From thought-provoking perspectives to immersive rain soundscapes, explore how we bring stories, sound, and imagined worlds to life."}</p>
            <div className="mt-7 flex flex-wrap gap-2"><a href={rest.length ? '#latest-videos' : '#creative-range'} className={`gap-2 ${buttonPrimary}`}>{rest.length ? 'Explore the collection' : 'Keep exploring'} <ArrowDown size={17} aria-hidden="true"/></a><a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className={buttonSecondary} aria-label="Our YouTube channel (opens in a new tab)">Our YouTube channel <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            <p className="mt-6 text-sm leading-6 text-body">{collection.length} public {collection.length===1?'video':'videos'} · {listen?'Original soundscapes':watch?'Leadership & ideas':'Soundscapes & leadership'}</p>
          </div>
          {featured ? <article data-catalog-card id={watch?'leadership-videos':'ambience-videos'} className={`min-w-0 scroll-mt-28 p-4 sm:p-5 ${card}`}>
            <p className={`mb-4 ${eyebrow}`}>{watch?'Featured perspective':'Featured soundscape · A little space to exhale'}</p>
            <VideoPlayer id={featured.id} title={featured.title} duration={featured.duration} />
            <h2 className="mt-5 text-2xl font-semibold leading-snug text-ink">{watch?'The human side of AI.':'Step into the rain.'}</h2>
            <p className="mt-2 text-sm font-semibold text-ink">{featured.title}</p><p className="mt-3 leading-7 text-body">{featured.description}</p><MediaLink video={featured} listen={listen}/>
          </article> : <p className="rounded-2xl border border-line bg-surface p-8 text-body">No videos are currently published in this collection. You can explore the other Studio collections above.</p>}
        </div>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="mb-10 max-w-3xl text-sm leading-6 text-body">Choose a preview, then press play. The YouTube player connects only when you load a video. Every item also has a direct YouTube link.</p>
      {rest.length>0&&<section aria-labelledby="latest-videos"><p className={eyebrow}>More from the studio</p><h2 id="latest-videos" className={`mt-3 scroll-mt-28 ${h2}`}>{listen?'Stay a little longer.':'Choose your next escape. Or your next idea.'}</h2><p className={`max-w-3xl ${lead}`}>{listen?'A mossy garden in the rain. A warm seat at the Cocoa Lounge. Find an atmosphere that fits your moment.':'Discover another world, a quiet soundscape, or a new perspective.'}</p><div className={`mt-8 grid items-start gap-6 md:grid-cols-2 ${rest.length>2?'lg:grid-cols-3':''}`}>{rest.map(video=><MediaCard key={video.id} video={video} listen={listen}/>)}</div></section>}
      {!watch&&<p className="mt-7 max-w-3xl text-sm leading-6 text-body">Our rain soundscapes pair original sound design with imagined visual settings—not field recordings of real locations. The collection includes both music and rain-only releases; each listing describes its soundtrack.</p>}
      <section id="creative-range" aria-labelledby="creative-range-title" className="mt-14 scroll-mt-28 border-t border-line pt-10">
        <p className={eyebrow}>Keep your curiosity moving</p><h2 id="creative-range-title" className={`mt-3 ${h2}`}>One studio. Different ways to explore.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{[
          {Icon:AudioLines,title:"A listening space",text:"Music & Ambience: original rain soundscapes and imagined places.",href:"/studio/listen",label:"Discover Listen"},
          {Icon:Lightbulb,title:"Ideas to return to",text:"Our leadership book, blog articles, and practical insights.",href:"/studio/read",label:"Discover Read"},
          {Icon:Clapperboard,title:listen?"A fresh perspective":"A playful detour",text:listen?"Visual stories on technology, trust, and leadership.":"Follow a breadcrumb, pick up your colors, or try a shared challenge.",href:listen?"/studio/watch":"/studio/play",label:listen?"Discover Watch":"Discover Play"},
        ].filter(i=>i.href!==path).map(({Icon,title,text,href,label})=><article key={href} className={`p-6 ${cardFlat}`}><span data-story-icon><Icon size={25} aria-hidden="true"/></span><h3 className="text-xl font-medium text-ink">{title}</h3><p className="mt-3 leading-7 text-body">{text}</p><Link href={href} className={`mt-4 min-h-11 ${linkInline}`}>{label} →</Link></article>)}</div>
      </section>
      <aside className="mt-12 border-t border-line pt-8"><p className="max-w-xl leading-7 text-body">Have a story to tell or a listening experience to bring to life?</p><Link href="/contact" className={`mt-4 ${buttonPrimary}`}>Let’s explore your idea →</Link></aside>
    </div>
  </ServiceEffects></main>;
}
