import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import AssessmentPage from "@/components/Resources/AssessmentPage";

export const metadata: Metadata = publicPageMetadata({
  title: "Strength Profile for Better Work & Collaboration",
  shareTitle: "Put your strengths to work.",
  description: "Understand how you contribute, collaborate, and do your best work. Take the free 2Nspira Strength Profile to guide your development and career decisions.",
  path: "/resources/strength-profile"
});

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
  "href": "https://strength.2nspira.com/",
  "action": "Take the Strength Profile",
  "breadcrumb": [
    { "name": "Home", "url": "/" },
    { "name": "Resources", "url": "/resources" },
    { "name": "Strength Profile", "url": "/resources/strength-profile" }
  ]
}} />;
}
