const {chromium}=require('/opt/homebrew/lib/node_modules/openclaw/node_modules/playwright-core');
const fs=require('fs'),assert=require('assert');
const base='https://27b768aa-2nspira-website-preview.jcortez-36a.workers.dev',applicationSHA='eb102fecc7a01b43af64aa3c2ad9cca1d29b71d8';
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}),results=[];
try{const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const response=await page.goto(base+'/ai-enablement',{waitUntil:'networkidle'});assert.equal(response.headers()['x-deployment-commit'],applicationSHA);
const sample=async(label,expected)=>{const value=await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior);results.push({label,value,expected,url:page.url()});assert.equal(value,expected);};
await sample('initial pointer modality','smooth');
for(let i=0;i<50;i++){await page.keyboard.press('Tab');if(await page.evaluate(()=>document.activeElement?.textContent?.trim().startsWith('01 · Readiness')))break;}
assert.ok(await page.evaluate(()=>document.activeElement?.textContent?.trim().startsWith('01 · Readiness')));await sample('AI hero keyboard focus','auto');
await page.mouse.click(700,300);await sample('pointer modality restored','smooth');
// Real framework link activation, record whether document identity survives navigation.
await page.evaluate(()=>{window.__aiScopeProbe='same-document';});
await page.locator('a[href="/contact?service=ai#contact-message"]').first().click();await page.waitForURL('**/contact?service=ai#contact-message');await page.waitForTimeout(700);
const sameDocument=await page.evaluate(()=>window.__aiScopeProbe==='same-document');assert.equal(sameDocument,true);
await page.keyboard.press('Tab');await sample('contact keyboard after client navigation','smooth');
fs.writeFileSync('2nspira-website/docs/qa/ai-259-keyboard-compiled-scope-results.json',JSON.stringify({base,applicationSHA,sameDocument,results,scope:'Computed root behavior only; not pointer animation timing or full visual acceptance.'},null,2));console.log(JSON.stringify({sameDocument,results}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
