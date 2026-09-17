const seoTitles: Record<string, string> = {
  "the-great-ai-decentralization": "Local AI Models and Enterprise Strategy",
  "the-concept-of-work-is-changing-moving-from-doing-the-actual-work-to-directing-the-ai":
    "How AI Is Changing Knowledge Work",
  "the-0-trillion-ai-trap": "The Hidden Costs and Risks of AI Agents",
  "operational-ai-doesn-t-fail-because-of-technology-it-fails-because-of-how-organizations-think":
    "Why Operational AI Fails in Organizations",
  "building-ai-team-multi-agent-workflow-lessons": "Building a Multi-Agent AI Team",
  "when-ai-took-the-tasks-human-judgment-became-the-work":
    "AI Automation and Human Judgment",
  "website-design-strategies-for-impact-guide":
    "Website Design Strategies for Trust and Growth",
  "ai-literacy-for-leaders-core-leadership-competency": "AI Literacy for Leaders",
  "re-engage-a-disengaged-team": "How to Re-Engage a Disengaged Team",
  "igniting-innovation-in-small-businesses-innovative-solutions-for-small-businesses":
    "Small Business Innovation Strategies",
  "why-silence-is-a-system-signal": "Organizational Silence as a Warning Signal",
  "why-efficiency-without-trust-creates-fragility":
    "Why Efficiency Without Trust Creates Fragility",
  "when-systems-work-but-trust-disappears":
    "Why Trust Disappears While Systems Still Work",
  "building-resilience-in-leadership-roles-embracing-resilient-leadership-traits":
    "Resilient Leadership Traits for Navigating Change",
  "building-resilience-in-leadership-roles-essential-resilient-leadership-traits":
    "Resilient Leadership Under Pressure",
  "why-innovation-feels-harder-in-2025-and-what-great-leaders-do-differently":
    "Innovation Leadership in 2026",
  "achieve-business-goals-with-aligning-it-with-business":
    "Aligning IT With Business Goals",
  "ai-overload-in-2025-why-people-are-turning-ai-off-and-what-leaders-really-need":
    "AI Overload: A Human-Centered Leadership Response",
  "the-tuesday-that-taught-me-everything-about-trust": "How to Rebuild Trust at Work",
  "the-real-digital-transformation-killing-the-systems-you-re-afraid-to-touch":
    "Why Digital Transformation Fails",
  "the-human-side-of-technology-resilience-reinvention-and-my-journey-toward-leadership":
    "Human-Centered Technology Leadership",
  "neurodiversity-aithe-untapped-superpower-of-2025-for-organizations":
    "Neurodiversity and AI in Organizations",
  "from-paper-folders-to-digital-confidence-a-story-of-trust-brains-and-the-real-work-of-change":
    "From Paper Processes to Digital Confidence",
  "designing-for-what-matters": "Values-Based Design for Products and Services",
  "beyond-the-hype-why-emotional-ai-will-define-the-next-decade-of-human-computer-interaction":
    "Emotional AI and Affective Computing",
};

export function getPostSeoTitle(slug: string, fallback: string) {
  return seoTitles[slug] ?? fallback.replace(/\s*\|\s*2Nspira\s*$/i, "");
}
