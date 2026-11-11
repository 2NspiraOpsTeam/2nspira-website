import Link from "next/link";
import { cardFlat, h2, h3, linkInline, section } from "./ui";

export default function TransformationSupport() {
  return <section className={section} aria-labelledby="transformation-support-heading">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Strategy → Implementation → Ongoing support</p>
      <h2 id="transformation-support-heading" className={`mt-4 ${h2}`}>Transform. Implement. Keep improving.</h2>
      <p className="mt-4 max-w-3xl leading-7 text-body">Three service pillars. One connected path from business priorities to working technology and clearly defined ongoing support.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className={`p-7 ${cardFlat}`}>
          <p className="text-sm font-semibold text-accent">Selective premium engagement</p>
          <h3 className={`mt-3 ${h3}`}>Executive Technology Advisory</h3>
          <p className="mt-4 leading-7 text-body">Senior technology judgment spanning AI enablement, business automation and digital platforms. Align strategy, governance, investment and delivery around the decisions that matter.</p>
          <Link href="/fractional-cio" className={`mt-5 min-h-11 ${linkInline}`}>Explore executive advisory →</Link>
        </article>
        <article id="ongoing-support" className={`scroll-mt-28 p-7 ${cardFlat}`}>
          <p className="text-sm font-semibold text-accent">After implementation</p>
          <h3 className={`mt-3 ${h3}`}>Ongoing Managed Services &amp; Support</h3>
          <p className="mt-4 leading-7 text-body">Hosting, maintenance, monitoring, enhancements and advisory retainers keep your technology supported as your organization evolves.</p>
          <p className="mt-3 text-sm leading-7 text-body">We agree coverage, responsibilities, response expectations and fees before support begins. No implied unlimited support or round-the-clock coverage.</p>
          <Link href="/managed-services-support" className={`mt-5 min-h-11 ${linkInline}`}>Explore managed support →</Link>
        </article>
      </div>
      <p className="mt-7 text-sm leading-7 text-body"><Link href="/studio" className={linkInline}>Creative Studio</Link> is our separate publishing and intellectual-property initiative—not a fourth transformation service.</p>
    </div>
  </section>;
}
