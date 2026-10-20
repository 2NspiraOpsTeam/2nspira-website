import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = publicPageMetadata({
  "title": "Contact",
  "description": "Discuss AI enablement, automation, digital platforms, fractional CIO leadership, or entrepreneur mentoring with 2Nspira. Start a practical conversation.",
  "path": "/contact"
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
