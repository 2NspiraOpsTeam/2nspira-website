const {chromium}=require('/opt/homebrew/lib/node_modules/openclaw/node_modules/playwright-core');
const fs=require('fs'),assert=require('assert');
const base='https://97032636-2nspira-website-preview.jcortez-36a.workers.dev';
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try {const page=await browser.newPage();const response=await page.goto(base+'/ai-enablement',{waitUntil:'networkidle'});assert.equal(response.status(),200);assert.equal(response.headers()['x-deployment-commit'],'72ceefd5821cabb26feeb1c2c5b1786cc18d6591');
const hrefs=await page.locator('main a[href]').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
const results=[];for(const href of hrefs){const url=new URL(href,base+'/ai-enablement');if(url.origin!==base){results.push({href,scope:'external destination source-reviewed only; not fetched or interacted with'});continue;}
if(url.pathname==='/ai-enablement'&&!url.search){results.push({href,status:200,anchor:!url.hash||await page.evaluate(id=>!!document.getElementById(id),decodeURIComponent(url.hash.slice(1)))});continue;}
const target=await browser.newPage();try{const r=await target.goto(url.href,{waitUntil:'networkidle',timeout:45000});results.push({href,status:r.status(),finalURL:target.url(),anchor:!url.hash||await target.evaluate(id=>!!document.getElementById(id),decodeURIComponent(url.hash.slice(1)))});}catch(e){results.push({href,error:e.message});}finally{await target.close();}}
fs.writeFileSync('2nspira-website/docs/qa/ai-259-links-results.json',JSON.stringify({base,applicationSHA:response.headers()['x-deployment-commit'],scope:'Unique main-region links, GET only, no contact submissions. External URLs not fetched.',results},null,2));
console.log(JSON.stringify(results,null,2));assert(results.every(r=>r.scope||(r.status===200&&r.anchor)), 'Internal destination or anchor failed');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
