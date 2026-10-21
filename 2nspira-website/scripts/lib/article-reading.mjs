import { articleSections } from "./article-sections.mjs";
import { load } from "cheerio/slim";

/** Prepare authored HTML without changing its text, links, or publication dates. */
export function articleReading(html, slug) {
  const $ = load(html, null, false);
  $("figure").first().remove(); // The page already renders this image as its hero.
  // Restore explicit source headings; never guess headings from sentence length.
  const sectionLabels = articleSections[slug] ?? [];
  $("p").each((_, element) => {
    const paragraph = $(element);
    const text = paragraph.text().trim();
    if (sectionLabels.includes(text)) {
      const heading = $("<h2></h2>").html(paragraph.html() ?? "");
      paragraph.replaceWith(heading);
    } else if (text.length >= 180 && paragraph.find("strong").text().trim() === text) {
      // Older exports made entire body paragraphs bold, obscuring visual hierarchy.
      paragraph.find("strong").each((_, strong) => { $(strong).replaceWith($(strong).html() ?? ""); });
    }
  });
  if ($("h2").length === 0) {
    $("h3").each((_, element) => {
      const heading = $(element);
      heading.replaceWith($("<h2></h2>").attr(heading.attr() ?? {}).html(heading.html() ?? ""));
    });
  }
  const used = new Set();
  $("[id]").each((_, element) => { const id = $(element).attr("id"); if (id) used.add(id); });
  const headings = [];
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
  $("a[href]").each((_, element) => {
    const anchor = $(element);
    if (anchor.text().trim() || anchor.find("img[alt], svg[aria-label]").length || anchor.attr("aria-label")) return;
    // Legacy imports include whitespace-only source links. Keep destinations intact.
    try {
      const url = new URL(anchor.attr("href"), "https://2nspira.com");
      anchor.attr("aria-label", `Supporting source: ${url.hostname.replace(/^www\./, "")}`);
    } catch { anchor.attr("aria-label", "Supporting source"); }
  });
  const words = $.root().text().trim().split(/\s+/).filter(Boolean).length;
  return { html: $.html(), headings, minutes: Math.max(1, Math.ceil(words / 220)) };
}
