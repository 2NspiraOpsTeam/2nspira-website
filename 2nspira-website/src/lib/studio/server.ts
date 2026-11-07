import { Buffer } from "node:buffer";
import {
  db,
  admin,
  sameOrigin,
  route,
  response,
  fail,
  boundedBody,
} from "@/lib/careers/server";
import { initialStudio } from "./seed";
import { validateStudio, publicStudio, type Studio } from "./model";
export async function studioRow() {
  return db()
    .prepare(
      "SELECT revision,draft_json,published_json FROM creative_studio_content WHERE id=1",
    )
    .first<{
      revision: number;
      draft_json: string;
      published_json: string | null;
    }>();
}
export async function publishedStudio(): Promise<Studio> {
  // An empty store starts from the existing public catalogue. Storage failure fails closed
  // rather than resurrecting items that an administrator previously hid.
  try {
    const row = await studioRow();
    return publicStudio(
      row?.published_json ? JSON.parse(row.published_json) : initialStudio(),
    );
  } catch {
    return {
      ...initialStudio(),
      groups: [],
      categories: [],
      links: [],
      items: [],
    };
  }
}
export async function handle(request: Request) {
  return route(async () => {
    const identity = await admin(request, false);
    const row = await studioRow();
    if (request.method === "GET")
      return response({
        content: row
          ? { ...JSON.parse(row.draft_json), revision: row.revision }
          : initialStudio(),
        published: !!row?.published_json,
      });
    sameOrigin(request);
    let c: Studio;
    try {
      c = validateStudio(
        JSON.parse(
          new TextDecoder().decode(await boundedBody(request, 1000000)),
        ),
      );
    } catch (e) {
      return fail(400, e instanceof Error ? e.message : "Invalid content.");
    }
    if ((row?.revision ?? 0) !== c.revision)
      return fail(
        409,
        "Someone updated Creative Studio. Reload saved content before saving again. Your changes have not been published.",
      );
    const previous: Studio | null = row?.published_json
      ? JSON.parse(row.published_json)
      : null;
    // Stable canonical identities: an existing published page cannot silently move to another URL.
    for (const old of previous?.items ?? []) {
      const next = c.items.find((i) => i.id === old.id);
      if (next && !old.url.startsWith("https://") && old.url !== next.url)
        return fail(
          400,
          `${old.title}: keep the existing primary URL. Change its categories or purchase URL instead.`,
        );
    }
    const next = { ...c, revision: c.revision + 1 },
      now = new Date().toISOString();
    const published =
      c.status === "published"
        ? JSON.stringify(next)
        : (row?.published_json ?? null);
    const write = row
      ? db()
          .prepare(
            "UPDATE creative_studio_content SET revision=?,draft_json=?,published_json=?,updated_at=?,updated_by=? WHERE id=1 AND revision=?",
          )
          .bind(
            next.revision,
            JSON.stringify(next),
            published,
            now,
            identity.email,
            c.revision,
          )
      : db()
          .prepare(
            "INSERT OR IGNORE INTO creative_studio_content(id,revision,draft_json,published_json,updated_at,updated_by) VALUES(1,?,?,?,?,?)",
          )
          .bind(
            next.revision,
            JSON.stringify(next),
            published,
            now,
            identity.email,
          );
    await db().batch([
      write,
      db()
        .prepare(
          "INSERT OR IGNORE INTO creative_studio_history(revision,content_json,published_json,created_at,created_by) SELECT revision,draft_json,published_json,updated_at,updated_by FROM creative_studio_content WHERE id=1 AND revision=? AND draft_json=?",
        )
        .bind(next.revision, JSON.stringify(next)),
    ]);
    const saved = await studioRow();
    if (
      saved?.revision !== next.revision ||
      saved.draft_json !== JSON.stringify(next)
    )
      return fail(
        409,
        "Creative Studio changed in another session. Reload before saving.",
      );
    return response({ content: next, published: !!published });
  });
}
export async function uploadImage(request: Request) {
  return route(async () => {
    const identity = await admin(request, false);
    sameOrigin(request);
    const bytes = await boundedBody(request, 524288);
    if (
      request.headers.get("content-type") !== "image/webp" ||
      bytes.length < 16 ||
      Buffer.from(bytes.subarray(0, 4)).toString() !== "RIFF" ||
      Buffer.from(bytes.subarray(8, 12)).toString() !== "WEBP"
    )
      return fail(400, "Upload a valid WebP image up to 512 KB.");
    const id = crypto.randomUUID();
    await db()
      .prepare("INSERT INTO creative_studio_images VALUES(?,?,?,?,?)")
      .bind(
        id,
        "image/webp",
        Buffer.from(bytes).toString("base64"),
        new Date().toISOString(),
        identity.email,
      )
      .run();
    return response({ url: `/api/creative-studio/images/${id}` });
  });
}
export async function serveImage(request: Request) {
  return route(async () => {
    const id = new URL(request.url).pathname.split("/").pop() || "";
    if (!/^[a-f0-9-]{36}$/.test(id)) return fail(404, "Image unavailable.");
    const content = await publishedStudio();
    if (
      !content.items.some(
        (i) => i.image === `/api/creative-studio/images/${id}`,
      )
    )
      await admin(request, false);
    const image = await db()
      .prepare("SELECT mime,data FROM creative_studio_images WHERE id=?")
      .bind(id)
      .first<{ mime: string; data: string }>();
    if (!image) return fail(404, "Image unavailable.");
    return new Response(Buffer.from(image.data, "base64"), {
      headers: {
        "Content-Type": image.mime,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "sandbox; default-src 'none'",
      },
    });
  });
}
