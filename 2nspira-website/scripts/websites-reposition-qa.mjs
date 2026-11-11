import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright-core');
const base=process.argv[2]||'http://localhost:3366';
const browser=await chromium.launch({channel:'chrome',headless:true});
let checks=0;const check=(v,m)=>{assert.ok(v,m);checks++};
try {
 const context=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'},reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/websites','/work','/services','/contact','/ai-enablement','/automation-systems-optimization','/technology-advisory']){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});check(response.status()===200,route+' status');
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' overflow '+width);
   const text=await page.locator('main').innerText();check(!/mobile app|Websites, Apps|Entrepreneur Mentoring|internal review draft|proposed managed website plans|Payload CMS/i.test(text),'obsolete public content '+route);
   check(await page.locator('a[href="/coaching"],a[href="/entrepreneur-mentoring"]').count()===0,'retired links');
   for(const script of await page.locator('script[type="application/ld+json"]').all()) JSON.parse(await script.textContent());
   if(route==='/websites'){
    check(await page.getByRole('heading',{level:1,name:'Websites & Custom Digital Platforms',exact:true}).count()===1,'headline');
    for(const id of ['professional-websites','custom-digital-platforms','our-work','platform-work','our-approach'])check(await page.locator('#'+id).count()===1,id);
    check(await page.getByRole('link',{name:'Discuss Your Project',exact:true}).first().getAttribute('href')==='/contact?service=websites#contact-message','primary CTA');
    check(await page.getByRole('link',{name:'View Our Work',exact:true}).getAttribute('href')==='#our-work','portfolio CTA');
    for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());check(await img.evaluate(i=>i.naturalWidth>0),'image decode');}
    const summary=page.locator('main details summary').first();await summary.focus();await page.keyboard.press('Enter');check(await summary.locator('..').getAttribute('open')!==null,'keyboard open');await page.keyboard.press('Enter');check(await summary.locator('..').getAttribute('open')===null,'keyboard close');
    await page.screenshot({path:`/tmp/reposition-websites-${width}.png`,fullPage:true});
   }
   if(route==='/'||route==='/services'){check(await page.locator('#find-the-right-service a[href="/websites"]').count()>0,'website discovery');check(text.includes('AI Enablement')&&text.includes('Business Automation')&&text.includes('Technology Advisory & Leadership'),'other services');}
   if(route==='/work'){check(text.includes('Client Websites')&&text.includes('Custom Digital Platforms'),'portfolio categories');await page.screenshot({path:`/tmp/reposition-work-${width}.png`,fullPage:true});}
  }
  await page.goto(base+'/',{waitUntil:'networkidle'});
  if(width<1024){await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:/^(Our )?Services$/}).click();}
  else await page.getByRole('button',{name:/^(Our )?Services$/}).click();
  const navLink=page.getByRole('link',{name:'Websites & Platforms',exact:true}).filter({visible:true}).first();
  check(await navLink.getAttribute('href')==='/websites','navigation destination');await navLink.focus();await page.keyboard.press('Enter');await page.waitForURL('**/websites');check(await page.getByRole('heading',{level:1,name:'Websites & Custom Digital Platforms',exact:true}).count()===1,'navigation activation');
  console.log('PASS responsive routes at '+width);
 }
 await page.goto(base+'/contact?service=platforms#contact-message',{waitUntil:'networkidle'});
 check(await page.locator('#projectType').inputValue()==='Custom digital platform','prefill');
 await page.locator('button[type=submit]').click();check(await page.locator('#name').evaluate(e=>!e.validity.valid),'required validation');
 await page.locator('#name').fill('QA Example');await page.locator('#email').fill('qa@example.test');await page.locator('#message').fill('A customer portal with clear roles.');await page.locator('#projectUrl').fill('not a url');check(await page.locator('#projectUrl').evaluate(e=>!e.validity.valid),'URL validation');
 await page.locator('#projectUrl').fill('https://example.test');await page.locator('#timeline').fill('Within 3 months');await page.locator('#budget').fill('To discuss');await page.reload({waitUntil:'networkidle'});check(await page.locator('#timeline').inputValue()==='Within 3 months','refresh persistence');
 let posts=0,payload;let release;const gate=new Promise(r=>release=r);
 await page.route('**/api/contact',async route=>{posts++;payload=route.request().postDataJSON();await gate;await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,status:'delivered'})});});
 await page.locator('button[type=submit]').click();check(await page.locator('button[type=submit]').isDisabled(),'loading disabled');release();await page.getByRole('heading',{name:'Message sent',exact:true}).waitFor();check(posts===1,'one submission');check(payload.projectUrl==='https://example.test'&&payload.timeline==='Within 3 months'&&payload.budget==='To discuss'&&payload.projectType==='Custom digital platform','structured payload');
 await page.reload({waitUntil:'networkidle'});check(await page.getByRole('heading',{name:'Message sent',exact:true}).count()===1,'success persists');await page.getByRole('button',{name:'Send another message'}).click();check(await page.locator('#name').inputValue()===''&&await page.locator('#projectUrl').inputValue()==='','clear');
 await page.unroute('**/api/contact');
 for(const scenario of [{status:422,body:{ok:false,error:'Invalid'}},{status:429,body:{ok:false}},{status:503,body:{ok:false,status:'unknown'}}]){
  await page.locator('#name').fill('QA Example');await page.locator('#email').fill('qa@example.test');await page.locator('#message').fill('Requirements');
  await page.route('**/api/contact',r=>r.fulfill({status:scenario.status,contentType:'application/json',body:JSON.stringify(scenario.body)}));
  await page.locator('button[type=submit]').click();await page.getByRole('alert').waitFor();check(await page.getByRole('alert').count()===1,'error '+scenario.status);
  if(scenario.status===503)check(await page.locator('button[type=submit]').isDisabled(),'unknown prevents retry');
  await page.unroute('**/api/contact');
 }
 check(errors.length===0,errors.join('\n'));
 console.log(`PASS ${checks} checks; form outcomes mocked, no email sent`);
 for(const url of ['https://www.teamsmanagement.com/','https://gevitals.com/','https://opengoalsoccer.com/']){const r=await page.goto(url,{waitUntil:'domcontentloaded'});console.log('PROJECT',url,r.status(),await page.title());}
}finally{await browser.close();}
