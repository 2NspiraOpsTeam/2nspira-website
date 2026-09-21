import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = process.env.SMOKE_PORT || "8792";
const origin = `http://127.0.0.1:${port}`;
const requiredRoutes = ["/", "/services", "/about", "/contact", "/robots.txt", "/sitemap.xml"];

const worker = spawn(
  "./node_modules/.bin/wrangler",
  ["dev", "--config", "dist/server/wrangler.json", "--port", port, "--ip", "127.0.0.1"],
  { cwd: root, env: { ...process.env, CI: "1" }, stdio: ["ignore", "pipe", "pipe"] },
);

let output = "";
const capture = (chunk) => {
  output += chunk.toString();
  if (output.length > 20_000) output = output.slice(-20_000);
};
worker.stdout.on("data", capture);
worker.stderr.on("data", capture);

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const deadline = Date.now() + 30_000;

try {
  let ready = false;
  while (Date.now() < deadline) {
    if (worker.exitCode !== null) {
      throw new Error(`Worker exited before smoke checks.\n${output}`);
    }
    try {
      const response = await fetch(`${origin}/deployment.json`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      // Wrangler is still starting.
    }
    await delay(250);
  }
  if (!ready) throw new Error(`Timed out waiting for Worker.\n${output}`);

  for (const route of requiredRoutes) {
    const response = await fetch(`${origin}${route}`, {
      headers: { "x-forwarded-proto": "https" },
      redirect: "manual",
    });
    if (response.status !== 200) {
      throw new Error(`Smoke check failed: ${route} returned ${response.status}.`);
    }
  }

  const missing = await fetch(`${origin}/__release-smoke-missing__`, {
    headers: { "x-forwarded-proto": "https" },
    redirect: "manual",
  });
  if (missing.status !== 404) {
    throw new Error(`Smoke check failed: missing route returned ${missing.status}, expected 404.`);
  }

  console.log(
    `Build smoke checks passed for ${requiredRoutes.join(", ")}; ` +
      "missing-route 404 passed.",
  );
} finally {
  worker.kill("SIGTERM");
}
