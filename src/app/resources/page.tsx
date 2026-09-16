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
    title: "Professional Strengths Assessment",
    description: "Gain deep insights into your unique capabilities and areas for growth with our professional strengths assessment.",
    icon: "🧠",
    href: "/strength-profile",
  },
  {
    title: "AI Readiness Assessment for Organizations",
    description: "Evaluate your organization's current AI capabilities and identify critical steps for a successful transformation.",
    icon: "🤖",
    href: "/ai-readiness-scorecard",
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
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description, icon, href }: { title: string; description: string; icon: string; href: string }) {
  return (
    <article className="rounded-xl overflow-hidden shadow-md bg-white border border-slate-200 h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
      <div className="p-6 pt-0">
        <Link 
          href={href}
          className="inline-block w-full text-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Explore {title} →
        </Link>
      </div>
    </article>
  );
}
