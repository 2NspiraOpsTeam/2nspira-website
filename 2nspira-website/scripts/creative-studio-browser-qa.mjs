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
  if (!process.argv.includes("--admin-only")) {
    const { runStudioCollectionsQA } = await import("./studio-collections-browser-qa.mjs");
    await runStudioCollectionsQA(base);
  }
  const context = await browser.newContext({ extraHTTPHeaders: headers });
  const page = await context.newPage();
  let r = await context.request.get(base + "/videos", { maxRedirects: 0 });
  assert.equal(r.status(), 200);
  r = await context.request.get(base + "/creative-studio?category=authored-books", { maxRedirects: 0 });
  assert.equal(r.status(), 308);
  assert.equal(r.headers().location, "/studio?category=authored-books");
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
    const before = await context.request.get(base + "/studio");
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
