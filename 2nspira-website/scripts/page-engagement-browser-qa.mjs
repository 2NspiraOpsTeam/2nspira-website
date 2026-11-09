const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.argv[2] || 'http://localhost:3319';
const out=process.argv[3] || '/tmp/engagement-qa';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const paths=['automation-systems-optimization','team-delivery','websites','ai-enablement','studio','studio/watch','studio/listen','studio/read','studio/play','videos'];
const results=[];
try {
 for (const width of [1440,768,390,320]) {
  const page=await browser.newPage({viewport:{width,height:950},extraHTTPHeaders:{'x-forwarded-proto':'https'}});
  for(const path of paths) {
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const r=await page.goto(`${base}/${path}`,{waitUntil:'networkidle'});assert.equal(r.status(),200,path);
   await page.locator('main h1').waitFor();
   assert.equal(await page.locator('main h1').count(),1);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1),false,`${path} overflow at ${width}`);
   const broken=await page.locator('main img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[],`${path} images`);
   const anchors=await page.locator('main nav[aria-label="On this page"] a, main nav[aria-label="Creative Studio groups"] a').evaluateAll(a=>a.map(x=>x.getAttribute('href')));
   for(const href of anchors)assert.ok(await page.locator(href).count(),`${path} missing ${href}`);
   for(const s of await page.locator('main details > summary').all()) {
    await s.focus();await page.keyboard.press('Enter');assert.equal(await s.evaluate(e=>e.parentElement.open),true);await page.keyboard.press('Enter');
   }
   await page.evaluate(async()=>{for(const img of document.querySelectorAll('main img')) {if(!img.closest('details:not([open])'))img.loading='eager';} await Promise.all([...document.querySelectorAll('main img')].filter(i=>!i.closest('details:not([open])')).map(i=>i.decode().catch(()=>{})));window.scrollTo({top:0,behavior:'instant'});});
   if(width===1440||width===390)await page.screenshot({path:`${out}/${path.replaceAll('/','-')}-${width}.png`,fullPage:true});
   assert.deepEqual(errors,[],`${path} browser errors`);
   if(width===1440){await page.emulateMedia({reducedMotion:'reduce'});await page.addScriptTag({path:process.env.AXE_PATH || new URL('../node_modules/axe-core/axe.min.js',import.meta.url).pathname});const a=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length}));});results.push({path,width,axe:a});assert.deepEqual(a,[],`${path} axe`);}
   else results.push({path,width,passed:true});
  }
  await page.close();
 }
 for(const js of [true,false]){
  const page=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:js,reducedMotion:'reduce',extraHTTPHeaders:{'x-forwarded-proto':'https'}});
  for(const path of paths){await page.goto(`${base}/${path}`);assert.ok(await page.locator('main h1').isVisible());for(const el of await page.locator('main h2').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');if(js)assert.equal(await page.locator('main').evaluate(e=>e.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);}
  await page.close();
 }
 fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify({layouts:results.length,axePages:paths.length,noJS:paths.length,reducedMotion:paths.length,out}));
} finally {await browser.close();}
