import Link from "next/link";
import { ArrowRight, Compass, Wrench, Check } from "lucide-react";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import { BOOKING_URL } from "@/lib/booking";
import type { Industry } from "@/lib/audiences/model";
import { buttonPrimary, eyebrow, h1, h2 } from "@/components/ui";
export default function AudiencePage({ audience }: { audience: Industry }) {
  const p = audience.page!;
  return <CatalogEffects headings><main id="main-content" className="flex-1 bg-canvas">
    <section className="border-b border-line bg-canvas-deep">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Link href="/who-we-serve" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Who We Serve</Link>
        <p className={`${eyebrow} mt-6`}>{audience.title}</p>
        <h1 className={`${h1} mt-5 max-w-4xl`}>{p.headline}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-body">{p.intro}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={BOOKING_URL} className={buttonPrimary}>{p.ctaLabel}<ArrowRight aria-hidden="true" size={18} className="ml-2 shrink-0" /></a>
          <a href="#how-we-help" className="inline-flex min-h-11 items-center gap-2 px-2 font-medium text-accent underline underline-offset-4">Explore how we can help<ArrowRight aria-hidden="true" size={18} /></a>
        </div>
      </div>
    </section>
    <section aria-labelledby="challenges-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p className={eyebrow}>Does this sound familiar?</p>
      <h2 id="challenges-heading" className={`${h2} mt-4 max-w-3xl`}>When everyday work gets in the way.</h2>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {p.challenges.map((item,n)=><article key={n} data-catalog-card className="rounded-3xl border border-line bg-white p-6 sm:p-7">
          <span aria-hidden="true" className="text-sm font-semibold text-accent">0{n+1}</span>
          <h3 className="mt-5 text-xl font-medium tracking-tight text-ink">{item.title}</h3><p className="mt-4 leading-7 text-body">{item.text}</p>
        </article>)}
      </div>
    </section>
    <section id="how-we-help" aria-labelledby="help-heading" className="scroll-mt-24 border-y border-line bg-canvas-deep">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className={eyebrow}>Practical support. A clearer next step.</p>
        <h2 id="help-heading" className={`${h2} mt-4 max-w-3xl`}>Connect the right help to the work that matters.</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {p.services.map((item,n)=><article key={n} data-catalog-card className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8">
            <Check aria-hidden="true" className="text-accent" size={23}/><h3 className="mt-5 text-xl font-medium text-ink">{item.title}</h3>
            <p className="my-4 flex-1 leading-7 text-body">{item.text}</p>
            <Link href={item.href} className="inline-flex min-h-11 items-center gap-2 self-start font-medium text-accent underline underline-offset-4">Explore the service<span className="sr-only">: {item.title}</span><ArrowRight aria-hidden="true" size={17}/></Link>
          </article>)}
        </div>
      </div>
    </section>
    <section aria-labelledby="scope-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p className={eyebrow}>Choose the support you need</p>
      <h2 id="scope-heading" className={`${h2} mt-4`}>Advice and implementation. Clear scopes.</h2>
      <div className="mt-9 grid gap-6 md:grid-cols-2">
        {[{title:p.advisoryTitle,text:p.advisoryText,Icon:Compass},{title:p.implementationTitle,text:p.implementationText,Icon:Wrench}].map(({title,text,Icon},n)=><article key={n} className="rounded-3xl border border-line p-6 sm:p-8"><Icon aria-hidden="true" size={27} className="text-accent"/><h3 className="mt-5 text-2xl font-medium text-ink">{title}</h3><p className="mt-4 leading-7 text-body">{text}</p></article>)}
      </div>
    </section>
    {p.examples.length>0 && <section aria-labelledby="examples-heading" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
      <p className={eyebrow}>Explore an example</p><h2 id="examples-heading" className={`${h2} mt-4`}>See the scope. Understand the possibility.</h2>
      <div className="mt-9 grid gap-5 md:grid-cols-2">{p.examples.map((item,n)=><article key={n} className="rounded-3xl border border-line bg-canvas-deep p-6 sm:p-8">
        <p className="text-sm font-semibold text-accent">{item.kind}</p><h3 className="mt-4 text-2xl font-medium text-ink">{item.title}</h3><p className="mt-4 leading-7 text-body">{item.text}</p>
        <a href={item.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4">Explore {item.title}<ArrowRight aria-hidden="true" size={17}/></a>
      </article>)}</div>
    </section>}
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="rounded-3xl border border-line bg-accent-soft p-7 sm:p-12">
        <p className={eyebrow}>Start with your organization</p><h2 className={`${h2} mt-4 max-w-3xl`}>{p.ctaTitle}</h2><p className="mt-5 max-w-2xl leading-7 text-body">{p.ctaText}</p>
        <a href={BOOKING_URL} className={`${buttonPrimary} mt-7`}>{p.ctaLabel}<ArrowRight aria-hidden="true" size={18} className="ml-2 shrink-0"/></a>
      </div>
    </section>
  </main></CatalogEffects>;
}
