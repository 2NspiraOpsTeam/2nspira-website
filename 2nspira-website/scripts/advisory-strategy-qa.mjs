import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base = process.argv[2];
const out = process.argv[3] || '/tmp/advisory-strategy-qa';
await mkdir(out, {recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
let checks=0; const results=[];
const check=(value,label)=>{assert.ok(value,label);checks++;results.push(label);};
try {
for(const width of [1440,768,390,320]) {
 const context=await browser.newContext({viewport:{width,height:960},extraHTTPHeaders:{'x-forwarded-proto':'https'}});
 const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/api/contact',r=>r.abort());
 const response=await p.goto(base+'/technology-advisory',{waitUntil:'networkidle'});check(response.status()===200,'page 200 '+width);
 check(await p.locator('main h1').count()===1,'one heading '+width);
 const imgs=p.locator('main img');check(await imgs.count()===3,'three people-free photographs '+width);
 for(const img of await imgs.all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());check(await img.evaluate(i=>i.naturalWidth>0),'image decoded '+width);}
 check((await imgs.nth(0).getAttribute('src')).includes('advisory-strategy'),'original chess hero '+width);
 check(await p.locator('main img[src*="leadership"],main img[src*="collaborative"],main img[src*="fractional-cio-focus"],main img[src*="ideas-to-impact"]').count()===0,'no former people images '+width);
 check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow '+width);
 for(const a of await p.locator('nav[aria-label="Explore Technology Advisory & Leadership"] a').all()){
  const href=await a.getAttribute('href');await a.click();check(await p.locator(href).count()===1,'section anchor '+href+' '+width);
 }
 const details=p.locator('details').filter({has:p.getByText('Explore example working documents',{exact:true})});
 await details.locator('summary').scrollIntoViewIfNeeded();await details.locator('summary').focus();await p.keyboard.press('Enter');check(await details.getAttribute('open')!==null,'keyboard working-document expansion '+width);await p.keyboard.press('Enter');check(await details.getAttribute('open')===null,'keyboard disclosure collapse '+width);
 check(await p.getByRole('heading',{name:'Fractional CIO',exact:true}).count()===1,'distinct offering '+width);
 check(await p.getByRole('link',{name:'Meet Jeffrey →',exact:true}).getAttribute('href')==='/about#executive-profile','partner biography retained '+width);
 const pause=p.getByRole('button',{name:'Pause executive lenses carousel',exact:true});await pause.scrollIntoViewIfNeeded();await pause.click();check(await p.getByRole('button',{name:'Resume executive lenses carousel',exact:true}).count()===1,'carousel pause '+width);
 await p.getByRole('button',{name:'Next executive lenses',exact:true}).click();await p.waitForTimeout(450);check(await p.locator('#executive-lenses-track').evaluate(e=>e.scrollLeft>0),'carousel next '+width);
 await p.waitForFunction(()=>document.querySelector('main').getAnimations({subtree:true}).every(a=>a.playState!=='running'));await p.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const axe=await p.evaluate(async()=>await window.axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));await writeFile(out+'/axe-'+width+'.json',JSON.stringify(axe.violations,null,2));check(axe.violations.length===0,'automated accessibility '+width);
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:out+'/'+width+'.png',fullPage:true});
 const message=p.locator('main').getByRole('link',{name:'Send a message',exact:true}).first();await message.click();await p.waitForURL('**/contact?service=advisory#contact-message');await p.waitForFunction(()=>document.querySelector('#projectType')?.value==='Technology Advisory & Leadership');check(await p.locator('#projectType').inputValue()==='Technology Advisory & Leadership','contact service handoff '+width);
 await p.goto(base+'/technology-advisory',{waitUntil:'networkidle'});check((await p.locator('main img').first().getAttribute('src')).includes('advisory-strategy'),'refresh imagery persistence '+width);
 check(errors.length===0,'no browser exceptions '+width);await context.close();
}
const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844},extraHTTPHeaders:{'x-forwarded-proto':'https'}});const r=await reduced.newPage();await r.goto(base+'/technology-advisory',{waitUntil:'networkidle'});
check(await r.locator('#executive-lenses-track').getAttribute('data-moving')==='false','reduced motion carousel stopped');
check(await r.locator('main').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)===0,'reduced motion no running animations');await reduced.close();
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},extraHTTPHeaders:{'x-forwarded-proto':'https'}});const n=await nojs.newPage();await n.goto(base+'/technology-advisory',{waitUntil:'networkidle'});
check(await n.getByRole('heading',{name:'Technology strategy & planning',exact:true}).isVisible(),'no JS content visible');await n.getByText('Explore example working documents',{exact:true}).click();check(await n.getByRole('heading',{name:'Technology roadmap',exact:true}).isVisible(),'no JS disclosure works');check(await n.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no JS no overflow');await nojs.close();
await writeFile(out+'/results.json',JSON.stringify({base,checks,results},null,2));console.log('PASS '+checks+' advisory strategy checks');
}finally{await browser.close();}
