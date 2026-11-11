// Visitor checks run against local or isolated preview; never mutate hosted Admin data.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base=process.argv[2] || 'http://127.0.0.1:3322';
const output=process.env.QA_OUTPUT || '/tmp/creative-studio-menu-qa';
await mkdir(output,{recursive:true});
const expected=[['Explore Creative Studio','/studio'],['Watch','/studio/watch'],['Read','/studio/read'],['Shop','/shop']];
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
try {
 for(const width of [1440,768,390,320]) {
  const page=await browser.newPage({viewport:{width,height:950},extraHTTPHeaders:{'x-forwarded-proto':'https'}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/studio');
  await page.locator('footer nav[aria-labelledby=footer-ideas-heading] a').first().waitFor();
  assert.deepEqual(await page.locator('footer nav[aria-labelledby=footer-ideas-heading] a').evaluateAll(a=>a.map(x=>[x.textContent.trim(),x.getAttribute('href')])),expected);
  assert.deepEqual(await page.locator('nav[aria-label="Creative Studio collections"] a').evaluateAll(a=>a.map(x=>x.getAttribute('href'))),expected.slice(1).map(x=>x[1]));
  if(width<1024)await page.getByRole('button',{name:'Open menu',exact:true}).click();
  const nav=page.getByRole('navigation',{name:width<1024?'Mobile navigation':'Main navigation',exact:true});
  await nav.getByRole('button',{name:'About Us',exact:true}).click();
  const sub=nav.locator('details').filter({has:page.locator('summary').filter({hasText:/^Creative Studio$/})});
  await sub.locator('summary').click();
  assert.deepEqual(await sub.locator('a').evaluateAll(a=>a.map(x=>[x.textContent.trim(),x.getAttribute('href')])),expected);
  assert.equal(await sub.locator('details').count(),0);
  await page.screenshot({path:`${output}/menu-${width}.png`,fullPage:false});
  await sub.getByRole('link',{name:'Watch',exact:true}).click();
  await page.waitForURL('**/studio/watch');
  assert.ok(await page.locator('main a[href="https://www.youtube.com/@2Nspira"]').count()>0);
  assert.ok(await page.locator('main img[src="/images/studio/youtube-channel.svg"]').evaluate(i=>i.complete&&i.naturalWidth>0));
  assert.equal(await page.locator('main iframe').count(),0);
  assert.ok(await page.locator('main button[aria-label^="Load video:"]').count()>0);
  await page.goto(base+'/studio/read');
  assert.equal(await page.locator('main a[href="https://books.2nspira.com"]').count(),0);
  assert.equal(await page.getByRole('link',{name:/Purchase this book/}).count(),1);
  await page.goto(base+'/shop');
  for(const id of ['published-books','shop-bookstore-title','creative-products'])assert.equal(await page.locator('#'+id).count(),1);
  assert.ok(await page.locator('main a[href="https://books.2nspira.com"]').count()>0);
  assert.ok(await page.locator('main a[href="https://link.amazon/B03B1TntH"]').count()>0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  await page.screenshot({path:`${output}/shop-${width}.png`,fullPage:true});
  results.push({width,status:'passed'});await page.close();
 }
 const context=await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
 for(const path of ['/studio','/studio/watch','/studio/read','/shop','/books','/studio/listen','/studio/play','/videos'])assert.equal((await context.request.get(base+path)).status(),200,path);
 assert.equal((await context.request.get(base+'/api/admin/creative-studio')).status(),401);
 const old=await context.request.get(base+'/creative-studio?category=authored-books',{maxRedirects:0});assert.equal(old.status(),308);
 await context.close();
 await writeFile(output+'/results.json',JSON.stringify({base,results,checks:'menus, footer, nav location, channel feature, read/purchase boundary, shop departments, legacy URLs, lazy embeds, overflow, runtime errors, anonymous Admin denial'},null,2));
 console.log('PASS Creative Studio menu cleanup: four widths, shared menu/footer, channel feature, Read/Shop, legacy routes, anonymous Admin denial.');
} finally {await browser.close();}
