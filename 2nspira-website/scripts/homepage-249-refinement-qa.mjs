import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const base=process.argv[2],out=process.argv[3];await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({extraHTTPHeaders:{'x-forwarded-proto':'https'}});const results=[];
const ok=(v,s)=>{assert.ok(v,s);results.push(s)};
try{for(const width of [1440,768,390,320]){
await p.setViewportSize({width,height:900});await p.goto(base,{waitUntil:'networkidle'});
const chat=p.getByRole('button',{name:'Ask 2Nspira',exact:true});await chat.waitFor({state:'visible'});
const footer=p.locator('footer').getByRole('navigation',{name:'Creative Studio'});
ok(JSON.stringify(await footer.locator('a').allTextContents())===JSON.stringify(['Explore Creative Studio','Watch','Listen','Read','Play','Shop']),`footer taxonomy ${width}`);
ok((await p.locator('#featured-websites h3').allTextContents()).join('|').startsWith('GeVitals'),'GeVitals leads portfolio '+width);
ok(await p.locator('main section').first().locator('img').getAttribute('src')==='/images/work/teams-mobile-20261113.webp','distinct Teams detail '+width);
if(width<=480){ok(await chat.evaluate(e=>getComputedStyle(e).position==='static'),'mobile chat in flow '+width);
for(const y of [0,350,650,1000,1500]){await p.evaluate(y=>scrollTo(0,y),y);ok(await p.evaluate(()=>{const c=document.querySelector('button[aria-haspopup="dialog"]');const r=c.getBoundingClientRect();return [...document.querySelectorAll('main img,main a')].every(e=>{const s=e.getBoundingClientRect();return r.right<=s.left||r.left>=s.right||r.bottom<=s.top||r.top>=s.bottom})}),'chat does not overlap content '+width+' scroll '+y);}}
await chat.scrollIntoViewIfNeeded();await chat.focus();await p.keyboard.press('Enter');const dialog=p.getByRole('dialog',{name:'Ask 2Nspira AI assistant'});await dialog.waitFor();ok(await dialog.isVisible(),'keyboard chat opens '+width);await p.keyboard.press('Escape');ok(await chat.evaluate(e=>e===document.activeElement),'chat Escape restores focus '+width);
await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:`${out}/refined-${width}.jpg`,fullPage:true,type:'jpeg',quality:78});
ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow '+width);
}
for(const path of ['/studio/watch','/studio/read','/studio/play','/studio/listen','/shop','/videos']){const r=await p.goto(base+path,{waitUntil:'networkidle'});ok(r.status()===200,'preserved route '+path);for(const json of await p.locator('script[type="application/ld+json"]').allTextContents())JSON.parse(json);}
await writeFile(`${out}/refinement-result.json`,JSON.stringify({base,checks:results.length,results},null,2));console.log(results.length+' refinement checks passed');}finally{await b.close()}
