import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import content from "@/content/legal/copyright.json";

export const metadata: Metadata = {
  "title": "Copyright Policy",
  "description": "Copyright Policy for 2Nspira LLC.",
  "alternates": {
    "canonical": "/copyright"
  }
};

export default function Page() { return <LegalPage title="Copyright Policy" blocks={content.blocks.slice(1)} />; }
