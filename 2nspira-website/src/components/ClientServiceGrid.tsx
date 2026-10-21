import Link from "next/link";
import { Sparkles, Workflow, PanelsTopLeft, Compass, MessagesSquare } from "lucide-react";
import { serviceNeeds } from "@/lib/serviceNeeds";
import { card, h3, linkInline } from "./ui";

const icons = [Sparkles, Workflow, PanelsTopLeft, Compass, MessagesSquare];

export default function ClientServiceGrid() {
  return <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
    {serviceNeeds.map((service, index) => {
      const Icon = icons[index];
      return <article key={service.href} data-catalog-card data-service-card
        className={`group relative flex flex-col overflow-hidden p-6 sm:p-7 ${card} ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}>
        <span data-service-rule aria-hidden="true" />
        <span data-service-icon><Icon aria-hidden="true" size={25} strokeWidth={1.6} /></span>
        <p className="mb-3 text-sm font-semibold text-accent">{service.name}</p>
        <h3 className={h3}>{service.need}</h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-body">{service.help}</p>
        <p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-body">{service.example}</p>
        <Link href={service.href} className={`mt-5 min-h-11 ${linkInline}`}>{service.link}<span data-service-arrow aria-hidden="true"> →</span></Link>
      </article>;
    })}
  </div>;
}
