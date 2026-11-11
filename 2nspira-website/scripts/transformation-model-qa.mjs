import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const base=process.argv[2]||'http://localhost:3355';
const browser=await chromium.launch({channel:'chrome',headless:true});
let checks=0;const check=(v,m)=>{assert.ok(v,m);checks++;};
try {
const context=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,768,390,320]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/','/services','/fractional-cio','/about','/insights','/resources','/careers','/who-we-serve/startups-entrepreneurs']){
  const response=await page.goto(base+route,{waitUntil:'networkidle'});check(response.status()===200,route);
  check(await page.locator('a[href="/coaching"],a[href="/entrepreneur-mentoring"]').count()===0,'retired links '+route);
  check(!/Entrepreneur Mentoring|industry-aligned coach|founder mentoring|advice, mentoring/i.test(await page.locator('body').innerText()),'retired promotion '+route);
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+route+' '+width);
  for(const node of await page.locator('script[type="application/ld+json"]').all())JSON.parse(await node.textContent());
  if(route==='/'||route==='/services'){
   for(const label of ['AI Enablement','Business Automation','Digital Platforms','Executive Technology Advisory','Ongoing Managed Services & Support'])check((await page.locator('main').innerText()).includes(label),label);
   check(await page.locator('#ongoing-support').count()===1,'support anchor');
   check(await page.locator('main').getByText('Creative Studio',{exact:true}).count()===1,'studio separate');
   for(const img of await page.locator('main img').all()){ await img.scrollIntoViewIfNeeded(); await img.evaluate(i=>i.decode()); check(await img.evaluate(i=>i.naturalWidth>0),'image loaded'); }
   await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:`/tmp/transformation-${route==='/'?'home':'services'}-${width}.png`,fullPage:true});
  }
  if(route==='/services'){
   check(await page.locator('[data-service-card]').count()===3,'three pillars');
   const summary=page.locator('[data-service-card] summary').first();await summary.focus();await page.keyboard.press('Enter');check(await summary.locator('..').getAttribute('open')!==null,'keyboard disclosure');
   await page.reload({waitUntil:'networkidle'});check(await page.locator('[data-service-card] details[open]').count()===0,'refresh');
  }
 }
 console.log('PASS marketing routes and service model at '+width);
}
for(const route of ['/coaching','/entrepreneur-mentoring']){
 const res=await context.request.get(base+route,{maxRedirects:0});check(res.status()===308,'redirect status');check(res.headers().location==='/services','redirect destination');
}
const sitemap=await context.request.get(base+'/sitemap.xml');check(!(await sitemap.text()).includes('/coaching'),'sitemap retired');
check(errors.length===0,errors.join('\n'));console.log(`PASS ${checks} rendered checks, JSON-LD parsing, redirects and sitemap`);
}finally{await browser.close();}
