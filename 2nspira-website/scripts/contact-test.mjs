import {build} from 'esbuild';
import {DatabaseSync} from 'node:sqlite';
import {readFile,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const dir=await mkdtemp(join(tmpdir(),'contact-qa-'));
const sql=new DatabaseSync(':memory:');sql.exec(await readFile(new URL('../migrations/careers/0002_contact_delivery.sql',import.meta.url),'utf8'));
const DB={prepare(q){let args=[];return {bind(...a){args=a;return this},async first(){return sql.prepare(q).get(...args)||null},async run(){return {meta:{changes:sql.prepare(q).run(...args).changes}}}}}};
globalThis.__CONTACT_ENV={CAREERS_DB:DB,GOOGLE_CLIENT_ID:'fixture',GOOGLE_CLIENT_SECRET:'fixture',GOOGLE_REFRESH_TOKEN:'fixture'};
await build({entryPoints:['src/lib/contactDelivery.ts'],outfile:join(dir,'contact.mjs'),bundle:true,platform:'node',format:'esm',plugins:[{name:'mock-worker-env',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'env',namespace:'mock'}));b.onLoad({filter:/.*/,namespace:'mock'},()=>({contents:'export const env=globalThis.__CONTACT_ENV;'}))}}]});
const {deliverContact}=await import(pathToFileURL(join(dir,'contact.mjs')));
const originalFetch=globalThis.fetch;let sends=0,mode='success';
globalThis.fetch=async(url,options)=>{if(url.includes('oauth2'))return mode==='authFailure'?new Response('{}',{status:400}):Response.json({access_token:'fixture'});sends++;const mime=Buffer.from(JSON.parse(options.body).raw,'base64url').toString();assert.match(mime,/To: jcortez@2nspira.com/);assert.match(mime,/Reply-To: qa@example.test/);if(mode==='timeout')throw Error('uncertain');if(mode==='reject')return new Response('{}',{status:429});return Response.json({id:'provider-'+sends});};
const input={email:'qa@example.test',subject:'QA inquiry',body:'QA only',fingerprint:'one',ip:'qa-one'};
try{
 assert.equal(await deliverContact(input),'delivered');assert.equal(sends,1);
 assert.equal(await deliverContact(input),'delivered');assert.equal(sends,1);
 const concurrent=await Promise.all([deliverContact({...input,fingerprint:'concurrent',ip:'concurrent'}),deliverContact({...input,fingerprint:'concurrent',ip:'concurrent'})]);assert.ok(concurrent.every(s=>['delivered','unknown'].includes(s)));assert.equal(sends,2);
 mode='authFailure';assert.equal(await deliverContact({...input,fingerprint:'auth',ip:'auth'}),'unavailable');assert.equal(sends,2);
 mode='timeout';assert.equal(await deliverContact({...input,fingerprint:'uncertain',ip:'timeout'}),'unknown');assert.equal(await deliverContact({...input,fingerprint:'uncertain',ip:'timeout'}),'unknown');assert.equal(sends,3);
 mode='reject';assert.equal(await deliverContact({...input,fingerprint:'reject',ip:'reject'}),'unavailable');mode='success';assert.equal(await deliverContact({...input,fingerprint:'reject',ip:'reject'}),'delivered');assert.equal(sends,5);
 for(let i=0;i<5;i++)assert.equal(await deliverContact({...input,fingerprint:'limit-'+i,ip:'limit'}),'delivered');assert.equal(await deliverContact({...input,fingerprint:'limit-6',ip:'limit'}),'limited');assert.equal(sends,10);
 assert.equal(sql.prepare("SELECT COUNT(*) n FROM contact_delivery WHERE status='unknown'").get().n,1);
 console.log('Contact delivery: success, duplicate, concurrent claim, authorization failure, ambiguous delivery/no retry, explicit rejection/retry, fixed recipient/MIME, rate limit, and persisted state assertions passed.');
}finally{globalThis.fetch=originalFetch;sql.close();}
