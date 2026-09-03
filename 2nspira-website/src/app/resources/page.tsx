import { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardContent, Typography, Box, Grid } from "@mui/material";
import StrengthProfileCard from "@/components/Resources/StrengthProfileCard";
import AiReadinessCard from "@/components/Resources/AiReadinessCard";

// Metadata extracted from 2Nspira_RESOURCES_PAGE_DRAFT.md
export const metadata: Metadata = {
  title: "2Nspira Resources | Assessments, Scorecards, and Practical Tools",
  description: "Explore practical tools from 2Nspira, including professional strengths assessments, AI readiness scorecards, and executive resources designed to support better decisions and clearer next steps.",
  keywords: [
    "professional strengths assessment",
    "work fit assessment",
    "strengths profile for professionals",
    "AI readiness assessment",
    "organizational AI readiness",
    "executive AI readiness scorecard",
    "responsible AI adoption assessment",
    "2Nspira resources",
  ],
};

const featuredResources = [
  {
    title: "Professional Strengths Assessment",
    link: "/resources/strength-profile",
    description:
      "A professional strengths and work-fit assessment designed to help people understand how they naturally create value, collaborate, and thrive at work.",
    ctaText: "Take the Strength Profile",
    icon: <span className="text-blue-500 mr-2">•</span>,
  },
  {
    title: "AI Readiness Assessment for Organizations",
    link: "/resources/ai-readiness-scorecard",
    description:
      "An executive-facing AI readiness assessment that helps organizations evaluate strategy, governance, workflows, trust, and implementation preparedness.",
    ctaText: "Take the AI Readiness Scorecard",
    icon: <span className="text-orange-500 mr-2">•</span>,
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950/90 pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <header className="text-center py-12 md:py-20 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Practical tools and assessments from 2Nspira
          </h1>
          <p className="mt-4 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Explore free 2Nspira resources built to help professionals, teams, and organizations make clearer decisions, understand their current position, and take practical next steps.
          </p>
        </header>

        {/* Featured Resources */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Featured Resources
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              These tools are designed to be useful, credible, and action-oriented. Each resource is built to help people move from uncertainty to clarity, whether the goal is understanding strengths, evaluating organizational readiness, or identifying better next steps.
            </p>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {featuredResources.map((resource) => (
                <div key={resource.title} className="border border-zinc-200 rounded-xl bg-white p-8 shadow-lg hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/30 transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{resource.title}</h3>
                  <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">{resource.description}</p>
                  <div className="mt-6 flex justify-center">
                    <Link
                      href={resource.link}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
                    >
                      {resource.ctaText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Designed for practical use
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              2Nspira resources are designed to be clear, credible, and action-oriented. They are meant to support reflection, planning, and better conversations. They are not intended to replace formal legal, clinical, regulatory, or certification processes where those are required.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}