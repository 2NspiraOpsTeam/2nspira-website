import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "AI Enablement, Training & Governance Advisory",
  description: "Build an AI strategy your team can use. 2Nspira helps leaders assess readiness, establish governance, train teams, and implement responsible AI workflows.",
  alternates: {
    canonical: "/ai-enablement"
  }
};

export default function Page() {
  return <ServicePage {...{
    visualTreatment: "editorial" as const,
    title: "AI Enablement, Training & Governance Advisory",
    intro: "Move from fragmented AI experimentation to structured, responsible adoption. We help leaders build practical governance, equip their teams, and turn technology into operational capacity.",
    audience: "Executive teams, school and academic leaders, founders, nonprofits, and operators adopting AI without a clear framework for governance, training, or data privacy.",
    outcomesTitle: "Measurable outcomes",
    outcomes: [
      "A prioritized portfolio of AI opportunities tied to strategic goals.",
      "Clear ownership, acceptable-use guidance, and data privacy guardrails.",
      "Repeatable workflows with defined human review and escalation points.",
      "Adoption measures that track capability, quality, risk, and operational value."
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
      alt: "Conceptual visualization of a focused collaboration session reviewing data and AI workflows."
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Enablement, Training & Governance Advisory",
      description: "Move from fragmented AI experimentation to structured, responsible adoption. We help leaders build practical governance, equip their teams, and turn technology into operational capacity.",
      url: "https://2nspira.com/ai-enablement",
      provider: { "@id": "https://2nspira.com/#organization" },
      areaServed: "Worldwide"
    },
    overview: {
      eyebrow: "Beyond the tool",
      title: "AI is an operating-model challenge",
      text: "Sustainable adoption is not a software rollout. It changes how priorities are set, how information moves, how decisions are reviewed, and where accountability sits. We help leaders connect those choices before isolated experiments become unmanaged risk."
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
    insightSections: [
      {
        title: "Human Judgment",
        text: "AI should strengthen judgment, not obscure accountability. We identify where people must interpret context, approve consequential decisions, challenge outputs, and communicate with care.",
        items: [
          "Human review for sensitive or high-impact work",
          "Clear escalation when confidence, quality, or context is insufficient",
          "Decision records that keep ownership visible"
        ]
      },
      {
        title: "Responsible AI Practices",
        text: "Practical governance should help teams work safely—not bury them in policy. We translate principles into controls people can understand and use.",
        items: [
          "Privacy, security, transparency, and appropriate-use guardrails",
          "Vendor and use-case review proportional to real risk",
          "Ongoing monitoring for quality, bias, drift, and unintended impact"
        ]
      }
    ],
    buildSection: {
      title: "What We Help Build",
      intro: "A practical foundation your organization can operate, teach, and improve—not a strategy deck that sits on a shelf.",
      items: [
        { title: "AI strategy and roadmap", text: "A sequenced plan grounded in readiness, value, risk, and capacity." },
        { title: "Governance framework", text: "Decision rights, acceptable-use standards, review paths, and accountability." },
        { title: "Workflow portfolio", text: "Prioritized use cases with owners, controls, and implementation requirements." },
        { title: "AI literacy program", text: "Role-aware training and plain-language playbooks for leaders and teams." },
        { title: "Responsible implementation", text: "Pilots, change support, and human checkpoints designed for real operations." },
        { title: "Measurement system", text: "A balanced view of adoption, quality, risk, efficiency, and outcomes." }
      ]
    },
    journey: {
      title: "A maturity journey built for steady progress",
      intro: "Organizations do not need to leap from experimentation to scale. We help each stage earn the next.",
      stages: [
        { title: "Orient", text: "Build shared literacy and establish the current-state baseline." },
        { title: "Align", text: "Set priorities, guardrails, ownership, and success measures." },
        { title: "Prove", text: "Test high-value workflows with controlled pilots and human review." },
        { title: "Operationalize", text: "Scale what works, monitor performance, and refine governance." }
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
      title: "Build an AI roadmap your people can trust",
      text: "We can help you turn priorities, guardrails, workflows, and measurement into a practical path forward.",
      primary: { label: "Start a roadmap conversation", href: "/contact" },
      secondary: { label: "Explore all services", href: "/services" }
    }
  }} />;
}
