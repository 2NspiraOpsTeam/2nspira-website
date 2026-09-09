import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import content from "@/content/legal/terms-conditions.json";

export const metadata: Metadata = {
  "title": "Terms and Conditions",
  "description": "Terms and Conditions for 2Nspira LLC.",
  "alternates": {
    "canonical": "/terms-conditions"
  }
};

export default function Page() { return <LegalPage title="Terms and Conditions" blocks={content.blocks.slice(1)} />; }
