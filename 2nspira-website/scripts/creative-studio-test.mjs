import { build } from "esbuild";
import { getPlatformProxy } from "wrangler";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
const temp = await mkdtemp(join(tmpdir(), "studio-test-"));
await writeFile(
  join(temp, "wrangler.json"),
  JSON.stringify({
    name: "studio-local-test",
    compatibility_date: "2026-10-01",
    d1_databases: [
      {
        binding: "DB",
        database_name: "studio-test",
        database_id: "00000000-0000-0000-0000-000000000001",
      },
    ],
  }),
);
const platform = await getPlatformProxy({
  configPath: join(temp, "wrangler.json"),
  persist: false,
});
let checks = 0;
const check = (a, b) => {
  assert.deepEqual(a, b);
  checks++;
};
try {
  const db = platform.env.DB;
  for (const sql of (
    await readFile(
      new URL(
        "../migrations/careers/0004_creative_studio.sql",
        import.meta.url,
      ),
      "utf8",
    )
  )
    .replace(/^--.*$/gm, "")
    .split(";")
    .filter((s) => s.trim()))
    await db.prepare(sql).run();
  await db
    .prepare(
      "CREATE TABLE admins(id TEXT PRIMARY KEY,email TEXT,role TEXT,is_active INTEGER)",
    )
    .run();
  await db
    .prepare(
      "CREATE TABLE admin_sessions(admin_id TEXT,token_hash TEXT,expires_at TEXT)",
    )
    .run();
  const token = "a".repeat(64),
    hash = Buffer.from(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token)),
    ).toString("hex");
  await db
    .prepare(
      "INSERT INTO admins VALUES('qa','studio-qa@example.test','admin',1)",
    )
    .run();
  await db
    .prepare("INSERT INTO admin_sessions VALUES('qa',?,?)")
    .bind(hash, new Date(Date.now() + 3600000).toISOString())
    .run();
  globalThis.__STUDIO_ENV = { CAREERS_DB: db, CAREERS_AUTH_DB: db };
  const output = join(temp, "server.mjs");
  await build({
    stdin: {
      contents:
        'export * from "./src/lib/studio/server";export * from "./src/lib/studio/model";export * from "./src/lib/studio/seed";export * from "./src/lib/studio/media";',
      resolveDir: process.cwd(),
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: output,
    plugins: [
      {
        name: "env",
        setup(b) {
          b.onResolve({ filter: /^cloudflare:workers$/ }, () => ({
            path: "env",
            namespace: "fake",
          }));
          b.onLoad({ filter: /.*/, namespace: "fake" }, () => ({
            contents: "export const env=globalThis.__STUDIO_ENV;",
            loader: "js",
          }));
        },
      },
    ],
  });
  const {
    handle,
    initialStudio,
    publishedStudio,
    validateStudio,
    publicStudio,
    studioVideoIds,
    studioNavigation,
    uploadImage,
    serveImage,
  } = await import(pathToFileURL(output));
  const req = (body, headers = {}) =>
    new Request("https://site.test/api/admin/creative-studio", {
      method: body ? "PUT" : "GET",
      headers: {
        cookie: `admin_session=${token}`,
        origin: "https://site.test",
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  check((await handle(req(null, { cookie: "" }))).status, 401);
  check(
    (await handle(req(initialStudio(), { origin: "https://evil.test" })))
      .status,
    403,
  );
  const c = validateStudio(initialStudio());
  check(
    c.groups.map((g) => g.name),
    ["Watch", "Listen", "Read", "Play"],
  );
  check(
    studioNavigation(c).map((l) => l.name),
    ["Explore Creative Studio", "Watch", "Listen", "Read", "Play"],
  );
  check(studioNavigation(c).map(l => l.href), ["/studio", "/studio/watch", "/studio/listen", "/studio/read", "/studio/play"]);
  check(publicStudio(c).items.find(i => i.id === "breadcrumb")?.url, "https://breadcrumb-challenge.vercel.app/");
  check(publicStudio(c).items.find(i => i.id === "breadcrumb")?.featured, true);
  check(studioVideoIds(c,"watch"), ["hWk6mH_t0Cs"]);
  check(studioVideoIds(c,"listen").length, 3);
  const hiddenMedia=structuredClone(c);
  hiddenMedia.items.find(i=>i.url.includes("_3T_1ZhlzQM")).status="draft";
  check(studioVideoIds(hiddenMedia,"listen").length,2);
  hiddenMedia.categories.find(cat=>cat.id==="music-ambience").visible=false;
  check(studioVideoIds(hiddenMedia,"listen").length,0);
  check(c.items.filter((i) => i.type === "Channel").length, 1);
  check(new Set(c.items.map((i) => i.url || i.id)).size, c.items.length);
  const seeded = (await publishedStudio()).items.length;
  c.groups.push({
    id: "learn",
    name: "Learn",
    description: "Future audio",
    visible: true,
  });
  c.categories.push({
    id: "audio",
    name: "Audio",
    groupIds: ["learn"],
    visible: true,
  });
  c.links.push({
    id: "learn",
    name: "",
    groupId: "learn",
    categoryId: "",
    url: "",
    visible: true,
  });
  check(
    publicStudio(c).groups.some((g) => g.id === "learn"),
    false,
  );
  c.items.push({
    id: "qa-article",
    title: "QA article",
    description: "A fictional article for testing.",
    type: "Article",
    categoryIds: ["insights", "audio"],
    status: "draft",
    featured: true,
    image: "",
    imageAlt: "",
    url: "",
    purchaseUrl: "",
    body: "First paragraph.\n\nSecond paragraph.",
    author: "QA author",
  });
  check((await handle(req(c))).status, 200);
  check((await publishedStudio()).items.length, seeded);
  let d = (await (await handle(req())).json()).content;
  check(d.items.at(-1).body, c.items.at(-1).body);
  check((await handle(req(c))).status, 409);
  d.items.at(-1).status = "published";
  d.status = "published";
  check((await handle(req(d))).status, 200);
  const p = await publishedStudio();
  check(p.items.filter((i) => i.id === "qa-article").length, 1);
  check(
    p.groups.some((g) => g.id === "learn"),
    true,
  );
  check(
    studioNavigation(p).some((l) => l.name === "Learn"),
    true,
  );
  let current = (await (await handle(req())).json()).content;
  current.groups.find((g) => g.id === "learn").visible = false;
  current.status = "published";
  check((await handle(req(current))).status, 200);
  check(
    (await publishedStudio()).groups.some((g) => g.id === "learn"),
    false,
  );
  current = (await (await handle(req())).json()).content;
  current.items.find((i) => i.id === "youtube-channel").url =
    "https://www.youtube.com/@2Nspira?test=1";
  check((await handle(req(current))).status, 200);
  current = (await (await handle(req())).json()).content;
  const duplicate = structuredClone(current);
  duplicate.items.push({ ...duplicate.items[0], id: "duplicate" });
  check((await handle(req(duplicate))).status, 400);
  const bad = structuredClone(current);
  bad.items[0].url = "javascript:alert(1)";
  check((await handle(req(bad))).status, 400);
  const missing = structuredClone(current);
  missing.categories = missing.categories.filter(
    (cat) => cat.id !== "insights",
  );
  check((await handle(req(missing))).status, 400);
  const book = structuredClone(current);
  book.items.find((i) => i.type === "Book").purchaseUrl = "";
  check((await handle(req(book))).status, 400);
  const hidden = structuredClone(current);
  hidden.categories.forEach((cat) => (cat.visible = false));
  hidden.status = "published";
  check((await handle(req(hidden))).status, 200);
  check((await publishedStudio()).items.length, 0);
  check(studioNavigation(await publishedStudio()).length, 1);
  const history = await db
    .prepare("SELECT COUNT(*) n FROM creative_studio_history")
    .first();
  check(history.n, 5);
  check(
    (
      await uploadImage(
        new Request("https://site.test/api/admin/creative-studio/image", {
          method: "POST",
          headers: {
            origin: "https://site.test",
            "Content-Type": "image/webp",
          },
          body: "fake",
        }),
      )
    ).status,
    401,
  );
  check(
    (
      await serveImage(
        new Request("https://site.test/api/creative-studio/images/not-valid"),
      )
    ).status,
    404,
  );
  // Image permissions follow publication, not upload success.
  await db.prepare("UPDATE admins SET is_active=1 WHERE id='qa'").run();
  const imageBytes = await readFile(
    new URL("../public/images/shop/rare-books-website.webp", import.meta.url),
  );
  const uploaded = await uploadImage(
    new Request("https://site.test/api/admin/creative-studio/image", {
      method: "POST",
      headers: {
        cookie: `admin_session=${token}`,
        origin: "https://site.test",
        "Content-Type": "image/webp",
      },
      body: imageBytes,
    }),
  );
  check(uploaded.status, 200);
  const imageUrl = (await uploaded.json()).url;
  check(
    (await serveImage(new Request("https://site.test" + imageUrl))).status,
    401,
  );
  const nextImage = (await (await handle(req())).json()).content;
  nextImage.categories[0].visible = true;
  nextImage.items.find((item) => item.id === "youtube-channel").image = imageUrl;
  nextImage.status = "published";
  check((await handle(req(nextImage))).status, 200);
  const served = await serveImage(new Request("https://site.test" + imageUrl));
  check(served.status, 200);
  check(Buffer.from(await served.arrayBuffer()).equals(imageBytes), true);
  // Concurrent edits claim one revision; the losing editor cannot overwrite it.
  const race = (await (await handle(req())).json()).content;
  const outcomes = await Promise.all([
    handle(req({ ...race, intro: "First concurrent editor" })),
    handle(req({ ...race, intro: "Second concurrent editor" })),
  ]);
  check(outcomes.map((r) => r.status).sort(), [200, 409]);
  // Revoked sessions cannot read drafts or publish.
  await db.prepare("UPDATE admins SET is_active=0 WHERE id='qa'").run();
  check((await handle(req())).status, 401);
  console.log(
    `${checks} Creative Studio checks passed using isolated D1 and fictional admin/content; no production writes.`,
  );
} finally {
  await platform.dispose();
}
