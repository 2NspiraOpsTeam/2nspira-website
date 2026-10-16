import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import content from "@/content/legal/privacy-policy.json";

export const metadata: Metadata = {
  "title": "Privacy Policy",
  "description": "Learn how 2Nspira collects, uses, protects, and manages personal information when you visit our website, use our services, or contact our team.",
  "alternates": {
    "canonical": "/privacy-policy"
  }
};

export default function Page() { return <LegalPage title="Privacy Policy" blocks={content.blocks.slice(1)} />; }
