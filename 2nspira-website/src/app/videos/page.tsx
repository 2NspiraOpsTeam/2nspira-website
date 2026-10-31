import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageIdentity from "@/components/PageIdentity";
import VideoPlayer from "@/components/VideoPlayer";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, eyebrow, h1, h2, lead, linkInline, pageMain } from "@/components/ui";
import { videos, youtubeChannel } from "@/content/videos";
import { publicPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = publicPageMetadata({
  title: "Videos: Leadership, AI & Quiet Moments",
  description: "Watch 2Nspira videos on AI, trust, and leadership, or take a quiet pause with rain and café ambience from our YouTube channel.",
  path: "/videos",
});

function VideoCard({ video }: { video: typeof videos[number] }) {
  return <article className="min-w-0">
    <VideoPlayer id={video.id} title={video.title} duration={video.duration} />
    <h3 className="mt-5 text-xl font-semibold leading-snug text-ink">{video.title}</h3>
    <p className="mt-3 leading-7 text-body">{video.description}</p>
    <a className={`mt-4 min-h-11 gap-2 ${linkInline}`} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
      aria-label={`Watch on YouTube: ${video.title} (opens in a new tab)`}>Watch on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>
  </article>;
}

export default function VideosPage() {
  return <main id="main-content" className={pageMain}>
    <PageIdentity type="CollectionPage" name="2Nspira Videos" path="/videos" />
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <AmbientField />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <p><EyebrowPill>Ideas · Watch &amp; listen</EyebrowPill></p>
        <h1 className={h1}>A fresh perspective.<br />A quieter moment.</h1>
        <p className={`max-w-2xl ${lead}`}>Explore the human side of technology and leadership, then make room to pause. Videos from the 2Nspira YouTube channel, all in one place.</p>
        <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className={`mt-7 gap-2 ${buttonPrimary}`} aria-label="Visit 2Nspira on YouTube (opens in a new tab)">Explore our YouTube channel <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="mb-10 max-w-2xl text-sm leading-6 text-body">Choose a preview to load the YouTube player, then press play. YouTube connects only when you load a video. You can also watch directly on YouTube.</p>
      <section aria-labelledby="leadership-videos">
        <p className={eyebrow}>Technology &amp; people</p>
        <h2 id="leadership-videos" className={`mt-3 ${h2}`}>Leadership in focus</h2>
        <div className="mt-8 max-w-3xl">{videos.filter(video => video.category === "leadership").map(video => <VideoCard key={video.id} video={video} />)}</div>
      </section>
      <section aria-labelledby="ambience-videos" className="mt-16 border-t border-line pt-14">
        <p className={eyebrow}>Space to unwind</p>
        <h2 id="ambience-videos" className={`mt-3 ${h2}`}>Quiet moments</h2>
        <p className={`max-w-2xl ${lead}`}>Rain and café ambience to accompany reading, rest, or a slower moment in your day.</p>
        <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{videos.filter(video => video.category === "ambience").map(video => <VideoCard key={video.id} video={video} />)}</div>
      </section>
      <aside className="mt-16 rounded-2xl border border-line bg-surface p-7 sm:p-10">
        <h2 className="text-2xl font-semibold text-ink">More from 2Nspira</h2>
        <p className="mt-3 max-w-2xl leading-7 text-body">Visit our channel for new releases, and subscribe on YouTube if you’d like to follow along.</p>
        <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className={`mt-4 min-h-11 gap-2 ${linkInline}`} aria-label="Follow 2Nspira on YouTube (opens in a new tab)">Follow 2Nspira on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>
      </aside>
    </div>
  </main>;
}
