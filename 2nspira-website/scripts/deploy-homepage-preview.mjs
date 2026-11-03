import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(new URL('../dist/server/wrangler.json', import.meta.url), 'utf8'));
config.name = '2nspira-homepage-preview';
config.main = 'homepage-preview-entry.js';
config.workers_dev = true;
config.routes = [];
delete config.route;
// Design-only sandbox: no databases, backend services, mail or production vars.
for (const key of ['d1_databases', 'services', 'vars', 'send_email', 'queues', 'r2_buckets', 'kv_namespaces', 'durable_objects', 'workflows', 'triggers']) delete config[key];
config.assets = { ...config.assets, run_worker_first: true };
await writeFile(new URL('../dist/server/wrangler.homepage-preview.json', import.meta.url), JSON.stringify(config, null, 2));
await writeFile(new URL('../dist/server/homepage-preview-entry.js', import.meta.url), `
import app from './index.js';
export * from './index.js';
const headers = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' };
export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (path === '/robots.txt') return new Response('User-agent: *\\nDisallow: /\\n', { headers: { ...headers, 'Content-Type': 'text/plain' } });
    if (!['GET', 'HEAD'].includes(request.method) || /^\\/(api|admin|portal)(\\/|$)/.test(path)) {
      return new Response(JSON.stringify({ error: 'This design preview does not submit forms or access accounts.' }), { status: 403, headers: { ...headers, 'Content-Type': 'application/json' } });
    }
    const original = await app.fetch(request, env, ctx);
    const response = new Response(original.body, original);
    for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
    return response;
  }
};
`);
await appendFile(new URL('../dist/client/_headers', import.meta.url), '\n/*\n  X-Robots-Tag: noindex, nofollow\n');
execFileSync('./node_modules/.bin/wrangler', ['deploy', '--config', 'dist/server/wrangler.homepage-preview.json'], { cwd: root, stdio: 'inherit' });
