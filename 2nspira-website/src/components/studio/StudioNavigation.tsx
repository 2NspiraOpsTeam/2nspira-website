"use client";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavigationLink } from "@/lib/studio/model";
const Context = createContext<NavigationLink[]>([]);
export function StudioNavigationProvider({
  initial,
  children,
}: {
  initial: NavigationLink[];
  children: React.ReactNode;
}) {
  // Scoped owner-approved navigation only; preserve the catalogue and all legacy routes.
  const approvedLinks = (items: NavigationLink[]) => [
    ...items.filter(link => link.href === "/studio"),
    ...["watch", "read", "play"].map(id => ({ name: id[0].toUpperCase() + id.slice(1), href: `/studio/${id}` })),
  ];
  const [links, setLinks] = useState(() => approvedLinks(initial));
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const r = await fetch("/api/creative-studio/navigation", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (r.ok) {
          const d = await r.json();
          setLinks(approvedLinks(d.links));
        }
      } catch {
        /* Keep the last successfully loaded navigation during a transient request failure. */
      }
    };
    void refresh();
    window.addEventListener("focus", refresh);
    const timer = setInterval(() => void refresh(), 60000);
    return () => {
      controller.abort();
      window.removeEventListener("focus", refresh);
      clearInterval(timer);
    };
  }, [pathname]);
  return <Context.Provider value={links}>{children}</Context.Provider>;
}
export const useStudioNavigation = () => useContext(Context);
export function StudioFooterLinks({
  listClass,
  linkClass,
}: {
  listClass: string;
  linkClass: string;
}) {
  const links = useStudioNavigation();
  return <ul className={listClass}>{links.map(link => <li key={link.href}><Link href={link.href} className={linkClass}>{link.name}</Link></li>)}</ul>;
}
