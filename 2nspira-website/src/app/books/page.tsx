import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CatalogSchema from "@/components/catalog/CatalogSchema";
import { buttonPrimary, buttonSecondary, eyebrow, h2, linkInline } from "@/components/ui";

const amazon = "https://amzn.to/4sVBcuF";
const excerpts = "/blog/categories/trust-is-the-operating-system";
const description = "Trust Is the Operating System by Jeffrey Cortez explores leadership, human judgment, and the invisible infrastructure of trust in an AI-saturated world. Available in paperback and Kindle editions.";
export const metadata: Metadata = {
  title: "Trust Is the Operating System | Jeffrey Cortez",
  description,
  authors: [{ name: "Jeffrey Cortez" }],
  alternates: { canonical: "/books" },
  openGraph: { type: "book", siteName: "2Nspira", title: "Trust Is the Operating System", description, url: "https://2nspira.com/books", images: [{ url: "https://2nspira.com/images/books/trust-is-the-operating-system.jpg", width: 1600, height: 2560, alt: "Trust Is the Operating System by Jeffrey Cortez" }] },
  twitter: { card: "summary_large_image", title: "Trust Is the Operating System", description, images: ["https://2nspira.com/images/books/trust-is-the-operating-system.jpg"] },
};
const themes = [
  ["01", "When performance hides fragility", "Why systems can appear healthy while the confidence people need to act is quietly weakening."],
  ["02", "The limits of optimization", "How a relentless focus on efficiency can leave organizations less coherent, not more capable."],
  ["03", "Judgment in an automated world", "What leaders must protect as AI accelerates decisions and changes the way work gets done."],
  ["04", "Trust as infrastructure", "A different lens on trust: not a soft extra, but the foundation that makes human systems work."],
];
function BuyLink() { return <a href={amazon} rel="sponsored" className={buttonPrimary}>Buy on Amazon <span aria-hidden="true" className="ml-2">↗</span></a>; }
export default function BooksPage() {
  return <main id="main-content" className="flex-1 bg-canvas">
    <CatalogSchema page="books" />
    <header id="trust-is-the-operating-system" className="relative overflow-hidden border-b border-line bg-[#f1f2ef]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-24">
        <div>
          <p className={eyebrow}>A book by Jeffrey Cortez</p>
          <h1 className="mt-5 max-w-2xl text-[clamp(2.8rem,5.7vw,5.1rem)] font-medium leading-[1.04] tracking-[-0.045em] text-ink">Trust Is the<br className="hidden sm:block" /> Operating System</h1>
          <p className="mt-7 max-w-xl text-xl leading-8 text-ink">When everything works, what holds it all together?</p>
          <p className="mt-4 max-w-xl text-lg leading-8 text-body">A reflection on leadership, AI, and the human judgment that keeps organizations coherent when technology moves faster than we do.</p>
          <p className="mt-6 text-sm font-medium text-accent">Available in paperback &amp; Kindle</p>
          <div className="mt-5 flex flex-wrap items-center gap-2"><BuyLink /><Link href={excerpts} className={buttonSecondary}>Read selected excerpts <span aria-hidden="true">→</span></Link></div>
          <p className="mt-4 text-xs leading-5 text-body">As an Amazon Associate I earn from qualifying purchases.</p>
        </div>
        <div className="mx-auto w-full max-w-[290px] sm:max-w-[330px] lg:max-w-[350px]">
          <Image src="/images/books/trust-is-the-operating-system.jpg" alt="Cover of Trust Is the Operating System by Jeffrey Cortez" width={1600} height={2560} unoptimized preload className="h-auto w-full rounded-sm shadow-[12px_22px_45px_rgba(24,35,43,0.25)]" />
        </div>
      </div>
    </header>
    <nav aria-label="Explore the book" className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-2 px-5 py-4 sm:px-8">{[["#book-covers", "Cover gallery"], ["#about-the-book", "The book"], ["#inside-the-book", "Inside the book"], ["#the-author", "The author"], ["#leadership-reflection", "Listen & explore"]].map(([href,label]) => <a key={href} href={href} className="rounded py-2 text-sm font-medium text-body hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">{label}</a>)}</div>
    </nav>
    <section id="book-covers" aria-labelledby="covers-title" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 sm:px-8 sm:pt-24">
      <p className={eyebrow}>A closer look</p><h2 id="covers-title" className={`mt-4 ${h2}`}>Explore the covers.</h2>
      <p className="mt-5 max-w-2xl leading-8 text-body">View the front cover and read the back-cover introduction. Select either image to open the full-size artwork.</p>
      <div className="mt-10 grid items-start gap-10 sm:grid-cols-2 sm:gap-16">
        {[{src: "/images/books/trust-is-the-operating-system.jpg", label: "Front cover", width: 1600, height: 2560}, {src: "/images/books/trust-is-the-operating-system-back.png", label: "Back cover", width: 800, height: 1200}].map(({src,label,width,height}) => <figure key={src} className="mx-auto w-full max-w-[360px]"><a href={src} aria-label={`Open full-size ${label.toLowerCase()} of Trust Is the Operating System`} className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"><Image src={src} alt={`${label} of Trust Is the Operating System by Jeffrey Cortez`} width={width} height={height} unoptimized className="h-auto w-full rounded-sm shadow-lg" /></a><figcaption className="mt-5 text-center text-sm font-medium text-body">{label}<span className="mt-1 block text-xs font-normal">Select to view full size</span></figcaption></figure>)}
      </div>
    </section>
    <section id="about-the-book" aria-labelledby="premise-title" className="mx-auto grid max-w-6xl scroll-mt-24 gap-8 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
      <div><p className={eyebrow}>The premise</p><h2 id="premise-title" className={`mt-4 ${h2}`}>Most organizations aren’t failing.<br /><span className="text-accent">They’re functioning.</span></h2></div>
      <div className="space-y-5 text-lg leading-8 text-body"><p>Systems run. Dashboards glow green. AI optimizes faster than judgment can keep up. And yet, something feels increasingly fragile.</p><p><em>Trust Is the Operating System</em> examines leadership in an AI-saturated world where efficiency has quietly replaced coherence—and trust has become invisible infrastructure.</p><p>It explores why capable teams hesitate long before performance declines, why optimization can create fragility rather than scale, and what leaders must protect as automation increases.</p></div>
    </section>
    <section id="inside-the-book" aria-labelledby="inside-title" className="scroll-mt-24 border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><p className={eyebrow}>Inside the book</p><h2 id="inside-title" className={`mt-4 max-w-2xl ${h2}`}>Look beyond what the dashboard tells you.</h2><div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">{themes.map(([number,title,text]) => <article key={number} className="border-t border-line pt-6"><p className="text-sm font-medium text-accent" aria-hidden="true">{number}</p><h3 className="mt-3 text-xl font-medium tracking-tight text-ink">{title}</h3><p className="mt-3 max-w-lg leading-8 text-body">{text}</p></article>)}</div></div>
    </section>
    <section aria-labelledby="readers-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><p className={eyebrow}>Who it’s for</p><h2 id="readers-title" className={`mt-4 max-w-3xl ${h2}`}>For people responsible for more than the next result.</h2><div className="mt-9 grid gap-8 md:grid-cols-3">{[["Leaders & executives", "Considering what to preserve as their organizations pursue efficiency and change."],["Technology & AI practitioners", "Thinking about the relationship between automation, responsibility, and human judgment."],["Educators & reflective readers", "Exploring how trust, meaning, and clarity shape the way people work together."]].map(([title,text]) => <div key={title}><h3 className="text-lg font-medium text-ink">{title}</h3><p className="mt-3 leading-8 text-body">{text}</p></div>)}</div></section>
    <section id="the-author" aria-labelledby="author-title" className="scroll-mt-24 border-y border-line bg-[#f1f2ef]"><div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[0.65fr_1.35fr]"><Image src="/images/leadership/jeffrey-cortez-linkedin-20261103.jpg" alt="Jeffrey Cortez, author of Trust Is the Operating System" width={640} height={640} unoptimized className="mx-auto aspect-square w-full max-w-[280px] rounded-2xl object-cover" /><div><p className={eyebrow}>Meet the author</p><h2 id="author-title" className={`mt-4 ${h2}`}>Jeffrey Cortez</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-body">Jeffrey Cortez is a technology executive and educator whose writing explores trust, judgment, and leadership in an increasingly automated world.</p><p className="mt-4 max-w-2xl leading-8 text-body">His work at 2Nspira connects technology and organizational change with the people and decisions at their center. This book brings that human-centered perspective to the questions leaders face as AI reshapes work.</p><Link href="/team-delivery" className={`mt-6 ${linkInline}`}>More about Jeffrey &amp; 2Nspira <span aria-hidden="true" className="ml-2">→</span></Link></div></div></section>
    <section id="leadership-reflection" aria-labelledby="explore-title" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"><p className={eyebrow}>Spend time with the ideas</p><h2 id="explore-title" className={`mt-4 ${h2}`}>Read a little. Listen a little. Reflect.</h2><div className="mt-10 grid gap-8 md:grid-cols-2"><article className="rounded-2xl border border-line p-6 sm:p-8"><h3 className="text-xl font-medium text-ink">Start with selected excerpts</h3><p className="mt-4 leading-8 text-body">Explore excerpts and related reflections on trust, leadership, and the systems we depend on.</p><Link href={excerpts} className={`mt-6 ${linkInline}`}>Read the excerpts <span aria-hidden="true" className="ml-2">→</span></Link></article><article className="rounded-2xl border border-line p-6 sm:p-8"><h3 className="text-xl font-medium text-ink">When Systems Work, Trust Weakens</h3><p className="mt-4 leading-8 text-body">A 13-minute conversation on leadership, AI, and judgment. An audio reflection, not the full audiobook.</p><audio controls preload="none" aria-label="When Systems Work, Trust Weakens — audio reflection" className="mt-6 w-full"><source src="/audio/when-systems-work-trust-weakens.mp3" type="audio/mpeg" /><a href="/audio/when-systems-work-trust-weakens.mp3">Listen to the audio reflection</a></audio></article></div></section>
    <section aria-labelledby="get-book-title" className="border-t border-line bg-surface px-5 py-16 text-center sm:py-20"><p className={eyebrow}>Trust Is the Operating System</p><h2 id="get-book-title" className={`mx-auto mt-4 max-w-2xl ${h2}`}>Technology changes.<br />The need for trust doesn’t.</h2><p className="mt-5 text-body">By Jeffrey Cortez · Paperback &amp; Kindle</p><div className="mt-7"><BuyLink /></div><p className="mt-4 text-sm text-body">Check Amazon for current pricing and edition availability.</p><p className="mt-2 text-xs text-body">As an Amazon Associate I earn from qualifying purchases.</p></section>
  </main>;
}
