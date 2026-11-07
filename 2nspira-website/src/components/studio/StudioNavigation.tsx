"use client";
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
  const [links, setLinks] = useState(initial);
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
          setLinks(d.links);
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
  return (
    <ul className={listClass}>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} className={linkClass}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
