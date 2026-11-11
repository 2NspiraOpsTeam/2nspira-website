"use client";
import Link from "next/link";
import type { NavigationLink } from "@/lib/studio/model";
export default function StudioSubnav({links,onNavigate}:{links:NavigationLink[];onNavigate:()=>void}) {
  return <details className="rounded-xl px-3 py-2.5 text-body">
    <summary className="min-h-11 cursor-pointer py-2 font-medium focus-visible:outline-2 focus-visible:outline-accent">Creative Studio</summary>
    <div className="space-y-1 border-l border-line pl-3">{links.map(link => <Link key={link.href} href={link.href} onClick={onNavigate} className="block rounded-lg px-2 py-3 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-accent">{link.name}</Link>)}</div>
  </details>;
}
