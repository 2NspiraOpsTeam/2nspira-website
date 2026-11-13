import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base=process.argv[2] || 'http://localhost:8897';
const out=process.env.QA_OUTPUT || 'docs/reviews/homepage-249';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
let checks=0;const results=[];function ok(value,label){assert.ok(value,label);checks++;results.push(label);console.log('PASS',label);}
const core=['Websites & Custom Digital Platforms','Business Automation & Integrations','Organizational AI Enablement'];
const more=['Technology Leadership & Advisory','Managed Maintenance & Support'];
async function loaded(){await page.waitForLoadState('networkidle');await page.waitForTimeout(300);}
try{
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:900});await page.goto(base);await loaded();
  ok(await page.locator('main h1').count()===1,`one homepage h1 ${width}`);
  ok(await page.locator('main article').filter({has:page.locator('h3')}).count()===6,`three services and three why statements ${width}`);
  for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(50);}
  ok(await page.evaluate(()=>[...document.images].every(x=>x.complete&&x.naturalWidth>0)),`all rendered images loaded ${width}`);
  ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`no overflow ${width}`);
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/after-${width}.jpg`,fullPage:true,type:'jpeg',quality:75});
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const axe=await page.evaluate(async()=>await window.axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  await writeFile(`${out}/axe-${width}.json`,JSON.stringify(axe.violations,null,2));ok(axe.violations.length===0,`homepage automated accessibility ${width}`);
  const navigation=width>=1024?page.getByRole('navigation',{name:'Main navigation',exact:true}):page.getByRole('navigation',{name:'Mobile navigation',exact:true});
  if(width<1024){await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('dialog',{name:'Mobile navigation'}).waitFor();}
  const button=navigation.getByRole('button',{name:'Services',exact:true});await button.click();
  for(const name of [...core,...more])ok(await navigation.getByRole('link',{name,exact:true}).isVisible(),`service link ${name} ${width}`);
  ok(await navigation.getByRole('group',{name:'More Services'}).isVisible(),`separated More Services ${width}`);
  await page.screenshot({path:`${out}/navigation-${width}.jpg`,type:'jpeg',quality:75});
  await page.keyboard.press('Escape');ok(await button.evaluate(e=>document.activeElement===e),`services Escape returns focus ${width}`);
  if(width<1024){await page.keyboard.press('Escape');ok(await page.getByRole('button',{name:'Open menu'}).evaluate(e=>document.activeElement===e),`mobile Escape returns focus ${width}`);}
  await page.getByRole('link',{name:'Discuss Your Project'}).first().click();await page.waitForURL('**/contact');ok(new URL(page.url()).pathname==='/contact',`project CTA reaches contact ${width}`);
 }
 await page.setViewportSize({width:1440,height:900});
 for(const route of ['/websites','/automation-systems-optimization','/ai-enablement','/services','/technology-advisory','/managed-services-support','/work','/about','/studio','/chatbot-demo']){
  const res=await page.goto(base+route);await loaded();ok(res.status()===200,`preserved route ${route}`);
  for(const text of await page.locator('script[type="application/ld+json"]').allTextContents())JSON.parse(text);
 }
 await page.goto(base);await loaded();
 const links=await page.locator('main a[href^="/"]').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
 for(const href of links){const res=await context.request.get(base+href);ok(res.status()===200,`homepage target ${href}`);if(href.includes('#')){await page.goto(base+href);ok(await page.locator(`[id="${href.split('#')[1]}"]`).count()>0,`anchor exists ${href}`);}}
 // Verify privacy-minimal intent events without leaving the page.
 await page.goto(base);await loaded();await page.evaluate(()=>{window.dataLayer=[];document.addEventListener('click',e=>e.preventDefault(),{once:true});});
 await page.locator('main').getByRole('link',{name:'Discuss Your Project'}).first().click();ok(await page.evaluate(()=>window.dataLayer.some(e=>e.event==='project_inquiry_click'&&e.destination==='contact')), 'inquiry intent event');
 await page.goto(base+'/contact');await loaded();
 let calls=0;let scenario='error';
 await page.route('**/api/contact',async route=>{calls++;await new Promise(r=>setTimeout(r,250));await route.fulfill({status:scenario==='error'?422:200,contentType:'application/json',body:JSON.stringify(scenario==='error'?{ok:false,error:'validation'}:{ok:true,status:'delivered'})});});
 await page.locator('#name').fill('QA Review');await page.locator('#email').fill('qa@example.invalid');await page.locator('#message').fill('Synthetic no-send homepage review.');
 await page.locator('button[type="submit"]').click();await page.getByRole('alert').waitFor();ok(await page.locator('#message').inputValue()==='Synthetic no-send homepage review.','backend validation retains message');
 scenario='success';await page.locator('button[type="submit"]').evaluate(e=>{e.click();e.click();});await page.getByText('Thanks, QA Review.',{exact:false}).waitFor();
 ok(calls===2,'safe retry/double click: one call per attempt');ok(await page.evaluate(()=>window.dataLayer.some(e=>e.event==='contact_submit_success'&&!('email' in e)&&!('message' in e))),'synthetic success event excludes personal data');
 await page.goto(base);await loaded();await page.getByRole('button',{name:'Ask 2Nspira',exact:true}).click();ok(await page.getByRole('dialog',{name:'Ask 2Nspira AI assistant'}).isVisible(),'homepage chatbot opens');await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();ok(await page.evaluate(()=>getComputedStyle(document.querySelector('main>a')||document.querySelector('main a')).transitionDuration==='0s'),'reduced motion respected');
 ok(errors.length===0,'no browser page errors');
 await writeFile(`${out}/result.json`,JSON.stringify({base,checks,results,pageErrors:errors,contact:'intercepted synthetic responses; no email sent',accessibility:'automated homepage WCAG A/AA scans; not a full accessibility certification'},null,2));
 console.log(`${checks} checks passed`);
}finally{await browser.close();}
