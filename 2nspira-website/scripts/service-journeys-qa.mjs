import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const base=process.argv[2]||'http://localhost:3377';
const browser=await chromium.launch({channel:'chrome',headless:true});
let checks=0;const check=(v,m)=>{assert.ok(v,m);checks++};
const services=[['/websites','websites','Website development or redesign'],['/automation-systems-optimization','automation','Business Automation & Integrations'],['/ai-enablement','ai','AI Enablement'],['/technology-advisory','advisory','Technology Advisory & Leadership'],['/managed-services-support','support','Managed Services & Support']];
try{
 const ctx=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'},reducedMotion:'reduce'});
 const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const [route,key] of services){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});check(response.status()===200,route+' status');
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' overflow '+width);
   check(await page.locator('main h1').count()===1,route+' h1');
   check(await page.locator(`main a[href="/contact?service=${key}#contact-message"]`).count()>0,route+' inquiry context');
   check(await page.locator('main a[href="/team-delivery"]').count()>0,route+' team');
   check(await page.locator('main a[href^="/who-we-serve"]').count()>0,route+' audience');
   for(const script of await page.locator('script[type="application/ld+json"]').all()){JSON.parse(await script.textContent());checks++;}
   for(const img of await page.locator('main img').all()){
    if(!await img.isVisible())continue;
    await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());check(await img.evaluate(i=>i.naturalWidth>0),route+' image');
   }
   for(const summary of await page.locator('main details > summary').all()){
    if(!await summary.isVisible())continue;
    await summary.scrollIntoViewIfNeeded();await summary.focus();await page.keyboard.press('Enter');check(await summary.locator('..').getAttribute('open')!==null,'disclosure open '+route);await page.keyboard.press('Enter');check(await summary.locator('..').getAttribute('open')===null,'disclosure close '+route);
   }
   if(key==='automation'){
    await page.getByRole('button',{name:'Approvals',exact:true}).click();check(await page.getByText('Keep a decision record',{exact:true}).isVisible(),'workflow selection');
    const summary=page.getByText('Try an illustrative integration handoff',{exact:true});await summary.click();
    const retry=page.getByRole('button',{name:'Retry same request',exact:true});check(await retry.isDisabled(),'retry unavailable before failure');
    await page.getByRole('button',{name:'Simulate unavailable destination',exact:true}).click();check((await page.getByRole('status').innerText()).includes('remains pending'),'failure feedback');
    await retry.click();check(await retry.isDisabled(),'duplicate retry disabled');check((await page.getByRole('status').innerText()).includes('recorded once'),'retry feedback');
    await page.getByRole('button',{name:'Reset sample',exact:true}).click();check(await retry.isDisabled(),'sample reset');
   }
   await page.screenshot({path:`/tmp/service-journey-${key}-${width}.png`,fullPage:true});
  }
  for(const route of ['/','/services','/work','/who-we-serve','/team-delivery','/contact']){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});check(response.status()===200,route+' status '+width);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' overflow '+width);
  }
  await page.goto(base+'/',{waitUntil:'networkidle'});
  if(width<1024){await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:/^(Our )?Services$/}).click();}
  else await page.getByRole('button',{name:/^(Our )?Services$/}).click();
  for(const name of ['Websites & Custom Digital Platforms','Business Automation & Integrations','Organizational AI enablement','Technology Advisory & Leadership','Managed Services & Support']){
   const a=page.getByRole('link',{name,exact:true}).filter({visible:true}).first();check(await a.isVisible(),'menu '+name);const box=await a.boundingBox();check(box.x>=0&&box.x+box.width<=width+1,'menu fit '+name);
  }
  const support=page.getByRole('link',{name:'Managed Services & Support',exact:true}).filter({visible:true}).first();await support.focus();await page.keyboard.press('Enter');await page.waitForURL('**/managed-services-support');check(await page.getByRole('heading',{level:1,name:'Managed Services & Support',exact:true}).isVisible(),'menu activation');
  console.log('PASS service journeys '+width);
 }
 for(const [,key,value] of services){await page.evaluate(()=>sessionStorage.clear());await page.goto(base+`/contact?service=${key}#contact-message`,{waitUntil:'networkidle'});check(await page.locator('#projectType').inputValue()===value,'prefill '+key);await page.reload({waitUntil:'networkidle'});check(await page.locator('#projectType').inputValue()===value,'prefill refresh '+key);}
 check(errors.length===0,errors.join('\n'));console.log(`PASS ${checks} service journey checks; no messages sent`);
}finally{await browser.close();}
