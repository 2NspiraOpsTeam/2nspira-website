import { getPortalContext } from "@/lib/portal/context";
import { getPortalData } from "@/lib/portal/data";
import { date, money, PageHeading, StatusChip } from "@/components/portal/PortalUI";

export default async function ServicesPage() {
  const { organization } = await getPortalContext(); const data = await getPortalData(organization.id);
  return <><PageHeading eyebrow="SERVICES" title="Your work with 2Nspira" description="Recurring relationships and one-time projects are modeled separately, with clear status and billing terms." /><div className="portal-stack">{data.engagements.map(({ engagement, service }) => <article className="portal-engagement" key={engagement.id}><div className="portal-engagement-main"><div className="portal-engagement-top"><span className="portal-service-icon" aria-hidden="true">◇</span><StatusChip status={engagement.status} /></div><p className="portal-kicker">{engagement.billingType.replaceAll("_", " ")}</p><h2>{service.name}</h2><p>{service.description}</p></div><dl className="portal-engagement-facts"><div><dt>Billing structure</dt><dd>{engagement.billingFrequency ?? (engagement.billingType === "fixed_project" ? "Project milestones" : "As used")}</dd></div><div><dt>{engagement.billingType === "hourly" ? "Rate" : "Amount"}</dt><dd>{engagement.amount ? money(engagement.amount) : "—"}</dd></div><div><dt>Started</dt><dd>{date(engagement.startDate)}</dd></div><div><dt>{engagement.renewalDate ? "Renewal" : "Next billing"}</dt><dd>{date(engagement.renewalDate ?? engagement.nextBillingDate)}</dd></div></dl></article>)}</div></>;
}
