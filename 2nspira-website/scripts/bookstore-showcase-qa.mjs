import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const base=process.argv[2],out=process.argv[3];await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({extraHTTPHeaders:{'x-forwarded-proto':'https'}});const results=[];const ok=(v,s)=>{assert.ok(v,s);results.push(s)};
try{for(const width of [1440,1000,769,768,761,760,759,390,320]){
await p.setViewportSize({width,height:900});await p.goto(base,{waitUntil:'networkidle'});const section=p.locator('#featured-websites');await section.scrollIntoViewIfNeeded();await section.locator('img').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));const cards=section.locator('article');
ok(await cards.count()===4,'four visible projects '+width);
const rects=await cards.evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}}));
if(width>760){ok(Math.abs(rects[0].y-rects[1].y)<1&&Math.abs(rects[2].y-rects[3].y)<1&&rects[2].y>rects[0].y,'two by two grid '+width)}else{ok(rects.every((r,i)=>i===0||r.y>rects[i-1].y)&&rects.every(r=>r.x===rects[0].x),'single column '+width)}
ok(rects.every(r=>Math.abs(r.width-rects[0].width)<1),'equal card widths '+width);
ok(await section.locator('h3').allTextContents().then(a=>a.map(s=>s.replace('↗','').trim()).join('|')==='GeVitals|Open Goal Soccer|Teams Management|Briarcrypt Books'),'approved order '+width);
ok(await section.getByText('Independent collectible-book storefront',{exact:true}).isVisible(),'independent bookstore label '+width);
ok(await section.getByText('Visit bookstore',{exact:false}).isVisible(),'bookstore CTA '+width);
ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow '+width);
if([1440,768,390,320].includes(width)){for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=700)await p.evaluate(y=>scrollTo(0,y),y);await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:`${out}/after-${width}.jpg`,fullPage:true,type:'jpeg',quality:78});await section.screenshot({path:`${out}/portfolio-${width}.jpg`,type:'jpeg',quality:85});}
await p.reload({waitUntil:'networkidle'});ok(await cards.count()===4,'refresh retains four projects '+width);
}await writeFile(`${out}/result.json`,JSON.stringify({base,checks:results.length,results},null,2));console.log(results.length+' bookstore checks passed')}finally{await b.close()}
