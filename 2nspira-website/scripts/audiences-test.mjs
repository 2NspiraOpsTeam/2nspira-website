import { build } from "esbuild";
import { getPlatformProxy } from "wrangler";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
const temp = await mkdtemp(join(tmpdir(), "audiences-test-"));
await writeFile(
  join(temp, "wrangler.json"),
  JSON.stringify({
    name: "team-local-test",
    compatibility_date: "2026-10-01",
    d1_databases: [
      {
        binding: "DB",
        database_name: "team-test",
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
const check = (value, expected) => {
  assert.equal(value, expected);
  checks++;
};
try {
  const db = platform.env.DB;
  for (const statement of (
    await readFile(
      new URL("../migrations/careers/0005_who_we_serve.sql", import.meta.url),
      "utf8",
    )
  )
    .replace(/^--.*$/gm, "")
    .split(";")
    .filter((s) => s.trim()))
    await db.prepare(statement).run();
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
  const token = "a".repeat(64);
  const hash = Buffer.from(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token)),
  ).toString("hex");
  await db
    .prepare("INSERT INTO admins VALUES('qa','qa@example.test','admin',1)")
    .run();
  await db
    .prepare("INSERT INTO admin_sessions VALUES('qa',?,?)")
    .bind(hash, new Date(Date.now() + 3600000).toISOString())
    .run();
  globalThis.__TEAM_ENV = {
    CAREERS_DB: db,
    CAREERS_AUTH_DB: db,
    CAREERS_HIRING_EMAILS: "",
  };
  const output = join(temp, "server.mjs");
  await build({
    entryPoints: [
      new URL("../src/lib/audiences/server.ts", import.meta.url).pathname,
    ],
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
            contents: "export const env=globalThis.__TEAM_ENV;",
            loader: "js",
          }));
        },
      },
    ],
  });
  const { handle, initialContent, publishedContent } = await import(
    pathToFileURL(output)
  );
  const req = (body, headers = {}) =>
    new Request("https://site.test/api/admin/who-we-serve", {
      method: body ? "PUT" : "GET",
      headers: {
        cookie: `admin_session=${token}`,
        origin: "https://site.test",
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  check(
    (await handle(new Request("https://site.test/api/admin/who-we-serve")))
      .status,
    401,
  );
  const c = initialContent();
  c.operationId = crypto.randomUUID();
  check(c.industries.length, 9);
  check((await publishedContent()).organizations.length, 0);
  check((await handle(req(c, { origin: "https://evil.test" }))).status, 403);
  const blank = { ...c, heading: "" };
  check((await handle(req(blank))).status, 400);
  const unsafe = structuredClone(c);
  unsafe.industries[0].href = "javascript:alert(1)";
  check((await handle(req(unsafe))).status, 400);
  const invalid = structuredClone(c);
  invalid.organizations = [
    {
      id: "org",
      name: "QA",
      relationship: "Internal project",
      logo: "https://example.test/logo.webp",
      href: "",
      evidence: "",
      permission: "",
      approved: false,
      visible: true,
    },
  ];
  check((await handle(req(invalid))).status, 400);
  const badPage = structuredClone(c);
  badPage.industries.find(i=>i.id === "startups").page.headline = "";
  check((await handle(req(badPage))).status, 400);
  const badExample = structuredClone(c);
  badExample.industries.find(i=>i.id === "retail").page.examples[0].href = "javascript:alert(1)";
  check((await handle(req(badExample))).status, 400);
  const badSeo = structuredClone(c);
  badSeo.industries.find(i=>i.id === "business").page.seoDescription = "x".repeat(321);
  check((await handle(req(badSeo))).status, 400);
  check((await handle(req(c))).status, 200);
  check((await publishedContent()).revision, 1);
  check((await handle(req(c))).status, 200);
  check(
    (await db.prepare("SELECT COUNT(*) n FROM audience_history").first()).n,
    1,
  );
  const stale = { ...c, operationId: crypto.randomUUID() };
  check((await handle(req(stale))).status, 409);
  let saved = (await (await handle(req())).json()).content;
  saved.intro = "QA saved introduction";
  saved.operationId = crypto.randomUUID();
  saved.industries[0].visible = false;
  saved.organizations = [
    {
      id: "org",
      name: "QA private organization",
      relationship: "Founder experience, not a 2Nspira engagement",
      logo: "https://example.test/logo.webp",
      href: "",
      evidence: "PRIVATE_EVIDENCE",
      permission: "PRIVATE_PERMISSION",
      approved: true,
      visible: true,
    },
  ];
  saved.showOrganizations = true;
  check((await handle(req(saved))).status, 200);
  const pub = await publishedContent();
  check(pub.intro, "QA saved introduction");
  check(pub.industries.length, 6);
  check(pub.organizations.length, 1);
  check(JSON.stringify(pub).includes("PRIVATE_"), false);
  let next = (await (await handle(req())).json()).content;
  next.operationId = crypto.randomUUID();
  next.showOrganizations = false;
  check((await handle(req(next))).status, 200);
  check((await publishedContent()).organizations.length, 0);
  check(
    (await db.prepare("SELECT COUNT(*) n FROM audience_history").first()).n,
    3,
  );
  // A failing audit write must roll back the content update in the same D1 batch.
  await db
    .prepare(
      "CREATE TRIGGER reject_audience_audit BEFORE INSERT ON audience_history BEGIN SELECT RAISE(ABORT,'synthetic audit failure'); END",
    )
    .run();
  next = (await (await handle(req())).json()).content;
  next.operationId = crypto.randomUUID();
  next.intro = "Must roll back";
  check((await handle(req(next))).status, 503);
  check((await publishedContent()).intro, "QA saved introduction");
  await db.prepare("DROP TRIGGER reject_audience_audit").run();
  // Simulate a pre-expansion saved JSON document: no migration or lost edits.
  const legacy = structuredClone(c);
  legacy.revision = 20;
  legacy.heading = "Retained owner heading";
  legacy.industries = legacy.industries.filter(i=>!["startups","technology"].includes(i.id)).map(i=>{delete i.page;return i;});
  legacy.industries.find(i=>i.id === "education").help = "Owner-edited education wording";
  await db.prepare("UPDATE audience_content SET revision=20,content_json=? WHERE id=1").bind(JSON.stringify(legacy)).run();
  const upgraded = (await (await handle(req())).json()).content;
  check(upgraded.revision, 20);
  check(upgraded.heading, "Retained owner heading");
  check(upgraded.industries.length, 9);
  check(upgraded.industries.filter(i=>i.id === "retail").length, 1);
  check(upgraded.industries.filter(i=>i.id === "business").length, 1);
  check(upgraded.industries.filter(i=>i.page).length, 4);
  check(upgraded.industries.find(i=>i.id === "education").help, "Owner-edited education wording");
  upgraded.industries.find(i=>i.id === "startups").page.headline = "Owner-edited founder headline";
  upgraded.industries.find(i=>i.id === "startups").visible = false;
  upgraded.operationId = crypto.randomUUID();
  check((await handle(req(upgraded))).status, 200);
  const reloaded = (await (await handle(req())).json()).content;
  check(reloaded.industries.find(i=>i.id === "startups").page.headline, "Owner-edited founder headline");
  check(reloaded.industries.find(i=>i.id === "startups").visible, false);
  check((await publishedContent()).industries.some(i=>i.id === "startups"), false);
  console.log(
    `${checks} audience handler/D1 checks passed; synthetic isolated data only.`,
  );
} finally {
  await platform.dispose();
}
