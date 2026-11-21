import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { hash } from '../src/worker.mjs';
import { createDB, seed } from '../src/local-db.mjs';
const actors = ['cleo','adam','brian','maya','dax'];
async function fixture() {
 const DB = createDB(); seed(DB);
 const keys = Object.fromEntries(actors.map(actor => [actor, crypto.randomUUID()]));
 const ids = await Promise.all(actors.map(async actor => ({ actor, role: actor === 'cleo' ? 'writer' : 'reader', customer_ids: ['demo-orbit'], token_sha256: await hash(keys[actor]) })));
 const env = { DB, HUB_IDENTITIES_JSON: JSON.stringify(ids) };
 const request = (path, actor, init = {}) => worker.fetch(new Request(`https://hub.invalid/v1/${path}`, { ...init, headers: { ...(actor ? { Authorization: `Bearer ${keys[actor]}` } : {}), ...init.headers } }),env);
 return { DB, env, ids, keys, request };
}
test('all five identities can read scoped customer context with attributed audit', async () => {
 const { DB, request } = await fixture();
 for (const actor of actors) {
  const reply = await request('customers/demo-orbit',actor); assert.equal(reply.status,200);
  const body = await reply.json(); assert.equal(body.projects[0].owner,'cleo'); assert.equal(body.customer.synthetic,1);
 }
 assert.deepEqual(DB.sqlite.prepare("SELECT actor FROM hub_audit ORDER BY rowid").all().map(x => x.actor),actors);
});
test('anonymous denied; reader writes denied; writer note attributed from identity, not payload', async () => {
 const { DB, request } = await fixture();
 assert.equal((await request('customers')).status,401);
 const init = { method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({body:'Scope confirmed'}) };
 assert.equal((await request('customers/demo-orbit/notes','maya',init)).status,403);
 const forged = {...init,body:JSON.stringify({body:'Forged',actor:'adam'})};
 assert.equal((await request('customers/demo-orbit/notes','cleo',forged)).status,400);
 const res = await request('customers/demo-orbit/notes','cleo',init); assert.equal(res.status,201); assert.equal((await res.json()).actor,'cleo');
 assert.equal(DB.sqlite.prepare('SELECT count(*) AS n FROM hub_notes').get().n,2);
 assert.equal(DB.sqlite.prepare("SELECT count(*) AS n FROM hub_audit WHERE outcome='denied'").get().n,3);
});
test('cross-customer access denied and scoped search excludes records; SQL query is not interpolated',async () => {
 const { DB, request } = await fixture();
 DB.sqlite.exec("INSERT INTO hub_customers VALUES ('private','Restricted customer','https://example.invalid','2026-11-08',1)");
 assert.equal((await request('customers/private','cleo')).status,403);
 const body = await (await request('customers','cleo')).json(); assert.equal(body.results.length,1);
 assert.equal((await (await request('customers?q=%27%20OR%201%3D1--','cleo')).json()).results.length,0);
 assert.equal((await request('customers?offset=-1','cleo')).status,400);
});
test('missing bindings and invalid/duplicate identities fail closed; metrics never invent zeros',async () => {
 const { env, ids, keys, request } = await fixture();
 assert.equal((await worker.fetch(new Request('https://hub.invalid/v1/customers'),{})).status,503);
 assert.equal((await worker.fetch(new Request('https://hub.invalid/v1/customers'),{...env,HUB_IDENTITIES_JSON:'[{}]'})).status,503);
 const bad = {...env,HUB_IDENTITIES_JSON:JSON.stringify([...ids,ids[0]])};
 assert.equal((await worker.fetch(new Request('https://hub.invalid/v1/customers',{headers:{Authorization:`Bearer ${keys.cleo}`}}),bad)).status,401);
 const metrics = await (await request('metrics','cleo')).json();
 for (const m of Object.values(metrics)) { assert.equal(m.value,null); assert.equal(m.status,'not_connected'); }
});
test('oversized and malformed writes rejected; transaction rolls back when audit fails',async () => {
 const { DB, request } = await fixture();
 const init = body => ({ method:'POST',headers:{'Content-Type':'application/json'},body });
 assert.equal((await request('customers/demo-orbit/notes','cleo',init('x'.repeat(9000)))).status,413);
 assert.equal((await request('customers/demo-orbit/notes','cleo',init('{'))).status,400);
 DB.sqlite.exec("CREATE TRIGGER deny_audit BEFORE INSERT ON hub_audit BEGIN SELECT RAISE(ABORT,'test audit failure'); END;");
 assert.equal((await request('customers/demo-orbit/notes','cleo',init(JSON.stringify({body:'Must roll back'})))).status,503);
 assert.equal(DB.sqlite.prepare('SELECT count(*) AS n FROM hub_notes').get().n,1);
});
