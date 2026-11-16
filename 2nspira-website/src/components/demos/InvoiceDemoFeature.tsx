import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonPrimary, eyebrow, h2 } from "@/components/ui";

export default function InvoiceDemoFeature({ editorial = false }: { editorial?: boolean }) {
  return (
    <section id="invoice-workflow-demo" aria-labelledby="invoice-demo-heading" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
      <div className={`overflow-hidden rounded-3xl border border-line bg-white ${editorial ? "lg:grid lg:grid-cols-2 lg:items-stretch" : ""}`}>
        <figure className="relative bg-[#050c19]">
          <Image
            src="/images/demos/ai-invoice-workflow-20261116.webp"
            alt="Conceptual illustration of invoices flowing through a connected workflow to a human-review checkpoint"
            width={1536}
            height={864}
            sizes="(max-width: 1152px) 100vw, 1100px"
            unoptimized
            className={editorial ? "h-full min-h-64 w-full object-cover" : "aspect-video w-full object-cover"}
          />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#050c19]/90 px-3 py-1 text-xs font-medium text-white">AI-assisted. Human-approved. · Concept illustration</figcaption>
        </figure>
        <div className="p-7 sm:p-10">
        <p className={eyebrow}>Accounts receivable automation · B2B service firms</p>
        <h2 id="invoice-demo-heading" className={`mt-4 max-w-3xl ${h2}`}>Less manual work around overdue invoices.</h2>
        {editorial ? <><p className="mt-4 max-w-3xl leading-7 text-body">A stalled invoice. A missing approval. An unclear next step. See how AI can connect the handoff—while your team stays in control.</p><p className="mt-4 max-w-3xl leading-7 text-body">Try a fictional billing dispute. Review the proposed case, task and reply. Approve each action yourself.</p></> : <>
        <p className="mt-4 max-w-3xl leading-7 text-body">We help B2B service firms reduce the manual work around overdue invoices. Our invoice follow-up automation service identifies why invoices stall, connects existing tools, and keeps follow-up human-approved.</p>
        <p className="mt-4 max-w-3xl leading-7 text-body">Chasing invoices by email? Waiting on missing documents or approvals? Unclear who owns the next follow-up?</p>
        <p className="mt-4 max-w-3xl leading-7 text-body">Start with a fictional billing dispute in our interactive demo. Real AI proposes a case, an internal task and a reply; you review and approve each step.</p>
        </>}
        <p className="mt-5 text-sm leading-6 text-body">Demo only: fictional data, sandbox records and simulated email. No real invoices are changed or emails sent.</p>
        <p className="mt-5"><Link href="/accounts-receivable-workflow-automation" className="inline-flex min-h-11 items-center font-medium text-accent underline underline-offset-4">Explore accounts receivable workflow automation →</Link></p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link href="/demos/ai-operations" className={buttonPrimary}>Try the invoice-dispute demo <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
          <Link href="/contact?service=automation#contact-message" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Discuss your invoice workflow</Link>
        </div>
        </div>
      </div>
    </section>
  );
}
