import Link from "next/link";
import { ArrowRight, Compass, Wrench, Plus } from "lucide-react";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import { BOOKING_URL } from "@/lib/booking";
import { audienceImagery } from "@/lib/audiences/imagery";
import type { Industry } from "@/lib/audiences/model";
import { buttonPrimary, eyebrow, h1, h2 } from "@/components/ui";

const summaryStyle = "flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-3 font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden";

export default function AudiencePage({ audience }: { audience: Industry }) {
  const p = audience.page!;
  const image = audienceImagery[audience.id];
  return <CatalogEffects headings><main id="main-content" className="flex-1 bg-canvas">
    <section className="border-b border-line bg-canvas-deep">
      <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12">
        <div>
          <Link href="/who-we-serve" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Who We Serve</Link>
          <p className={`${eyebrow} mt-5`}>{audience.title}</p>
          <h1 className={`${h1} mt-4 max-w-3xl !text-4xl !leading-tight sm:!text-5xl`}>{p.headline}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-body">{p.intro}</p>
          <a href={BOOKING_URL} className={`${buttonPrimary} mt-7`}>{p.ctaLabel}<ArrowRight aria-hidden="true" size={18} className="ml-2 shrink-0" /></a>
        </div>
        {image && <figure className="min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-audience-hero src={`${image.src}-1280.webp`} srcSet={`${image.src}-640.webp 640w, ${image.src}-1280.webp 1280w`} sizes="(min-width: 1024px) 46vw, 100vw" alt={image.alt} width={1536} height={1024} fetchPriority="high" className="aspect-[3/2] w-full rounded-3xl object-cover" />
        </figure>}
      </div>
    </section>

    <section aria-labelledby="challenges-heading" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className={eyebrow}>Does this sound familiar?</p>
      <h2 id="challenges-heading" className={`${h2} mt-3`}>What is getting in your way?</h2>
      <div className="mt-6 grid items-start gap-4 md:grid-cols-3">
        {p.challenges.map((item,n)=><details key={n} data-challenge className="group rounded-2xl border border-line bg-white px-5 py-2">
          <summary className={summaryStyle}><span className="flex items-start gap-3"><span aria-hidden="true" className="text-sm text-accent">0{n+1}</span><span>{item.title}</span></span><Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45 motion-reduce:transition-none" /></summary>
          <p className="pb-4 leading-7 text-body">{item.text}</p>
        </details>)}
      </div>
    </section>

    <section id="how-we-help" aria-labelledby="help-heading" className="scroll-mt-24 border-y border-line bg-canvas-deep">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className={eyebrow}>From friction to possibility</p>
        <h2 id="help-heading" className={`${h2} mt-3 max-w-3xl`}>Put technology to work for you.</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-body">{audience.outcomes}</p>
        <div className="mt-7 grid items-start gap-4 sm:grid-cols-2">
          {p.services.map((item,n)=><article key={n} data-service className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <span className="text-sm font-semibold text-accent" aria-hidden="true">0{n+1}</span>
            <h3 className="mt-3 text-xl font-medium text-ink">{item.title}</h3>
            <details className="group mt-2">
              <summary className={`${summaryStyle} text-sm !text-accent`}>How we can help<span className="sr-only">: {item.title}</span><Plus size={17} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none" /></summary>
              <p className="pb-4 leading-7 text-body">{item.text}</p>
            </details>
            <Link href={item.href} className="inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4">Explore the service<span className="sr-only">: {item.title}</span><ArrowRight aria-hidden="true" size={17}/></Link>
          </article>)}
        </div>
      </div>
    </section>

    <section aria-labelledby="scope-heading" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className={eyebrow}>Two ways to work together</p>
      <h2 id="scope-heading" className={`${h2} mt-3`}>Advice or implementation. You choose.</h2>
      <p className="mt-4 max-w-2xl leading-7 text-body">Get help deciding what comes next, or bring us in to build it. Advisory and implementation are scoped separately.</p>
      <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
        {[{title:p.advisoryTitle,text:p.advisoryText,Icon:Compass},{title:p.implementationTitle,text:p.implementationText,Icon:Wrench}].map(({title,text,Icon},n)=><details key={n} data-scope className="group rounded-2xl border border-line px-5 py-3 sm:px-6">
          <summary className={summaryStyle}><span className="flex items-center gap-3"><Icon aria-hidden="true" size={25} className="shrink-0 text-accent"/>{title}</span><Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45 motion-reduce:transition-none"/></summary>
          <p className="pb-4 leading-7 text-body">{text}</p>
        </details>)}
      </div>
    </section>

    {p.examples.length>0 && <section aria-labelledby="examples-heading" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
      <h2 id="examples-heading" className={`${h2}`}>See what this can look like.</h2>
      <div className="mt-6 grid gap-4">{p.examples.map((item,n)=><article key={n} className="rounded-2xl border border-line bg-canvas-deep p-6 sm:p-8">
        <p className="text-sm font-semibold text-accent">{item.kind}</p><h3 className="mt-3 text-2xl font-medium text-ink">{item.title}</h3><p className="mt-3 max-w-3xl leading-7 text-body">{item.text}</p>
        <a href={item.href} className="mt-3 inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4">Explore {item.title}<ArrowRight aria-hidden="true" size={17}/></a>
      </article>)}</div>
    </section>}
    <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="rounded-3xl border border-line bg-accent-soft p-6 sm:p-10">
        <h2 className={`${h2} max-w-3xl`}>{p.ctaTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-body">{p.ctaText}</p>
        <a href={BOOKING_URL} className={`${buttonPrimary} mt-6`}>{p.ctaLabel}<ArrowRight aria-hidden="true" size={18} className="ml-2 shrink-0"/></a>
      </div>
    </section>
  </main></CatalogEffects>;
}
