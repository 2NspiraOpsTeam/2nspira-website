import { build } from "esbuild";
import { getPlatformProxy } from "wrangler";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
const temp = await mkdtemp(join(tmpdir(), "platforms-test-"));
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
      new URL("../migrations/careers/0006_platforms_technologies.sql", import.meta.url),
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
      new URL("../src/lib/platforms/server.ts", import.meta.url).pathname,
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
    new Request("https://site.test/api/admin/platforms-technologies", {
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
    (await handle(new Request("https://site.test/api/admin/platforms-technologies")))
      .status,
    401,
  );
  const c = initialContent();
  c.operationId = crypto.randomUUID();
  check(c.platforms.length, 30);
  check((await publishedContent()).platforms.length, 30);
  check((await handle(req(c, { origin: "https://evil.test" }))).status, 403);
  check((await handle(req({...c,heading:""}))).status,400);
  for (const patch of [{logo:"javascript:alert(1)"},{logo:"//evil.test/logo.svg"},{logo:"/images/../private.svg"},{source:"https://user:pass@example.test/logo.svg"},{evidence:""},{name:""}]) {
    const invalid=structuredClone(c); Object.assign(invalid.platforms[0],patch);
    check((await handle(req(invalid))).status,400);
  }
  const duplicate=structuredClone(c); duplicate.platforms[1].id=duplicate.platforms[0].id;
  check((await handle(req(duplicate))).status,400);
  check((await handle(req(c))).status, 200);
  check((await (await handle(req())).json()).content.revision, 1);
  check((await handle(req(c))).status, 200);
  check(
    (await db.prepare("SELECT COUNT(*) n FROM platform_history").first()).n,
    1,
  );
  const stale = { ...c, operationId: crypto.randomUUID() };
  check((await handle(req(stale))).status, 409);
  let saved = (await (await handle(req())).json()).content;
  saved.intro = "QA saved introduction";
  saved.operationId = crypto.randomUUID();
  saved.platforms[0].visible = false;
  saved.platforms.reverse();
  saved.platforms[0].evidence="PRIVATE_EVIDENCE";
  check((await handle(req(saved))).status,200);
  const pub=await publishedContent();
  check(pub.intro,"QA saved introduction");
  check(pub.platforms.length,29);
  check(pub.platforms[0].name,"Node.js");
  check(JSON.stringify(pub).includes("PRIVATE_"),false);
  check(JSON.stringify(pub).includes('"source"'),false);
  let next=(await (await handle(req())).json()).content;
  next.platforms=[]; next.operationId=crypto.randomUUID();
  check((await handle(req(next))).status,200);
  check((await publishedContent()).platforms.length,0);
  check((await db.prepare("SELECT COUNT(*) n FROM platform_history").first()).n,3);
  // A failing audit write must roll back the content update in the same D1 batch.
  await db
    .prepare(
      "CREATE TRIGGER reject_platform_audit BEFORE INSERT ON platform_history BEGIN SELECT RAISE(ABORT,'synthetic audit failure'); END",
    )
    .run();
  next = (await (await handle(req())).json()).content;
  next.operationId = crypto.randomUUID();
  next.intro = "Must roll back";
  check((await handle(req(next))).status, 503);
  check((await publishedContent()).intro, "QA saved introduction");
  await db.prepare("DROP TRIGGER reject_platform_audit").run();
  console.log(
    `${checks} platform handler/D1 checks passed; synthetic isolated data only.`,
  );
} finally {
  await platform.dispose();
}
