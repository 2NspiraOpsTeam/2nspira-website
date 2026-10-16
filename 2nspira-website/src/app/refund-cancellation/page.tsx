import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import content from "@/content/legal/refund-cancellation.json";

export const metadata: Metadata = {
  "title": "Refund and Cancellation Policy",
  "description": "Review 2Nspira's refund and cancellation terms for consulting, subscriptions, digital products, and scheduled services before making a purchase.",
  "alternates": {
    "canonical": "/refund-cancellation"
  }
};

export default function Page() { return <LegalPage title="Refund and Cancellation Policy" blocks={content.blocks.slice(1)} />; }
