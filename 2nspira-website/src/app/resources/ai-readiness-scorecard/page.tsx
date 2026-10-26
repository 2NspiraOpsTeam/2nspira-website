import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import AssessmentPage from "@/components/Resources/AssessmentPage";

export const metadata: Metadata = publicPageMetadata({
  title: "AI Readiness Assessment for Your Organization",
  shareTitle: "Find a practical starting point for AI.",
  description: "Before investing in AI, assess your goals, workflows, data, and risks. Use the free 2Nspira AI Readiness Scorecard to identify gaps and practical next steps.",
  path: "/resources/ai-readiness-scorecard"
});

export default function Page() {
  return <AssessmentPage {...{
  "title": "2Nspira AI Readiness Scorecard",
  "intro": "An executive-facing assessment that looks beyond tool enthusiasm to evaluate how prepared your organization is to adopt AI responsibly and practically.",
  "audience": "Executive leaders, operators, institutions, nonprofits, and teams seeking a clearer picture of practical readiness before scaling AI adoption.",
  "highlights": [
    "Strategy and governance readiness",
    "Workflow and operational preparedness",
    "Risk, trust, and implementation maturity",
    "Priority gaps and practical next steps"
  ],
  "href": "https://scorecard.2nspira.com/",
  "action": "Take the AI Readiness Scorecard",
  "breadcrumb": [
    { "name": "Home", "url": "/" },
    { "name": "Resources", "url": "/resources" },
    { "name": "AI Readiness Scorecard", "url": "/resources/ai-readiness-scorecard" }
  ]
}} />;
}
