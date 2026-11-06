import Image from "next/image";
import Link from "next/link";
import { buttonPrimary, h2, linkInline } from "@/components/ui";

export default function ManufacturingDemo() {
  return <section className="border-y border-line bg-canvas-deep py-12 sm:py-16" aria-labelledby="manufacturing-demo-heading">
    <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
      <Image src="/images/work/northstar-manufacturing-demo.webp" alt="Northstar Manufacturing demo with production, inventory, and quality dashboards" width={1600} height={1000} sizes="(min-width: 1024px) 550px, calc(100vw - 32px)" className="h-auto w-full rounded-2xl border border-line" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Live interactive demo · Built by 2Nspira</p>
        <h2 id="manufacturing-demo-heading" className={`mt-3 ${h2}`}>See connected manufacturing operations in action.</h2>
        <p className="mt-4 leading-7 text-body">Explore production, inventory, procurement, quality, and executive reporting in the Northstar Manufacturing Operations Command Center.</p>
        <p className="mt-3 text-sm leading-6 text-muted">Fictional company and synthetic data—not a client deployment. The operational assistant uses local rules, not a live AI model.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href="/demos/manufacturing" className={buttonPrimary}>Explore the manufacturing demo →</a>
          <Link href="/demos" className={`min-h-11 ${linkInline}`}>See all interactive demos</Link>
        </div>
      </div>
    </div>
  </section>;
}
