import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = publicPageMetadata({
  title: "Discuss Your Business Challenge",
  shareTitle: "What would help your business work better?",
  description: "Struggling with manual work, disconnected systems, or unclear priorities? Tell 2Nspira what needs to improve and discuss practical next steps for your business.",
  path: "/contact"
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
