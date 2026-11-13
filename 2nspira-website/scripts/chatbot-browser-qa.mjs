import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const base = process.argv[2] || 'http://localhost:8893';
const output = process.env.QA_OUTPUT || '/tmp/2nspira-chatbot-qa';
await mkdir(output,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const context = await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
const page = await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
let assertions=0;
function ok(value,label){assert.ok(value,label);assertions++;console.log('PASS '+label);}
try {
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});
  await page.goto(base+'/chatbot-demo');
  const input=page.getByRole('textbox',{name:'Your question'});
  await input.waitFor();
  await page.waitForFunction(()=>!document.querySelector('textarea').disabled);
  ok(await page.getByText('AI guide · human expertise, one click away').isVisible(),`live disclosure ${width}`);
  ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`no overflow ${width}`);
  await input.fill('Can 2Nspira help with website and client portal development?');
  await page.getByRole('button',{name:'Send question'}).click();
  await page.getByText('2Nspira AI',{exact:true}).waitFor();
  const answer=await page.locator('[role="log"] > div').last().innerText();
  ok(/portal|website|digital/i.test(answer),`real AI service answer ${width}`);
  await writeFile(`${output}/live-answer-${width}.txt`,answer);
  await page.screenshot({path:`${output}/live-${width}.png`,fullPage:true});
  await page.getByRole('button',{name:'Clear chat'}).click();ok(await page.locator('[role="log"] > div').count()===0,`clear chat ${width}`);
  await input.fill('Unsaved partial question');await page.reload();ok(await input.inputValue()==='',`refresh clears chat ${width}`);
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+'/');
 const launch=page.getByRole('button',{name:'Ask 2Nspira',exact:true});await launch.click();
 const dialog=page.getByRole('dialog',{name:'Ask 2Nspira AI assistant'});await dialog.waitFor();
 ok(await dialog.isVisible(),'first-click opens modal');
 await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});ok(await launch.evaluate(e=>e===document.activeElement),'Escape restores launcher focus');
 await launch.click();
 await page.getByRole('button',{name:'Close assistant'}).click();
 // Response states below are explicit browser stubs, not live provider tests.
 let calls=0;let scenario='success';
 await page.route('**/api/chat',async route=>{calls++;if(scenario==='network')return route.abort();if(scenario==='slow')await new Promise(r=>setTimeout(r,500));const status=scenario==='limit'?429:scenario==='failure'?503:200;await route.fulfill({status,contentType:'application/json',body:JSON.stringify(status===200?{answer:'A synthetic browser QA answer.',sources:[{title:'AI enablement',href:'/ai-enablement'},{title:'Unsafe',href:'javascript:alert(1)'}]}:{message:status===429?'Free allowance reached. Contact our team.':'Service unavailable. Please contact our team.'})});});
 await launch.click();const input=page.getByRole('textbox',{name:'Your question'});const send=page.getByRole('button',{name:'Send question'});
 ok(await send.isDisabled(),'empty send disabled');await input.fill('   ');ok(await send.isDisabled(),'blank send disabled');
 await input.fill('x'.repeat(601));ok((await input.inputValue()).length===600,'question max length');
 scenario='slow';await input.fill('Question');await send.evaluate(e=>{e.click();e.click();});await page.getByText('A synthetic browser QA answer.',{exact:true}).waitFor();ok(calls===1,'double click makes one request');ok(await page.getByRole('link',{name:'Unsafe',exact:true}).count()===0,'provider cannot inject clickable URLs');
 await page.getByRole('button',{name:'Clear chat'}).click();ok(await page.locator('[role="log"] > div').count()===0,'clear live transcript');
 scenario='failure';await input.fill('Retain this');await send.click();await page.getByText('Service unavailable. Please contact our team.').waitFor();ok(await input.inputValue()==='Retain this','backend failure retains draft');
 scenario='network';await send.click();await page.getByText('We could not connect to the assistant.',{exact:false}).waitFor();ok(await input.inputValue()==='Retain this','network failure retains draft');
 scenario='success';await send.click();await page.getByText('A synthetic browser QA answer.',{exact:true}).waitFor();ok(await input.inputValue()==='','explicit retry succeeds');
 scenario='limit';await input.fill('Limit question');await send.click();await page.getByText('Free allowance reached. Contact our team.').waitFor();ok(await input.isDisabled(),'live limit disables composer');
 await page.getByRole('button',{name:'Clear chat'}).click();ok(await input.isDisabled(),'clear does not bypass live limit');
 await page.getByRole('button',{name:'Try again later'}).click();ok(await input.isEnabled(),'explicit later retry enabled');
 await page.getByRole('button',{name:'Close assistant'}).click();await launch.click();ok(await page.locator('[role="log"] > div').count()===0,'close clears session transcript');
 await page.keyboard.press('Tab');ok(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)),'modal focus stays inside');
 await page.screenshot({path:`${output}/widget-mobile.png`});
 await page.keyboard.press('Escape');
 await page.goto(base+'/portal/login');ok(await launch.count()===0,'portal excludes assistant');
 ok(errors.length===0,'no browser page errors');
 await writeFile(`${output}/result.json`,JSON.stringify({base,assertions,pageErrors:errors,provider:'stubbed; real credentials absent'},null,2));
 console.log(`${assertions} browser checks passed`);
} finally {await browser.close();}
