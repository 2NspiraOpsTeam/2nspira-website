import { getPortalContext } from "@/lib/portal/context";
import { getPortalData } from "@/lib/portal/data";
import { date, DemoAction, money, PageHeading, PreviewNotice, SectionCard, StatusChip, TextLink } from "@/components/portal/PortalUI";

export default async function PortalOverview() {
  const { user, organization } = await getPortalContext();
  const data = await getPortalData(organization.id);
  const balance = data.invoices.reduce((sum, row) => sum + row.invoice.balance, 0);
  const next = data.engagements.filter((row) => row.engagement.nextBillingDate).sort((a, b) => (a.engagement.nextBillingDate ?? "").localeCompare(b.engagement.nextBillingDate ?? ""))[0];
  const defaultMethod = data.paymentMethods.find((method) => method.isDefault);
  const firstName = user.name.split(" ")[0];

  return <>
    <PageHeading eyebrow={organization.demo ? "DEMO CLIENT WORKSPACE" : "CLIENT WORKSPACE"} title={`Good morning, ${firstName}`} description={`${organization.name} · Here’s the current picture across your 2Nspira relationship.`} action={<div className="portal-heading-actions"><DemoAction>Pay balance</DemoAction><TextLink href="/account/invoices">View invoices</TextLink></div>} />
    <PreviewNotice>Balances, invoices, payments, payment methods, and autopay below are demonstration data. Financial actions are disabled until a payment provider is connected.</PreviewNotice>
    <section className="portal-metric-grid" aria-label="Billing summary">
      <div className="portal-metric"><span>Outstanding balance</span><strong>{money(balance)}</strong><small>{balance ? "Across open invoices" : "You’re all caught up"}</small></div>
      <div className="portal-metric"><span>Next payment</span><strong>{next?.engagement.amount ? money(next.engagement.amount) : "—"}</strong><small>{next ? `${date(next.engagement.nextBillingDate)} · ${next.service.name}` : "No payment scheduled"}</small></div>
      <div className="portal-metric"><span>Autopay</span><strong>{data.autopay ? "On" : "Off"}</strong><small>{data.autopay ? "Authorized for recurring invoices" : "No active authorization"}</small></div>
      <div className="portal-metric"><span>Default method</span><strong>{defaultMethod ? `${defaultMethod.brand} •••• ${defaultMethod.lastFour}` : "Not set"}</strong><small>{defaultMethod?.type === "bank_account" ? "Bank account" : "Secure provider reference"}</small></div>
    </section>
    <SectionCard title="Active services" subtitle="The work currently underway with 2Nspira." action={<TextLink href="/account/services">All services</TextLink>}>
      <div className="portal-service-grid">{data.engagements.filter((row) => row.engagement.status === "active").slice(0, 3).map(({ engagement, service }) => <article className="portal-service-card" key={engagement.id}><div><span className="portal-service-icon" aria-hidden="true">◇</span><StatusChip status={engagement.status} /></div><h3>{service.name}</h3><p>{service.description}</p><dl><div><dt>Billing</dt><dd>{engagement.billingType.replaceAll("_", " ")}{engagement.billingFrequency ? ` · ${engagement.billingFrequency}` : ""}</dd></div><div><dt>Amount</dt><dd>{engagement.amount ? money(engagement.amount) : "Scoped separately"}</dd></div><div><dt>Next billing</dt><dd>{date(engagement.nextBillingDate)}</dd></div></dl></article>)}</div>
    </SectionCard>
    <div className="portal-two-column">
      <SectionCard title="Recent invoices" action={<TextLink href="/account/invoices">View all</TextLink>}><div className="portal-list">{data.invoices.slice(0, 3).map(({ invoice, serviceName }) => <LinkRow key={invoice.id} href={`/account/invoices/${invoice.id}`} title={invoice.invoiceNumber} subtitle={`${serviceName ?? "2Nspira service"} · ${date(invoice.issueDate)}`} value={money(invoice.total)} status={invoice.status} />)}</div></SectionCard>
      <SectionCard title="Recent payments" action={<TextLink href="/account/billing">Billing details</TextLink>}><div className="portal-list">{data.payments.slice(0, 3).map(({ payment, method }) => <div className="portal-list-row" key={payment.id}><div><strong>{money(payment.amount)}</strong><span>{date(payment.paidAt)} · {method ? `${method.brand} •••• ${method.lastFour}` : "Manual payment"}</span></div><StatusChip status={payment.status} /></div>)}</div></SectionCard>
    </div>
  </>;
}

function LinkRow({ href, title, subtitle, value, status }: { href: string; title: string; subtitle: string; value: string; status: string }) {
  return <a className="portal-list-row portal-list-link" href={href}><div><strong>{title}</strong><span>{subtitle}</span></div><div className="portal-list-value"><strong>{value}</strong><StatusChip status={status} /></div></a>;
}
