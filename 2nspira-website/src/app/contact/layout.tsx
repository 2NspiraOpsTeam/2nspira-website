import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = publicPageMetadata({
  "title": "Contact",
  "description": "Tell 2Nspira about your business challenge. Start a practical conversation about simpler operations, connected systems, responsible AI, or technology leadership.",
  "path": "/contact"
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
