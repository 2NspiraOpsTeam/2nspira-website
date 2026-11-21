const agents = new Set(['cleo', 'adam', 'brian', 'maya', 'dax']);
const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };
const json = (body, status = 200) => Response.json(body, { status, headers });
const hash = async text => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))), b => b.toString(16).padStart(2, '0')).join('');
const idOK = id => /^[a-zA-Z0-9_-]{1,80}$/.test(id);
async function audit(db, actor, action, resource, outcome) {
  await db.prepare('INSERT INTO hub_audit VALUES (?,?,?,?,?,?)').bind(crypto.randomUUID(), actor, action, resource, outcome, new Date().toISOString()).run();
}
export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/v1/')) return json({ error: 'not_found' }, 404);
  if (!env.DB) return json({ error: 'store_not_connected' }, 503);
  try {
   const identities = JSON.parse(env.HUB_IDENTITIES_JSON || '[]');
   if (!Array.isArray(identities) || identities.some(i => !agents.has(i.actor) || !['reader','writer'].includes(i.role) || !Array.isArray(i.customer_ids) || !/^[a-f0-9]{64}$/.test(i.token_sha256))) return json({ error: 'identity_configuration_invalid' }, 503);
   const token = request.headers.get('Authorization')?.match(/^Bearer ([^\s]{16,512})$/)?.[1];
   const digest = token ? await hash(token) : '';
   const matches = identities.filter(i => i.token_sha256 === digest);
   const identity = matches.length === 1 ? matches[0] : null;
   if (!identity) {
    await audit(env.DB, 'anonymous', request.method, url.pathname.slice(0, 200), 'denied');
    return json({ error: 'unauthorized' }, 401);
   }
   const allowed = identity.customer_ids.filter(idOK);
   const action = request.method;
   const resource = url.pathname.slice(0, 200);
   async function finish(body, status = 200) {
    await audit(env.DB, identity.actor, action, resource, status < 400 ? 'allowed' : 'denied');
    return json(body, status);
   }
   if (url.pathname === '/v1/metrics' && action === 'GET') {
    return finish(Object.fromEntries(['qualified_leads','proposals_awaiting_approval','contracts_won','monthly_recurring_revenue','projects_delivered'].map(key => [key, { value: null, status: 'not_connected', unit: key === 'monthly_recurring_revenue' ? 'USD' : 'count' }])));
   }
   if (url.pathname === '/v1/customers' && action === 'GET') {
    const q = (url.searchParams.get('q') || '').slice(0, 100);
    const rawOffset = url.searchParams.get('offset') || '0';
    if (!/^\d{1,7}$/.test(rawOffset)) return finish({ error: 'invalid_offset' }, 400);
    if (!allowed.length) return finish({ results: [], next_offset: null });
    const placeholders = allowed.map(() => '?').join(',');
    const rows = await env.DB.prepare(`SELECT * FROM hub_customers WHERE customer_id IN (${placeholders}) AND instr(lower(name),lower(?))>0 ORDER BY name,customer_id LIMIT 26 OFFSET ?`).bind(...allowed, q, Number(rawOffset)).all();
    return finish({ results: rows.results.slice(0, 25), next_offset: rows.results.length > 25 ? Number(rawOffset) + 25 : null });
   }
   const match = url.pathname.match(/^\/v1\/customers\/([a-zA-Z0-9_-]{1,80})(\/notes)?$/);
   if (!match) return finish({ error: 'not_found' }, 404);
   const customerID = match[1];
   if (!allowed.includes(customerID)) return finish({ error: 'forbidden' }, 403);
   const customer = await env.DB.prepare('SELECT * FROM hub_customers WHERE customer_id=?').bind(customerID).first();
   if (!customer) return finish({ error: 'not_found' }, 404);
   if (!match[2] && action === 'GET') {
    const projects = await env.DB.prepare('SELECT * FROM hub_projects WHERE customer_id=? ORDER BY updated_at DESC LIMIT 100').bind(customerID).all();
    const notes = await env.DB.prepare('SELECT * FROM hub_notes WHERE customer_id=? ORDER BY occurred_at DESC LIMIT 100').bind(customerID).all();
    return finish({ customer, projects: projects.results, notes: notes.results });
   }
   if (match[2] && action === 'POST') {
    if (identity.role !== 'writer') return finish({ error: 'forbidden' }, 403);
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return finish({ error: 'json_required' }, 415);
    // Bound the streamed body as well as Content-Length; no unbounded allocation.
    const reader = request.body?.getReader();
    if (!reader) return finish({ error: 'invalid_body' }, 400);
    const chunks = []; let size = 0;
    while (true) { const { done, value } = await reader.read(); if (done) break; size += value.length; if (size > 8192) { await reader.cancel(); return finish({ error: 'body_too_large' }, 413); } chunks.push(value); }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let body; try { body = JSON.parse(new TextDecoder().decode(bytes)); } catch { return finish({ error: 'invalid_json' }, 400); }
    if (!body || typeof body.body !== 'string' || !body.body.trim() || body.body.length > 2000 || Object.keys(body).some(key => key !== 'body')) return finish({ error: 'invalid_note' }, 400);
    const note = { note_id: crypto.randomUUID(), customer_id: customerID, body: body.body.trim(), actor: identity.actor, occurred_at: new Date().toISOString() };
    // D1 batch is transactional: a note cannot exist without its audit event.
    await env.DB.batch([
     env.DB.prepare('INSERT INTO hub_notes VALUES (?,?,?,?,?)').bind(note.note_id, customerID, note.body, identity.actor, note.occurred_at),
     env.DB.prepare('INSERT INTO hub_audit VALUES (?,?,?,?,?,?)').bind(crypto.randomUUID(), identity.actor, action, resource, 'allowed', note.occurred_at),
    ]);
    return json(note, 201);
   }
   return finish({ error: 'method_not_allowed' }, 405);
  } catch { return json({ error: 'service_unavailable' }, 503); }
 }
};
export { hash };
