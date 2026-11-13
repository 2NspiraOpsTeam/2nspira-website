import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.argv[2];const out=process.argv[3];await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({extraHTTPHeaders:{'x-forwarded-proto':'https'}});let checks=0;const results=[];const ok=(v,label)=>{assert.ok(v,label);checks++;results.push(label)};
const urls=['https://www.teamsmanagement.com/','https://gevitals.com/','https://opengoalsoccer.com/'];
for(const width of [1440,768,390,320]){
 await p.setViewportSize({width,height:900});await p.goto(base,{waitUntil:'networkidle'});
 const section=p.getByRole('region',{name:'Different businesses. Distinct digital experiences.'});await section.scrollIntoViewIfNeeded();
 const cards=section.locator('article');ok(await cards.count()===3,`all three cards ${width}`);
 for(let i=0;i<3;i++){
  const card=cards.nth(i);await card.scrollIntoViewIfNeeded();const link=card.locator('a');ok(await link.getAttribute('href')===urls[i],`verified destination ${i} ${width}`);
  const img=card.locator('img');await img.evaluate(e=>e.decode());ok((await img.getAttribute('alt')).length>20,`descriptive alt ${i} ${width}`);
  ok(await img.evaluate(e=>e.complete&&e.naturalWidth===1008),`loaded real screenshot ${i} ${width}`);
  await link.focus();ok(await link.evaluate(e=>e===document.activeElement&&getComputedStyle(e).outlineStyle!=='none'),`visible keyboard focus ${i} ${width}`);
  const hit=await link.evaluate(e=>{const r=e.querySelector('h3').getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))});ok(hit,`chatbot does not cover card heading ${i} ${width}`);
  await p.keyboard.press('Enter');await p.waitForURL(urls[i],{timeout:60000});ok(p.url()===urls[i],`keyboard activates real site ${i} ${width}`);await p.goBack({waitUntil:'networkidle'});
 }
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:`${out}/portfolio-after-${width}.jpg`,fullPage:true,type:'jpeg',quality:78});
 await p.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`text spacing no overflow ${width}`);
}
for(const url of urls){const r=await p.request.get(url);ok(r.status()===200,`public link HTTP 200 ${url}`)}
await writeFile(`${out}/portfolio-result.json`,JSON.stringify({base,checks,results},null,2));console.log(`${checks} portfolio checks passed`);await b.close();
