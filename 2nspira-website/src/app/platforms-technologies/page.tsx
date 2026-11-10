import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { publishedContent } from "@/lib/platforms/server";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { BOOKING_URL } from "@/lib/booking";
import { buttonPrimary, eyebrow, h1, h2, linkInline } from "@/components/ui";
export const dynamic = "force-dynamic";
export const metadata = publicPageMetadata({title:"Platforms & Technologies",description:"Your goals. The right technology. Explore platforms and technologies 2Nspira works with, selected around your needs, existing systems and budget.",path:"/platforms-technologies"});
export default async function Page() {
  const c = await publishedContent();
  return <main id="main-content" className="flex-1 bg-canvas">
    <section className="border-b border-line bg-canvas-deep">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Link href="/automation-systems-optimization" className={linkInline}>← Automation &amp; Systems Optimization</Link>
        <p className={`${eyebrow} mt-9`}>Platforms &amp; Technologies</p>
        <h1 className={`${h1} mt-4 max-w-4xl`}>{c.heading}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-body">{c.intro}</p>
      </div>
    </section>
    {c.platforms.length > 0 && <section aria-label="Platforms and technologies we work with" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="mb-10 text-center text-sm leading-6 text-body">Platforms and technologies our team has worked with.</p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-5">
        {c.platforms.map(p=><li key={p.id} className="flex min-w-0 flex-col items-center justify-center gap-5 px-2 py-4">
          <div className="flex h-20 w-full items-center justify-center"><Image src={p.logo} alt="" width={156} height={80} unoptimized className="h-16 w-full max-w-[156px] object-contain" /></div>
          <span className="text-center text-sm font-medium text-ink">{p.name}</span>
        </li>)}
      </ul>
      <p className="mt-14 text-center text-sm leading-6 text-muted">Platform names and logos belong to their respective owners. Their inclusion does not imply a partnership, endorsement or certification.</p>
    </section>}
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
      <div className="rounded-3xl border border-line bg-accent-soft p-8 sm:p-12">
        <h2 className={`${h2} max-w-3xl`}>Let’s discuss your needs.</h2>
        <a href={BOOKING_URL} className={`${buttonPrimary} mt-7`}>Let’s discuss your needs <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></a>
      </div>
    </section>
  </main>;
}
