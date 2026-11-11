import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base=process.argv[2];const b=await chromium.launch({channel:'chrome',headless:true});const ctx=await b.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});let n=0;const check=(v,m)=>{assert.ok(v,m);n++};
try{
for(const path of ['/fractional-cio','/fractional-cio?service=advisory&utm_source=legacy','/fractional-cio/']){
const r=await ctx.request.get(base+path,{maxRedirects:0});check([301,308].includes(r.status()),'permanent redirect '+path);let dest=new URL(r.headers().location,base);if(path.endsWith('/')&&dest.pathname==='/fractional-cio'){const normalized=await ctx.request.get(dest.href,{maxRedirects:0});check([301,308].includes(normalized.status()),'normalized permanent redirect');dest=new URL(normalized.headers().location,base);}check(dest.pathname==='/technology-advisory','new route');if(path.includes('?'))check(dest.search==='?service=advisory&utm_source=legacy','query retained');}
const p=await ctx.newPage();await p.goto(base+'/technology-advisory',{waitUntil:'networkidle'});
check(await p.locator('link[rel="canonical"]').getAttribute('href')==='https://2nspira.com/technology-advisory','canonical');check(await p.locator('meta[property="og:url"]').getAttribute('content')==='https://2nspira.com/technology-advisory','social URL');
check((await p.locator('meta[property="og:title"]').getAttribute('content')).includes('Technology Advisory & Leadership'),'social title');
check(await p.getByRole('navigation',{name:'Breadcrumb',exact:true}).getByText('Technology Advisory & Leadership',{exact:true}).count()===1,'visible breadcrumb');
check(await p.getByRole('heading',{name:'Fractional CIO',exact:true}).count()===1,'distinct fractional CIO offering');
for(const label of ['Technology strategy & planning','Vendor guidance','Leadership support'])check(await p.getByRole('heading',{name:label,exact:true}).count()===1,'offering '+label);
const schemas=await p.locator('script[type="application/ld+json"]').allTextContents();const data=schemas.map(JSON.parse);check(data.some(x=>x['@type']==='Service'&&x.url==='https://2nspira.com/technology-advisory'),'service schema');check(data.some(x=>x['@type']==='BreadcrumbList'&&x.itemListElement.at(-1).item==='https://2nspira.com/technology-advisory'),'breadcrumb schema');
const xml=await (await ctx.request.get(base+'/sitemap.xml')).text();check(xml.includes('<loc>https://2nspira.com/technology-advisory</loc>'),'new sitemap URL');check(!xml.includes('/fractional-cio'),'old sitemap URL absent');
for(const route of ['/','/services','/technology-advisory','/ai-enablement','/work','/who-we-serve/startups-entrepreneurs','/who-we-serve/technology-leaders-teams']){
const response=await p.goto(base+route,{waitUntil:'networkidle'});check(response.status()===200,'route '+route);check(await p.locator('a[href*="/fractional-cio"]').count()===0,'no old links '+route);}
await p.goto(base+'/contact',{waitUntil:'networkidle'});
await p.evaluate(()=>sessionStorage.setItem('2nspira-contact-draft',JSON.stringify({form:{name:'QA Draft',email:'qa@example.invalid',organization:'QA',organizationType:'',message:'Preserve this unsent draft.',projectType:'Executive Technology Advisory'},status:'idle'})));
await p.reload({waitUntil:'networkidle'});check(await p.locator('#projectType').inputValue()==='Technology Advisory & Leadership','legacy draft migrated');check(await p.locator('#message').inputValue()==='Preserve this unsent draft.','draft content preserved');
await p.goto(base+'/fractional-cio#lenses-heading' ,{waitUntil:'networkidle'});check(p.url().endsWith('/technology-advisory#lenses-heading'),'legacy fragment preserved');
console.log('PASS '+n+' advisory migration/SEO checks');
}finally{await b.close()}
