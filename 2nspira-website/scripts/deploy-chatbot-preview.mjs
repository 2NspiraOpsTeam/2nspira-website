import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
// Dedicated, noindex demo. Never overwrite the shared preview or production.
const config = JSON.parse(await readFile('dist/server/wrangler.json', 'utf8'));
config.name = '2nspira-chatbot-demo';
config.main = 'chatbot-preview-entry.js';
config.routes = [];
delete config.route;
config.workers_dev = true;
config.d1_databases = [];
config.vars = process.env.CHAT_FREE_ONLY === 'verified' ? { CHAT_FREE_ONLY: 'verified' } : {};
config.assets = {...config.assets, run_worker_first: true};
config.ratelimits = [{name:'CHAT_RATE_LIMIT', namespace_id:'2026111302', simple:{limit:8,period:60}}];
await writeFile('dist/server/wrangler.chatbot.json', JSON.stringify(config, null, 2));
await writeFile('dist/server/chatbot-preview-entry.js', `import app from './index.js';
export * from './index.js';
export default { async fetch(request, env, ctx) {
 const path = new URL(request.url).pathname;
 const headers = {'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store'};
 if (path === '/robots.txt') return new Response('User-agent: *\\nDisallow: /\\n', {headers});
 if ((/^\\/(api|admin)(\\/|$)/.test(path) && path !== '/api/chat') || (!['GET','HEAD'].includes(request.method) && path !== '/api/chat')) return Response.json({error:'Demo only; submissions disabled'}, {status:403,headers});
 const asset = ['GET','HEAD'].includes(request.method) ? await env.ASSETS.fetch(request) : null;
 const response = asset && asset.status !== 404 ? asset : await app.fetch(request, env, ctx);
 const result = new Response(response.body, response);
 for (const [key,value] of Object.entries(headers)) result.headers.set(key,value);
 return result;
}};`);
execFileSync('./node_modules/.bin/wrangler', ['deploy','--config','dist/server/wrangler.chatbot.json'], {stdio:'inherit'});
