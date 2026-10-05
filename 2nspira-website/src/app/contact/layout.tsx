import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk with 2Nspira about responsible AI, systems optimization, digital platforms, or fractional CIO support. Schedule a complimentary discovery call.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
