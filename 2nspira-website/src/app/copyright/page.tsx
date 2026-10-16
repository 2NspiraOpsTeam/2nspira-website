import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import content from "@/content/legal/copyright.json";

export const metadata: Metadata = {
  "title": "Copyright Policy",
  "description": "Understand how content on the 2Nspira website may be used, shared, or reproduced, and how to request permission or report copyright concerns.",
  "alternates": {
    "canonical": "/copyright"
  }
};

export default function Page() { return <LegalPage title="Copyright Policy" blocks={content.blocks.slice(1)} />; }
