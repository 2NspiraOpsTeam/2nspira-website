export type Person = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
  skills: string;
  evidence: string;
  approved: boolean;
};
export type Agent = {
  id: string;
  name: string;
  role: string;
  bio: string;
  approved: boolean;
};
export type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  url: string;
  evidence: string;
  approved: boolean;
};
export type Responsibility = {
  area: string;
  personId: string;
  support: string;
  detail: string;
};
export type TeamContent = {
  revision: number;
  status: "draft" | "published";
  intro: string;
  people: Person[];
  agents: Agent[];
  projects: Project[];
  responsibilities: Responsibility[];
  ai: string;
  rfp: string;
};
export function safeLink(value: string) {
  if (!value) return true;
  if (/^\/(?!\/)[^\\\s]*$/.test(value)) return true;
  try {
    const u = new URL(value);
    return u.protocol === "https:" && !u.username && !u.password;
  } catch {
    return false;
  }
}
export function publicationGaps(c: TeamContent): string[] {
  const gaps: string[] = [];
  for (const p of c.people)
    if (
      !p.name.trim() ||
      !p.approved ||
      !p.role.trim() ||
      !p.bio.trim() ||
      !p.photo ||
      !p.skills.trim() ||
      !p.evidence
    )
      gaps.push(
        `${p.name}: approved role, biography, photo, skills and supporting evidence required.`,
      );
  for (const a of c.agents)
    if (!a.name.trim() || !a.approved || !a.role.trim() || !a.bio.trim())
      gaps.push(`${a.name}: confirm actual AI functions and limitations.`);
  for (const area of [
    "Client communication",
    "Project planning",
    "Development",
    "Quality assurance",
  ]) {
    const r = c.responsibilities.find((r) => r.area === area);
    if (
      !r ||
      !c.people.some((p) => p.id === r.personId && p.approved) ||
      !r.detail.trim()
    )
      gaps.push(`${area}: assign a human lead and describe responsibility.`);
  }
  for (const p of c.projects)
    if (
      p.approved &&
      (!p.title.trim() || !p.summary.trim() || !p.url || !p.evidence)
    )
      gaps.push(
        `${p.title || "Project example"}: complete title, summary, link and evidence before publication.`,
      );
  if (
    c.projects.filter(
      (p) => p.approved && p.evidence && p.url && p.summary.trim(),
    ).length < 2
  )
    gaps.push("Approve at least two evidenced project examples for sharing.");
  return gaps;
}
export function validateContent(value: unknown): TeamContent {
  if (!value || typeof value !== "object") throw Error("Invalid page content.");
  const c = value as TeamContent;
  if (
    !Number.isSafeInteger(c.revision) ||
    c.revision < 0 ||
    !["draft", "published"].includes(c.status)
  )
    throw Error("Invalid page revision or status.");
  for (const k of ["intro", "ai", "rfp"] as const)
    if (typeof c[k] !== "string" || !c[k].trim() || c[k].length > 5000)
      throw Error(`Provide ${k} text (up to 5,000 characters).`);
  for (const [key, fields] of [
    [
      "people",
      ["id", "name", "role", "bio", "photo", "linkedin", "skills", "evidence"],
    ],
    ["agents", ["id", "name", "role", "bio"]],
    ["projects", ["id", "title", "kind", "summary", "url", "evidence"]],
    ["responsibilities", ["area", "personId", "support", "detail"]],
  ] as const) {
    const rows = c[key];
    if (!Array.isArray(rows) || rows.length > 30)
      throw Error(`Invalid ${key}.`);
    const ids = new Set<string>();
    for (const row of rows) {
      if (!row || typeof row !== "object")
        throw Error(`Invalid ${key} record.`);
      const r = row as unknown as Record<string, unknown>;
      for (const field of fields)
        if (typeof r[field] !== "string" || (r[field] as string).length > 5000)
          throw Error(`Invalid ${key}: ${field}.`);
      const id = String(r.id ?? r.area);
      if (!id.trim() || ids.has(id))
        throw Error(`Use unique ${key} identifiers.`);
      ids.add(id);
      if ("approved" in r && typeof r.approved !== "boolean")
        throw Error("Approval must be yes or no.");
      if (key !== "responsibilities" && typeof r.approved !== "boolean")
        throw Error("Approval is required.");
      for (const field of ["photo", "linkedin", "evidence", "url"])
        if (typeof r[field] === "string" && !safeLink(r[field] as string))
          throw Error("Links must use HTTPS or a site-relative path.");
      if (
        key === "projects" &&
        ![
          "Client project",
          "Internal project",
          "Internal demonstration",
        ].includes(String(r.kind))
      )
        throw Error("Select a valid project type.");
    }
  }
  if (c.status === "published") {
    const gaps = publicationGaps(c);
    if (gaps.length) throw Error(gaps.join(" "));
  }
  // Reconstruct from known fields; private/source payloads must not become public content.
  return JSON.parse(
    JSON.stringify({
      revision: c.revision,
      status: c.status,
      intro: c.intro,
      ai: c.ai,
      rfp: c.rfp,
      people: c.people.map((p) =>
        Object.fromEntries(
          [
            "id",
            "name",
            "role",
            "bio",
            "photo",
            "linkedin",
            "skills",
            "evidence",
            "approved",
          ].map((k) => [k, p[k as keyof Person]]),
        ),
      ),
      agents: c.agents.map((a) => ({
        id: a.id,
        name: a.name,
        role: a.role,
        bio: a.bio,
        approved: a.approved,
      })),
      projects: c.projects.map((p) => ({
        id: p.id,
        title: p.title,
        kind: p.kind,
        summary: p.summary,
        url: p.url,
        evidence: p.evidence,
        approved: p.approved,
      })),
      responsibilities: c.responsibilities.map((r) => ({
        area: r.area,
        personId: r.personId,
        support: r.support,
        detail: r.detail,
      })),
    }),
  );
}
