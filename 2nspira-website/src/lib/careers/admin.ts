import {
  admin,
  sameOrigin,
  response,
  route,
  jobs,
  job,
  seed,
  saveJob,
  settings,
  db,
  readJson,
  fail,
  config,
  files,
  deliver,
  mailReady,
} from "./server";
import { emailValid, type Job, type Settings } from "./model";
export async function handle(request: Request) {
  return route(async () => {
    await admin(request);
    if (request.method !== "GET") sameOrigin(request);
    const path = new URL(request.url).pathname
      .replace("/api/admin/careers", "")
      .split("/")
      .filter(Boolean);
    if (!path.length) {
      if (request.method === "GET")
        return response({
          jobs: await jobs(),
          settings: await settings(),
          mailReady: mailReady(),
          uploadsReady: Boolean(config.CAREERS_DB),
        });
      if (request.method === "POST") {
        await seed();
        return response({ jobs: await jobs() });
      }
    }
    if (path[0] === "settings" && request.method === "PUT") {
      const s = (await readJson(request)) as Settings;
      if (
        !emailValid(s.privacyEmail) ||
        !emailValid(s.accommodationEmail) ||
        !Number.isInteger(s.retentionDays) ||
        s.retentionDays < 1 ||
        s.retentionDays > 730
      )
        fail(
          400,
          "Provide privacy and accommodation emails and a retention period of 1–730 days.",
        );
      await db()
        .prepare(
          "INSERT INTO career_settings(id,data) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data",
        )
        .bind(JSON.stringify(s))
        .run();
      return response({ settings: s });
    }
    if (path[0] === "jobs" && request.method === "PUT") {
      return response({ job: await saveJob((await readJson(request)) as Job) });
    }
    if (path[0] === "applications" && !path[1] && request.method === "GET") {
      const role = new URL(request.url).searchParams.get("role");
      if (!role) fail(400, "Select an opening.");
      await job(role!);
      const rows = await db()
        .prepare(
          "SELECT id,status,created_at,data FROM career_applications WHERE job_id=? ORDER BY created_at DESC LIMIT 200",
        )
        .bind(role)
        .all<{
          id: string;
          status: string;
          created_at: string;
          data: string;
        }>();
      return response({
        applications: rows.results.map((r) => {
          const d = JSON.parse(r.data);
          return {
            id: r.id,
            status: r.status,
            createdAt: r.created_at,
            name: d.name,
            email: d.email,
          };
        }),
      });
    }
    if (path[0] === "applications" && path[1]) {
      const a = await db()
        .prepare("SELECT * FROM career_applications WHERE id=?")
        .bind(path[1])
        .first<{
          id: string;
          job_id: string;
          data: string;
          status: string;
          created_at: string;
        }>();
      if (!a) return fail(404, "Application not found.");
      const data = JSON.parse(a.data);
      if (path[2] === "file" && request.method === "GET") {
        const kind = new URL(request.url).searchParams.get("kind");
        if (kind !== "resume" && kind !== "cover")
          fail(400, "Unknown document.");
        const key = kind === "resume" ? data.resumeKey : data.coverKey;
        if (!key) return fail(404, "Document not found.");
        const file = await files.get(key);
        if (!file) return fail(404, "Document not found.");
        return new Response(file.body, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${kind}.pdf"`,
            "Cache-Control": "private, no-store",
            "X-Robots-Tag": "noindex, nofollow",
            "X-Content-Type-Options": "nosniff",
            "Content-Security-Policy": "sandbox; default-src 'none'",
          },
        });
      }
      if (path[2] === "notifications" && request.method === "POST") {
        await deliver(a.id);
        return response({ ok: true });
      }
      if (path.length === 2 && request.method === "GET") {
        const mail = await db()
          .prepare(
            "SELECT kind,status,updated_at FROM career_mail WHERE application_id=?",
          )
          .bind(a.id)
          .all();
        const { resumeKey, coverKey, ...safe } = data;
        return response({
          application: {
            ...safe,
            id: a.id,
            jobId: a.job_id,
            status: a.status,
            createdAt: a.created_at,
            resume: Boolean(resumeKey),
            coverFile: Boolean(coverKey),
          },
          notifications: mail.results,
        });
      }
      if (path.length === 2 && request.method === "PATCH") {
        const body = (await readJson(request)) as { status: string };
        if (
          !["New", "Reviewing", "Interviewing", "Closed"].includes(body.status)
        )
          fail(400, "Invalid application status.");
        await db()
          .prepare("UPDATE career_applications SET status=? WHERE id=?")
          .bind(body.status, a.id)
          .run();
        return response({ ok: true });
      }
      if (path.length === 2 && request.method === "DELETE") {
        if (data.resumeKey) await files.delete(data.resumeKey);
        if (data.coverKey) await files.delete(data.coverKey);
        await db().batch([
          db()
            .prepare("DELETE FROM career_mail WHERE application_id=?")
            .bind(a.id),
          db().prepare("DELETE FROM career_applications WHERE id=?").bind(a.id),
        ]);
        return response({ ok: true });
      }
    }
    return fail(404, "Not found.");
  });
}
