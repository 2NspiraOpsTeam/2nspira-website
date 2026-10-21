import { publicPageMetadata } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const description = "Build a practical AI strategy with 2Nspira. Assess readiness, establish AI governance, train your teams, and turn promising use cases into responsible workflows.";

export const metadata: Metadata = publicPageMetadata({
  "title": "AI Strategy, Training & Governance Consulting",
  "shareTitle": "Put AI to work. Keep people in control.",
  description,
  "path": "/ai-enablement"
});

export default function Page() {
  return <ServicePage {...{
    visualTreatment: "editorial" as const,
    title: "Put AI to work. Keep people in control.",
    eyebrowText: "AI Strategy, Training & Governance",
    primaryActionLabel: "Discuss your AI priorities",
    intro: "AI should do more than create activity. It should support how your organization works. We help you identify worthwhile opportunities, establish practical guardrails, and equip your people to use AI with purpose, confidence, and accountability.",
    audience: "Executive teams, school and academic leaders, founders, nonprofits, and operators adopting AI without a clear framework for governance, training, or data privacy.",
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
      "@id": "https://2nspira.com/ai-enablement#service",
      serviceType: ["AI strategy consulting", "AI governance advisory", "AI literacy and team training", "Responsible AI implementation"],
      name: "AI Enablement, Training & Governance Advisory",
      description,
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
      intro: "Examples of deliverables we can scope around your priorities. We agree what to assess, teach, design, or implement before the work begins.",
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
      title: "Move forward with AI you can explain, govern, and use.",
      text: "Bring your priorities, current experiments, and the decisions holding you back. Together, we’ll define a practical next step for responsible AI adoption.",
      primary: { label: "Discuss your AI priorities", href: "/contact" },
      secondary: { label: "Explore all services", href: "/services" }
    }
  }} />;
}
