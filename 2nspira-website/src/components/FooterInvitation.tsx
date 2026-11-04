"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
const tailored = new Set(["/services", "/websites", "/automation-systems-optimization", "/ai-enablement", "/fractional-cio", "/coaching", "/work", "/about", "/contact"]);
export default function FooterInvitation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return tailored.has(pathname.replace(/\/$/, "") || "/") ? null : children;
}
