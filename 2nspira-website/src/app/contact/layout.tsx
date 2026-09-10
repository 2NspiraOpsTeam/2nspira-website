import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about our services or ready to get started? Contact 2Nspira for a complimentary discovery call on AI enablement, systems optimization, and technology transformation.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
