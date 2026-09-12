import { Metadata } from "next";
import Link from "next/link";

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

const resources = [
  {
    title: "AI Readiness Scorecard",
    description: "A comprehensive tool to assess your organization's AI readiness, identify gaps, and create a roadmap for successful adoption.",
    icon: "🤖",
  },
  {
    title: "Strength Profile Generator",
    description: "Generate personalized strength profiles to help teams understand their unique capabilities and areas for improvement.",
    icon: "💪",
  },
  {
    title: "Resource Library",
    description: "Access a curated collection of tools, guides, and templates designed to support your AI journey.",
    icon: "📚",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Resources</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore our collection of tools and resources designed to support your organization's AI readiness journey.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard 
              key={index} 
              {...resource}
              solidBackground={resource.title === "AI Readiness Scorecard" || resource.title === "Strength Profile Generator"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <article className="rounded-xl overflow-hidden shadow-md bg-white border border-slate-200 h-full flex flex-col">
      <div className="p-6">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
