import { load } from "cheerio/slim";

/** Prepare authored HTML without changing its text, links, or publication dates. */
export function articleReading(html: string) {
  const $ = load(html, null, false);
  $("figure").first().remove(); // The page already renders this image as its hero.
  const used = new Set<string>();
  $("[id]").each((_, element) => { const id = $(element).attr("id"); if (id) used.add(id); });
  const headings: { id: string; text: string }[] = [];
  $("h2, h3").each((_, element) => {
    const heading = $(element);
    const text = heading.text().trim();
    if (!text) return;
    let id = heading.attr("id");
    if (!id) {
      const base = text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
      id = base;
      let suffix = 2;
      while (used.has(id)) id = `${base}-${suffix++}`;
      heading.attr("id", id);
      used.add(id);
    }
    if (element.tagName === "h2") headings.push({ id, text });
  });
  const words = $.root().text().trim().split(/\s+/).filter(Boolean).length;
  return { html: $.html(), headings, minutes: Math.max(1, Math.ceil(words / 220)) };
}
