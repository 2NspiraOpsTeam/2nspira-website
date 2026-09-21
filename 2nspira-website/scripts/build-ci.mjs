import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const commit = process.env.WORKERS_CI_COMMIT_SHA ?? git("rev-parse", "HEAD");
const branch = process.env.WORKERS_CI_BRANCH ?? (git("branch", "--show-current") || "detached");

if (!/^[0-9a-f]{40}$/.test(commit)) {
  throw new Error(`Invalid deployment commit SHA: ${commit}`);
}

if (process.env.WORKERS_CI === "1" && git("status", "--porcelain", "--untracked-files=no")) {
  throw new Error("CI checkout is not clean; refusing to build a deployment artifact.");
}

await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../public/deployment.json", import.meta.url),
  `${JSON.stringify({ commit, branch })}\n`,
);

execFileSync("npm", ["run", "build:vinext"], {
  cwd: root,
  env: { ...process.env, NEXT_PUBLIC_DEPLOYMENT_SHA: commit },
  stdio: "inherit",
});

execFileSync("node", ["scripts/smoke-build.mjs"], {
  cwd: root,
  stdio: "inherit",
});
