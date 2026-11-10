import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base=process.argv[2] || 'http://localhost:3313';
const browser=await chromium.launch({channel:'chrome',headless:true});let checks=0;
const check=x=>{assert.ok(x);checks++;};
const context=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const viewport=page.getByRole('region',{name:'Platform logos. Use arrow keys or swipe to explore.',exact:true});
const position=()=>viewport.evaluate(e=>e.scrollLeft);
try {
 for(const [width,height] of [[1440,1000],[768,1024],[390,844],[320,740]]) {
  await page.setViewportSize({width,height});await page.goto(base+'/automation-systems-optimization',{waitUntil:'domcontentloaded'});
  await page.getByRole('heading',{name:'Your goals. The right technology.',exact:true}).waitFor();
  check(await page.getByRole('heading',{level:1}).count()===1);
  for(const [name,expected] of [['Approvals','Keep a decision record'],['Reporting','See a consistent view'],['Client intake','See what happens next']]) {
   await page.getByRole('button',{name,exact:true}).click();
   await page.getByRole('button',{name,exact:true,pressed:true}).waitFor();check(true);
   check(await page.locator('#workflow-comparison').getByText(expected,{exact:true}).isVisible());
  }
  const details=page.locator('details').filter({has:page.getByText('The wider picture we consider',{exact:true})});
  await details.locator('summary').click();check(await details.getByText('Governance',{exact:true}).isVisible());await details.locator('summary').click();check((await details.getAttribute('open'))===null);
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed=schemas.map(s=>JSON.parse(s));check(parsed.some(s=>s['@type']==='Service' && s.provider['@id']==='https://2nspira.com/#organization'));
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'/tmp/automation-engagement-'+width+'.png',fullPage:true});
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/automation-systems-optimization',{waitUntil:'domcontentloaded'});
 await viewport.scrollIntoViewIfNeeded();await page.mouse.move(1,1);
 await page.waitForFunction(()=>document.querySelector('[role="region"][aria-label^="Platform logos"]').scrollLeft>20);check(true);
 await page.getByRole('button',{name:'Pause logo carousel',exact:true}).click();const paused=await position();await page.waitForTimeout(350);check(Math.abs(await position()-paused)<2);
 await page.getByRole('button',{name:'Resume logo carousel',exact:true}).click();await page.waitForFunction(p=>document.querySelector('[role="region"][aria-label^="Platform logos"]').scrollLeft>p+8,paused);check(true);
 await viewport.hover();const hover=await position();await page.waitForTimeout(350);check(Math.abs(await position()-hover)<2);await page.mouse.move(1,1);
 await viewport.focus();const focus=await position();await page.waitForTimeout(250);check(Math.abs(await position()-focus)<2);await page.keyboard.press('ArrowRight');await page.waitForTimeout(300);check(await position()>focus);
 // Touch/pointer exploration stops auto motion, leaving native horizontal browsing.
 await viewport.dispatchEvent('pointerdown',{pointerType:'touch'});check(await page.getByRole('button',{name:'Resume logo carousel',exact:true}).isVisible());
 await page.getByRole('button',{name:'Resume logo carousel',exact:true}).click();
 await page.getByRole('button',{name:'Pause logo carousel',exact:true}).click();
 await viewport.evaluate(e=>{e.scrollLeft=e.querySelector('ul').getBoundingClientRect().width-2;});
 await page.getByRole('button',{name:'Resume logo carousel',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('[role="region"][aria-label^="Platform logos"]').scrollLeft<100);check(true);
 // Runtime and initial reduced-motion settings show one static, scrollable list.
 await page.emulateMedia({reducedMotion:'reduce'});await page.getByText(/Motion reduced. Swipe or scroll to explore/).waitFor();check(await viewport.locator('ul').count()===1);check(await page.getByRole('button',{name:/logo carousel/}).count()===0);
 const staticPos=await position();await page.waitForTimeout(350);check(Math.abs(await position()-staticPos)<2);
 await page.reload();await page.getByText(/Motion reduced. Swipe or scroll to explore/).waitFor();check(await viewport.locator('ul').count()===1);
 await page.emulateMedia({reducedMotion:'no-preference'});await page.getByRole('button',{name:'Pause logo carousel',exact:true}).waitFor();check(await viewport.locator('ul').count()===2);
 const noJS=await browser.newContext({javaScriptEnabled:false,extraHTTPHeaders:{'x-forwarded-proto':'https'}});const fallback=await noJS.newPage();await fallback.goto(base+'/automation-systems-optimization');check(await fallback.getByText('Microsoft',{exact:true}).count()===1);check(await fallback.getByText('Capture details once',{exact:true}).isVisible());check(await fallback.locator('h1').isVisible());check(await fallback.getByRole('button',{name:'Approvals',exact:true}).isDisabled());await noJS.close();
 check(errors.length===0);console.log(`${checks} automation engagement/carousel checks passed: responsive scenarios/disclosures, motion/pause/resume/hover/focus/swipe/loop, reduced motion initial/runtime, JSON-LD and no-JS fallback.`);
} finally {await browser.close();}
