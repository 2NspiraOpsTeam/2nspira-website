const MAX_BYTES = 1500000;
const ISSUE = 'https://github.com/2NspiraOpsTeam/2nspira-website/issues/188';
export async function sha256(value) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join('');
}
export function canonicalJSON(value) {
  if(Array.isArray(value)) return '['+value.map(canonicalJSON).join(',')+']';
  if(value!==null && typeof value==='object') return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonicalJSON(value[k])).join(',')+'}';
  return JSON.stringify(value);
}
function json(value,status=200) {
  return new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
}
export function validate(body) {
  if (!body || typeof body !== 'object' || typeof body.run_id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.run_id)) throw Error('Invalid run_id');
  if (typeof body.observed_at !== 'string' || !Number.isFinite(Date.parse(body.observed_at)) || !body.observed_at.endsWith('Z')) throw Error('UTC observed_at required');
  if (Date.parse(body.observed_at)>Date.now()+300000) throw Error('Future observed_at');
  if (body.issue_url !== ISSUE || typeof body.record_version !== 'string') throw Error('Invalid provenance');
  if (!Array.isArray(body.opportunities) || body.opportunities.length<1 || body.opportunities.length>50) throw Error('1-50 opportunities required');
  const ids=new Set();
  for (const row of body.opportunities) {
    if (!row || !/^MI-\d{3,6}$/.test(row.candidate_id) || ids.has(row.candidate_id)) throw Error('Invalid or duplicate candidate_id');
    ids.add(row.candidate_id);
    for (const key of ['title','category','stage','confidence']) if(typeof row[key]!=='string' || !row[key].trim() || row[key].length>2000) throw Error('Invalid '+key);
    if (typeof row.score!=='number' || !Number.isFinite(row.score) || row.score<0 || row.score>100) throw Error('Invalid score');
    if (!Array.isArray(row.demand_evidence_links) || row.demand_evidence_links.length>50) throw Error('Evidence links required');
    for (const link of row.demand_evidence_links) if (typeof link!=='string' || !/^https:\/\//.test(link) || link.length>4000) throw Error('Invalid evidence URL');
  }
  if (!Array.isArray(body.documents) || body.documents.length>30) throw Error('Documents required');
  const docs=new Set();
  for(const d of body.documents) {
    if(!d || typeof d.name!=='string' || !/^[a-zA-Z0-9_.-]{1,100}$/.test(d.name) || docs.has(d.name) || typeof d.content!=='string' || d.content.length>750000) throw Error('Invalid document');
    docs.add(d.name);
  }
}
async function audit(env,actor,action,resource,outcome) {
  await env.DB.prepare('INSERT INTO mi_audit(event_id,actor,action,resource,outcome) VALUES(?,?,?,?,?)').bind(crypto.randomUUID(),actor,action,resource,outcome).run();
}
export default {async fetch(request,env) {
  try {
    const url=new URL(request.url);
    if (url.pathname==='/health' && request.method==='GET') return json({service:'2nspira-market-intelligence',status:'ok'});
    let keys;
    try {keys=JSON.parse(env.AGENT_KEYS || '{}');} catch {return json({error:'Authentication unavailable'},503);}
    const header=request.headers.get('authorization') || '';
    const principal=header.startsWith('Bearer ') ? keys[await sha256(header.slice(7))] : null;
    if(!principal || typeof principal.actor!=='string' || !['reader','writer'].includes(principal.role)) return json({error:'Unauthorized'},401);
    if (request.method==='POST' && url.pathname==='/v1/import') {
      if(principal.role!=='writer') {await audit(env,principal.actor,'import',url.pathname,'denied');return json({error:'Read-only principal'},403);}
      if(Number(request.headers.get('content-length'))>MAX_BYTES) return json({error:'Payload too large'},413);
      // Stream with a hard bound, including requests without Content-Length.
      let size=0;const chunks=[];const reader=request.body?.getReader();
      if(!reader) return json({error:'Body required'},400);
      while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_BYTES){await reader.cancel();return json({error:'Payload too large'},413);}chunks.push(value);}
      const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
      let body;try{body=JSON.parse(new TextDecoder().decode(bytes));validate(body);}catch(e){return json({error:e.message},400);}
      const hash=await sha256(canonicalJSON(body)), legacyHash=await sha256(JSON.stringify(body));
      const matches=prior=>prior && (prior.canonical_hash===hash || prior.payload_hash===hash || prior.payload_hash===legacyHash);
      const prior=await env.DB.prepare('SELECT payload_hash,canonical_hash FROM mi_runs WHERE run_id=?').bind(body.run_id).first();
      if(prior){if(!matches(prior))return json({error:'Immutable run_id already has different content'},409);return json({run_id:body.run_id,status:'already_imported'});}
      const timestamp=new Date(body.observed_at).toISOString();
      for(const row of body.opportunities) {
        const conflict=await env.DB.prepare('SELECT run_id FROM mi_versions WHERE candidate_id=? AND observed_at=?').bind(row.candidate_id,timestamp).first();
        if(conflict) return json({error:'Observation timestamp already used; increment checked_at for a new revision'},409);
      }
      const statements=[env.DB.prepare('INSERT INTO mi_runs(run_id,observed_at,actor,issue_url,record_version,payload_hash,canonical_hash) VALUES(?,?,?,?,?,?,?)').bind(body.run_id,timestamp,principal.actor,body.issue_url,body.record_version,hash,hash)];
      for (const row of body.opportunities) {
        const record=JSON.stringify(row);
        statements.push(env.DB.prepare('INSERT INTO mi_versions(run_id,candidate_id,record_json,observed_at) VALUES(?,?,?,?)').bind(body.run_id,row.candidate_id,record,timestamp));
        statements.push(env.DB.prepare(`INSERT INTO mi_opportunities(candidate_id,title,category,score,stage,confidence,observed_at,run_id,record_json) VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(candidate_id) DO UPDATE SET title=excluded.title,category=excluded.category,score=excluded.score,stage=excluded.stage,confidence=excluded.confidence,observed_at=excluded.observed_at,run_id=excluded.run_id,record_json=excluded.record_json WHERE excluded.observed_at>mi_opportunities.observed_at`).bind(row.candidate_id,row.title,row.category,row.score,row.stage,row.confidence,timestamp,body.run_id,record));
        for (const link of new Set(row.demand_evidence_links)) statements.push(env.DB.prepare('INSERT INTO mi_sources(run_id,candidate_id,url) VALUES(?,?,?)').bind(body.run_id,row.candidate_id,link));
      }
      for(const doc of body.documents) statements.push(env.DB.prepare('INSERT INTO mi_documents(run_id,name,content,sha256) VALUES(?,?,?,?)').bind(body.run_id,doc.name,doc.content,await sha256(doc.content)));
      statements.push(env.DB.prepare('INSERT INTO mi_audit(event_id,actor,action,resource,outcome) VALUES(?,?,?,?,?)').bind(crypto.randomUUID(),principal.actor,'import',body.run_id,'success'));
      try {await env.DB.batch(statements);} catch(error) {
        // A competing request may have committed after our existence check.
        const committed=await env.DB.prepare('SELECT payload_hash,canonical_hash FROM mi_runs WHERE run_id=?').bind(body.run_id).first();
        if(committed) return matches(committed) ? json({run_id:body.run_id,status:'already_imported'}) : json({error:'Immutable run_id already has different content'},409);
        for(const row of body.opportunities) {
          if(await env.DB.prepare('SELECT run_id FROM mi_versions WHERE candidate_id=? AND observed_at=?').bind(row.candidate_id,timestamp).first()) return json({error:'Observation timestamp already used; increment checked_at for a new revision'},409);
        }
        throw error;
      }
      return json({run_id:body.run_id,status:'imported',opportunities:body.opportunities.length,documents:body.documents.length},201);
    }
    if(request.method!=='GET') return json({error:'Method not allowed'},405);
    let result;
    const id=url.pathname.match(/^\/v1\/opportunities\/(MI-\d{3,6})(\/history)?$/);
    const doc=url.pathname.match(/^\/v1\/runs\/([a-zA-Z0-9_-]{1,100})\/documents(?:\/([a-zA-Z0-9_.-]{1,100}))?$/);
    if(url.pathname==='/v1/opportunities') {
      const q=(url.searchParams.get('q') || '').slice(0,200),stage=(url.searchParams.get('stage')||'').slice(0,200);
      const limit=Math.min(100,Math.max(1,parseInt(url.searchParams.get('limit')||'50',10)||50));
      const offset=Math.max(0,Math.min(100000,parseInt(url.searchParams.get('offset')||'0',10)||0));
      result=await env.DB.prepare('SELECT candidate_id,title,category,score,stage,confidence,observed_at,run_id FROM mi_opportunities WHERE (title LIKE ? OR category LIKE ?) AND stage LIKE ? ORDER BY score DESC,candidate_id LIMIT ? OFFSET ?').bind('%'+q+'%','%'+q+'%','%'+stage+'%',limit,offset).all();
    } else if(id) {
      if(id[2]) result=await env.DB.prepare('SELECT v.run_id,r.observed_at,v.record_json FROM mi_versions v JOIN mi_runs r USING(run_id) WHERE candidate_id=? ORDER BY r.observed_at DESC').bind(id[1]).all();
      else {const row=await env.DB.prepare('SELECT record_json,run_id,observed_at FROM mi_opportunities WHERE candidate_id=?').bind(id[1]).first();if(!row)return json({error:'Not found'},404);result={...row,record:JSON.parse(row.record_json),record_json:undefined};}
    } else if(url.pathname==='/v1/runs') result=await env.DB.prepare('SELECT * FROM mi_runs ORDER BY observed_at DESC LIMIT 100').all();
    else if(url.pathname==='/v1/sources') {
      const limit=Math.min(1000,Math.max(1,parseInt(url.searchParams.get('limit')||'100',10)||100));
      const offset=Math.max(0,Math.min(1000000,parseInt(url.searchParams.get('offset')||'0',10)||0));
      result=await env.DB.prepare(`SELECT * FROM mi_sources WHERE (?='' OR run_id=?) AND (?='' OR candidate_id=?) ORDER BY run_id,candidate_id,url LIMIT ? OFFSET ?`).bind(url.searchParams.get('run_id')||'',url.searchParams.get('run_id')||'',url.searchParams.get('candidate_id')||'',url.searchParams.get('candidate_id')||'',limit,offset).all();
      result.next_offset=result.results.length===limit ? offset+limit : null;
    }
    else if(url.pathname==='/v1/audit') result=await env.DB.prepare('SELECT * FROM mi_audit ORDER BY occurred_at DESC LIMIT 100').all();
    else if(doc) {
      if(doc[2]) {result=await env.DB.prepare('SELECT * FROM mi_documents WHERE run_id=? AND name=?').bind(doc[1],doc[2]).first();if(!result)return json({error:'Not found'},404);}
      else result=await env.DB.prepare('SELECT name,sha256,length(content) AS characters FROM mi_documents WHERE run_id=?').bind(doc[1]).all();
    } else return json({error:'Not found'},404);
    await audit(env,principal.actor,'read',url.pathname,'success');
    return json(result);
  }catch(error){console.error('Market intelligence request failed',error.name);return json({error:'Service unavailable'},503);}
}};
