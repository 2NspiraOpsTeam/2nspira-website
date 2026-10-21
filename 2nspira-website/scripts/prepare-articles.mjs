import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { load } from "cheerio/slim";
import { articleReading } from "./lib/article-reading.mjs";

const source = new URL("../src/content/posts/", import.meta.url);
const output = new URL("../src/content/generated/", import.meta.url);
const index = JSON.parse(await readFile(new URL("index.json", source), "utf8"));
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const compiled = [];
for (const { slug } of index) {
  const post = JSON.parse(await readFile(new URL(`${slug}.json`, source), "utf8"));
  const reading = articleReading(post.html, slug);
  const original = load(post.html, null, false);
  original("figure").first().remove();
  const prepared = load(reading.html, null, false);
  assert.equal(normalize(prepared.root().text()), normalize(original.root().text()), `Article wording changed: ${slug}`);
  assert.deepEqual(prepared("a[href]").map((_, e) => prepared(e).attr("href")).get(), original("a[href]").map((_, e) => original(e).attr("href")).get(), `Article destinations changed: ${slug}`);
  compiled.push({ ...post, html: reading.html, reading: { headings: reading.headings, minutes: reading.minutes } });
}
await mkdir(output, { recursive: true });
await writeFile(new URL("posts.json", output), `${JSON.stringify(compiled)}\n`);
console.log(`Prepared ${compiled.length} articles; wording and link preservation checks passed.`);
