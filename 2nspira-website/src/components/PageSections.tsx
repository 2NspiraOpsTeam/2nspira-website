import { ArrowDownRight } from "lucide-react";

/** Plain anchors work before hydration, with keyboard navigation and without JS. */
export default function PageSections({ items }: { items: readonly (readonly [string, string])[] }) {
  return <nav aria-label="On this page" className="page-section-nav mx-auto max-w-6xl px-4 py-6 sm:px-6">
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Find your starting point</p>
    <div className="flex flex-wrap gap-2">{items.map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink">{label}<ArrowDownRight aria-hidden="true" className="h-4 w-4 text-accent" /></a>)}</div>
  </nav>;
}
