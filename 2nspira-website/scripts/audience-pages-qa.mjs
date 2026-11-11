import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright-core");
const base = process.argv[2] || "http://localhost:3342";
const local = new URL(base).hostname === "localhost";
const audiences = [
  ["Startups & Entrepreneurs","startups-entrepreneurs"],
  ["Technology Leaders & Teams","technology-leaders-teams"],
  ["Retail & E-commerce","retail-ecommerce"],
  ["Small Businesses & Professional Services","small-businesses-professional-services"],
];
const browser=await chromium.launch({channel:"chrome",headless:true});
const context=await browser.newContext({extraHTTPHeaders:{"x-forwarded-proto":"https"}});
let checks=0;const check=v=>{assert.ok(v);checks++;};
const page=await context.newPage();const errors=[];page.on("pageerror",e=>errors.push(e.message));
try {
  const seoTitles=new Set(), descriptions=new Set();
  for(const width of [1440,1024,768,390,320]) {
    await page.setViewportSize({width,height:900});
    await page.goto(base+"/who-we-serve",{waitUntil:"networkidle"});
    check(await page.locator("#industries article").count()===8);
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    check(await page.getByRole("list",{name:"Our clients",exact:true}).locator("li").count()===16);
    await page.locator("#our-clients img").evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
    for(const client of ["Senogara","AMUR"])check(await page.getByRole("list",{name:"Our clients",exact:true}).getByText(client,{exact:true}).isVisible());
    const desktop=width>=1024;
    if(!desktop)await page.getByRole("button",{name:"Open menu",exact:true}).click();
    const nav=page.getByRole("navigation",{name:desktop?"Main navigation":"Mobile navigation",exact:true});
    const labels=await nav.locator(":scope > a, :scope > button, :scope > div > button").allTextContents();
    assert.deepEqual(labels.map(t=>t.trim()),["Our Services","Our Work","Who We Serve","Demos","About Us","Contact Us","Book a Conversation"]);checks++;
    await nav.getByRole("button",{name:"Who We Serve",exact:true}).click();
    for(const [title,slug] of audiences)check(await nav.getByRole("link",{name:title,exact:true}).getAttribute("href")==="/who-we-serve/"+slug);
    await nav.getByRole("link",{name:audiences[0][0],exact:true}).click();
    await page.waitForURL("**/who-we-serve/"+audiences[0][1]);
    if(!desktop)check(await page.getByRole("button",{name:"Open menu",exact:true}).isVisible());
    for(const [title,slug] of audiences) {
      const r=await page.goto(base+"/who-we-serve/"+slug,{waitUntil:"networkidle"});check(r.status()===200);
      check(await page.getByRole("heading",{level:1}).count()===1);
      check(await page.locator("main").getByText(title,{exact:true}).isVisible());
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      check(await page.locator('link[rel="canonical"]').getAttribute("href")==="https://2nspira.com/who-we-serve/"+slug);
      const titleTag=await page.title(),desc=await page.locator('meta[name="description"]').getAttribute("content");
      check(!!desc && titleTag!=="Who We Serve");seoTitles.add(titleTag);descriptions.add(desc);
      check(await page.locator('meta[property="og:description"]').getAttribute("content")===desc);
      check(await page.locator('meta[name="twitter:description"]').getAttribute("content")===desc);
      check(await page.locator('meta[property="og:url"]').getAttribute("content")==="https://2nspira.com/who-we-serve/"+slug);
      for(const text of await page.locator('script[type="application/ld+json"]').allTextContents()){JSON.parse(text);checks++;}
      check(await page.getByRole("heading",{name:"Advice and implementation. Clear scopes.",exact:true}).isVisible());
      check(await page.locator('a[href="https://calendar.app.google/54Gv2GFrkUFsNs4i9"]').count()>=2);
      check(await page.locator("#examples-heading").count()===1);
      await page.screenshot({path:`/tmp/audience-${slug}-${width}.png`,fullPage:true});
    }
    console.log(`PASS public pages and dropdown at ${width}px`);
  }
  check(seoTitles.size===4 && descriptions.size===4);
  check((await context.request.get(base+"/who-we-serve/not-an-audience")).status()===404);
  const sitemap=await (await context.request.get(base+"/sitemap.xml")).text();
  for(const [,slug] of audiences)check(sitemap.includes("/who-we-serve/"+slug));
  check((await context.request.get(base+"/api/admin/who-we-serve")).status()===401);
  if(local) {
    await context.addCookies([{name:"admin_session",value:"b".repeat(64),url:base}]);
    const get=async()=> (await (await context.request.get(base+"/api/admin/who-we-serve")).json()).content;
    const before=await get();check(!!before);
    try {
      await page.setViewportSize({width:1280,height:900});
      // Loading/error/retry states use a synthetic transport failure, not production data.
      await page.route("**/api/admin/who-we-serve",route=>route.fulfill({status:503,contentType:"application/json",body:JSON.stringify({error:"Synthetic load failure"})}));
      await page.goto(base+"/admin/who-we-serve");
      await page.getByRole("alert").waitFor();
      check(await page.getByRole("button",{name:"Retry loading",exact:true}).isEnabled());
      await page.unroute("**/api/admin/who-we-serve");
      await page.getByRole("button",{name:"Retry loading",exact:true}).click();
      const summary=page.locator("form summary").filter({hasText:/^Startups & Entrepreneurs/});
      await summary.click();
      const row=page.locator("form details[open]");
      const headline=row.getByRole("textbox",{name:"Dedicated page headline",exact:true});
      const original=await headline.inputValue();
      await headline.fill("QA partial draft");page.once("dialog",d=>d.accept());
      await page.getByRole("button",{name:"Cancel edits",exact:true}).click();check(await headline.inputValue()===original);
      await headline.fill("");await page.getByRole("button",{name:"Save Changes",exact:true}).click();await page.getByRole("alert").waitFor();check(await headline.inputValue()==="");
      await headline.fill("QA founders <build> together");
      await row.getByRole("textbox",{name:"SEO description",exact:true}).fill("QA editable page description");
      let puts=0;page.on("request",r=>{if(r.url().endsWith("/api/admin/who-we-serve")&&r.method()==="PUT")puts++;});
      await page.getByRole("button",{name:"Save Changes",exact:true}).evaluate(el=>{el.click();el.click();});
      await page.getByRole("status").filter({hasText:"Saved."}).waitFor();check(puts===1);
      await page.reload();await summary.click();check(await headline.inputValue()==="QA founders <build> together");
      const publicCopy=await context.newPage();await publicCopy.goto(base+"/who-we-serve/startups-entrepreneurs");check(await publicCopy.getByRole("heading",{level:1}).textContent()==="QA founders <build> together");check(await publicCopy.locator('meta[name="description"]').getAttribute("content")==="QA editable page description");await publicCopy.close();
      await headline.fill("QA retained after failure");
      await page.route("**/api/admin/who-we-serve",route=>route.request().method()==="PUT"?route.fulfill({status:503,contentType:"application/json",body:JSON.stringify({error:"Synthetic server failure"})}):route.continue());
      await page.getByRole("button",{name:"Save Changes",exact:true}).click();await page.getByRole("alert").waitFor();check(await headline.inputValue()==="QA retained after failure");
      await page.unroute("**/api/admin/who-we-serve");await page.getByRole("button",{name:"Save Changes",exact:true}).click();await page.getByRole("status").filter({hasText:"Saved."}).waitFor();
      // The same real API persists SEO, visibility and optional examples.
      const hidden=await get();const founder=hidden.industries.find(i=>i.id==="startups");founder.visible=false;founder.page.examples=[];founder.page.seoTitle="QA unique metadata";hidden.operationId=crypto.randomUUID();
      check((await context.request.put(base+"/api/admin/who-we-serve",{headers:{origin:base},data:hidden})).status()===200);
      check((await context.request.get(base+"/who-we-serve/startups-entrepreneurs")).status()===404);
      check(!(await (await context.request.get(base+"/sitemap.xml")).text()).includes("/who-we-serve/startups-entrepreneurs"));
      founder.visible=true;hidden.revision=(await get()).revision;hidden.operationId=crypto.randomUUID();check((await context.request.put(base+"/api/admin/who-we-serve",{headers:{origin:base},data:hidden})).status()===200);
      await page.goto(base+"/who-we-serve/startups-entrepreneurs");check((await page.title()).includes("QA unique metadata"));check(await page.locator("#examples-heading").count()===0);
      await page.setViewportSize({width:320,height:740});await page.goto(base+"/admin/who-we-serve");await summary.click();check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await page.screenshot({path:"/tmp/audience-admin-320.png",fullPage:true});
    } finally {
      const current=await get();before.revision=current.revision;before.operationId=crypto.randomUUID();
      check((await context.request.put(base+"/api/admin/who-we-serve",{headers:{origin:base},data:before})).status()===200);
    }
  }
  check(errors.length===0);
  console.log(`${checks} audience page checks passed (${local?"includes synthetic local Admin/D1 round trips":"hosted read-only"}).`);
} finally {await browser.close();}
