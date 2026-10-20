import type { Metadata } from "next";
import type { ReactNode } from "react";

// Account/admin pages are not public marketing search destinations.
// This is an indexing directive, not a replacement for authentication.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children;
}
