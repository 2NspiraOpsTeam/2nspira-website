import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Client Portal", template: "%s | 2Nspira Client Portal" },
  description: "Secure 2Nspira client services and billing portal.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) { return children; }
