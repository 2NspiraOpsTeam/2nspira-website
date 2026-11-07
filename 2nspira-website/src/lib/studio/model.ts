export type Group = {
  id: string;
  name: string;
  description: string;
  visible: boolean;
};
export type Category = {
  id: string;
  name: string;
  groupIds: string[];
  visible: boolean;
};
export type Item = {
  id: string;
  title: string;
  description: string;
  type: string;
  categoryIds: string[];
  status: "draft" | "published";
  featured: boolean;
  image: string;
  imageAlt: string;
  url: string;
  purchaseUrl: string;
  body: string;
  author: string;
};
export type NavLink = {
  id: string;
  name: string;
  groupId: string;
  categoryId: string;
  url: string;
  visible: boolean;
};
export type Studio = {
  revision: number;
  status: "draft" | "published";
  intro: string;
  groups: Group[];
  categories: Category[];
  links: NavLink[];
  items: Item[];
};
export type NavigationLink = { name: string; href: string };
export const itemUrl = (item: Item) =>
  item.url || `/creative-studio/${item.id}`;
export const groupUrl = (id: string) => `/studio#${id}`;
export const categoryUrl = (id: string) =>
  `/studio?category=${encodeURIComponent(id)}#collections`;
export function safeUrl(value: string, image = false) {
  if (!value) return true;
  if (/^\/(?!\/)[^\\\s\u0000-\u001f]*$/.test(value)) return true;
  try {
    const u = new URL(value);
    return (
      u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      (!image || !u.pathname.toLowerCase().endsWith(".svg"))
    );
  } catch {
    return false;
  }
}
export function publicStudio(c: Studio): Studio {
  const groups = c.groups.filter((g) => g.visible);
  const categories = c.categories.filter(
    (cat) =>
      cat.visible && cat.groupIds.some((id) => groups.some((g) => g.id === id)),
  );
  const items = c.items.filter(
    (i) =>
      i.status === "published" &&
      i.categoryIds.some((id) => categories.some((cat) => cat.id === id)),
  );
  const populated = categories.filter((cat) =>
    items.some((i) => i.categoryIds.includes(cat.id)),
  );
  const active = groups.filter((g) =>
    populated.some((cat) => cat.groupIds.includes(g.id)),
  );
  return {
    ...c,
    groups: active,
    categories: populated,
    items,
    links: c.links.filter(
      (l) =>
        l.visible &&
        active.some((g) => g.id === l.groupId) &&
        (!l.categoryId ||
          populated.some(
            (cat) =>
              cat.id === l.categoryId && cat.groupIds.includes(l.groupId),
          )),
    ),
  };
}
export function studioNavigation(c: Studio): NavigationLink[] {
  const p = publicStudio(c);
  return [
    ...p.links.map((l) => ({
      name:
        l.name ||
        p.categories.find((cat) => cat.id === l.categoryId)?.name ||
        p.groups.find((g) => g.id === l.groupId)!.name,
      href:
        l.url ||
        (l.categoryId ? categoryUrl(l.categoryId) : groupUrl(l.groupId)),
    })),
    { name: "Explore Creative Studio", href: "/studio" },
  ];
}
export function validateStudio(value: unknown): Studio {
  if (!value || typeof value !== "object")
    throw Error("Invalid studio content.");
  const c = value as Studio;
  if (
    !Number.isSafeInteger(c.revision) ||
    c.revision < 0 ||
    !["draft", "published"].includes(c.status)
  )
    throw Error("Invalid revision or publication status.");
  const str = (v: unknown, label: string, max = 2000) => {
    if (typeof v !== "string" || v.length > max)
      throw Error(`Check ${label} (maximum ${max} characters).`);
    return v.trim();
  };
  const bool = (v: unknown) => {
    if (typeof v !== "boolean") throw Error("Choose yes or no.");
    return v;
  };
  const list = <T>(rows: T[], name: string, max: number): T[] => {
    if (
      !Array.isArray(rows) ||
      rows.length > max ||
      rows.some((r) => !r || typeof r !== "object")
    )
      throw Error(`Invalid ${name} (maximum ${max}).`);
    const ids = rows.map((r) => (r as { id: string }).id);
    if (
      ids.some(
        (id) =>
          typeof id !== "string" ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
          id.length > 150,
      ) ||
      new Set(ids).size !== ids.length
    )
      throw Error(
        `Use unique, permanent ${name} identifiers with lowercase letters, numbers, and hyphens.`,
      );
    return rows;
  };
  const name = (v: unknown, label: string) => {
    const s = str(v, label, 200);
    if (!s) throw Error(`Provide ${label}.`);
    return s;
  };
  const url = (v: unknown, image = false) => {
    const s = str(v, "URL");
    if (!safeUrl(s, image))
      throw Error(
        "Use an HTTPS URL or a site-relative path, without credentials.",
      );
    return s;
  };
  const groups = list(c.groups, "groups", 30).map((g) => ({
    id: g.id,
    name: name(g.name, "group name"),
    description: str(g.description, "group description"),
    visible: bool(g.visible),
  }));
  const refs = (v: unknown, ids: string[], label: string) => {
    if (
      !Array.isArray(v) ||
      !v.length ||
      v.some((x) => typeof x !== "string" || !ids.includes(x)) ||
      new Set(v).size !== v.length
    )
      throw Error(
        `Choose existing ${label}; remove assignments before deleting them.`,
      );
    return v as string[];
  };
  const categories = list(c.categories, "categories", 100).map((cat) => ({
    id: cat.id,
    name: name(cat.name, "category name"),
    groupIds: refs(
      cat.groupIds,
      groups.map((g) => g.id),
      "groups",
    ),
    visible: bool(cat.visible),
  }));
  const items = list(c.items, "items", 500).map((i) => {
    if (!["draft", "published"].includes(i.status))
      throw Error("Choose draft or published for each item.");
    const item: Item = {
      id: i.id,
      title: name(i.title, "item title"),
      description: str(i.description, "item description"),
      type: name(i.type, "content type"),
      categoryIds: refs(
        i.categoryIds,
        categories.map((cat) => cat.id),
        "categories",
      ),
      status: i.status,
      featured: bool(i.featured),
      image: url(i.image, true),
      imageAlt: str(i.imageAlt, "image description", 400),
      url: url(i.url),
      purchaseUrl: url(i.purchaseUrl),
      body: str(i.body, "content", 60000),
      author: str(i.author, "author", 200),
    };
    if (
      i.status === "published" &&
      (!item.description ||
        (item.image && !item.imageAlt) ||
        (!item.url && !item.body))
    )
      throw Error(
        `${item.title}: add a description, image description, and content or an existing destination before publishing.`,
      );
    if (
      item.type.toLowerCase() === "book" &&
      i.status === "published" &&
      !item.purchaseUrl
    )
      throw Error(`${item.title}: provide the direct purchase URL.`);
    if (
      item.url.startsWith("/creative-studio/") ||
      /^https:\/\/(www\.)?2nspira\.com\/creative-studio\//i.test(item.url)
    )
      throw Error(
        "For a new Studio page leave the existing URL empty; its permanent identifier defines its primary page.",
      );
    return item;
  });
  const normalize = (s: string) => {
    const u = new URL(s, "https://2nspira.com");
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/$/, "")}${u.search}`;
  };
  const destinations = items.map((i) => normalize(itemUrl(i)));
  if (new Set(destinations).size !== destinations.length)
    throw Error(
      "This primary destination already exists. Assign that item to more categories instead of duplicating it.",
    );
  const purchases = items
    .filter((i) => i.purchaseUrl)
    .map((i) => normalize(i.purchaseUrl));
  if (new Set(purchases).size !== purchases.length)
    throw Error(
      "This purchase listing already belongs to another item. Use its existing record and add category assignments.",
    );
  const links = list(c.links, "navigation links", 12).map((l) => {
    const groupId = str(l.groupId, "group");
    const categoryId = str(l.categoryId, "category");
    if (
      !groups.some((g) => g.id === groupId) ||
      (categoryId &&
        !categories.some(
          (cat) => cat.id === categoryId && cat.groupIds.includes(groupId),
        ))
    )
      throw Error("Choose a matching navigation group and category.");
    return {
      id: l.id,
      name: str(l.name, "link label", 200),
      groupId,
      categoryId,
      url: url(l.url),
      visible: bool(l.visible),
    };
  });
  return {
    revision: c.revision,
    status: c.status,
    intro: name(c.intro, "studio introduction"),
    groups,
    categories,
    items,
    links,
  };
}
