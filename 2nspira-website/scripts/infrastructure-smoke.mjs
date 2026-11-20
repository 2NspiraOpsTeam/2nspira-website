import assert from "node:assert/strict";

const origin = process.argv[2] || "https://2nspira.com";
const requireHardening = process.env.REQUIRE_HARDENING === "1";
const checks = [
  ["/", 200], ["/portal/login", 200], ["/admin", 307],
  ["/portal/dashboard", 307], ["/robots.txt", 200], ["/sitemap.xml", 200],
  ["/__infrastructure_missing__", 404],
];
for (const [path, status] of checks) {
  const r = await fetch(new URL(path, origin), {
    redirect: "manual", signal: AbortSignal.timeout(20000),
    headers: { "x-forwarded-proto": "https", "user-agent": "2Nspira-infrastructure-monitor/1.0" },
  });
  assert.equal(r.status, status, `${path}: unexpected status`);
  // Preview robots is intentionally served by the outer noindex wrapper,
  // not application middleware. Assert middleware headers on HTML/private paths.
  if (requireHardening && (r.headers.get("content-type")?.includes("text/html") || /^\/(admin|portal)/.test(path))) {
    assert.equal(r.headers.get("x-content-type-options"), "nosniff", path);
    if (/^\/(admin|portal)/.test(path)) {
      assert.match(r.headers.get("cache-control") || "", /no-store/, path);
      assert.match(r.headers.get("x-robots-tag") || "", /noindex/, path);
      assert.equal(r.headers.get("content-security-policy"), "frame-ancestors 'none'", path);
    }
  }
  console.log(`PASS ${path}: ${status}`);
  await r.arrayBuffer();
}
const marker = await fetch(new URL("/deployment.json", origin), { signal: AbortSignal.timeout(20000) });
assert.equal(marker.status, 200);
const release = await marker.json();
assert.match(release.commit, /^[a-f0-9]{40}$/);
console.log(`PASS release marker: ${release.commit}`);
