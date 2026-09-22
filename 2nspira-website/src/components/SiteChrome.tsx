"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const isPortal = usePathname().startsWith("/account");
  if (isPortal) return <>{children}</>;
  return <><a href="#main-content" className="skip-link">Skip to main content</a><Header />{children}<Footer /></>;
}
