import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base = process.argv[2] || 'http://localhost:3391';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };
const headers = { 'x-forwarded-proto': 'https' };
try {
  const context = await browser.newContext({ extraHTTPHeaders: headers });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/websites', '/who-we-serve', '/']) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      check(response.status() === 200, route + ' returns 200');
      check(await page.locator('main h1').count() === 1, 'one h1');
      const images = page.locator(route === '/websites' ? '#website-technologies img' : route === '/who-we-serve' ? '#industries article img' : '#transformation-support img');
      for (const img of await images.all()) {
        await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode());
        check(await img.evaluate(i => i.naturalWidth > 0), 'image decodes');
      }
      if (route === '/who-we-serve') {
        check(await images.count() === await page.locator('#industries article').count(), 'every industry has imagery');
        check(await images.count() >= 7, 'industries retained');
        for (const d of await page.locator('#industries details').all()) {
          await d.locator('summary').click(); check(await d.getAttribute('open') !== null, 'disclosure opens');
          await d.locator('summary').press('Enter'); check(await d.getAttribute('open') === null, 'keyboard closes');
        }
      } else if (route === '/websites') {
        check(await page.getByRole('list', { name: 'Website technologies', exact: true }).locator('li').count() === 7, 'seven vendor logos');
        check(await page.locator('#connected-journey li').count() === 3, 'three visual journey steps');
        for (const link of await page.locator('#connected-journey a').all()) {
          const href = await link.getAttribute('href');
          check(href.startsWith('#') ? await page.locator(href).count() === 1 : (await context.request.get(base + href)).status() === 200, 'journey link destination exists');
        }
        const detail = page.locator('#professional-websites details');
        await detail.locator('summary').click(); check(await detail.getAttribute('open') !== null, 'offer details open');
        await detail.locator('summary').press('Enter'); check(await detail.getAttribute('open') === null, 'offer details close');
      } else {
        check(await images.count() === 2, 'both homepage cards illustrated');
        check(await page.locator('#quick-start img').count() === 0, 'compact shortcuts have no oversized photos');
        check(await page.locator('#quick-start a').count() === 4, 'four clear shortcuts');
        check((await page.locator('#quick-start').boundingBox()).height < 450, 'shortcuts remain compact');
        for (const a of await page.locator('#quick-start a').all()) check((await a.boundingBox()).height >= 44, 'touch targets');
      }
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route + ' no page overflow');
      const target = route === '/' ? page.locator('#transformation-support') : route === '/who-we-serve' ? page.locator('#industries') : page.locator('#website-technologies');
      await target.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `/tmp/enhancements-${route.replaceAll('/', '') || 'home'}-${width}.png`, fullPage: true });
    }
    console.log('PASS three pages at ' + width);
  }
  await page.goto(base + '/websites', { waitUntil: 'networkidle' });
  const region = page.getByRole('region', { name: 'Website technology logos. Use arrow keys or swipe to explore.' });
  await region.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
  await region.evaluate(e => e.scrollLeft = 0); await page.waitForTimeout(350);
  const start = await region.evaluate(e => e.scrollLeft); await page.waitForTimeout(400);
  check(await region.evaluate(e => e.scrollLeft) > start + 3, 'carousel moves');
  await page.getByRole('button', { name: 'Pause logo carousel' }).click(); await page.mouse.move(0, 0);
  const paused = await region.evaluate(e => e.scrollLeft); await page.waitForTimeout(300);
  check(Math.abs((await region.evaluate(e => e.scrollLeft)) - paused) < 2, 'pause stops');
  await page.getByRole('button', { name: 'Resume logo carousel' }).click(); await region.focus();
  const focused = await region.evaluate(e => e.scrollLeft); await page.waitForTimeout(300);
  check(Math.abs((await region.evaluate(e => e.scrollLeft)) - focused) < 2, 'focus stops');
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(250);
  check(await region.evaluate(e => e.scrollLeft) > focused, 'keyboard scrolling');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Pause logo carousel' }).waitFor({ state: 'hidden' });
  check(await page.locator('#website-technologies ul').count() === 1, 'reduced motion removes duplicate');
  check(await region.getAttribute('data-moving') === 'false', 'reduced motion stopped');
  check(errors.length === 0, errors.join('\n'));
  await context.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, extraHTTPHeaders: headers });
  const p = await nojs.newPage(); await p.goto(base + '/websites');
  check(await p.locator('#website-technologies li').count() === 6, 'no-JS logos available');
  check(await p.locator('#connected-journey a').count() === 3, 'no-JS journey available');
  await p.locator('#professional-websites summary').click();
  check(await p.locator('#professional-websites details').getAttribute('open') !== null, 'no-JS disclosure works');
  console.log(`${checks} visual enhancement checks passed; no submissions sent.`);
} finally { await browser.close(); }
