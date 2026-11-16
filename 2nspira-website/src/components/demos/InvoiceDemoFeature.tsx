import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { eyebrow, h2 } from "@/components/ui";

export default function InvoiceDemoFeature({ editorial = false, productScreen = false }: { editorial?: boolean; productScreen?: boolean }) {
  return <section id="invoice-workflow-demo" aria-labelledby="invoice-demo-heading" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
    <div className={`overflow-hidden rounded-3xl border border-[#dfd1dd] bg-[#fcf8fb] ${editorial ? "lg:grid lg:grid-cols-2 lg:items-stretch" : ""}`}>
      <Link href="/demos/ai-invoice-workflow" className={`block min-w-0 ${productScreen ? "bg-white p-3 self-center" : "bg-[#291522]"} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75466c]`} aria-label="Discover the AI Invoice Workflow demo">
        <Image src={productScreen ? "/images/demos/ai-operations-screen-20261116.webp" : "/images/demos/ai-operations-copper-20261116.webp"} alt={productScreen ? "Actual AI Operations demo workspace with billing samples, reviewed proposals and sandbox records." : "Illustration of scattered invoices becoming organized cases, tasks and replies through a human approval gateway."} width={productScreen ? 1250 : 1672} height={productScreen ? 950 : 941} sizes="(max-width:1024px) 100vw, 560px" unoptimized className={productScreen ? "h-auto w-full object-contain" : editorial ? "h-full min-h-64 w-full object-cover" : "aspect-video w-full object-cover"} />
      </Link>
      <div className="p-7 sm:p-10"><p className={eyebrow}>AI Invoice Workflow · Interactive demo</p><h2 id="invoice-demo-heading" className={`mt-4 max-w-3xl ${h2}`}>Still chasing answers about invoices?</h2><p className="mt-4 max-w-3xl leading-7 text-body">Turn a billing question into a case, a task and a reply. AI prepares the work. Your team decides what moves forward.</p><p className="mt-5 text-sm font-semibold tracking-wide text-[#75466c]">Billing question → AI proposal → Human approval</p><div className="mt-7 flex flex-wrap items-center gap-5"><Link href="/demos/ai-operations#operations-workspace" className="inline-flex min-h-12 items-center rounded-full bg-[#603452] px-6 py-3 text-sm font-medium text-white hover:bg-[#48253e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75466c]">Try the demo <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link><Link href="/demos/ai-invoice-workflow" className="inline-flex min-h-11 items-center text-sm font-medium text-[#643d60] underline underline-offset-4">Discover the capabilities →</Link></div><p className="mt-5 text-xs leading-6 text-muted">Fictional data · Saved sandbox records · Simulated email</p></div>
    </div>
  </section>;
}
