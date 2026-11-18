import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ServiceEffects from "@/components/ServiceEffects";
import StudioTrail from "./StudioTrail";
import PageIdentity from "@/components/PageIdentity";
import VideoPlayer from "@/components/VideoPlayer";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, buttonSecondary, card, eyebrow, h1, h2, lead, linkInline, pageMain } from "@/components/ui";
import { videos, youtubeChannel } from "@/content/videos";

type Mode = "watch" | "listen" | "all";
type Video = typeof videos[number];
function MediaLink({ video, listen = false }: { video: Video; listen?: boolean }) {
  return <a className={`mt-4 min-h-11 gap-2 ${linkInline}`} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" aria-label={`${listen ? "Listen" : "Watch"} on YouTube: ${video.title} (opens in a new tab)`}>{listen ? "Listen" : "Watch"} on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>;
}
function MediaCard({ video, listen }: { video: Video; listen: boolean }) {
  return <article data-catalog-card id={`video-${video.id}`} className={`min-w-0 scroll-mt-28 p-4 sm:p-5 ${card}`}>
    <span id={video.category === "leadership" ? "leadership-videos" : undefined} className="scroll-mt-28" />
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
            <h1 id="videos-title" className={h1}>{listen ? <>Find your<br/><span className="text-accent">quiet place.</span></> : watch ? <>AI at work.<br/><span className="text-accent">People at the center.</span></> : <>Ideas you can see.<br/>Atmospheres you can feel.</>}</h1>
            <p className={lead}>{listen ? "Original instrumental music, rain soundscapes, imagined places, and a little room to exhale. Choose an atmosphere for reading, rest, or a quiet moment." : watch ? "Trying to understand why AI adoption stalls? Start with a four-minute perspective on trust, leadership and the people expected to use the technology." : "From thought-provoking perspectives to immersive rain soundscapes, explore how we bring stories, sound, and imagined worlds to life."}</p>
            <div className="mt-7 flex flex-wrap gap-2"><a href={watch && featured ? `#video-${featured.id}` : listen ? '#listening-moment' : rest.length ? '#latest-videos' : '#creative-range'} className={`gap-2 ${buttonPrimary}`}>{watch && featured ? 'Watch the four-minute perspective' : listen ? 'Choose your listening moment' : rest.length ? 'Explore the collection' : 'Keep exploring'} <ArrowDown size={17} aria-hidden="true"/></a><a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className={buttonSecondary} aria-label="Our YouTube channel (opens in a new tab)">Our YouTube channel <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            <p className="mt-6 text-sm leading-6 text-body">{collection.length} public {collection.length===1?'video':'videos'} · {listen?'Original soundscapes':watch?'Leadership & ideas':'Soundscapes & leadership'}</p>
          </div>
          {featured ? <article data-catalog-card id={`video-${featured.id}`} className={`min-w-0 scroll-mt-28 p-4 sm:p-5 ${card}`}>
            <span id={watch?"leadership-videos":"ambience-videos"} className="scroll-mt-28" />
            <p className={`mb-4 ${eyebrow}`}>{watch?'Featured perspective':'Featured soundscape · A little space to exhale'}</p>
            <VideoPlayer id={featured.id} title={featured.title} duration={featured.duration} />
            <h2 className="mt-5 text-2xl font-semibold leading-snug text-ink">{watch?'The human side of AI.':'Step into the rain.'}</h2>
            <p className="mt-2 text-sm font-semibold text-ink">{featured.title}</p><p className="mt-3 leading-7 text-body">{featured.description}</p><MediaLink video={featured} listen={listen}/>
          </article> : <p className="rounded-2xl border border-line bg-surface p-8 text-body">No videos are currently published in this collection. You can explore the other Studio collections above.</p>}
        </div>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {listen&&<section aria-labelledby="listening-moment" className="mb-12">
        <p className={eyebrow}>Start with your moment</p><h2 id="listening-moment" className={`mt-3 ${h2}`}>What would you like to settle into?</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">{[
          {id:"_3T_1ZhlzQM",title:"Reading & study",text:"Three hours of muted attic-window rain, without music."},
          {id:"dSAB-uzO0ec",title:"Wind down with music",text:"Two hours of warm instrumental keys and quiet rain at Cocoa Lounge."},
          {id:"V6HQWSdNAfc",title:"A quiet rain backdrop",text:"Two hours of library rain and sparse distant birds. No music, thunder or voices."},
        ].filter(moment=>collection.some(video=>video.id===moment.id)).map(moment=><a key={moment.id} href={`#video-${moment.id}`} className={`${card} block p-6`}><h3 className="text-lg font-semibold text-ink">{moment.title}</h3><p className="mt-3 leading-7 text-body">{moment.text}</p><span className="mt-4 inline-flex min-h-11 items-center text-accent">Go to this soundscape ↓</span></a>)}</div>
        <p className="mt-5 text-sm leading-6 text-body">Prefer a different atmosphere? Browse the full collection below. Each listing describes its soundtrack and duration.</p>
      </section>}
      <p className="mb-10 max-w-3xl text-sm leading-6 text-body">Choose a preview, then press play. The YouTube player connects only when you load a video. Every item also has a direct YouTube link.</p>
      {rest.length>0&&<section aria-labelledby="latest-videos"><p className={eyebrow}>More from the studio</p><h2 id="latest-videos" className={`mt-3 scroll-mt-28 ${h2}`}>{listen?'Stay a little longer.':'Choose your next escape. Or your next idea.'}</h2><p className={`max-w-3xl ${lead}`}>{listen?'A mossy garden in the rain. A warm seat at the Cocoa Lounge. Find an atmosphere that fits your moment.':'Discover another world, a quiet soundscape, or a new perspective.'}</p><div className={`mt-8 grid items-start gap-6 md:grid-cols-2 ${rest.length>2?'lg:grid-cols-3':''}`}>{rest.map(video=><MediaCard key={video.id} video={video} listen={listen}/>)}</div></section>}
      {!watch&&<p className="mt-7 max-w-3xl text-sm leading-6 text-body">Our rain soundscapes pair original sound design with imagined visual settings—not field recordings of real locations. The collection includes both music and rain-only releases; each listing describes its soundtrack.</p>}
      <section id="creative-range" aria-labelledby="creative-range-title" className="mt-14 scroll-mt-28 border-t border-line pt-10">
        <p className={eyebrow}>Keep your curiosity moving</p><h2 id="creative-range-title" className={`mt-3 ${h2}`}>One studio. Different ways to explore.</h2>
        <div className="mt-8"><StudioTrail active={studio?mode:"videos"}/></div>
      </section>
      <aside className="mt-12 border-t border-line pt-8"><p className="max-w-xl leading-7 text-body">Have a story to tell or a listening experience to bring to life?</p><Link href="/contact" className={`mt-4 ${buttonPrimary}`}>Let’s explore your idea →</Link></aside>
    </div>
  </ServiceEffects></main>;
}
