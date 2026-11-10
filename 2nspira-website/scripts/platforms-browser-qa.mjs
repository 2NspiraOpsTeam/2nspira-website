import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base=process.argv[2] || 'http://localhost:3312';
const local=new URL(base).hostname==='localhost';
const browser=await chromium.launch({channel:'chrome',headless:true});
let checks=0;const check=x=>{assert.ok(x);checks++;};
const context=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
const errors=[];const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const api='/api/admin/platforms-technologies';
const publicPath='/automation-systems-optimization';
const logoList='ul[aria-label="Platforms and technologies"]';
try {
 for(const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844],['small-mobile',320,740]]) {
  await page.setViewportSize({width,height});
  const r=await page.goto(base+publicPath);check(r.status()===200);
  await page.getByRole('heading',{name:'Your goals. The right technology.',exact:true}).waitFor();
  check(await page.locator(logoList+' > li').count()===30);
  await page.getByRole('region',{name:'Platform logos. Use arrow keys or swipe to explore.',exact:true}).scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>[...document.querySelectorAll('ul[aria-label="Platforms and technologies"] img')].every(i=>i.complete && i.naturalWidth>0));
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  check(await page.locator(logoList).evaluate(e=>getComputedStyle(e).display)==='flex');
  check(await page.locator(logoList).getByText('Microsoft',{exact:true}).count()===1);
  check(await page.locator(logoList).getByText('Apple',{exact:true}).count()===1);
  check(await page.getByRole('link',{name:/^Let’s discuss your needs/}).getAttribute('href')==='https://calendar.app.google/54Gv2GFrkUFsNs4i9');
  check(!(await page.locator('main').innerHTML()).includes('Technical background supplied'));
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'/tmp/platforms-'+name+'.png',fullPage:true});
 }
 const redirect=await context.request.get(base+'/platforms-technologies',{maxRedirects:0});check(redirect.status()===308);check(redirect.headers().location===publicPath+'#platforms-technologies');
 check((await context.request.get(base+api)).status()===401);
 const anon=await context.request.get(base+'/admin/platforms-technologies',{maxRedirects:0});check([301,302,307,308].includes(anon.status()));
 if(local) {
  await context.addCookies([{name:'admin_session',value:'b'.repeat(64),url:base}]);
  const original=(await (await context.request.get(base+api)).json()).content;
  const saveAPI=async content=>{const now=(await (await context.request.get(base+api)).json()).content;return context.request.put(base+api,{headers:{origin:base},data:{...content,revision:now.revision,operationId:crypto.randomUUID()}});};
  try {
   await page.setViewportSize({width:1280,height:1000});
   await page.goto(base+'/admin/platforms-technologies');
   const intro=page.getByRole('textbox',{name:'Page introduction',exact:true});await intro.waitFor();
   await page.route('**'+api,r=>r.request().method()==='GET'?r.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Synthetic loading failure'})}):r.continue());
   await page.reload();await page.getByRole('alert').waitFor();check(await page.getByRole('button',{name:'Retry loading',exact:true}).isEnabled());
   await page.unroute('**'+api);await page.getByRole('button',{name:'Retry loading',exact:true}).click();await intro.waitFor();check(true);
   check(await page.getByRole('button',{name:'Save Changes',exact:true}).isDisabled());
   await intro.fill('Unfinished change');
   page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Cancel edits',exact:true}).click();
   check(await intro.inputValue()===original.intro);
   await page.getByRole('textbox',{name:'Page heading',exact:true}).fill('');
   await page.getByRole('button',{name:'Save Changes',exact:true}).click();await page.getByRole('alert').waitFor();
   check(await page.getByRole('textbox',{name:'Page heading',exact:true}).inputValue()==='');
   await page.getByRole('textbox',{name:'Page heading',exact:true}).fill(original.heading);
   await intro.fill('QA persistence test');let puts=0;
   page.on('request',r=>{if(r.url().endsWith(api) && r.method()==='PUT')puts++;});
   await page.getByRole('button',{name:'Save Changes',exact:true}).evaluate(el=>{el.click();el.click();});
   await page.getByRole('status').filter({hasText:'Saved.'}).waitFor();check(puts===1);
   await page.reload();await intro.waitFor();check(await intro.inputValue()==='QA persistence test');
   await intro.fill('Retain after backend error');
   await page.route('**'+api,r=>r.request().method()==='PUT'?r.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Synthetic failure'})}):r.continue());
   await page.getByRole('button',{name:'Save Changes',exact:true}).click();await page.getByRole('alert').waitFor();check(await intro.inputValue()==='Retain after backend error');
   await page.unroute('**'+api);await page.getByRole('button',{name:'Save Changes',exact:true}).click();await page.getByRole('status').filter({hasText:'Saved.'}).waitFor();check(true);
   // Add a partial hidden entry; save and reload, then remove it through the UI.
   await page.getByRole('button',{name:'Add platform',exact:true}).click();
   await page.getByText('New platform — hidden',{exact:true}).click();
   const last=page.locator('form details').last();await last.getByRole('textbox',{name:'Platform name',exact:true}).fill('QA hidden platform');
   await page.getByRole('button',{name:'Save Changes',exact:true}).click();await page.getByRole('status').filter({hasText:'Saved.'}).waitFor();
   await page.reload();await page.getByText('QA hidden platform — hidden',{exact:true}).waitFor();check(true);
   await page.getByText('QA hidden platform — hidden',{exact:true}).click();
   page.once('dialog',d=>d.accept());await page.locator('form details').last().getByRole('button',{name:'Remove platform',exact:true}).click();
   await page.getByRole('button',{name:'Save Changes',exact:true}).click();await page.getByRole('status').filter({hasText:'Saved.'}).waitFor();check(await page.locator('form details').count()===30);
   // Hide and reorder using the real controls, then verify public projection.
   const first=page.locator('form details').first();await first.locator('summary').click();
   await first.getByRole('checkbox',{name:'Visible on website',exact:true}).uncheck();
   await first.getByRole('button',{name:'Move down',exact:true}).click();
   await page.getByRole('button',{name:'Save Changes',exact:true}).click();await page.getByRole('status').filter({hasText:'Saved.'}).waitFor();
   const pub=await context.newPage();await pub.goto(base+publicPath);check(await pub.locator(logoList+' > li').count()===29);check(await pub.locator(logoList+' > li').first().innerText()==='Apple');check(await pub.locator(logoList).getByText('Microsoft',{exact:true}).count()===0);await pub.close();
   await page.setViewportSize({width:390,height:844});check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'/tmp/platforms-admin-mobile.png',fullPage:true});
   // Empty public state is intentionally just the introduction and CTA.
   const empty=structuredClone(original);empty.platforms=[];check((await saveAPI(empty)).ok());
   const emptyPage=await context.newPage();await emptyPage.goto(base+publicPath);check(await emptyPage.locator(logoList).count()===0);check(await emptyPage.getByRole('link',{name:/^Let’s discuss your needs/}).isVisible());await emptyPage.close();
  } finally {check((await saveAPI(original)).ok());}
 }
 check(errors.length===0);
 console.log(`${checks} rendered platform checks passed; ${local?'includes isolated local Admin save/validation/cancel/failure/retry/duplicate/refresh/add/remove/reorder/hide/empty checks':'hosted read-only checks'}.`);
} finally {await browser.close();}
