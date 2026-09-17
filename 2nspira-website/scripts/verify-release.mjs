import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const branch = git("branch", "--show-current");

if (!branch || branch === "main") {
  throw new Error("Release preflight must run on a feature branch, never directly on main.");
}
if (git("status", "--porcelain")) {
  throw new Error("Release preflight requires a clean working tree.");
}

execFileSync("git", ["fetch", "origin", branch, "main"], { cwd: root, stdio: "inherit" });
if (git("rev-parse", "HEAD") !== git("rev-parse", `origin/${branch}`)) {
  throw new Error(`Branch ${branch} is not pushed and up to date with origin/${branch}.`);
}
execFileSync("git", ["merge-base", "--is-ancestor", "origin/main", "HEAD"], {
  cwd: root,
  stdio: "inherit",
});

execFileSync("npm", ["run", "lint"], { cwd: root, stdio: "inherit" });
execFileSync("npm", ["run", "build:ci"], { cwd: root, stdio: "inherit" });
execFileSync("./node_modules/.bin/tsc", ["--noEmit"], { cwd: root, stdio: "inherit" });

console.log("Release preflight passed. Complete targeted browser QA on the Cloudflare preview URL before merging.");
