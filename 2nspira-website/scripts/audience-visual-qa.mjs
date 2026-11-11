import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const base=process.argv[2]||'http://localhost:3344';
const routes=['startups-entrepreneurs','technology-leaders-teams','retail-ecommerce','small-businesses-professional-services'];
const browser=await chromium.launch({channel:'chrome',headless:true});let checks=0;const check=v=>{assert.ok(v);checks++;};const errors=[];
try{
 const context=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,1024,768,390,320]){
  await p.setViewportSize({width,height:1000});
  for(const route of routes){
   const res=await p.goto(base+'/who-we-serve/'+route,{waitUntil:'networkidle'});check(res.status()===200);check(await p.locator('main h1').count()===1);
   const img=p.locator('[data-audience-hero]');await img.evaluate(i=>i.decode());check(await img.evaluate(i=>i.complete&&i.naturalWidth>0));check((await img.getAttribute('alt')).length>20);
   check(await p.locator('main details[open]').count()===0);check(await p.locator('[data-challenge]').count()===3);check(await p.locator('[data-scope]').count()===2);check(await p.locator('[data-service]').count()>=3);
   check(await p.getByRole('heading',{name:'Advice or implementation. You choose.',exact:true}).isVisible());
   for(const detail of await p.locator('main details').all()){
    const summary=detail.locator('summary');await summary.click();check(await detail.getAttribute('open')!==null);check(await detail.locator('p').isVisible());await summary.focus();await p.keyboard.press('Enter');check(await detail.getAttribute('open')===null);
   }
   check(await p.locator('main a[href*="calendar"]').count()>=2);check(await p.locator('main').innerText().then(s=>s.split(/\s+/).length<650));check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await p.evaluate(()=>window.scrollTo(0,0));
   await p.screenshot({path:`/tmp/audience-visual-${route}-${width}.png`,fullPage:true});
   await p.reload({waitUntil:'networkidle'});check(await p.locator('main details[open]').count()===0);
  }console.log('PASS four pages: images, scannability, keyboard disclosures, layout and refresh at '+width);
 }
 await p.goto(base+'/who-we-serve',{waitUntil:'networkidle'});const cards=p.locator('#industries article img');check(await cards.count()===4);for(const i of await cards.all()){await i.scrollIntoViewIfNeeded();await i.evaluate(e=>e.decode());check(await i.evaluate(e=>e.naturalWidth>0));}check(await p.locator('#industries article').count()===7);
 await context.close();
 for(const options of [{javaScriptEnabled:false},{reducedMotion:'reduce'}]){
  const c=await browser.newContext({...options,viewport:{width:390,height:844},extraHTTPHeaders:{'x-forwarded-proto':'https'}});const q=await c.newPage();await q.goto(base+'/who-we-serve/'+routes[0],{waitUntil:'networkidle'});const d=q.locator('main details').first();await d.locator('summary').click();check(await d.getAttribute('open')!==null);check(await d.locator('p').isVisible());check(await q.locator('[data-audience-hero]').evaluate(i=>i.complete&&i.naturalWidth>0));await c.close();
 }
 check(errors.length===0);console.log(`${checks} audience visual checks passed.`);
}finally{await browser.close();}
