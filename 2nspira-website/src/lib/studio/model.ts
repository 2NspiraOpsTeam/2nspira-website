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
  navigationVersion?: number;
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
export const groupUrl = (id: string) => id === "shop" ? "/shop" : ["watch", "listen", "read", "play"].includes(id) ? `/studio/${id}` : `/studio#${id}`;
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
// Upgrade existing saved catalogues without publishing drafts or copying product records.
// Once saved, the marker preserves all subsequent Admin choices (including Listen).
export function upgradeStudio(content: Studio): Studio {
  // Rebrand only the existing bookstore item; preserve visibility, status and ordering.
  content = { ...content, items: content.items.map(item => item.id === "rare-collectible-books" ? {
    ...item,
    url: item.url.replace("https://books.2nspira.com", "https://briarcrypt.com"),
    description: item.description.replaceAll("2Nspira Books", "Briarcrypt Books"),
    imageAlt: item.imageAlt.replace("2Nspira rare and collectible bookstore", "Briarcrypt Books rare and collectible bookstore"),
  } : item) };
  if (content.navigationVersion === 3) return content;
  if (content.navigationVersion === 2) {
    const next = structuredClone(content);
    next.navigationVersion = 3;
    next.categories = next.categories.map(cat => ({...cat, groupIds:
      cat.id === "music-ambience" ? [...new Set([...cat.groupIds.filter(id => id !== "watch"), "listen"])] :
      ["activity-books", "coloring-books", "printables", "art"].includes(cat.id) ? [...new Set([...cat.groupIds.filter(id => id !== "play"), "shop"])] : cat.groupIds}));
    next.groups = next.groups.map(group => ({...group, description: group.id === "watch" ? "Perspectives on AI, trust, and human-centered leadership." : group.id === "play" ? "The Breadcrumb investigation challenge and Strength Profile self-discovery assessment." : group.description}));
    return next;
  }
  const c = structuredClone(content);
  c.navigationVersion = 2;
  if (!c.groups.some(g => g.id === "shop")) c.groups.push({id:"shop", name:"Shop", description:"Purchase our published books, rare and collectible editions, and other creative products.", visible:true});
  c.categories = c.categories.map(cat => ({...cat, groupIds: cat.id === "collectibles" ? ["shop"] : ["authored-books","activity-books","coloring-books","printables","art"].includes(cat.id) ? [...new Set([...cat.groupIds,"shop"])] : cat.id === "music-ambience" ? [...new Set([...cat.groupIds,"watch"])] : cat.groupIds}));
  const custom = c.links.filter(l => !["watch","listen","read","play","shop"].includes(l.groupId) && l.id !== "explore");
  c.links = [{id:"explore",name:"Explore Creative Studio",groupId:"",categoryId:"",url:"/studio",visible:true}, ...["watch","listen","read","play","shop"].map(id => ({id,name:"",groupId:id,categoryId:"",url:"",visible:true})), ...custom];
  return upgradeStudio(c);
}
export function publicStudio(content: Studio): Studio {
  const c = upgradeStudio(content);
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
        (!l.groupId || active.some((g) => g.id === l.groupId)) &&
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
  return p.links.map(l => ({
    name: l.name || p.categories.find(cat => cat.id === l.categoryId)?.name || p.groups.find(g => g.id === l.groupId)?.name || "Explore Creative Studio",
    href: l.url || (l.categoryId ? categoryUrl(l.categoryId) : l.groupId ? groupUrl(l.groupId) : "/studio"),
  }));
}
export function validateStudio(value: unknown): Studio {
  if (!value || typeof value !== "object")
    throw Error("Invalid studio content.");
  const c = upgradeStudio(value as Studio);
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
      (groupId !== "" && !groups.some((g) => g.id === groupId)) ||
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
    navigationVersion: 3,
    revision: c.revision,
    status: c.status,
    intro: name(c.intro, "studio introduction"),
    groups,
    categories,
    items,
    links,
  };
}
