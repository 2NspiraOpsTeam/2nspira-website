import { readFile, writeFile, appendFile, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// An isolated Worker: never attach production routes or change DNS.
const root = fileURLToPath(new URL("../", import.meta.url));

const configPath = new URL("../dist/server/wrangler.json", import.meta.url);
await access(configPath).catch(() => {
  throw new Error("Missing dist/server/wrangler.json. Run npm run build:ci first.");
});
const config = JSON.parse(await readFile(configPath, "utf8"));
config.name = "2nspira-website-preview";
config.main = "preview-entry.js";
config.workers_dev = true;
config.routes = [];
delete config.route;
await writeFile(new URL("../dist/server/wrangler.preview.json", import.meta.url), JSON.stringify(config, null, 2));
await writeFile(new URL("../dist/server/preview-entry.js", import.meta.url), `
import app from "./index.js";
export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname === "/robots.txt") {
      return new Response("User-agent: *\\nDisallow: /\\n", { headers: { "Content-Type": "text/plain", "X-Robots-Tag": "noindex, nofollow" } });
    }
    const original = await app.fetch(request, env, ctx);
    const response = new Response(original.body, original);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
};
`);
await appendFile(new URL("../dist/client/_headers", import.meta.url), "\n/*\n  X-Robots-Tag: noindex, nofollow\n");
execFileSync("./node_modules/.bin/wrangler", ["deploy", "--config", "dist/server/wrangler.preview.json"], { cwd: root, stdio: "inherit" });
