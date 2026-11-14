import { dedicatedAudiences } from "./page-seeds";
import type { Content, Industry } from "./model";
const industry = (
  id: string,
  title: string,
  challenges: string,
  help: string,
  outcomes: string,
  linkLabel: string,
  href: string,
  exampleLabel = "",
  exampleHref = "",
): Industry => ({
  id,
  title,
  challenges,
  help,
  outcomes,
  linkLabel,
  href,
  exampleLabel,
  exampleHref,
  visible: ["education", "manufacturing", "property"].includes(id),
});
export function initialContent(): Content {
  return upgradeContent({
    revision: 0,
    operationId: "",
    heading: "Who We Serve",
    intro:
      "Different organizations. Shared possibilities. As your business transformation partner, 2Nspira helps you improve operations, reduce manual work and create better experiences through technology—starting with the people and processes behind your business.",
    showOrganizations: false,
    organizations: [],
    industries: [
      industry(
        "education",
        "Education & training",
        "Admissions, schedules, learning records and family updates can become disconnected, leaving educators to chase information.",
        "We can connect enrollment, course administration and communication through practical platforms and clearer workflows.",
        "Less repetitive administration, more consistent information and more time to support learners.",
        "Explore the education demo",
        "/demos/education",
      ),
      industry(
        "manufacturing",
        "Manufacturing",
        "Spreadsheets, material shortages and unclear handoffs can make it difficult to see what is ready, delayed or waiting for a decision.",
        "We can connect order tracking, inventory, production and quality workflows, with useful dashboards and automation.",
        "Clearer priorities, smoother handoffs and better visibility for day-to-day decisions.",
        "Explore the manufacturing demo",
        "/demos/manufacturing",
      ),
      industry(
        "property",
        "Property management & real estate",
        "Teams juggle inquiries, property records, maintenance requests and resident updates across separate tools.",
        "We can organize information, streamline intake and approvals, and build connected websites, portals and operational tools.",
        "Less duplicate entry, clearer follow-through and more responsive owner, tenant and buyer experiences.",
        "Explore the property management demo",
        "/demos/property-management",
      ),
      industry(
        "business",
        "Small & growing businesses",
        "Growth adds tools, repetitive tasks and decisions faster than a small team can comfortably manage.",
        "We can map the work, connect existing systems, automate routine steps and help prioritize technology investments.",
        "More capacity for customers, fewer manual handoffs and systems that can grow with the business.",
        "Explore automation services",
        "/automation-systems-optimization",
      ),
      industry(
        "nonprofits",
        "Nonprofits & community organizations",
        "Lean teams balance program delivery, volunteer coordination, reporting and community communication.",
        "We can simplify registrations and internal workflows, organize shared information and improve accessible digital experiences.",
        "Less administrative burden, smoother coordination and more time focused on the mission.",
        "Discuss technology leadership",
        "/technology-advisory",
      ),
      industry(
        "retail",
        "Retail & e-commerce",
        "Disconnected product content, storefronts, orders and customer messages create extra work and inconsistent experiences.",
        "We can connect commerce and business tools, improve online journeys and simplify content and operational workflows.",
        "Easier updates, fewer repetitive tasks and a more consistent experience from browsing to follow-up.",
        "Explore websites & digital platforms",
        "/websites",
      ),
      industry(
        "creative",
        "Creative Businesses & Media",
        "Independent creators, publishers, production studios and creative agencies often juggle content, digital assets, client requests and approvals across disconnected tools.",
        "We can organize operations and digital assets, simplify client intake and approvals, and connect websites, storefronts, publishing workflows and business tools.",
        "Less administrative work, smoother collaboration, easier publishing and better customer experiences.",
        "Explore digital platform services",
        "/websites",
        "See Creative Studio — our internal project",
        "/studio",
      ),
    ],
  });
}

/** Upgrade legacy JSON in memory. No D1 schema change or automatic write.
 * Existing Retail/Small Business IDs are reused. Once a page is present,
 * all Admin edits, visibility and ordering remain authoritative.
 */
export function upgradeContent(content: Content): Content {
  const industries = content.industries.map(i => {
    const defaults = dedicatedAudiences.find(d => d.id === i.id);
    if (i.id === "nonprofits" && defaults && !i.page) {
      // Activate the requested existing entry once; preserve its edited summary.
      // Once saved with its page, Admin visibility/order remain authoritative.
      return { ...i, title: defaults.title, visible: true, href: defaults.href, linkLabel: defaults.linkLabel, page: structuredClone(defaults.page) };
    }
    return defaults && !i.page ? structuredClone(defaults) : i;
  });
  for (const defaults of dedicatedAudiences) {
    if (!industries.some(i => i.id === defaults.id)) industries.push(structuredClone(defaults));
  }
  // Retired offerings must not reappear from saved content. Preserve all other Admin edits.
  const retire = (value: unknown): unknown => {
    if (typeof value === "string") return value.replaceAll("https://books.2nspira.com", "https://briarcrypt.com").replaceAll("Visit 2Nspira Books — our own storefront", "Visit Briarcrypt Books — independent bookstore").replaceAll("2Nspira Books", "Briarcrypt Books").replaceAll("2Nspira-owned storefront", "Independent client storefront").replaceAll("Our rare and collectible book storefront shows individual-copy photographs, condition details and product discovery. It is our own retail project, not a third-party client case study or proof of an omnichannel integration.", "Briarcrypt Books is an independent bookstore built by 2Nspira, with individual-copy photographs, condition details and product discovery. It is not proof of an omnichannel integration.").replaceAll("/fractional-cio", "/technology-advisory").replaceAll("Executive Technology Advisory", "Technology Advisory & Leadership").replaceAll("/coaching", "/services").replaceAll("/entrepreneur-mentoring", "/services").replaceAll("Entrepreneur mentoring offers a sounding board for priorities, trade-offs and accountability as you develop the business.", "Technology advisory helps you compare priorities and plan the next stage of your business.").replaceAll("founder mentoring", "technology advisory").replaceAll("Advice and mentoring", "Technology advisory").replaceAll("get mentoring as the business grows", "plan technology as the business grows").replaceAll("Mentoring does not include", "Advisory does not include").replaceAll("advice, mentoring or", "technology advisory or");
    if (Array.isArray(value)) return value.map(retire);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, retire(item)]));
    return value;
  };
  return retire({ ...content, industries }) as Content;
}
