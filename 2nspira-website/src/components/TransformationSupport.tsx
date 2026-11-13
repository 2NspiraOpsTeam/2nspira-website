import Link from "next/link";
import { moreServiceLinks } from "@/lib/navigation";
import { h2, linkInline, section } from "./ui";

/** Supporting engagements, deliberately subordinate to the three core offerings. */
export default function TransformationSupport() {
  return <section id="transformation-support" className={section} aria-labelledby="transformation-support-heading">
    <div className="mx-auto max-w-6xl border-t border-line px-4 pt-8 sm:px-6">
      <h2 id="transformation-support-heading" className={h2}>More Services</h2>
      <p className="mt-4 max-w-3xl leading-7 text-body">Technology leadership and clearly scoped maintenance support are available as your organization’s needs evolve—not additional first-contact service pillars.</p>
      <ul className="mt-5 flex flex-wrap gap-4 sm:gap-8">{moreServiceLinks.map(link => <li key={link.href}><Link href={link.href} className={`min-h-11 ${linkInline}`}>{link.name} →</Link></li>)}</ul>
      <p id="ongoing-support" className="mt-4 text-sm leading-7 text-body">We agree coverage, responsibilities, response expectations and fees before support begins.</p>
    </div>
  </section>;
}
