import { safeLink } from "@/lib/team/model";
export type AudiencePage = {
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  challenges: { title: string; text: string }[];
  services: { title: string; text: string; href: string }[];
  advisoryTitle: string;
  advisoryText: string;
  implementationTitle: string;
  implementationText: string;
  examples: { title: string; kind: string; text: string; href: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
};
export type Industry = {
  id: string;
  title: string;
  challenges: string;
  help: string;
  outcomes: string;
  linkLabel: string;
  href: string;
  exampleLabel: string;
  exampleHref: string;
  visible: boolean;
  page?: AudiencePage;
};
export type Organization = {
  id: string;
  name: string;
  relationship: string;
  logo: string;
  href: string;
  evidence: string;
  permission: string;
  approved: boolean;
  visible: boolean;
};
export type Content = {
  revision: number;
  operationId: string;
  heading: string;
  intro: string;
  industries: Industry[];
  organizations: Organization[];
  showOrganizations: boolean;
};
export function validateContent(value: unknown): Content {
  if (!value || typeof value !== "object") throw Error("Invalid page content.");
  const c = value as Content;
  if (
    !Number.isSafeInteger(c.revision) ||
    c.revision < 0 ||
    typeof c.operationId !== "string" ||
    !/^[a-f0-9-]{36}$/.test(c.operationId)
  )
    throw Error("Invalid revision or save identifier.");
  const text = (v: unknown, label: string, required = false) => {
    if (typeof v !== "string" || v.length > 3000 || (required && !v.trim()))
      throw Error(`Provide ${label} (up to 3,000 characters).`);
    return v;
  };
  const link = (v: unknown) => {
    const s = text(v, "link");
    if (!safeLink(s) || /[\u0000-\u0020\u007f\\]/.test(s))
      throw Error("Use HTTPS or a site-relative link without spaces.");
    return s;
  };
  const page = (value: unknown): AudiencePage => {
    if (!value || typeof value !== "object") throw Error("Provide audience page content.");
    const p = value as AudiencePage;
    const items = <T,>(rows: unknown, label: string, parse: (r: T) => T, required = true): T[] => {
      if (!Array.isArray(rows) || rows.length > 8 || (required && !rows.length))
        throw Error(`Provide ${label} (up to eight items).`);
      return rows.map(r => {
        if (!r || typeof r !== "object") throw Error(`Invalid ${label}.`);
        return parse(r);
      });
    };
    const strings = Object.fromEntries([
      "seoTitle", "seoDescription", "headline", "intro", "advisoryTitle", "advisoryText",
      "implementationTitle", "implementationText", "ctaTitle", "ctaText", "ctaLabel",
    ].map(key => [key, text(p[key as keyof AudiencePage], key, true)]));
    if (p.seoTitle.length > 160 || p.seoDescription.length > 320)
      throw Error("Keep the SEO title within 160 characters and description within 320 characters.");
    return {
      ...strings,
      challenges: items<AudiencePage["challenges"][number]>(p.challenges, "challenges", r => ({ title: text(r.title, "challenge title", true), text: text(r.text, "challenge text", true) })),
      services: items<AudiencePage["services"][number]>(p.services, "services", r => ({ title: text(r.title, "service title", true), text: text(r.text, "service text", true), href: link(text(r.href, "service link", true)) })),
      examples: items<AudiencePage["examples"][number]>(p.examples, "examples", r => ({ title: text(r.title, "example title", true), kind: text(r.kind, "example type", true), text: text(r.text, "example scope", true), href: link(text(r.href, "example link", true)) }), false),
    } as AudiencePage;
  };
  const bool = (v: unknown) => {
    if (typeof v !== "boolean")
      throw Error("Choose a visibility or approval setting.");
    return v;
  };
  const ids = new Set<string>();
  const id = (v: unknown) => {
    const s = text(v, "unique identifier", true);
    if (ids.has(s)) throw Error("Identifiers must be unique.");
    ids.add(s);
    return s;
  };
  if (
    !Array.isArray(c.industries) ||
    c.industries.length > 50 ||
    !Array.isArray(c.organizations) ||
    c.organizations.length > 100
  )
    throw Error("Too many industries or organizations.");
  return {
    revision: c.revision,
    operationId: c.operationId,
    heading: text(c.heading, "heading", true),
    intro: text(c.intro, "introduction", true),
    showOrganizations: bool(c.showOrganizations),
    industries: c.industries.map((i) => ({
      id: id(i.id),
      title: text(i.title, "industry title", i.visible),
      challenges: text(i.challenges, "everyday challenges", i.visible),
      help: text(i.help, "how we help", i.visible),
      outcomes: text(i.outcomes, "practical outcomes", i.visible),
      linkLabel: text(i.linkLabel, "next-step label", i.visible),
      href: link(text(i.href, "next-step link", i.visible)),
      exampleLabel: text(
        i.exampleLabel,
        "example label",
        Boolean(i.exampleHref),
      ),
      exampleHref: link(i.exampleHref),
      visible: bool(i.visible),
      ...(i.page === undefined ? {} : { page: page(i.page) }),
    })),
    organizations: c.organizations.map((o) => {
      const r = {
        id: id(o.id),
        name: text(o.name, "organization name", o.visible),
        relationship: text(o.relationship, "relationship", o.visible),
        logo: link(o.logo),
        href: link(o.href),
        evidence: text(o.evidence, "relationship evidence"),
        permission: text(o.permission, "logo permission"),
        approved: bool(o.approved),
        visible: bool(o.visible),
      };
      if (
        r.visible &&
        (!r.approved || !r.evidence.trim() || !r.permission.trim() || !r.logo)
      )
        throw Error(
          "Visible organizations need verified relationship evidence, logo permission, a logo and approval.",
        );
      return r;
    }),
  };
}
export function publicContent(c: Content): Content {
  return {
    ...c,
    operationId: "",
    industries: c.industries.filter((i) => i.visible),
    organizations: c.showOrganizations
      ? c.organizations
          .filter((o) => o.visible && o.approved && o.evidence && o.permission)
          .map((o) => ({ ...o, evidence: "", permission: "" }))
      : [],
  };
}
