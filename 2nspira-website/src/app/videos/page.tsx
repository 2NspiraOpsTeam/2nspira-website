import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, AudioLines, Clapperboard, Lightbulb } from "lucide-react";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import PageIdentity from "@/components/PageIdentity";
import VideoPlayer from "@/components/VideoPlayer";
import { AmbientField, EyebrowPill } from "@/components/VisualAccents";
import { buttonPrimary, buttonSecondary, card, cardFlat, eyebrow, h1, h2, lead, linkInline, pageMain } from "@/components/ui";
import { videos, featuredVideo, latestVideos, quietClassics, youtubeChannel } from "@/content/videos";
import { publicPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = publicPageMetadata({
  title: "Videos: Original Soundscapes, AI & Creative Stories",
  description: "Explore 2Nspira’s original rain soundscapes, immersive visual worlds, and perspectives on AI and leadership. Watch our latest videos and discover our creative range.",
  path: "/videos",
});

function WatchLink({ video }: { video: typeof videos[number] }) {
  return <a className={`mt-4 min-h-11 gap-2 ${linkInline}`} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
    aria-label={`Watch on YouTube: ${video.title} (opens in a new tab)`}>Watch on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function VideoCard({ video }: { video: typeof videos[number] }) {
  return <article data-catalog-card className={`min-w-0 p-4 sm:p-5 ${card}`}>
    <VideoPlayer id={video.id} title={video.title} duration={video.duration} />
    <h3 className="mt-5 text-xl font-semibold leading-snug text-ink">{video.title}</h3>
    <p className="mt-3 leading-7 text-body">{video.description}</p>
    <WatchLink video={video} />
  </article>;
}

export default function VideosPage() {
  return <main id="main-content" className={pageMain}><CatalogEffects headings>
    <PageIdentity type="CollectionPage" name="2Nspira Videos" path="/videos" />
    <section className="relative overflow-hidden border-b border-line bg-surface" aria-labelledby="videos-title">
      <AmbientField />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div data-catalog-reveal>
            <p><EyebrowPill>Ideas · The 2Nspira video collection</EyebrowPill></p>
            <h1 id="videos-title" className={h1}>Ideas you can see.<br />Atmospheres you can feel.</h1>
            <p className={lead}>From thought-provoking perspectives to immersive rain soundscapes, explore how we bring stories, sound, and imagined worlds to life.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              <a href="#latest-videos" className={`gap-2 ${buttonPrimary}`}>Discover the latest <ArrowDown size={17} aria-hidden="true" /></a>
              <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className={buttonSecondary} aria-label="Explore 2Nspira on YouTube (opens in a new tab)">Our YouTube channel <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <p className="mt-7 text-sm leading-6 text-body">{videos.length} public videos · Original soundscapes &amp; leadership · One creative studio</p>
          </div>
          <article data-catalog-card className={`min-w-0 p-4 sm:p-5 ${card}`}>
            <p className={`mb-4 ${eyebrow}`}>Featured soundscape · A little space to exhale</p>
            <VideoPlayer id={featuredVideo.id} title={featuredVideo.title} duration={featuredVideo.duration} />
            <h2 className="mt-5 text-2xl font-semibold leading-snug text-ink">Step into the rain.</h2>
            <p className="mt-2 text-sm font-semibold text-ink">{featuredVideo.title}</p>
            <p className="mt-3 leading-7 text-body">{featuredVideo.description}</p>
            <WatchLink video={featuredVideo} />
          </article>
        </div>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <nav aria-label="Browse video collections" className="flex flex-wrap gap-2 border-b border-line pb-7">
        <a href="#latest-videos" className={buttonSecondary}>More soundscapes</a>
        <a href="#leadership-videos" className={buttonSecondary}>Ideas &amp; leadership</a>
        <a href="#ambience-videos" className={buttonSecondary}>Quiet favorites</a>
        <a href="#creative-range" className={buttonSecondary}>Behind the creativity</a>
      </nav>
      <p className="my-8 max-w-3xl text-sm leading-6 text-body">Choose a preview, then press play. YouTube connects only when you load a video. Prefer another screen? Every video also has a direct YouTube link.</p>
      <section aria-labelledby="latest-videos">
        <p className={eyebrow}>Fresh from the studio</p>
        <h2 id="latest-videos" className={`mt-3 scroll-mt-28 ${h2}`}>Find your next quiet place.</h2>
        <p className={`max-w-3xl ${lead}`}>Beyond our featured attic: a Japanese-inspired moss courtyard, washed in gentle rain. Pick an atmosphere for reading, relaxing, or a quiet moment.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">{latestVideos.map(video => <VideoCard key={video.id} video={video} />)}</div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-body">Our public rain soundscapes are original, sound-designed environments with imagined visual settings—not field recordings of real locations. These scenes stay visible throughout, without thunder or music.</p>
      </section>
      <section aria-labelledby="leadership-videos" className="mt-16 border-t border-line pt-14">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div>
            <p className={eyebrow}>Technology &amp; people</p>
            <h2 id="leadership-videos" className={`mt-3 scroll-mt-28 ${h2}`}>A fresh perspective.</h2>
            <p className={lead}>Good ideas deserve more than a headline. Explore the human side of AI adoption, trust, and leadership through a different kind of storytelling.</p>
            <Link href="/insights" className={`mt-5 min-h-11 gap-2 ${linkInline}`}>Explore more ideas <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="min-w-0">{videos.filter(video => video.category === "leadership").map(video => <VideoCard key={video.id} video={video} />)}</div>
        </div>
      </section>
      <section aria-labelledby="ambience-videos" className="mt-16 border-t border-line pt-14">
        <p className={eyebrow}>Return to a slower rhythm</p>
        <h2 id="ambience-videos" className={`mt-3 scroll-mt-28 ${h2}`}>Quiet favorites.</h2>
        <p className={`max-w-2xl ${lead}`}>A warm seat, a book, and gentle rain beyond the window. Return to the Cocoa Lounge for reading, rest, or a pause between things.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{quietClassics.map(video => <VideoCard key={video.id} video={video} />)}</div>
      </section>
      <section aria-labelledby="creative-range" className="mt-16 border-t border-line pt-14">
        <p className={eyebrow}>Made with intention</p>
        <h2 id="creative-range" className={`mt-3 scroll-mt-28 ${h2}`}>One studio. Different ways to move you.</h2>
        <p className={`max-w-3xl ${lead}`}>This collection is a window into our creative range: clear ideas, evocative visuals, and sound that gives a scene its character.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { Icon: Lightbulb, title: "Ideas into stories", text: "Turn a complex topic into an accessible perspective, with a clear message and a human point of view." },
            { Icon: Clapperboard, title: "Imagined visual worlds", text: "Build a distinct mood through scene, composition, and atmosphere—from a warm reading room to a rain-soaked garden." },
            { Icon: AudioLines, title: "Sound with a sense of place", text: "Shape original soundscapes with texture and depth, pairing each environment with its own listening experience." },
          ].map(({ Icon, title, text }) => <div key={title} data-catalog-card className={`p-6 ${cardFlat}`}>
            <Icon size={25} className="text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
            <p className="mt-3 leading-7 text-body">{text}</p>
          </div>)}
        </div>
      </section>
      <aside data-catalog-card className={`mt-12 p-7 sm:p-10 ${cardFlat}`}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-ink">What could we create for your idea?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-body">Have a story to tell or a mood to bring to life? Let’s explore it together.</p>
          </div>
          <Link href="/contact" className={`shrink-0 gap-2 ${buttonPrimary}`}>Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className={`mt-6 min-h-11 gap-2 ${linkInline}`} aria-label="Follow 2Nspira on YouTube (opens in a new tab)">Subscribe on YouTube for new releases <ArrowUpRight size={16} aria-hidden="true" /></a>
      </aside>
    </div>
  </CatalogEffects></main>;
}
