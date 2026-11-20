import { execFileSync } from "node:child_process";

/** Fail closed if the branch advanced or GitHub cannot establish current main.
 * This is a freshness check, NOT an atomic provider deployment lock.
 */
export function assertCurrentMain(commit, { cwd, exec = execFileSync } = {}) {
  const output = exec("git", ["ls-remote", "--exit-code", "https://github.com/2NspiraOpsTeam/2nspira-website.git", "refs/heads/main"], {
    cwd, encoding: "utf8", timeout: 15000, stdio: ["ignore", "pipe", "pipe"],
  }).trim();
  const latest = output.split(/\s+/)[0];
  if (!/^[0-9a-f]{40}$/.test(latest) || latest !== commit) {
    throw new Error("Production deployment refused: build is not current main.");
  }
}
