import type { Metadata } from "next";
import AssessmentPage from "@/components/Resources/AssessmentPage";

export const metadata: Metadata = {
  "title": "AI Readiness Scorecard | Organizational Assessment",
  "description": "Evaluate organizational readiness for responsible AI adoption across strategy, governance, workflows, trust, and implementation.",
  "alternates": {
    "canonical": "/resources/ai-readiness-scorecard"
  }
};

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
  "href": "https://ai-readiness-scorecard-zeta.vercel.app",
  "action": "Take the AI Readiness Scorecard"
}} />;
}
