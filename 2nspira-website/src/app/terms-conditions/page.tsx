import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import content from "@/content/legal/terms-conditions.json";

export const metadata: Metadata = {
  "title": "Terms and Conditions",
  "description": "Review the terms that govern access to 2Nspira's website, digital resources, professional services, payments, intellectual property, and liability.",
  "alternates": {
    "canonical": "/terms-conditions"
  }
};

export default function Page() { return <LegalPage title="Terms and Conditions" blocks={content.blocks.slice(1)} />; }
