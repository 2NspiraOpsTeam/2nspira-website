import { build } from "esbuild";
import { getPlatformProxy } from "wrangler";
import { readFile, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
const configDir = await mkdtemp(join(tmpdir(), "careers-db-"));
await writeFile(
  join(configDir, "wrangler.json"),
  JSON.stringify({
    name: "careers-local-tests",
    compatibility_date: "2026-10-01",
    d1_databases: [
      {
        binding: "DB",
        database_name: "careers-test",
        database_id: "00000000-0000-0000-0000-000000000001",
      },
    ],
  }),
);
const platform = await getPlatformProxy({
  configPath: join(configDir, "wrangler.json"),
  persist: false,
});
const database = platform.env.DB;
const schema = await readFile(
  new URL("../migrations/careers/0001.sql", import.meta.url),
  "utf8",
);
for (const statement of schema.split(";").filter((s) => s.trim()))
  await database.prepare(statement).run();
await database
  .prepare(
    "CREATE TABLE admins(id TEXT PRIMARY KEY,email TEXT,role TEXT,is_active INTEGER)",
  )
  .run();
await database
  .prepare(
    "CREATE TABLE admin_sessions(admin_id TEXT,token_hash TEXT,expires_at TEXT)",
  )
  .run();
await database
  .prepare(
    "INSERT INTO admins VALUES('owner','qa-admin@example.test','admin',1)",
  )
  .run();
const adminToken = "a".repeat(64);
const authHash = Buffer.from(
  await crypto.subtle.digest("SHA-256", new TextEncoder().encode(adminToken)),
).toString("hex");
await database
  .prepare("INSERT INTO admin_sessions VALUES('owner',?,?)")
  .bind(authHash, new Date(Date.now() + 3600000).toISOString())
  .run();
globalThis.__CAREER_ENV = {
  CAREERS_DB: database,
  CAREERS_AUTH_DB: database,
  CAREERS_HIRING_EMAILS: "qa-admin@example.test",
  CAREERS_REPLY_TO: "hiring@2nspira.com",
  CAREERS_EMAIL_VERIFIED: "true",
  PORTAL_URL: "https://portal.test",
  GOOGLE_CLIENT_ID: "fake-id",
  GOOGLE_CLIENT_SECRET: "fake-secret",
  GOOGLE_REFRESH_TOKEN: "fake-refresh",
  CAREERS_FROM_EMAIL: "careers@example.test",
};
const dir = await mkdtemp(join(tmpdir(), "careers-tests-"));
await build({
  entryPoints: [
    new URL("../src/lib/careers/admin.ts", import.meta.url).pathname,
    new URL("../src/lib/careers/server.ts", import.meta.url).pathname,
    new URL("../src/lib/careers/model.ts", import.meta.url).pathname,
  ],
  bundle: true,
  format: "esm",
  platform: "node",
  outdir: dir,
  plugins: [
    {
      name: "environment",
      setup(b) {
        b.onResolve({ filter: /^cloudflare:workers$/ }, () => ({
          path: "env",
          namespace: "qa",
        }));
        b.onLoad({ filter: /.*/, namespace: "qa" }, () => ({
          contents: "export const env=globalThis.__CAREER_ENV;",
        }));
      },
    },
  ],
});
const { handle } = await import(pathToFileURL(join(dir, "admin.js")));
const server = await import(pathToFileURL(join(dir, "server.js")));
const model = await import(pathToFileURL(join(dir, "model.js")));
const originalFetch = globalThis.fetch;
const sent = [];
let mailFailure = false;
let tokenFailure = false;
let auth = true;
globalThis.fetch = async (url, options) => {
  if (String(url).startsWith("https://portal.test"))
    return Response.json(auth ? { clients: 0 } : { error: "Unauthorized" }, {
      status: auth ? 200 : 401,
    });
  if (String(url).startsWith("https://oauth2.googleapis.com"))
    return tokenFailure
      ? Response.json({ error: "temporary" }, { status: 503 })
      : Response.json({ access_token: "fake-token" });
  if (String(url).startsWith("https://gmail.googleapis.com")) {
    if (mailFailure)
      return Response.json({ error: "temporary" }, { status: 503 });
    sent.push(JSON.parse(options.body));
    return Response.json({ id: `qa-${sent.length}` });
  }
  throw Error(`Unexpected network: ${url}`);
};
const origin = "https://careers.test";
function req(path = "", method = "GET", body, extra = {}) {
  return new Request(`${origin}/api/admin/careers${path}`, {
    method,
    headers: {
      cookie: `admin_session=${adminToken}`,
      origin: origin,
      "Content-Type": "application/json",
      ...extra,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
let passed = 0;
function check(name, condition) {
  assert.ok(condition, name);
  passed++;
  console.log(`PASS ${name}`);
}
async function applyForm(job, key = crypto.randomUUID(), options = {}) {
  const f = new FormData();
  for (const [k, v] of Object.entries({
    name: "QA Applicant",
    email: "qa@example.test",
    phone: "",
    link: "https://example.test/portfolio",
    cover: "QA cover text",
    privacy: "yes",
    revision: String(job.revision),
    answers: JSON.stringify(
      Object.fromEntries(
        job.questions.map((q) => [
          q.id,
          q.type === "checkbox"
            ? [q.options[0]]
            : q.type === "choice"
              ? q.options[0]
              : "QA job-relevant answer",
        ]),
      ),
    ),
    ...options,
  }))
    if (v !== null) f.set(k, v);
  if (options.resume !== null)
    f.set(
      "resume",
      new File(
        [options.resumeBytes || "%PDF-1.7\nQA resume\n%%EOF"],
        "resume.pdf",
        { type: "application/pdf" },
      ),
    );
  if (options.coverUpload)
    f.set(
      "coverFile",
      new File(["%PDF-1.7\nQA cover\n%%EOF"], "cover.pdf", {
        type: "application/pdf",
      }),
    );
  return new Request(`${origin}/api/careers/${job.id}/apply`, {
    method: "POST",
    headers: {
      Origin: options.origin || origin,
      "Idempotency-Key": key,
      "CF-Connecting-IP": options.ip || crypto.randomUUID(),
    },
    body: f,
  });
}
try {
  check(
    "anonymous Admin denied",
    (await handle(req("", "GET", undefined, { cookie: "" }))).status === 401,
  );
  auth = false;
  await database.prepare("UPDATE admins SET is_active=0").run();
  check("client/invalid session denied", (await handle(req())).status === 401);
  auth = true;
  await database.prepare("UPDATE admins SET is_active=1").run();
  check(
    "cross-origin admin mutation denied",
    (await handle(req("", "POST", undefined, { origin: "https://evil.test" })))
      .status === 403,
  );
  await database
    .prepare(
      "INSERT INTO admins VALUES('other','other-admin@example.test','admin',1)",
    )
    .run();
  const otherToken = "b".repeat(64),
    otherHash = Buffer.from(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(otherToken),
      ),
    ).toString("hex");
  await database
    .prepare("INSERT INTO admin_sessions VALUES('other',?,?)")
    .bind(otherHash, new Date(Date.now() + 3600000).toISOString())
    .run();
  check(
    "valid non-hiring administrator denied",
    (
      await handle(
        req("", "GET", undefined, { cookie: `admin_session=${otherToken}` }),
      )
    ).status === 403,
  );
  await database
    .prepare(
      "UPDATE admin_sessions SET expires_at='2000-01-01T00:00:00.000Z' WHERE admin_id='other'",
    )
    .run();
  check(
    "expired session denied",
    (
      await handle(
        req("", "GET", undefined, { cookie: `admin_session=${otherToken}` }),
      )
    ).status === 401,
  );
  check("seed draft", (await handle(req("", "POST"))).status === 200);
  check(
    "draft absent from public listing",
    (await server.publicJobs()).length === 0,
  );
  check(
    "draft cannot be read publicly",
    await server.job(model.firstJob.id, true).then(
      () => false,
      (e) => e.status === 404,
    ),
  );
  let job = (await server.jobs())[0];
  check(
    "six role-specific questions",
    job.questions.length === 6 && job.questions.every((q) => q.required),
  );
  check(
    "incomplete publication blocked",
    (await handle(req("/jobs", "PUT", { ...job, status: "published" })))
      .status === 400,
  );
  check(
    "privacy settings saved",
    (
      await handle(
        req("/settings", "PUT", {
          privacyEmail: "privacy@example.test",
          accommodationEmail: "hiring@example.test",
          retentionDays: 180,
          retentionStatus: "approved",
          retentionBasis: "Synthetic applicability review — QA only",
        }),
      )
    ).status === 200,
  );
  check(
    "public privacy response omits internal retention basis",
    !("retentionBasis" in (await server.publicPrivacy())),
  );
  job = {
    ...job,
    title: "QA Synthetic Opening",
    resumeOrProfile: false,
    location: "QA Remote",
    employmentType: "QA Contract",
    compensation: "USD 50–75/hour",
    description: "QA description",
    responsibilities: "QA responsibilities",
    qualifications: "QA qualifications",
    hiringEmail: "qa-hiring@example.test",
    postingReviewed: true,
    status: "published",
    coverRequired: true,
    questions: [
      ...job.questions,
      {
        id: "short",
        label: "Short answer",
        type: "short",
        required: true,
        options: [],
      },
      {
        id: "choice",
        label: "Single choice",
        type: "choice",
        required: true,
        options: ["A", "B"],
      },
      {
        id: "check",
        label: "Multiple choices",
        type: "checkbox",
        required: true,
        options: ["X", "Y"],
      },
    ],
  };
  let r = await handle(req("/jobs", "PUT", job));
  assert.equal(r.status, 200, await r.clone().text());
  job = (await r.json()).job;
  check(
    "published opening persists after read",
    (await server.job(job.id, true)).title === job.title,
  );
  check(
    "public response excludes hiring contact",
    !("hiringEmail" in (await server.publicJobs())[0]),
  );
  check(
    "stale admin save rejected",
    (await handle(req("/jobs", "PUT", { ...job, revision: job.revision - 1 })))
      .status === 409,
  );
  check(
    "missing resume rejected",
    (
      await server.route(async () =>
        server.apply(await applyForm(job, undefined, { resume: null }), job.id),
      )
    ).status === 400,
  );
  check(
    "fake PDF rejected",
    (
      await server.route(async () =>
        server.apply(
          await applyForm(job, undefined, {
            resumeBytes: "<script>bad</script>",
          }),
          job.id,
        ),
      )
    ).status === 400,
  );
  check(
    "required questionnaire rejected",
    (
      await server.route(async () =>
        server.apply(
          await applyForm(job, undefined, { answers: "{}" }),
          job.id,
        ),
      )
    ).status === 400,
  );
  check(
    "required cover rejected",
    (
      await server.route(async () =>
        server.apply(await applyForm(job, undefined, { cover: "" }), job.id),
      )
    ).status === 400,
  );
  check(
    "cross-origin application rejected",
    (
      await server.route(async () =>
        server.apply(
          await applyForm(job, undefined, { origin: "https://evil.test" }),
          job.id,
        ),
      )
    ).status === 403,
  );
  check(
    "oversized upload rejected",
    await server
      .pdf(
        new File(["%PDF-" + ".".repeat(3 * 1024 * 1024)], "big.pdf", {
          type: "application/pdf",
        }),
        true,
      )
      .then(
        () => false,
        (e) => e.status === 400,
      ),
  );
  check(
    "invalid checkbox option rejected",
    model.validateAnswers(
      { ...job, questions: [job.questions.at(-1)] },
      { check: ["bad"] },
    ).length > 0,
  );
  check(
    "stale questionnaire revision rejected",
    (
      await server.route(async () =>
        server.apply(
          await applyForm(job, undefined, { revision: "0" }),
          job.id,
        ),
      )
    ).status === 409,
  );
  const key = crypto.randomUUID();
  r = await server.route(async () =>
    server.apply(await applyForm(job, key, { coverUpload: true }), job.id),
  );
  assert.equal(r.status, 201, await r.clone().text());
  const id = (await r.json()).id;
  check(
    "application with PDF uploads and all question types saved",
    Boolean(id),
  );
  check(
    "confirmation and hiring messages accepted by mock provider",
    sent.length === 2,
  );
  const mime = Buffer.from(sent[0].raw, "base64url").toString();
  check(
    "confirmation is addressed to applicant",
    mime.includes("To: qa@example.test"),
  );
  check(
    "confirmation has monitored Reply-To",
    mime.includes("Reply-To: hiring@2nspira.com"),
  );
  const confirmationBody = Buffer.from(
    mime.split("\r\n\r\n")[1],
    "base64",
  ).toString();
  check(
    "confirmation includes submission date and reference",
    confirmationBody.includes("Submitted:") &&
      confirmationBody.includes(id) &&
      confirmationBody.includes(job.title),
  );
  check(
    "confirmation omits questionnaire responses and documents",
    !confirmationBody.includes("QA job-relevant answer") &&
      !mime.includes("application/pdf"),
  );
  r = await server.route(async () =>
    server.apply(await applyForm(job, key, { coverUpload: true }), job.id),
  );
  check(
    "same submission retry returns existing receipt",
    r.status === 200 && (await r.json()).id === id && sent.length === 2,
  );
  r = await handle(req(`/applications/${id}`));
  const detail = await r.json();
  check(
    "candidate includes questionnaire snapshot and cover text",
    detail.application.questions.length === 9 &&
      detail.application.cover === "QA cover text" &&
      detail.application.answers.check[0] === "X",
  );
  check(
    "private document key is not exposed",
    !("resumeKey" in detail.application),
  );
  r = await handle(req(`/applications/${id}/file?kind=resume`));
  check(
    "authorized resume download returns original bytes",
    r.status === 200 && (await r.text()).startsWith("%PDF-"),
  );
  check(
    "downloads forced attachment/no-store",
    r.headers.get("content-disposition").includes("attachment") &&
      r.headers.get("cache-control").includes("no-store"),
  );
  check(
    "anonymous document download denied",
    (
      await handle(
        req(`/applications/${id}/file?kind=resume`, "GET", undefined, {
          cookie: "",
        }),
      )
    ).status === 401,
  );
  check(
    "unknown application denied",
    (await handle(req("/applications/not-found"))).status === 404,
  );
  for (const status of ["Reviewing", "Interviewing", "Closed", "New"])
    check(
      `status ${status} persists`,
      (await handle(req(`/applications/${id}`, "PATCH", { status }))).status ===
        200 &&
        (await (await handle(req(`/applications/${id}`))).json()).application
          .status === status,
    );
  check(
    "invalid status rejected",
    (await handle(req(`/applications/${id}`, "PATCH", { status: "Hired!" })))
      .status === 400,
  );
  const before = job;
  job = await server.saveJob({ ...job, questions: [] });
  check(
    "editing role preserves historical questionnaire",
    (await (await handle(req(`/applications/${id}`))).json()).application
      .questions.length === 9,
  );
  job = await server.saveJob({ ...job, questions: before.questions });
  mailFailure = true;
  r = await server.route(async () =>
    server.apply(
      await applyForm(job, undefined, { coverUpload: true }),
      job.id,
    ),
  );
  assert.equal(r.status, 201, await r.clone().text());
  const failureId = (await r.json()).id;
  check("mail outage does not lose accepted application", Boolean(failureId));
  check(
    "uncertain provider outcomes not blindly retried",
    (
      await (await handle(req(`/applications/${failureId}`))).json()
    ).notifications.every((n) => n.status === "unknown"),
  );
  mailFailure = false;
  await server.deliver(failureId);
  check("retry avoids duplicate uncertain sends", sent.length === 2);
  check(
    "header-injection email rejected",
    !model.emailValid("a,b@example.test"),
  );
  check(
    "malformed opening rejected",
    (await handle(req("/jobs", "PUT", null))).status === 400,
  );
  const binary = new TextEncoder().encode("%PDF-1.7\n" + ".".repeat(900000));
  await server.files.put("qa/multichunk.pdf", binary.buffer);
  check(
    "multi-chunk PDF storage is byte-exact",
    Buffer.compare(
      Buffer.from(
        await new Response(
          (await server.files.get("qa/multichunk.pdf")).body,
        ).arrayBuffer(),
      ),
      Buffer.from(binary),
    ) === 0,
  );
  await server.files.delete("qa/multichunk.pdf");
  job = await server.saveJob({ ...job, resumeOrProfile: true });
  let profile = await server.route(async () =>
    server.apply(
      await applyForm(job, undefined, {
        resume: null,
        cover: "",
        coverUpload: true,
      }),
      job.id,
    ),
  );
  check(
    "professional-profile alternative and PDF-only cover accepted",
    profile.status === 201,
  );
  check(
    "profile alternative still requires resume or URL",
    (
      await server.route(async () =>
        server.apply(
          await applyForm(job, undefined, { resume: null, link: "" }),
          job.id,
        ),
      )
    ).status === 400,
  );
  const raceKey = crypto.randomUUID(),
    sentBeforeRace = sent.length;
  const racing = await Promise.all(
    [1, 2].map(() =>
      server.route(async () =>
        server.apply(await applyForm(job, raceKey), job.id),
      ),
    ),
  );
  const raceIds = await Promise.all(racing.map((r) => r.json()));
  check(
    "concurrent double submission creates one application",
    racing.every((r) => r.ok) && raceIds[0].id === raceIds[1].id,
  );
  check(
    "concurrent double submission sends only two notifications",
    sent.length === sentBeforeRace + 2,
  );
  tokenFailure = true;
  const pendingResponse = await server.route(async () =>
    server.apply(await applyForm(job), job.id),
  );
  const pendingId = (await pendingResponse.json()).id;
  check(
    "pre-send failure is safely pending",
    (
      await (await handle(req(`/applications/${pendingId}`))).json()
    ).notifications.every((n) => n.status === "pending"),
  );
  tokenFailure = false;
  const beforeRetry = sent.length;
  await server.deliver(pendingId);
  check(
    "pending notifications retry successfully once",
    sent.length === beforeRetry + 2,
  );
  await server.deliver(pendingId);
  check("sent notifications are not resent", sent.length === beforeRetry + 2);
  check(
    "required profile role data retained",
    (await (await handle(req(`/applications/${raceIds[0].id}`))).json())
      .application.questions.length === job.questions.length,
  );
  const hour = Math.floor(Date.now() / 3600000),
    rateIp = "qa-rate-limit";
  const rateHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${hour}:${rateIp}`),
  );
  const rateKey = Buffer.from(rateHash).toString("hex");
  await database
    .prepare("INSERT INTO career_limits(key,count,expires) VALUES(?,12,?)")
    .bind(rateKey, (hour + 2) * 3600)
    .run();
  check(
    "submission rate limit enforced",
    (
      await server.route(async () =>
        server.apply(await applyForm(job, undefined, { ip: rateIp }), job.id),
      )
    ).status === 429,
  );
  job = await server.saveJob({ ...job, status: "closed" });
  check(
    "closed role absent from listing",
    (await server.publicJobs()).length === 0,
  );
  check(
    "closed role rejects application",
    (await server.route(async () => server.apply(await applyForm(job), job.id)))
      .status === 404,
  );
  await handle(
    req("/settings", "PUT", {
      privacyEmail: "hiring@2nspira.com",
      accommodationEmail: "hiring@2nspira.com",
      retentionDays: 0,
      retentionStatus: "pending",
      retentionBasis: "",
    }),
  );
  check(
    "pending retention blocks deletion",
    (await handle(req(`/applications/${id}`, "DELETE"))).status === 409,
  );
  await handle(
    req("/settings", "PUT", {
      privacyEmail: "hiring@2nspira.com",
      accommodationEmail: "hiring@2nspira.com",
      retentionDays: 365,
      retentionStatus: "approved",
      retentionBasis: "Synthetic QA policy",
    }),
  );
  check(
    "legal hold can be placed",
    (
      await handle(
        req(`/applications/${id}/hold`, "PATCH", {
          legalHold: true,
          reason: "QA legal preservation",
        }),
      )
    ).status === 200,
  );
  check(
    "legal hold blocks deletion",
    (await handle(req(`/applications/${id}`, "DELETE"))).status === 409,
  );
  await handle(
    req(`/applications/${id}/hold`, "PATCH", {
      legalHold: false,
      reason: "QA release authorization",
    }),
  );
  check(
    "minimum retention prevents early deletion",
    (await handle(req(`/applications/${id}`, "DELETE"))).status === 409,
  );
  const savedData = (
    await database
      .prepare("SELECT data FROM career_applications WHERE id=?")
      .bind(id)
      .first()
  ).data;
  const aged = {
    ...JSON.parse(savedData),
    decisionHistory: [
      { status: "Closed", at: "2000-01-01T00:00:00.000Z", actor: "QA" },
    ],
  };
  await database
    .prepare("UPDATE career_applications SET created_at=?,data=? WHERE id=?")
    .bind("2000-01-01T00:00:00.000Z", JSON.stringify(aged), id)
    .run();
  check(
    "delete removes application",
    (await handle(req(`/applications/${id}`, "DELETE"))).status === 200 &&
      (await handle(req(`/applications/${id}`))).status === 404,
  );
  check(
    "delete removes both documents",
    (
      await database
        .prepare("SELECT COUNT(*) AS n FROM career_files WHERE key IN (?,?)")
        .bind(`applications/${id}/resume.pdf`, `applications/${id}/cover.pdf`)
        .first()
    ).n === 0,
  );
  console.log(
    `\n${passed} meaningful Careers checks passed; synthetic local data only.`,
  );
} finally {
  globalThis.fetch = originalFetch;
  await platform.dispose();
}
