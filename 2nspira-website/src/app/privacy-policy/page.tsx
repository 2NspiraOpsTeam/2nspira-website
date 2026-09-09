import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import content from "@/content/legal/privacy-policy.json";

export const metadata: Metadata = {
  "title": "Privacy Policy",
  "description": "Privacy Policy for 2Nspira LLC.",
  "alternates": {
    "canonical": "/privacy-policy"
  }
};

export default function Page() { return <LegalPage title="Privacy Policy" blocks={content.blocks.slice(1)} />; }
