// Local-only review server. Never a remote authentication mechanism.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import worker, { hash } from './worker.mjs';
import { createDB, seed } from './local-db.mjs';
const db = createDB(); seed(db);
const token = crypto.randomUUID();
const env = { DB: db, HUB_IDENTITIES_JSON: JSON.stringify([{ actor: 'cleo', role: 'reader', customer_ids: ['demo-orbit'], token_sha256: await hash(token) }]) };
const port = Number(process.env.HUB_PREVIEW_PORT || 8789);
const origin = `http://127.0.0.1:${port}`;
const assets = { '/': ['index.html','text/html'], '/app.js': ['app.js','text/javascript'], '/style.css': ['style.css','text/css'], '/research-snapshot.json': ['research-snapshot.json','application/json'] };
const server = createServer(async (req, res) => {
 try {
  // DNS-rebinding and cross-origin protection for a credential-bearing local proxy.
  if (req.headers.host !== `127.0.0.1:${port}` || (req.headers.origin && req.headers.origin !== origin) || req.headers['sec-fetch-site'] === 'cross-site') { res.writeHead(403); return res.end(); }
  if (req.method !== 'GET') { res.writeHead(405); return res.end(); }
  const url = new URL(req.url, origin);
  if (url.pathname.startsWith('/v1/')) {
   const reply = await worker.fetch(new Request(url, { headers: { Authorization: `Bearer ${token}` } }), env);
   res.writeHead(reply.status, Object.fromEntries(reply.headers)); return res.end(await reply.text());
  }
  const asset = assets[url.pathname];
  if (!asset) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': `${asset[1]}; charset=utf-8`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'", 'Referrer-Policy': 'no-referrer' });
  res.end(await readFile(new URL(`../public/${asset[0]}`, import.meta.url)));
 } catch { res.writeHead(500); res.end('Preview unavailable'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Local synthetic review: ${origin} (ephemeral SQLite; research snapshot only)`));
