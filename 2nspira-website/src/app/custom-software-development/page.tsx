import Link from "next/link";
import ServicePage from "@/components/ServicePage";
import { publicPageMetadata } from "@/lib/pageMetadata";
import { buttonPrimary } from "@/components/ui";

const description = "Custom software, portals, dashboards, workflow automation, API integrations and FileMaker modernization built around how your organization works.";
export const metadata = publicPageMetadata({ title: "Custom Software Development & Integrations", description, path: "/custom-software-development" });

export default function SoftwarePage() {
  return <><ServicePage
    eyebrowText="Custom Software Development"
    title="Software built around how your organization works."
    intro="Replace manual handoffs and disconnected tools with practical portals, dashboards and connected business systems."
    audience="For organizations whose operations have outgrown spreadsheets or off-the-shelf workflows."
    primaryActionLabel="Discuss your workflow"
    image={{ src: "/images/pages/websites-business-journey-20261028.webp", alt: "People collaborating on a business workflow" }}
    jsonLd={{ "@context": "https://schema.org", "@type": "Service", name: "Custom Software Development", description, url: "https://2nspira.com/custom-software-development", provider: { "@id": "https://2nspira.com/#organization" } }}
    outcomesTitle="Practical systems for everyday work"
    outcomes={["Customer and staff portals with appropriate access controls", "Dashboards and internal tools organized around useful information", "Workflow automation, API integrations and data synchronization", "FileMaker development and modernization"]}
    buildSection={{ title: "What we can build and connect", intro: "Start with the operational problem and a focused scope, not a technology prescription.", items: [
      { title: "Portals and internal tools", text: "Give customers and staff a purposeful place to manage requests, records and routine work." },
      { title: "Automation and integrations", text: "Reduce repeated entry and connect useful existing systems. Map handoffs, exception handling and ownership before automating." },
      { title: "Claris FileMaker", text: "Develop and modernize FileMaker applications, review database structure and workflows, and plan connections or phased migration where appropriate." },
    ] }}
    overview={{ title: "Buy, configure or build?", text: "We first review existing products and maintained libraries. Custom development makes sense when suitable products cannot meet the agreed needs. Discovery defines scope, data handling, ownership and delivery responsibilities before implementation." }}
    steps={[{ title: "Understand the workflow", text: "Review users, current tools, data, permissions and the handoffs that need improvement." }, { title: "Build and verify in phases", text: "Agree a focused increment, test real workflows and failure handling, and review with the people who will use it." }, { title: "Handover and scoped support", text: "Document ownership and operation. Agree maintenance, monitoring and future enhancements separately." }]}
    credibility={{ title: "Explore relevant work", intro: "Published project scopes and fictional demonstrations are distinct from private systems and client endorsements.", items: [
      { title: "Teams property operations", text: "Property and unit records, media and tenant workflows. Private systems require authorized access.", href: "/work#teams-management", label: "Read the project scope" },
      { title: "Operational demonstrations", text: "Explore internal prototypes using fictional records, not completed customer implementations.", href: "/demos", label: "Explore demos" },
      { title: "Supporting integration expertise", text: "See how workflow mapping and phased automation support a broader software engagement.", href: "/automation-systems-optimization", label: "Explore automation" },
    ] }}
    questions={[{ question: "Can you improve an existing system?", answer: "Yes. We review its current state, licensing, data and integration constraints before recommending improvements, replacement or phased modernization." }, { question: "How are delivery and support agreed?", answer: "Your proposal defines scope, milestones, acceptance criteria, code and data ownership, handover and support responsibilities. No pricing or ongoing subscription is committed by this page." }]}
    assessmentCta={{ title: "Need direction first?", text: "Technology advisory can help prioritize the next investment.", href: "/technology-advisory", label: "Explore supporting advisory" }}
  /><aside className="mx-auto max-w-6xl px-6 pb-16"><Link className={buttonPrimary} href="/contact?service=platforms#contact-message">Discuss your workflow</Link></aside></>;
}
