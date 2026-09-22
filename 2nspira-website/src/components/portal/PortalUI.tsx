import Link from "next/link";

export const money = (value: number, currency = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
export const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value.slice(0, 10)}T12:00:00Z`)) : "—";

export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return <header className="portal-page-heading"><div>{eyebrow && <p>{eyebrow}</p>}<h1>{title}</h1><span>{description}</span></div>{action}</header>;
}

export function StatusChip({ status }: { status: string }) {
  return <span className={`portal-status status-${status.toLowerCase().replaceAll("_", "-")}`}>{status.replaceAll("_", " ")}</span>;
}

export function SectionCard({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`portal-card ${className}`}><header className="portal-card-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</header>{children}</section>;
}

export function DemoAction({ children, reason = "This action is not live in Milestone 1." }: { children: React.ReactNode; reason?: string }) {
  return <button type="button" className="portal-secondary-button" disabled title={reason}>{children}</button>;
}

export function PreviewNotice({ children }: { children: React.ReactNode }) {
  return <div className="portal-notice" role="note"><span aria-hidden="true">i</span><p><strong>Preview only.</strong> {children}</p></div>;
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return <div className="portal-empty"><span aria-hidden="true">◇</span><h2>{title}</h2><p>{body}</p></div>;
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="portal-text-link">{children} <span aria-hidden="true">→</span></Link>;
}
