import assert from "node:assert/strict";
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || "playwright-core");
const base=process.argv[2]||"http://localhost:3343";
const names=["ChatGPT","Claude","Grok","OpenClaw","OpenRouter","n8n","Perplexity","GitHub Copilot","Microsoft Foundry","Microsoft 365 Copilot","Ollama","Claude Code","OpenCode","Hermes Agent","Hugging Face","Lovable"];
const browser=await chromium.launch({channel:"chrome",headless:true});let checks=0;const check=v=>{assert.ok(v);checks++;};
try {
 const c=await browser.newContext({extraHTTPHeaders:{"x-forwarded-proto":"https"},colorScheme:"light"});const p=await c.newPage();const errors=[];p.on("pageerror",e=>errors.push(e.message));
 for(const width of [1440,1024,768,390,320]){
  await p.setViewportSize({width,height:900});const response=await p.goto(base+"/ai-enablement",{waitUntil:"networkidle"});check(response.status()===200);
  const list=p.getByRole("list",{name:"AI tools and platforms",exact:true});assert.deepEqual(await list.locator("li > span").allTextContents(),names);checks++;
  await p.locator("#ai-tools img").evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));check(await list.locator("img").evaluateAll(imgs=>imgs.every(i=>i.naturalWidth>0)));
  check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  const section=p.locator("#ai-tools");await section.scrollIntoViewIfNeeded();
  check(await list.locator("li > span").evaluateAll(es=>es.every(e=>getComputedStyle(e).position!=="absolute" && e.getBoundingClientRect().height>10)));
  await p.screenshot({path:`/tmp/ai-tools-${width}.png`});
 }
 const r=p.getByRole("region",{name:"AI tool logos. Use arrow keys or swipe to explore."});
 await p.mouse.move(0,0);await r.evaluate(e=>e.scrollLeft=0);await p.waitForTimeout(100);let x=await r.evaluate(e=>e.scrollLeft);await p.waitForTimeout(350);check(await r.evaluate(e=>e.scrollLeft)>x+5);
 await r.evaluate(e=>e.scrollLeft=e.querySelector("ul").getBoundingClientRect().width-1);await p.waitForTimeout(180);check(await r.evaluate(e=>e.scrollLeft)<20);
 await p.getByRole("button",{name:"Pause logo carousel"}).click();x=await r.evaluate(e=>e.scrollLeft);await p.waitForTimeout(200);check(Math.abs(await r.evaluate(e=>e.scrollLeft)-x)<2);
 await p.getByRole("button",{name:"Resume logo carousel"}).click();await r.focus();x=await r.evaluate(e=>e.scrollLeft);await p.keyboard.press("ArrowRight");await p.waitForTimeout(250);check(await r.evaluate(e=>e.scrollLeft)>x);
 await p.emulateMedia({reducedMotion:"reduce"});await p.getByRole("button",{name:"Pause logo carousel"}).waitFor({state:"hidden"});check(await p.getByRole("button",{name:"Pause logo carousel"}).count()===0);check(await p.locator("#ai-tools ul").count()===1);
 // High-refresh regression: use real scrollLeft quantization and 60/120/240Hz
 // callback timestamps. The previous read-add-write loop stalled at 8ms.
 for(const route of ["/ai-enablement","/who-we-serve","/automation-systems-optimization"]){
  for(const interval of [16,8,4]){
   const hc=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,extraHTTPHeaders:{"x-forwarded-proto":"https"},reducedMotion:"no-preference"});
   await hc.addInitScript(ms=>{let t=0;window.requestAnimationFrame=cb=>setTimeout(()=>{t+=ms;cb(t);},ms);window.cancelAnimationFrame=clearTimeout;},interval);
   const hp=await hc.newPage();await hp.goto(base+route,{waitUntil:"networkidle"});const hr=hp.locator("[data-moving]").first();await hr.scrollIntoViewIfNeeded();const a=await hr.evaluate(e=>e.scrollLeft);await hp.waitForTimeout(400);check(await hr.evaluate(e=>e.scrollLeft)>a+5);check(await hr.getAttribute("data-moving")==="true");await hc.close();
  }
 }
 // Real emulated touch swipe, pause and resume; no forced DOM scroll.
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3,extraHTTPHeaders:{"x-forwarded-proto":"https"}});const mp=await mobile.newPage();await mp.goto(base+"/ai-enablement",{waitUntil:"networkidle"});const mr=mp.locator("#ai-tools [data-moving]");await mr.scrollIntoViewIfNeeded();const box=await mr.boundingBox();const y=box.y+box.height/2;const session=await mobile.newCDPSession(mp);const before=await mr.evaluate(e=>e.scrollLeft);
 await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:300,y}]});for(let i=0;i<8;i++){await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:300-i*25,y}]});await mp.waitForTimeout(20);}await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});await mp.waitForTimeout(250);check(await mr.evaluate(e=>e.scrollLeft)>before+30);check(await mr.getAttribute("data-moving")==="false");
 await mp.getByRole("button",{name:"Resume logo carousel"}).tap();await mp.waitForTimeout(100);check(await mr.getAttribute("data-moving")==="true");await mobile.close();
 const nojs=await browser.newContext({javaScriptEnabled:false,extraHTTPHeaders:{"x-forwarded-proto":"https"}});const np=await nojs.newPage();await np.goto(base+"/ai-enablement");check(await np.locator("#ai-tools ul").count()===1);check(await np.locator("#ai-tools li").count()===16);await nojs.close();
 check(errors.length===0);console.log(`${checks} AI carousel checks passed: assets/captions, responsive layout, autoplay/pause, keyboard, touch swipe/resume, reduced motion, no JS and high-refresh timing across all three carousels.`);
}finally{await browser.close();}
