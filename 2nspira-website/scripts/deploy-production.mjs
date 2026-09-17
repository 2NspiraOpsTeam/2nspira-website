import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const branch = process.env.WORKERS_CI_BRANCH;
const commit = process.env.WORKERS_CI_COMMIT_SHA;

if (process.env.WORKERS_CI !== "1") {
  throw new Error("Production deployment refused: only Cloudflare Workers Builds may deploy production.");
}
if (branch !== "main") {
  throw new Error(`Production deployment refused: expected main, received ${branch ?? "unknown"}.`);
}
if (!commit || !/^[0-9a-f]{40}$/.test(commit)) {
  throw new Error("Production deployment refused: WORKERS_CI_COMMIT_SHA is missing or invalid.");
}

const artifact = JSON.parse(
  await readFile(new URL("../dist/client/deployment.json", import.meta.url), "utf8"),
);
if (artifact.commit !== commit || artifact.branch !== "main") {
  throw new Error(
    `Production artifact mismatch: expected main@${commit}, received ${artifact.branch}@${artifact.commit}.`,
  );
}

execFileSync(
  "./node_modules/.bin/vinext-cloudflare",
  ["deploy", "--config", "dist/server/wrangler.json"],
  { cwd: root, stdio: "inherit" },
);
