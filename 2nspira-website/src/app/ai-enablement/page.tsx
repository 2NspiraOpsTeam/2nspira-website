import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const description = "Find where AI can reduce repetitive work and help your team serve customers better. Get practical AI strategy, training, and governance from 2Nspira.";

export const metadata: Metadata = publicPageMetadata({
  title: "AI Consulting for Better Business Workflows",
  shareTitle: "Less repetitive work. Responsible AI.",
  description,
  path: "/ai-enablement"
});

export default function Page() {
  return <ServicePage {...{
    visualTreatment: "editorial" as const,
    title: "Put AI to work. Keep people in control.",
    eyebrowText: "AI Strategy, Training & Governance",
    primaryActionLabel: "Discuss AI Readiness",
    intro: "Less repetitive work. More confident teams. We help you choose useful AI workflows, set clear safeguards, and keep human judgment at the center.",
    audience: "For leaders and teams ready to move from scattered experiments to purposeful AI use.",
    situations: [
      { title: "AI use is growing without a plan", text: "People are experimenting, but priorities, ownership, and acceptable use are unclear." },
      { title: "Your team needs confidence", text: "You want people to understand AI’s limits, protect information, and use it with judgment." },
      { title: "You need a useful starting point", text: "You want to choose a manageable workflow to test rather than add another tool without a purpose." },
    ],
    questions: [
      { question: "Do we need to choose an AI tool before we talk?", answer: "No. Start with the work you want to improve and any current experiments. Readiness, data, risks, and team capacity help determine whether a tool or a different change is appropriate." },
      { question: "Is this strategy, training, or implementation?", answer: "The focus depends on your needs. We agree which strategy, governance, training, or implementation work is in scope. A roadmap does not automatically include every implementation or ongoing monitoring activity." },
      { question: "What should we bring to the first conversation?", answer: "Bring your priorities, an example workflow, the tools already in use, and the decisions you need help making. You do not need to share sensitive records or credentials in the booking form." },
    ],
    outcomesTitle: "Practical outcomes to work toward",
    outcomes: [
      "Clear priorities for where AI can help.",
      "Practical safeguards for your data and decisions.",
      "Useful workflows with people in control.",
      "A way to measure quality, adoption, and value."
    ],
    steps: [
      {
        title: "Understand readiness",
        text: "Review current AI usage, surface exposure and workflow friction, and identify the most useful opportunities."
      },
      {
        title: "Build the foundation",
        text: "Define an acceptable-use framework, map responsibilities, and develop a practical implementation roadmap."
      },
      {
        title: "Enable adoption",
        text: "Support workflow implementation, train teams, and maintain leadership oversight as adoption grows."
      }
    ],
    image: {
      src: "/images/advisory/focused-collaboration.webp",
      alt: "Two people reviewing data and AI workflows in a focused collaboration session."
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://2nspira.com/ai-enablement#service",
      serviceType: ["AI strategy consulting", "AI governance advisory", "AI literacy and team training", "Responsible AI implementation"],
      name: "AI Enablement, Training & Governance Advisory",
      description,
      url: "https://2nspira.com/ai-enablement",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide"
    },
    focusAreas: [
      { title: "Strategy", text: "Connect AI investments to mission, priorities, and practical value." },
      { title: "AI Literacy", text: "Give leaders and teams the language to evaluate capabilities and limits." },
      { title: "Governance", text: "Define ownership, acceptable use, approvals, and escalation paths." },
      { title: "Data", text: "Protect sensitive information and clarify what systems may access." },
      { title: "Workflows", text: "Redesign work around useful assistance, review points, and accountability." },
      { title: "People", text: "Build confidence, role clarity, and adoption at a responsible pace." },
      { title: "Implementation", text: "Move from experiments to controlled, supportable operating practices." },
      { title: "Measurement", text: "Track quality, risk, adoption, time saved, and mission-level value." }
    ],
    buildSection: {
      title: "Three ways to move AI forward",
      intro: "Start where you need help. We agree the scope before work begins.",
      items: [
        { title: "Choose the right work", text: "Find a useful starting point—not just another tool.", details: ["Readiness review and prioritized use cases", "A roadmap with owners and success measures"] },
        { title: "Give people confidence", text: "Help your team use AI thoughtfully in everyday work.", details: ["Role-aware training and practical playbooks", "Clear human review and escalation points"] },
        { title: "Put safeguards in place", text: "Make responsible use part of how work gets done.", details: ["Privacy guidance and acceptable-use standards", "Controlled pilots and quality measures"] }
      ]
    },
    assessmentCta: {
      title: "Start with your AI readiness",
      text: "Use the free 2Nspira scorecard to identify strengths, gaps, and the next leadership conversation.",
      label: "Take the AI Readiness Scorecard",
      href: "/resources/ai-readiness-scorecard"
    },
    closingCta: {
      eyebrow: "From readiness to roadmap",
      title: "Move forward with AI you can explain, govern, and use.",
      text: "Bring your priorities, current experiments, and the decisions holding you back. Together, we’ll define a practical next step for responsible AI adoption.",
      primary: { label: "Discuss AI Readiness", href: "/contact" },
      secondary: { label: "Explore all services", href: "/services" }
    }
  }} />;
}
