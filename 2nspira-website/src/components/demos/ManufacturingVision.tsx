import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck } from "lucide-react";
import { demos } from "@/lib/demos";
import { BOOKING_URL } from "@/lib/booking";
import { buttonPrimary, buttonSecondary, eyebrow, h1, h2, pageMain } from "@/components/ui";

const scenes = [
  { slug: "production", label: "01 · Plan the floor", title: "Every work order. A clear next move.", text: "Follow queued work through machining and assembly. See what’s moving—and what’s waiting.", action: "Explore production", tint: "bg-[#e0f1e8]", alt: "Northstar production workspace showing work orders, production cells, and controlled stage actions." },
  { slug: "inventory", label: "02 · Keep materials moving", title: "Spot the shortage. Connect the handoff.", text: "See stock and material alerts, then follow a sample purchase through approval and receiving.", action: "Explore inventory", tint: "bg-[#fff0d9]", alt: "Northstar inventory workspace with material stock levels and shortage indicators." },
  { slug: "quality", label: "03 · Protect the shipment", title: "Quality is a gate, not an afterthought.", text: "Try a failed inspection, record corrective work, and pass reinspection before dispatch.", action: "Explore quality", tint: "bg-[#e9e5f5]", alt: "Northstar quality control workspace showing inspections and shipment holds." },
];

export default function ManufacturingVision() {
  const demo = demos.manufacturing;
  return <main className={pageMain}>
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-20">
      <Link href="/demos" className="inline-flex min-h-11 items-center text-sm font-medium text-accent">← All demos</Link>
      <div className="mt-8 max-w-3xl">
        <p className={eyebrow}>Manufacturing · Interactive demonstration</p>
        <h1 className={h1}>{demo.headline}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-body">One factory. One connected picture. Explore materials, production, and quality in a working operations demo.</p>
        <div className="mt-7 flex flex-wrap gap-3"><a href={demo.url} className={buttonPrimary}>Explore Demo <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" /></a><a href="#walkthrough" className={buttonSecondary}>Take the quick tour</a></div>
        <p className="mt-5 flex items-center gap-2 text-sm text-muted"><ShieldCheck aria-hidden="true" size={17} /> Fictional factory · No account needed · Nothing ships</p>
      </div>
      <figure className="mt-10">
        <a href={demo.url} className="block overflow-hidden rounded-2xl border border-line bg-[#dceee3] p-2 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-4" aria-label="Explore the manufacturing command center">
          <Image src="/images/demos/manufacturing-workspace.webp" alt="Northstar command center with production cells, material alerts, quality holds, and performance charts." width={1440} height={1000} sizes="(max-width:1152px) 100vw, 1120px" unoptimized className="h-auto w-full rounded-xl" />
          <span className="flex min-h-11 items-center justify-between gap-3 px-2 pt-3 text-sm font-semibold text-ink">See the whole operation. Know where to act.<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" /></span>
        </a>
        <figcaption className="mt-3 text-sm text-muted">Actual demo screens · Northstar is a fictional manufacturer, not a client deployment.</figcaption>
      </figure>
    </section>
    <section id="walkthrough" className="scroll-mt-24 border-y border-line bg-canvas-deep py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Less chasing. More visibility.</p><h2 className={`mt-4 max-w-2xl ${h2}`}>Three connected views. One factory story.</h2>
        <div className="mt-10 space-y-12 sm:space-y-20">{scenes.map((scene, i) => <article key={scene.slug} className="grid items-center gap-7 lg:grid-cols-[1fr_1.65fr] lg:gap-12">
          <div className={i === 1 ? "lg:order-2" : ""}><p className={eyebrow}>{scene.label}</p><h3 className="mt-3 text-2xl font-medium leading-tight text-ink sm:text-3xl">{scene.title}</h3><p className="mt-4 max-w-lg leading-7 text-body">{scene.text}</p><a href={`${demo.url}${scene.slug}/`} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline underline-offset-4">{scene.action}<ArrowUpRight aria-hidden="true" size={18} /></a></div>
          <a href={`${demo.url}${scene.slug}/`} aria-label={scene.action + " in the interactive demo"} className={`block overflow-hidden rounded-2xl border border-line p-2 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-3 ${scene.tint} ${i === 1 ? "lg:order-1" : ""}`}><Image src={`/images/demos/manufacturing-${scene.slug}.webp`} alt={scene.alt} width={1440} height={1000} sizes="(max-width:1024px) 100vw, 680px" unoptimized className="h-auto w-full rounded-lg" /></a>
        </article>)}</div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="rounded-2xl bg-[#153f35] p-7 text-white sm:p-10"><p className="text-xs font-semibold uppercase tracking-widest text-[#c5ead6]">Your turn</p><h2 className="mt-4 text-3xl font-medium sm:text-4xl">Take an order all the way to dispatch.</h2><p className="mt-4 max-w-2xl leading-7 text-[#e0f1e8]">Open the demo and select “Take a 3-minute tour.” Create an order, resolve its shortage, clear quality, and simulate shipment.</p><a href={demo.url} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#c5ead6] px-5 py-3 font-semibold text-[#153f35]">Start exploring <ArrowRight aria-hidden="true" size={18} /></a></div>
      <details className="mt-8 rounded-xl border border-line p-5 sm:p-6"><summary className="min-h-11 cursor-pointer font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent">Demo scope & safe exploration</summary><div className="mt-4 space-y-4 text-sm leading-7 text-body"><p>{demo.audience}</p><p>{demo.limits}</p><p>All actions are simulated locally. Changes stay in this browser tab and survive refresh; confirm Reset demo to restore samples. No real purchases, messages, charges, or shipments. Don’t enter personal or client information. Charts are synthetic; the assistant uses local rules, not live AI.</p></div></details>
    </section>
    <section className="border-t border-line bg-canvas-deep py-14"><div className="mx-auto max-w-6xl px-4 sm:px-6"><h2 className={h2}>What would a connected floor look like for you?</h2><p className="mt-4 max-w-2xl leading-7 text-body">Bring one operational bottleneck. Let’s map a practical first step.</p><a href={BOOKING_URL} className={`mt-6 ${buttonPrimary}`}>Discuss your manufacturing workflow</a></div></section>
  </main>;
}
