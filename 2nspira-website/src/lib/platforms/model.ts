export type Platform = {
  id: string; name: string; logo: string; source: string; evidence: string; visible: boolean;
};
export type Content = { revision: number; operationId: string; heading: string; intro: string; platforms: Platform[] };
export function validateContent(value: unknown): Content {
  if (!value || typeof value !== "object") throw Error("Invalid page content.");
  const c = value as Content;
  if (!Number.isSafeInteger(c.revision) || c.revision < 0 || typeof c.operationId !== "string" || !/^[a-f0-9-]{36}$/.test(c.operationId)) throw Error("Invalid revision or save identifier.");
  const text = (v: unknown, label: string, required = false) => {
    if (typeof v !== "string" || v.length > 3000 || (required && !v.trim())) throw Error(`Provide ${label} (up to 3,000 characters).`);
    return v.trim();
  };
  const url = (v: unknown, local = false) => {
    const s = text(v, "logo or source URL");
    if (!s) return s;
    if (/[\u0000-\u0020\u007f\\]/.test(s)) throw Error("Use a valid HTTPS URL or local image path.");
    if (local && /^\/images\/[a-zA-Z0-9_./-]+$/.test(s) && !s.includes("..")) return s;
    try { const u = new URL(s); if (u.protocol === "https:" && !u.username && !u.password) return s; } catch {}
    throw Error("Use a valid HTTPS URL or local image path.");
  };
  if (!Array.isArray(c.platforms) || c.platforms.length > 100) throw Error("Use no more than 100 platforms.");
  const ids = new Set<string>();
  return { revision:c.revision, operationId:c.operationId, heading:text(c.heading,"heading",true), intro:text(c.intro,"introduction",true), platforms:c.platforms.map(p => {
    if (!p || typeof p !== "object" || typeof p.visible !== "boolean") throw Error("Choose platform visibility.");
    const id = text(p.id,"unique identifier",true);
    if (ids.has(id)) throw Error("Identifiers must be unique."); ids.add(id);
    const row = {id,name:text(p.name,"platform name",p.visible),logo:url(p.logo,true),source:url(p.source),evidence:text(p.evidence,"experience reference"),visible:p.visible};
    if (row.visible && (!row.logo || !row.source || !row.evidence)) throw Error("Visible platforms need a logo, official logo source and genuine experience reference.");
    return row;
  }) };
}
export function publicContent(c: Content) {
  return { heading:c.heading, intro:c.intro, platforms:c.platforms.filter(p=>p.visible && p.logo && p.source && p.evidence).map(({id,name,logo})=>({id,name,logo})) };
}
