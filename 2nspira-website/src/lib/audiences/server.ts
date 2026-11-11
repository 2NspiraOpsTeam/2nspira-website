import {
  db,
  admin,
  sameOrigin,
  route,
  response,
  fail,
  readJson,
} from "@/lib/careers/server";
import { validateContent, publicContent, type Content } from "./model";
import { initialContent, upgradeContent } from "./seed";
export { initialContent };
async function row() {
  return db()
    .prepare("SELECT revision,content_json FROM audience_content WHERE id=1")
    .first<{ revision: number; content_json: string }>();
}
export async function publishedContent() {
  const r = await row();
  return publicContent(upgradeContent(r ? JSON.parse(r.content_json) : initialContent()));
}
export async function handle(request: Request) {
  return route(async () => {
    const identity = await admin(request, false);
    if (request.method === "GET") {
      const r = await row();
      return response({
        content: upgradeContent(r ? JSON.parse(r.content_json) : initialContent()),
      });
    }
    sameOrigin(request);
    let c: Content;
    try {
      c = validateContent(await readJson(request));
    } catch (e) {
      return fail(400, (e as Error).message);
    }
    const previous = await db()
      .prepare("SELECT content_json FROM audience_history WHERE operation_id=?")
      .bind(c.operationId)
      .first<{ content_json: string }>();
    if (previous) {
      const old = JSON.parse(previous.content_json) as Content;
      if (
        JSON.stringify({ ...old, revision: c.revision }) !== JSON.stringify(c)
      )
        return fail(
          409,
          "This save identifier was already used. Reload saved content.",
        );
      return response({ content: old });
    }
    const current = await row();
    if ((current?.revision ?? 0) !== c.revision)
      return fail(
        409,
        "Someone else updated this page. Your edits are still here. Reload saved content before saving again.",
      );
    const next = { ...c, revision: c.revision + 1 },
      json = JSON.stringify(next),
      now = new Date().toISOString();
    const write = current
      ? db()
          .prepare(
            "UPDATE audience_content SET revision=?,content_json=?,updated_at=?,updated_by=? WHERE id=1 AND revision=?",
          )
          .bind(next.revision, json, now, identity.email, c.revision)
      : db()
          .prepare("INSERT OR IGNORE INTO audience_content VALUES(1,?,?,?,?)")
          .bind(next.revision, json, now, identity.email);
    await db().batch([
      write,
      db()
        .prepare(
          "INSERT OR IGNORE INTO audience_history SELECT revision,?,content_json,updated_at,updated_by FROM audience_content WHERE id=1 AND revision=? AND content_json=?",
        )
        .bind(c.operationId, next.revision, json),
    ]);
    const saved = await row();
    if (saved?.content_json !== json)
      return fail(
        409,
        "Page changed in another session. Your edits are still here. Reload before saving.",
      );
    return response({ content: next });
  });
}
