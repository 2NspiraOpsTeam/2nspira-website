import { Buffer } from "node:buffer";
import draft from "@/content/team/draft.json";
import {
  db,
  admin,
  sameOrigin,
  route,
  response,
  fail,
  readJson,
  boundedBody,
} from "@/lib/careers/server";
import { validateContent, type TeamContent } from "./model";
export const initialContent = () => structuredClone(draft) as TeamContent;
export async function contentRow() {
  return db()
    .prepare(
      "SELECT revision,draft_json,published_json FROM team_delivery_content WHERE id=1",
    )
    .first<{
      revision: number;
      draft_json: string;
      published_json: string | null;
    }>();
}
export async function publishedContent(): Promise<TeamContent | null> {
  const row = await contentRow();
  return row?.published_json ? JSON.parse(row.published_json) : null;
}
export async function handle(request: Request) {
  return route(async () => {
    const identity = await admin(request, false);
    if (request.method === "GET") {
      const row = await contentRow();
      return response({
        content: row
          ? { ...JSON.parse(row.draft_json), revision: row.revision }
          : initialContent(),
        published: Boolean(row?.published_json),
      });
    }
    sameOrigin(request);
    let c: TeamContent;
    try {
      c = validateContent(await readJson(request));
    } catch (e) {
      return fail(400, e instanceof Error ? e.message : "Invalid content.");
    }
    const now = new Date().toISOString();
    const row = await contentRow();
    if ((row?.revision ?? 0) !== c.revision)
      return fail(
        409,
        "Someone updated this page. Reload saved content before saving again.",
      );
    const next = { ...c, revision: c.revision + 1 };
    const published =
      c.status === "published"
        ? JSON.stringify(next)
        : (row?.published_json ?? null);
    const result = row
      ? await db()
          .prepare(
            "UPDATE team_delivery_content SET revision=?,draft_json=?,published_json=?,updated_at=?,updated_by=? WHERE id=1 AND revision=?",
          )
          .bind(
            next.revision,
            JSON.stringify(next),
            published,
            now,
            identity.email,
            c.revision,
          )
          .run()
      : await db()
          .prepare(
            "INSERT OR IGNORE INTO team_delivery_content(id,revision,draft_json,published_json,updated_at,updated_by) VALUES(1,?,?,?,?,?)",
          )
          .bind(
            next.revision,
            JSON.stringify(next),
            published,
            now,
            identity.email,
          )
          .run();
    if (!result.meta.changes)
      return fail(409, "Page changed. Reload before saving.");
    return response({ content: next, published: Boolean(published) });
  });
}

export async function hasPublishedTeam() {
  try {
    return Boolean(
      await db()
        .prepare(
          "SELECT id FROM team_delivery_content WHERE id=1 AND published_json IS NOT NULL",
        )
        .first(),
    );
  } catch {
    return false;
  }
}

export async function uploadPhoto(request: Request) {
  return route(async () => {
    const identity = await admin(request, false);
    sameOrigin(request);
    const bytes = new Uint8Array(await boundedBody(request, 524288));
    const type = request.headers.get("content-type");
    const valid =
      type === "image/webp" &&
      Buffer.from(bytes.subarray(0, 4)).toString() === "RIFF" &&
      Buffer.from(bytes.subarray(8, 12)).toString() === "WEBP";
    if (!valid || bytes.length < 16)
      return fail(400, "Upload a valid portrait image.");
    const id = crypto.randomUUID();
    await db()
      .prepare(
        "INSERT INTO team_delivery_photos(id,mime,data,created_at,created_by) VALUES(?,?,?,?,?)",
      )
      .bind(
        id,
        "image/webp",
        Buffer.from(bytes).toString("base64"),
        new Date().toISOString(),
        identity.email,
      )
      .run();
    return response({ url: `/api/team-delivery/photos/${id}` });
  });
}
export async function servePhoto(request: Request) {
  return route(async () => {
    const id = new URL(request.url).pathname.split("/").pop() || "";
    if (!/^[a-f0-9-]{36}$/.test(id))
      return fail(404, "Portrait not available.");
    const path = `/api/team-delivery/photos/${id}`;
    const published = await publishedContent();
    if (!published?.people.some((p) => p.photo === path && p.approved)) {
      try {
        await admin(request, false);
      } catch {
        return fail(404, "Portrait not available.");
      }
    }
    const photo = await db()
      .prepare("SELECT mime,data FROM team_delivery_photos WHERE id=?")
      .bind(id)
      .first<{ mime: string; data: string }>();
    if (!photo) return fail(404, "Portrait not available.");
    return new Response(Buffer.from(photo.data, "base64"), {
      headers: {
        "Content-Type": photo.mime,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
        "Content-Security-Policy": "sandbox; default-src 'none'",
      },
    });
  });
}
