const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright-core"
);
import assert from "node:assert/strict";
const base = process.argv[2] || "http://localhost:3298";
const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(
  new URL(base).hostname,
);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const headers = { "x-forwarded-proto": "https" };
try {
  for (const width of process.argv.includes("--admin-only")
    ? []
    : [1440, 1024, 768, 390, 320]) {
    const page = await browser.newPage({
      viewport: { width, height: 950 },
      extraHTTPHeaders: headers,
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const r = await page.goto(base + "/creative-studio");
    assert.equal(r.status(), 200);
    await page
      .getByRole("heading", { name: "Creative Studio", exact: true, level: 1 })
      .waitFor();
    assert.deepEqual(await page.locator("main h2").allTextContents(), [
      "Watch",
      "Read",
      "Shop",
      "Explore the studio",
    ]);
    const watch = page.locator("section#watch");
    assert.equal(await watch.locator("article").count(), 1);
    const channel = watch.getByRole("link", {
      name: "Watch on YouTube",
      exact: true,
    });
    assert.equal(
      await channel.getAttribute("href"),
      "https://www.youtube.com/@2Nspira",
    );
    assert.equal(await channel.getAttribute("target"), "_blank");
    assert.equal(
      await watch.locator("a:has(img)").getAttribute("href"),
      await channel.getAttribute("href"),
    );
    await watch.locator("img").evaluate((img) => img.decode());
    assert.ok(
      await watch.locator("img").evaluate((img) => img.naturalWidth > 0),
    );
    await page
      .getByLabel("Category", { exact: true })
      .selectOption("authored-books");
    assert.equal(await page.locator("#collections article").count(), 1);
    await page.reload();
    assert.equal(
      await page.getByLabel("Category", { exact: true }).inputValue(),
      "authored-books",
    );
    await page
      .getByLabel("Content type", { exact: true })
      .selectOption("Channel");
    assert.equal(await page.locator("#collections article").count(), 0);
    await page
      .getByText("No items match these filters.", { exact: false })
      .waitFor();
    await page
      .getByRole("button", { name: "Clear filters", exact: true })
      .click();
    assert.ok((await page.locator("#collections article").count()) > 5);
    if (width < 1024)
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
    const nav = page.getByRole("navigation", {
      name: width < 1024 ? "Mobile navigation" : "Main navigation",
      exact: true,
    });
    const button = nav.getByRole("button", {
      name: "Creative Studio",
      exact: true,
    });
    await button.focus();
    await page.keyboard.press("Enter");
    const menu = page.locator(
      width < 1024 ? "#mobile-ideas-navigation" : "#ideas-navigation",
    );
    await menu.waitFor({ state: "visible" });
    assert.deepEqual(
      (await menu.getByRole("link").allTextContents()).map((x) => x.trim()),
      ["Watch", "Read", "Shop", "Explore Creative Studio"],
    );
    await menu.getByRole("link", { name: "Watch", exact: true }).click();
    await page.waitForURL("**/creative-studio#watch");
    await page.reload();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
    );
    const jsonld = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    for (const json of jsonld) JSON.parse(json);
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      "https://2nspira.com/creative-studio",
    );
    assert.deepEqual(
      (
        await page
          .locator("footer nav[aria-labelledby=footer-ideas-heading] a")
          .allTextContents()
      ).map((x) => x.trim()),
      ["Watch", "Read", "Shop", "Explore Creative Studio"],
    );
    assert.deepEqual(errors, []);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `/tmp/studio-${width}.png`,
      fullPage: false,
    });
    await watch.screenshot({ path: `/tmp/studio-watch-${width}.png` });
    console.log(
      "PASS public",
      width,
      "navigation, channel/image, filters, empty state, refresh, canonical, schema, no overflow/errors",
    );
    await page.close();
  }
  const context = await browser.newContext({ extraHTTPHeaders: headers });
  const page = await context.newPage();
  let r = await context.request.get(base + "/videos", { maxRedirects: 0 });
  assert.equal(r.status(), 308);
  assert.equal(r.headers().location, "/creative-studio#watch");
  r = await context.request.get(base + "/creative-studio/not-a-real-item");
  assert.equal(r.status(), 404);
  r = await context.request.get(base + "/api/admin/creative-studio");
  assert.equal(r.status(), 401);
  console.log("PASS redirects, unknown item 404, anonymous Admin denial");
  if (isLocal) {
    await context.addCookies([
      { name: "admin_session", value: "b".repeat(64), url: base },
    ]);
    await page.goto(base + "/admin/creative-studio");
    await page
      .getByRole("button", { name: "Add content", exact: true })
      .waitFor();
    await page
      .getByLabel("Studio introduction", { exact: true })
      .fill("QA draft introduction");
    await page.getByRole("button", { name: "Save draft", exact: true }).click();
    await page
      .getByText("Draft saved. Public content is unchanged.", { exact: true })
      .waitFor();
    await page.reload();
    assert.equal(
      await page
        .getByLabel("Studio introduction", { exact: true })
        .inputValue(),
      "QA draft introduction",
    );
    const before = await context.request.get(base + "/creative-studio");
    assert.ok(!(await before.text()).includes("QA draft introduction"));
    await page.getByLabel("Studio introduction", { exact: true }).fill("");
    await page.getByRole("button", { name: "Save draft", exact: true }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "Provide studio introduction" })
      .waitFor();
    page.on("dialog", (d) => d.accept());
    await page
      .getByRole("button", { name: "Cancel changes", exact: true })
      .click();
    await page.getByLabel("Studio introduction", { exact: true }).waitFor();
    assert.equal(
      await page
        .getByLabel("Studio introduction", { exact: true })
        .inputValue(),
      "QA draft introduction",
    );
    await page
      .getByLabel("Studio introduction", { exact: true })
      .fill("QA failed save preserved");
    await page.route("**/api/admin/creative-studio", (route) =>
      route.request().method() === "PUT"
        ? route.fulfill({
            status: 503,
            contentType: "application/json",
            body: JSON.stringify({ error: "QA simulated storage failure" }),
          })
        : route.continue(),
    );
    await page.getByRole("button", { name: "Save draft", exact: true }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "QA simulated storage failure" })
      .waitFor();
    assert.equal(
      await page
        .getByLabel("Studio introduction", { exact: true })
        .inputValue(),
      "QA failed save preserved",
    );
    await page.unroute("**/api/admin/creative-studio");
    await page.getByRole("button", { name: "Save draft", exact: true }).click();
    await page
      .getByText("Draft saved. Public content is unchanged.", { exact: true })
      .waitFor();
    const channelDetail = page.locator("details").filter({
      has: page.locator("summary", { hasText: "2Nspira on YouTube" }),
    });
    await channelDetail.locator("summary").click();
    await channelDetail
      .getByLabel("Upload image", { exact: true })
      .setInputFiles(
        new URL("../public/images/logo/og-image-v2.png", import.meta.url)
          .pathname,
      );
    await page
      .getByText("Image uploaded to the draft.", { exact: false })
      .waitFor();
    assert.ok(
      (
        await channelDetail
          .getByLabel("Image URL or site path", { exact: true })
          .inputValue()
      ).startsWith("/api/creative-studio/images/"),
    );
    await page
      .getByRole("button", { name: "Add content", exact: true })
      .click();
    const detail = page.locator("details").first();
    await detail.locator("summary").click();
    await detail.getByLabel("Title", { exact: true }).fill("QA new article");
    await detail
      .getByLabel("Short description", { exact: true })
      .fill("A fictional article to verify the publishing flow.");
    await detail
      .getByLabel("Full page content", { exact: false })
      .fill("A fictional first paragraph.\n\nA fictional second paragraph.");
    await detail
      .getByLabel("Publication status", { exact: true })
      .selectOption("published");
    await detail.getByLabel("Our YouTube channel", { exact: true }).uncheck();
    await detail.getByLabel("Insights & articles", { exact: true }).check();
    await page
      .getByRole("button", { name: "Publish changes", exact: true })
      .click();
    await page
      .getByText("Creative Studio published.", { exact: false })
      .waitFor();
    const data = await (
      await context.request.get(base + "/api/admin/creative-studio")
    ).json();
    const item = data.content.items.find((i) => i.title === "QA new article");
    assert.ok(item);
    const primary = "/creative-studio/" + item.id;
    await page.goto(base + primary);
    await page
      .getByRole("heading", { name: "QA new article", exact: true })
      .waitFor();
    assert.ok(
      (await page.textContent("main")).includes(
        "A fictional second paragraph.",
      ),
    );
    await page.goto(base + "/admin/creative-studio");
    await page.getByRole("button", { name: "Groups", exact: true }).click();
    await page.getByRole("heading", { name: "Groups", exact: true }).waitFor();
    await page.getByRole("button", { name: "Add group", exact: true }).click();
    const names = page.getByLabel("Group name", { exact: true });
    await names.last().fill("Listen");
    await page.getByRole("button", { name: "Save draft", exact: true }).click();
    await page
      .getByText("Draft saved. Public content is unchanged.", { exact: true })
      .waitFor();
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 950 });
      await page.reload();
      await page
        .getByRole("button", { name: "Add content", exact: true })
        .waitFor();
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        false,
      );
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `/tmp/studio-admin-${width}.png` });
    }
    console.log(
      "PASS local signed-in Admin draft/save/refresh, invalid/clear/cancel, simulated failure/retry, real publication, canonical article, group addition, responsive UI",
    );
  }
  await context.close();
} finally {
  await browser.close();
}
