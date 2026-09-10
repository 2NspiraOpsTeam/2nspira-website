import type { Metadata } from "next";
import AssessmentPage from "@/components/Resources/AssessmentPage";

export const metadata: Metadata = {
  "title": "Strength Profile | Professional Strengths Assessment",
  "description": "Understand how you naturally create value, collaborate, and thrive at work with the free 2Nspira Strength Profile.",
  "alternates": {
    "canonical": "/resources/strength-profile"
  }
};

export default function Page() {
  return <AssessmentPage {...{
  "title": "2Nspira Strength Profile",
  "intro": "A professional strengths and work-fit assessment to help you understand how you naturally create value, collaborate with others, and thrive at work.",
  "audience": "Professionals exploring career direction, managers supporting development, coaches guiding reflection, and teams building a shared language for contribution.",
  "highlights": [
    "Your natural operating strengths",
    "The kinds of work that energize you",
    "Collaboration patterns and contribution zones",
    "Questions to support role-fit and coaching conversations"
  ],
  "href": "https://strength-profile.vercel.app",
  "action": "Take the Strength Profile"
}} />;
}
