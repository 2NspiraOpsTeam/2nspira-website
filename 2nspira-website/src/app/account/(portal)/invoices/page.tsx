import Link from "next/link";
import { getPortalContext } from "@/lib/portal/context";
import { getPortalData } from "@/lib/portal/data";
import { date, money, PageHeading, StatusChip } from "@/components/portal/PortalUI";

export default async function InvoicesPage() {
  const { organization } = await getPortalContext(); const data = await getPortalData(organization.id);
  return <><PageHeading eyebrow="INVOICES" title="Invoices without the clutter" description="Review amounts, due dates, payment status, and line-item details." /><section className="portal-card portal-table-card"><div className="portal-table portal-invoice-table" role="table" aria-label="Invoices"><div className="portal-table-head" role="row"><span>Invoice</span><span>Issued / due</span><span>Service</span><span>Total</span><span>Balance</span><span>Status</span><span className="sr-only">Action</span></div>{data.invoices.map(({ invoice, serviceName }) => <Link href={`/account/invoices/${invoice.id}`} className="portal-table-row portal-table-link" role="row" key={invoice.id}><strong data-label="Invoice">{invoice.invoiceNumber}</strong><span data-label="Dates">{date(invoice.issueDate)}<small>Due {date(invoice.dueDate)}</small></span><span data-label="Service">{serviceName ?? "2Nspira service"}</span><span data-label="Total">{money(invoice.total)}</span><strong data-label="Balance">{money(invoice.balance)}</strong><span data-label="Status"><StatusChip status={invoice.status} /></span><span aria-hidden="true">→</span></Link>)}</div></section></>;
}
