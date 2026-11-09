const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
import assert from 'node:assert/strict';
export async function runStudioCollectionsQA(base) {
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
  for(const width of [1440,390]) {
   const page=await browser.newPage({viewport:{width,height:950},extraHTTPHeaders:{'x-forwarded-proto':'https'}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/studio');
   const doors=page.getByRole('navigation',{name:'Creative Studio collections',exact:true});
   assert.deepEqual(await doors.locator('a').evaluateAll(a=>a.map(x=>x.getAttribute('href'))),['/studio/watch','/studio/listen','/studio/read','/studio/play']);
   await doors.getByRole('link',{name:/Watch/}).click();await page.waitForURL('**/studio/watch');
   assert.equal(await page.locator('main button[aria-label^="Load video:"]').count(),1);
   assert.equal(await page.locator('main iframe').count(),0);
   const load=page.locator('main button[aria-label^="Load video:"]').first();await load.focus();await page.keyboard.press('Enter');
   assert.match(await page.locator('main iframe').first().getAttribute('src'),/^https:\/\/www.youtube-nocookie.com\/embed\//);
   await page.goto(base+'/studio/listen');assert.equal(await page.locator('main button[aria-label^="Load video:"]').count(),3);
   await page.goto(base+'/studio/read');
   const category=page.getByLabel('Category',{exact:true});await category.selectOption('authored-books');
   await page.locator('#collections [role=status]').filter({hasText:/^1 item$/}).waitFor();
   await page.reload();assert.equal(await category.inputValue(),'authored-books');
   await page.getByLabel('Content type',{exact:true}).selectOption('Article');await page.getByText('No items match these filters.',{exact:false}).waitFor();
   await page.getByRole('button',{name:'Clear filters',exact:true}).click();assert.equal(await category.inputValue(),'');
   assert.equal(await page.locator('#collections article:visible').count(),9);
   const more=page.locator('#collections > div > details');await more.locator('summary').focus();await page.keyboard.press('Enter');assert.ok(await page.locator('#collections article:visible').count()>9);await page.keyboard.press('Enter');
   await category.selectOption('resources');assert.equal(await page.locator('#collections article').count(),2);
   await page.goto(base+'/studio/play');const game=page.getByRole('link',{name:'Play Breadcrumb',exact:false}).first();assert.equal(await game.getAttribute('href'),'https://breadcrumb-challenge.vercel.app/');assert.equal(await game.getAttribute('target'),'_blank');
   await page.getByLabel('Category',{exact:true}).selectOption('coloring-books');assert.equal(await page.locator('#collections article').count(),4);for(const a of await page.locator('#collections article a').all())assert.match(await a.getAttribute('href'),/^https:\/\/(?:link\.amazon|www\.amazon\.com)\//);
   await page.getByLabel('Category',{exact:true}).selectOption('printables');for(const a of await page.locator('#collections article a').all())assert.match(await a.getAttribute('href'),/^https:\/\/2nspira\.etsy\.com\//);
   const footer=page.locator('footer nav[aria-labelledby=footer-ideas-heading]');assert.deepEqual(await footer.locator('a').evaluateAll(a=>a.map(x=>x.getAttribute('href'))),['/studio','/studio/watch','/studio/listen','/studio/read','/studio/play']);
   if(width<1024)await page.getByRole('button',{name:'Open menu',exact:true}).click();
   const nav=page.getByRole('navigation',{name:width<1024?'Mobile navigation':'Main navigation',exact:true});await nav.getByRole('button',{name:'Creative Studio collections',exact:true}).click();
   const menu=page.locator(width<1024?'#mobile-ideas-navigation':'#ideas-navigation');await menu.getByRole('link',{name:'Watch',exact:true}).click();await page.waitForURL('**/studio/watch');assert.deepEqual(errors,[]);await page.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,extraHTTPHeaders:{'x-forwarded-proto':'https'}});const page=await context.newPage();
  await page.goto(base+'/studio/read');assert.equal(await page.getByLabel('Category',{exact:true}).isDisabled(),true);const more=page.locator('#collections > div > details');await more.locator('summary').click();assert.ok(await page.locator('#collections article:visible').count()>9);await context.close();
  const req=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
  for(const path of ['/studio/watch','/studio/listen','/studio/read','/studio/play','/videos']) {const r=await req.request.get(base+path);assert.equal(r.status(),200);const p=await req.newPage();await p.goto(base+path);assert.equal(await p.locator('link[rel=canonical]').getAttribute('href'),'https://2nspira.com'+path);for(const s of await p.locator('script[type="application/ld+json"]').allTextContents())JSON.parse(s);await p.close();}
  let r=await req.request.get(base+'/studio?category=authored-books',{maxRedirects:0});assert.equal(r.status(),308);assert.equal(r.headers().location,'/studio/read?category=authored-books#collections');
  r=await req.request.get(base+'/studio/not-a-collection');assert.equal(r.status(),404);
  r=await req.request.get(base+'/api/admin/creative-studio');assert.equal(r.status(),401);
  const sitemap=await (await req.request.get(base+'/sitemap.xml')).text();for(const path of ['/studio/watch','/studio/listen','/studio/read','/studio/play'])assert.ok(sitemap.includes('https://2nspira.com'+path));
  await req.close();console.log('PASS Studio collections: desktop/mobile navigation, Watch/Listen video separation, category/type filters, empty/clear/refresh, disclosure, no-JS, destinations, canonicals, schema, sitemap, redirects and anonymous Admin denial');
 } finally {await browser.close();}
}
if(process.argv[1]?.endsWith('/studio-collections-browser-qa.mjs'))await runStudioCollectionsQA(process.argv[2]||'http://localhost:3319');
