import approvedDraft from "../../content/careers/business-development-lead.draft.json";
import { Buffer } from "node:buffer";
import { env } from "cloudflare:workers";
import {
  firstJob,
  emailValid,
  validateJob,
  validateAnswers,
  type Job,
  type Settings,
} from "./model";
interface Statement {
  bind(...v: unknown[]): Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  run(): Promise<{ meta: { changes: number } }>;
}
interface Database {
  prepare(s: string): Statement;
  batch(s: Statement[]): Promise<unknown[]>;
}
export interface Bucket {
  put(k: string, v: ArrayBuffer, o?: unknown): Promise<unknown>;
  get(k: string): Promise<{ body: ReadableStream } | null>;
  delete(k: string): Promise<void>;
}
type Config = {
  CAREERS_DB?: Database;
  PORTAL_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  CAREERS_FROM_EMAIL?: string;
};
export const config = env as unknown as Config;
export class CareerError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const fail = (status: number, message: string): never => {
  throw new CareerError(status, message);
};
export const db = () =>
  config.CAREERS_DB ||
  fail(503, "Careers is being prepared. Please try again later.");
// Private, bounded chunk storage in the dedicated Careers D1 database. No public object URLs.
export const files: Bucket = {
  async put(key, value) {
    const bytes = new Uint8Array(value);
    const statements = [];
    for (
      let offset = 0, part = 0;
      offset < bytes.length;
      offset += 262144, part++
    ) {
      const encoded = Buffer.from(
        bytes.subarray(offset, offset + 262144),
      ).toString("base64");
      statements.push(
        db()
          .prepare(
            "INSERT INTO career_files(key,part,data,created_at) VALUES(?,?,?,?)",
          )
          .bind(key, part, encoded, new Date().toISOString()),
      );
    }
    await db().batch(statements);
  },
  async get(key) {
    const result = await db()
      .prepare("SELECT data FROM career_files WHERE key=? ORDER BY part")
      .bind(key)
      .all<{ data: string }>();
    if (!result.results.length) return null;
    return {
      body: new ReadableStream({
        start(controller) {
          for (const row of result.results)
            controller.enqueue(Buffer.from(row.data, "base64"));
          controller.close();
        },
      }),
    };
  },
  async delete(key) {
    await db().prepare("DELETE FROM career_files WHERE key=?").bind(key).run();
  },
};
export function response(value: unknown, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function route(run: () => Promise<Response>) {
  try {
    return await run();
  } catch (e) {
    return response(
      {
        error:
          e instanceof CareerError
            ? e.message
            : "Unable to complete the request. Please try again.",
      },
      e instanceof CareerError ? e.status : 503,
    );
  }
}
export function sameOrigin(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    fail(403, "Please submit from this website.");
}
export async function admin(request: Request) {
  if (
    !config.PORTAL_URL ||
    !request.headers.get("cookie")?.includes("admin_session=")
  )
    fail(401, "Please sign in as an administrator.");
  const upstream = await fetch(`${config.PORTAL_URL}/api/admin/stats`, {
    headers: { cookie: request.headers.get("cookie")! },
    redirect: "manual",
    signal: AbortSignal.timeout(10000),
  });
  if (!upstream.ok)
    fail(
      upstream.status === 401 || upstream.status === 403 ? 401 : 503,
      "Admin session could not be verified.",
    );
  const value = (await upstream.json()) as { clients?: unknown };
  if (typeof value.clients !== "number")
    fail(503, "Admin session could not be verified.");
}
export async function jobs(publicOnly = false): Promise<Job[]> {
  const rows = await db()
    .prepare(
      `SELECT data, revision, updated_at FROM career_jobs ${publicOnly ? "WHERE status='published'" : ""} ORDER BY updated_at DESC`,
    )
    .all<{ data: string; revision: number; updated_at: string }>();
  return rows.results.map((r) => ({
    ...JSON.parse(r.data),
    revision: r.revision,
    updatedAt: r.updated_at,
  }));
}
export async function job(id: string, publicOnly = false): Promise<Job> {
  const row = await db()
    .prepare(
      `SELECT data,revision,updated_at FROM career_jobs WHERE id=? ${publicOnly ? "AND status='published'" : ""}`,
    )
    .bind(id)
    .first<{ data: string; revision: number; updated_at: string }>();
  if (!row) return fail(404, "This opening is not available.");
  return {
    ...JSON.parse(row.data),
    revision: row.revision,
    updatedAt: row.updated_at,
  };
}
export async function settings(): Promise<Settings> {
  const row = await db()
    .prepare("SELECT data FROM career_settings WHERE id=1")
    .first<{ data: string }>();
  return row
    ? JSON.parse(row.data)
    : { privacyEmail: "", accommodationEmail: "", retentionDays: 0 };
}
export function mailReady() {
  return Boolean(
    config.GOOGLE_CLIENT_ID &&
    config.GOOGLE_CLIENT_SECRET &&
    config.GOOGLE_REFRESH_TOKEN &&
    emailValid(config.CAREERS_FROM_EMAIL || ""),
  );
}
export async function publicJobs() {
  return (await jobs(true)).map((j) => ({
    id: j.id,
    title: j.title,
    location: j.location,
    employmentType: j.employmentType,
    compensation: j.compensation,
    description: j.description,
    responsibilities: j.responsibilities,
    qualifications: j.qualifications,
    additionalDetails: j.additionalDetails,
    resumeOrProfile: Boolean(j.resumeOrProfile),
    coverRequired: j.coverRequired,
    questions: j.questions,
    revision: j.revision,
  }));
}
export async function saveJob(j: Job) {
  const errors = validateJob(j, j?.status === "published");
  if (errors.length) fail(400, errors.join(" "));
  if (j.status === "published") {
    const s = await settings();
    if (
      !emailValid(s.privacyEmail) ||
      !emailValid(s.accommodationEmail) ||
      !s.retentionDays
    )
      errors.push(
        "Set applicant privacy, retention and accommodation details.",
      );
    if (!config.CAREERS_DB || !mailReady())
      errors.push(
        "Private uploads and confirmation email delivery must be configured before publishing.",
      );
  }
  if (errors.length) fail(400, errors.join(" "));
  const now = new Date().toISOString();
  const { updatedAt, ...clean } = j;
  void updatedAt;
  if (j.revision === 0) {
    const result = await db()
      .prepare(
        "INSERT OR IGNORE INTO career_jobs(id,data,status,revision,updated_at) VALUES(?,?,?,1,?)",
      )
      .bind(j.id, JSON.stringify({ ...clean, revision: 1 }), j.status, now)
      .run();
    if (!result.meta.changes)
      fail(409, "This opening already exists. Reload before editing.");
  } else {
    const result = await db()
      .prepare(
        "UPDATE career_jobs SET data=?,status=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?",
      )
      .bind(
        JSON.stringify({ ...clean, revision: j.revision + 1 }),
        j.status,
        now,
        j.id,
        j.revision,
      )
      .run();
    if (!result.meta.changes)
      fail(
        409,
        "This opening changed in another session. Reload before saving.",
      );
  }
  return job(j.id);
}
export async function seed() {
  await db()
    .prepare(
      "INSERT OR IGNORE INTO career_jobs(id,data,status,revision,updated_at) VALUES(?,?,?,1,?)",
    )
    .bind(
      firstJob.id,
      JSON.stringify({ ...firstJob, ...approvedDraft }),
      "draft",
      new Date().toISOString(),
    )
    .run();
}
export async function boundedBody(request: Request, max: number) {
  if (Number(request.headers.get("content-length") || 0) > max)
    fail(413, "Request is too large.");
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.length;
    if (size > max) {
      await reader.cancel();
      fail(413, "Request is too large.");
    }
    chunks.push(part.value);
  }
  const value = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    value.set(chunk, offset);
    offset += chunk.length;
  }
  return value;
}
export async function readJson(request: Request) {
  try {
    return JSON.parse(
      new TextDecoder().decode(await boundedBody(request, 150000)),
    );
  } catch (e) {
    if (e instanceof CareerError) throw e;
    fail(400, "Invalid form data.");
  }
}
export async function pdf(file: FormDataEntryValue | null, required: boolean) {
  if (!(file instanceof File) || !file.size) {
    if (required) fail(400, "Attach your résumé as a PDF.");
    return null;
  }
  if (file.size > 3 * 1024 * 1024)
    fail(400, "Each PDF must be 3 MB or smaller.");
  const bytes = await file.arrayBuffer();
  if (
    !file.name.toLowerCase().endsWith(".pdf") ||
    file.type !== "application/pdf" ||
    new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-"
  )
    fail(400, "Uploads must be PDF files.");
  return bytes;
}
async function digest(value: string | ArrayBuffer) {
  const buffer =
    typeof value === "string" ? new TextEncoder().encode(value) : value;
  return Array.from(
    new Uint8Array(await crypto.subtle.digest("SHA-256", buffer)),
  )
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
async function limit(request: Request) {
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const hour = Math.floor(Date.now() / 3600000);
  const key = await digest(`${hour}:${ip}`);
  const n = await db()
    .prepare(
      "INSERT INTO career_limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
    )
    .bind(key, (hour + 2) * 3600)
    .first<{ count: number }>();
  if (!n || n.count > 12)
    fail(429, "Too many submissions. Please try again later.");
}
export async function apply(request: Request, id: string) {
  sameOrigin(request);
  const j = await job(id, true);
  if (!config.CAREERS_DB || !mailReady())
    fail(
      503,
      "Applications are temporarily unavailable. Please try again later.",
    );
  const key = request.headers.get("Idempotency-Key") || "";
  if (!/^[a-f0-9-]{36}$/.test(key))
    fail(400, "Reload the application form and try again.");
  if (Number(request.headers.get("content-length") || 0) > 6500000)
    fail(413, "Application is too large.");
  await limit(request);
  const body = await boundedBody(request, 6500000);
  let form: FormData;
  try {
    form = await new Response(body as BodyInit, {
      headers: { "Content-Type": request.headers.get("content-type") || "" },
    }).formData();
  } catch {
    return fail(400, "Invalid application form.");
  }
  if (form.get("website")) fail(400, "Unable to submit application.");
  const name = String(form.get("name") || "").trim(),
    email = String(form.get("email") || "").trim(),
    phone = String(form.get("phone") || "").trim(),
    link = String(form.get("link") || "").trim(),
    cover = String(form.get("cover") || "").trim();
  if (
    !name ||
    name.length > 150 ||
    !emailValid(email) ||
    phone.length > 60 ||
    link.length > 1000 ||
    cover.length > 15000
  )
    fail(400, "Check your name, email and application field lengths.");
  if (link) {
    try {
      const u = new URL(link);
      if (!["https:", "http:"].includes(u.protocol) || u.username || u.password)
        throw Error();
    } catch {
      fail(400, "Use a valid https:// or http:// profile or portfolio link.");
    }
  }
  if (form.get("privacy") !== "yes")
    fail(400, "Acknowledge the applicant privacy information.");
  if (Number(form.get("revision")) !== j.revision)
    fail(
      409,
      "This role changed. Reload to review its current questions before submitting.",
    );
  let answers: Record<string, unknown>;
  try {
    answers = JSON.parse(String(form.get("answers") || "{}"));
  } catch {
    return fail(400, "Invalid questionnaire answers.");
  }
  const errors = validateAnswers(j, answers);
  if (errors.length) fail(400, errors.join(" "));
  const resume = await pdf(form.get("resume"), !j.resumeOrProfile),
    coverFile = await pdf(form.get("coverFile"), false);
  if (j.coverRequired && !cover && !coverFile)
    fail(400, "A cover letter is required. Enter text or attach a PDF.");
  if (!resume && !link)
    fail(400, "Provide a résumé PDF or a professional profile URL.");
  const hash = await digest(
    JSON.stringify({
      id,
      name,
      email,
      phone,
      link,
      cover,
      answers,
      resume: resume ? await digest(resume) : null,
      coverFile: coverFile ? await digest(coverFile) : null,
      revision: j.revision,
    }),
  );
  const previous = await db()
    .prepare(
      "SELECT id,payload_hash FROM career_applications WHERE request_key=?",
    )
    .bind(key)
    .first<{ id: string; payload_hash: string }>();
  if (previous) {
    if (previous.payload_hash !== hash)
      fail(
        409,
        "This submission was already received with different content. Reload to start a new application.",
      );
    return response({ id: previous.id, received: true });
  }
  const applicationId = crypto.randomUUID(),
    resumeKey = resume ? `applications/${applicationId}/resume.pdf` : null,
    coverKey = coverFile ? `applications/${applicationId}/cover.pdf` : null;
  try {
    if (resumeKey) await files.put(resumeKey, resume!);
    if (coverKey) await files.put(coverKey, coverFile!);
  } catch (e) {
    if (resumeKey) await files.delete(resumeKey);
    if (coverKey) await files.delete(coverKey);
    throw e;
  }
  const s = await settings(),
    now = new Date().toISOString();
  const data = {
    name,
    email,
    phone,
    link,
    cover,
    answers,
    questions: j.questions,
    jobTitle: j.title,
    jobRevision: j.revision,
    resumeKey,
    coverKey,
    privacy: { ...s, acknowledgedAt: now },
    expiresAt: new Date(Date.now() + s.retentionDays * 86400000).toISOString(),
  };
  try {
    await db().batch([
      db()
        .prepare(
          "INSERT INTO career_applications(id,job_id,request_key,payload_hash,data,status,created_at) SELECT ?,?,?,?,?,'New',? WHERE EXISTS(SELECT 1 FROM career_jobs WHERE id=? AND status='published' AND revision=?)",
        )
        .bind(
          applicationId,
          id,
          key,
          hash,
          JSON.stringify(data),
          now,
          id,
          j.revision,
        ),
      ...["applicant", "hiring"].map((kind) =>
        db()
          .prepare(
            "INSERT INTO career_mail(id,application_id,kind,recipient,subject,body,updated_at) SELECT ?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM career_applications WHERE id=?)",
          )
          .bind(
            crypto.randomUUID(),
            applicationId,
            kind,
            kind === "applicant" ? email : j.hiringEmail,
            kind === "applicant"
              ? `Application received — ${j.title}`
              : `New application — ${j.title}`,
            kind === "applicant"
              ? `Thank you, ${name}. We received your application for ${j.title} at 2Nspira. Reference: ${applicationId}. This confirms receipt, not an offer or interview. We will contact you if there is a next step. For privacy or accessibility requests: ${s.privacyEmail}.`
              : `A new application for ${j.title} is available in Admin. Sign in at https://2nspira.com/admin/careers . Reference: ${applicationId}. Applicant details and documents are only available after sign-in.`,
            now,
            applicationId,
          ),
      ),
    ]);
  } catch (e) {
    if (resumeKey) await files.delete(resumeKey);
    if (coverKey) await files.delete(coverKey);
    const prior = await db()
      .prepare(
        "SELECT id,payload_hash FROM career_applications WHERE request_key=?",
      )
      .bind(key)
      .first<{ id: string; payload_hash: string }>();
    if (prior && prior.payload_hash === hash)
      return response({ id: prior.id, received: true });
    throw e;
  }
  const saved = await db()
    .prepare("SELECT id FROM career_applications WHERE id=?")
    .bind(applicationId)
    .first();
  if (!saved) {
    if (resumeKey) await files.delete(resumeKey);
    if (coverKey) await files.delete(coverKey);
    fail(409, "This role is no longer accepting applications.");
  }
  await deliver(applicationId);
  return response({ id: applicationId, received: true }, 201);
}
export async function deliver(applicationId: string) {
  const rows = await db()
    .prepare(
      "SELECT * FROM career_mail WHERE application_id=? AND status='pending'",
    )
    .bind(applicationId)
    .all<{ id: string; recipient: string; subject: string; body: string }>();
  for (const row of rows.results) {
    const claim = await db()
      .prepare(
        "UPDATE career_mail SET status='sending',updated_at=? WHERE id=? AND status='pending'",
      )
      .bind(new Date().toISOString(), row.id)
      .run();
    if (!claim.meta.changes) continue;
    try {
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        body: new URLSearchParams({
          client_id: config.GOOGLE_CLIENT_ID!,
          client_secret: config.GOOGLE_CLIENT_SECRET!,
          refresh_token: config.GOOGLE_REFRESH_TOKEN!,
          grant_type: "refresh_token",
        }),
      });
      if (!tokenRes.ok) {
        await db()
          .prepare("UPDATE career_mail SET status='pending' WHERE id=?")
          .bind(row.id)
          .run();
        continue;
      }
      const token = (await tokenRes.json()) as { access_token: string };
      const b64 = (s: string) =>
        btoa(
          Array.from(new TextEncoder().encode(s), (v) =>
            String.fromCharCode(v),
          ).join(""),
        );
      const mime = [
        `From: 2Nspira Careers <${config.CAREERS_FROM_EMAIL}>`,
        `To: ${row.recipient}`,
        `Subject: =?UTF-8?B?${b64(row.subject)}?=`,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: base64",
        "",
        b64(row.body),
      ].join("\r\n");
      const sent = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            raw: b64(mime)
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, ""),
          }),
        },
      );
      if (!sent.ok) {
        await db()
          .prepare("UPDATE career_mail SET status=?,updated_at=? WHERE id=?")
          .bind(
            sent.status >= 500 ? "unknown" : "pending",
            new Date().toISOString(),
            row.id,
          )
          .run();
        continue;
      }
      const result = (await sent.json()) as { id?: string };
      await db()
        .prepare(
          "UPDATE career_mail SET status=?,provider_id=?,updated_at=? WHERE id=?",
        )
        .bind(
          result.id ? "sent" : "unknown",
          result.id || null,
          new Date().toISOString(),
          row.id,
        )
        .run();
    } catch {
      await db()
        .prepare(
          "UPDATE career_mail SET status='unknown',updated_at=? WHERE id=?",
        )
        .bind(new Date().toISOString(), row.id)
        .run();
    }
  }
}
