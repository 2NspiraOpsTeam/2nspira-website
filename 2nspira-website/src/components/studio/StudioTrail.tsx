"use client";
import Link from "next/link";
import { useStudioNavigation } from "./StudioNavigation";
export default function StudioTrail({ active = "" }: { active?: string }) {
  const links=useStudioNavigation();
  const current=active ? `/studio/${active}` : "/studio";
  return <nav aria-label="Creative Studio" className="flex flex-wrap items-center gap-2 text-sm">
    {links.map(({href,name}) => <Link key={href} href={href} aria-current={href === current ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 ${href === current ? "border-accent bg-accent-soft text-ink" : "border-line bg-surface text-body hover:border-accent"}`}>{name}</Link>)}
  </nav>;
}
