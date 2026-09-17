import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  "title": "AI Enablement, Training & Governance Advisory",
  "description": "Move from fragmented AI experimentation to structured, responsible adoption. We help leaders build practical governance, equip their teams, and turn technology into operational capacity.",
  "alternates": {
    "canonical": "/ai-enablement"
  }
};

export default function Page() { return <ServicePage {...{
  "title": "AI Enablement, Training & Governance Advisory",
  "intro": "Move from fragmented AI experimentation to structured, responsible adoption. We help leaders build practical governance, equip their teams, and turn technology into operational capacity.",
  "audience": "Executive teams, school and academic leaders, founders, nonprofits, and operators adopting AI without a clear framework for governance, training, or data privacy.",
  "outcomes": [
    "Align AI initiatives with organizational priorities.",
    "Establish acceptable-use guidelines, ownership, and data privacy guardrails.",
    "Identify useful workflows and prioritize practical implementation.",
    "Equip teams with training and non-technical playbooks."
  ],
  "steps": [
    {
      "title": "Understand readiness",
      "text": "Review current AI usage, surface exposure and workflow friction, and identify the most useful opportunities."
    },
    {
      "title": "Build the foundation",
      "text": "Define an acceptable-use framework, map responsibilities, and develop a practical implementation roadmap."
    },
    {
      "title": "Enable adoption",
      "text": "Support workflow implementation, train teams, and maintain leadership oversight as adoption grows."
    }
  ],
  "image": {
    "src": "/images/advisory/focused-collaboration.webp",
    "alt": "Conceptual visualization of a focused collaboration session reviewing data and AI workflows."
  },
  "jsonLd": {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Enablement, Training & Governance Advisory",
    description: "Move from fragmented AI experimentation to structured, responsible adoption. We help leaders build practical governance, equip their teams, and turn technology into operational capacity.",
    url: "https://2nspira.com/ai-enablement",
    provider: { "@id": "https://2nspira.com/#organization" },
    areaServed: "Worldwide"
  }
}} />; }
