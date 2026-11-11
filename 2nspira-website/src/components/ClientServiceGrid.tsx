import Link from "next/link";
import { Sparkles, Workflow, PanelsTopLeft } from "lucide-react";
import { serviceNeeds } from "@/lib/serviceNeeds";
import { card, h3, linkInline } from "./ui";

const serviceDetails = [
  { title: "Built around the customer journey", text: "Business websites, custom web applications, secure portals, booking, ecommerce, multilingual content, and scoped integrations. AI-native development supports the build; human product judgment guides the experience." },
  { title: "Connect the work behind the scenes", text: "Map workflows, identify repetitive tasks and broken handoffs, connect business systems, and improve operational visibility. Start with a focused process before expanding." },
  { title: "Move beyond scattered AI experiments", text: "Align AI with business priorities, build literacy across roles, define governance and data safeguards, and test useful workflows with human review and measurement." },
];

const icons = [PanelsTopLeft, Sparkles, Workflow];

export default function ClientServiceGrid() {
  return <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
    {serviceNeeds.map((service, index) => {
      const Icon = icons[index];
      return <article key={service.href} id={`service-${index + 1}`} data-catalog-card data-service-card
        className={`group relative scroll-mt-28 flex flex-col overflow-hidden p-6 sm:p-7 ${card} lg:col-span-2`}>
        <span data-service-rule aria-hidden="true" />
        <span data-service-icon><Icon aria-hidden="true" size={25} strokeWidth={1.6} /></span>
        <p className="mb-3 text-sm font-semibold text-accent">{service.name}</p>
        <h3 className={h3}>{service.need}</h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-body">{service.help}</p>
        <details className="mt-5 border-t border-line pt-2">
          <summary className="cursor-pointer rounded py-3 text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">What could we work on?</summary>
          <p className="mt-1 text-sm font-semibold text-ink">{serviceDetails[[0, 2, 1][index]].title}</p>
          <p className="mt-2 pb-3 text-sm leading-7 text-body">{serviceDetails[[0, 2, 1][index]].text}</p>
        </details>
        <Link href={service.href} className={`mt-5 min-h-11 ${linkInline}`}>{service.link}<span data-service-arrow aria-hidden="true"> →</span></Link>
      </article>;
    })}
  </div>;
}
