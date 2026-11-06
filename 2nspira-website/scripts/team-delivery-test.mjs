import { build } from "esbuild";
import { getPlatformProxy } from "wrangler";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
const temp = await mkdtemp(join(tmpdir(), "team-delivery-test-"));
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
      new URL("../migrations/careers/0003_team_delivery.sql", import.meta.url),
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
      new URL("../src/lib/team/server.ts", import.meta.url).pathname,
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
  const { handle, initialContent, publishedContent, uploadPhoto, servePhoto } =
    await import(pathToFileURL(output));
  const request = (body, extra = {}) =>
    new Request("https://site.test/api/admin/team-delivery", {
      method: body ? "PUT" : "GET",
      headers: {
        cookie: `admin_session=${token}`,
        origin: "https://site.test",
        "Content-Type": "application/json",
        ...extra,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  check(
    (await handle(new Request("https://site.test/api/admin/team-delivery")))
      .status,
    401,
  );
  check(await publishedContent(), null);
  check(
    (
      await uploadPhoto(
        new Request("https://site.test/api/admin/team-delivery/photo", {
          method: "POST",
        }),
      )
    ).status,
    401,
  );
  const portrait = await readFile(
    new URL(
      "../public/images/advisory/personal-ai-workspace-v1.webp",
      import.meta.url,
    ),
  );
  const uploadRequest = (data, origin = "https://site.test") =>
    new Request("https://site.test/api/admin/team-delivery/photo", {
      method: "POST",
      headers: {
        cookie: `admin_session=${token}`,
        origin,
        "Content-Type": "image/webp",
      },
      body: data,
    });
  check(
    (await uploadPhoto(uploadRequest(portrait, "https://other.test"))).status,
    403,
  );
  check((await uploadPhoto(uploadRequest(Buffer.from("<svg/>")))).status, 400);
  check((await uploadPhoto(uploadRequest(Buffer.alloc(524289)))).status, 413);
  const uploaded = await uploadPhoto(uploadRequest(portrait));
  check(uploaded.status, 200);
  const portraitUrl = (await uploaded.json()).url;
  const photoRequest = new Request("https://site.test" + portraitUrl);
  check((await servePhoto(photoRequest)).status, 404);
  const privatePhoto = await servePhoto(
    new Request("https://site.test" + portraitUrl, {
      headers: { cookie: `admin_session=${token}` },
    }),
  );
  check(privatePhoto.status, 200);
  check(privatePhoto.headers.get("content-type"), "image/webp");
  assert.deepEqual(Buffer.from(await privatePhoto.arrayBuffer()), portrait);
  checks++;
  const initial = await (await handle(request())).json();
  check(initial.content.people.length, 7);
  check(initial.content.agents.length, 5);
  check(initial.published, false);
  check(
    (await handle(request(initial.content, { origin: "https://other.test" })))
      .status,
    403,
  );
  check(
    (await handle(request({ ...initial.content, status: "published" }))).status,
    400,
  );
  const bad = initialContent();
  bad.people[0].photo = "javascript:alert(1)";
  check((await handle(request(bad))).status, 400);
  const malformed = initialContent();
  malformed.people[0].approved = "yes";
  check((await handle(request(malformed))).status, 400);
  const blank = initialContent();
  blank.intro = "";
  check((await handle(request(blank))).status, 400);
  const save = await handle(request(initial.content));
  check(save.status, 200);
  const saved = (await save.json()).content;
  check(saved.revision, 1);
  check((await (await handle(request())).json()).content.revision, 1);
  check(await publishedContent(), null);
  check((await handle(request(initial.content))).status, 409);
  const twin = await Promise.all([
    handle(request({ ...saved, intro: "QA simultaneous edit A" })),
    handle(request({ ...saved, intro: "QA simultaneous edit B" })),
  ]);
  check(twin.filter((r) => r.status === 200).length, 1);
  check(twin.filter((r) => r.status === 409).length, 1);
  const latest = (await (await handle(request())).json()).content;
  const approved = structuredClone(latest);
  approved.status = "published";
  for (const p of approved.people)
    Object.assign(p, {
      name: p.name || "QA person",
      role: "QA role",
      bio: "QA synthetic biography",
      photo: "/images/leadership/jeffrey-cortez-linkedin-20261103.jpg",
      skills: "QA skills",
      evidence: "/work#teams-management",
      approved: true,
    });
  for (const a of approved.agents)
    Object.assign(a, {
      role: "QA support only",
      bio: "QA AI limitations; requires human review",
      approved: true,
    });
  for (const r of approved.responsibilities)
    Object.assign(r, {
      personId: approved.people[0].id,
      detail: "QA human accountability",
    });
  const noHuman = structuredClone(approved);
  noHuman.responsibilities[0].personId = "adam";
  check((await handle(request(noHuman))).status, 400);
  const noPhoto = structuredClone(approved);
  noPhoto.people[1].photo = "";
  check((await handle(request(noPhoto))).status, 400);
  const unsafe = structuredClone(approved);
  unsafe.projects[0].url = "//bad.test";
  check((await handle(request(unsafe))).status, 400);
  approved.people[0].photo = portraitUrl;
  const published = await handle(request(approved));
  check(published.status, 200);
  const publishedData = (await published.json()).content;
  check((await servePhoto(photoRequest)).status, 200);
  check((await publishedContent()).revision, publishedData.revision);
  const edited = structuredClone(publishedData);
  edited.status = "draft";
  edited.intro = "QA unpublished changes";
  check((await handle(request(edited))).status, 200);
  check((await publishedContent()).intro, publishedData.intro);
  check((await (await handle(request())).json()).content.intro, edited.intro);
  const generalPage = { ...publishedData, revision: edited.revision + 1, responsibilities: [] };
  check((await handle(request(generalPage))).status, 200);
  check((await publishedContent()).responsibilities.length, 0);
  await db.prepare("UPDATE admins SET is_active=0 WHERE id='qa'").run();
  check((await handle(request())).status, 401);
  await db
    .prepare("UPDATE admins SET is_active=1,role='client' WHERE id='qa'")
    .run();
  check((await handle(request())).status, 401);
  console.log(
    `${checks} Team & Delivery handler/D1 checks passed. Synthetic local data only.`,
  );
} finally {
  await platform.dispose();
}
