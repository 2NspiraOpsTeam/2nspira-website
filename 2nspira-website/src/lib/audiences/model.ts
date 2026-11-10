import { safeLink } from "@/lib/team/model";
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
