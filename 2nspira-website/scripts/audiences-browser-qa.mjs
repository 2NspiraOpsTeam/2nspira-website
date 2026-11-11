const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright-core"
);
import assert from "node:assert/strict";
const base = process.argv[2] || "http://localhost:3307";
const local = new URL(base).hostname === "localhost";
const browser = await chromium.launch({ channel: "chrome", headless: true });
let checks = 0;
const check = (x) => {
  assert.ok(x);
  checks++;
};
try {
  const context = await browser.newContext({
    extraHTTPHeaders: { "x-forwarded-proto": "https" },
  });
  let page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
    ["small-mobile", 320, 740],
  ]) {
    await page.setViewportSize({ width, height });
    const r = await page.goto(base + "/who-we-serve");
    check(r.status() === 200);
    await page
      .getByRole("heading", {
        name: "Property management & real estate",
        exact: true,
      })
      .waitFor();
    check((await page.locator("#industries article").count()) === 7);
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    const cols = await page
      .locator("#industries > .grid")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      );
    check(cols === (width >= 1280 ? 3 : width >= 768 ? 2 : 1));
    check(
      (await page
        .getByRole("heading", {
          name: "Clients & project relationships",
          exact: true,
        })
        .count()) === 0,
    );
    if (name !== "small-mobile")
      await page.screenshot({
        path: "/tmp/audiences-" + name + ".png",
        fullPage: true,
      });
    if (width === 1440) {
      await page.getByRole("button", { name: "Who We Serve", exact: true }).click();
      await page
        .getByRole("navigation", { name: "Main navigation", exact: true })
        .getByRole("link", { name: "View all audiences", exact: true })
        .waitFor({ state: "visible" });
      check(true);
      await page.keyboard.press("Escape");
    }
    if (width === 390) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("button", { name: "Who We Serve", exact: true }).click();
      await page
        .getByRole("navigation", { name: "Mobile navigation", exact: true })
        .getByRole("link", { name: "View all audiences", exact: true })
        .click();
      await page.waitForURL("**/who-we-serve");
      check(true);
    }
  }
  check(
    (await context.request.get(base + "/api/admin/who-we-serve")).status() ===
      401,
  );
  if (local) {
    await context.addCookies([
      { name: "admin_session", value: "b".repeat(64), url: base },
    ]);
    const before = await (
      await context.request.get(base + "/api/admin/who-we-serve")
    ).json();
    if (
      before.content.industries.some(
        (i) => i.title === "QA additional industry",
      )
    ) {
      before.content.industries = before.content.industries.filter(
        (i) => i.title !== "QA additional industry",
      );
      before.content.operationId = crypto.randomUUID();
      await context.request.put(base + "/api/admin/who-we-serve", {
        headers: { origin: base },
        data: before.content,
      });
    }
    await page.close();
    page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(base + "/admin/who-we-serve");
    await page
      .getByRole("textbox", { name: "Page introduction", exact: true })
      .waitFor();
    const original = await page
      .getByRole("textbox", { name: "Page introduction", exact: true })
      .inputValue();
    await page
      .getByRole("textbox", { name: "Page introduction", exact: true })
      .fill("QA unsaved");
    page.once("dialog", (d) => d.accept());
    await page
      .getByRole("button", { name: "Cancel edits", exact: true })
      .click();
    check(
      (await page
        .getByRole("textbox", { name: "Page introduction", exact: true })
        .inputValue()) === original,
    );
    await page
      .getByRole("textbox", { name: "Page heading", exact: true })
      .fill("");
    await page
      .getByRole("button", { name: "Save Changes", exact: true })
      .click();
    await page.getByRole("alert").waitFor();
    check(
      (await page
        .getByRole("textbox", { name: "Page heading", exact: true })
        .inputValue()) === "",
    );
    await page
      .getByRole("textbox", { name: "Page heading", exact: true })
      .fill("Who We Serve");
    await page
      .getByRole("textbox", { name: "Page introduction", exact: true })
      .fill("QA persisted introduction");
    let puts = 0;
    page.on("request", (r) => {
      if (r.url().endsWith("/api/admin/who-we-serve") && r.method() === "PUT")
        puts++;
    });
    await page
      .getByRole("button", { name: "Save Changes", exact: true })
      .evaluate((el) => {
        el.click();
        el.click();
      });
    await page.getByRole("status").filter({ hasText: "Saved." }).waitFor();
    check(puts === 1);
    await page.reload();
    check(
      (await page
        .getByRole("textbox", { name: "Page introduction", exact: true })
        .inputValue()) === "QA persisted introduction",
    );
    await page
      .getByRole("textbox", { name: "Page introduction", exact: true })
      .fill("QA retained after failure");
    await page.route("**/api/admin/who-we-serve", async (route) =>
      route.request().method() === "PUT"
        ? route.fulfill({
            status: 503,
            contentType: "application/json",
            body: JSON.stringify({ error: "Synthetic server failure" }),
          })
        : route.continue(),
    );
    await page
      .getByRole("button", { name: "Save Changes", exact: true })
      .click();
    await page.getByRole("alert").waitFor();
    check(
      (await page
        .getByRole("textbox", { name: "Page introduction", exact: true })
        .inputValue()) === "QA retained after failure",
    );
    await page.unroute("**/api/admin/who-we-serve");
    await page
      .getByRole("textbox", { name: "Page introduction", exact: true })
      .fill(original);
    await page
      .getByRole("button", { name: "Save Changes", exact: true })
      .click();
    await page.getByRole("status").filter({ hasText: "Saved." }).waitFor();
    await page
      .getByRole("button", { name: "Add industry", exact: true })
      .click();
    await page.getByText("New industry — hidden", { exact: true }).click();
    await page
      .getByRole("textbox", { name: "Industry title", exact: true })
      .last()
      .fill("QA additional industry");
    await page
      .getByRole("button", { name: "Save Changes", exact: true })
      .click();
    await page.getByRole("status").filter({ hasText: "Saved." }).waitFor();
    await page.reload();
    await page
      .getByText("QA additional industry — hidden", { exact: true })
      .waitFor();
    check(
      (await page
        .getByText("QA additional industry — hidden", { exact: true })
        .count()) === 1,
    );
    await page.setViewportSize({ width: 390, height: 844 });
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await page.screenshot({
      path: "/tmp/audiences-admin-mobile.png",
      fullPage: true,
    });
    // Restore the exact original seven-industry content through the real API.
    const snapshot = await (
      await context.request.get(base + "/api/admin/who-we-serve")
    ).json();
    snapshot.content.industries = snapshot.content.industries.filter(
      (i) => i.title !== "QA additional industry",
    );
    snapshot.content.operationId = crypto.randomUUID();
    check(
      (
        await context.request.put(base + "/api/admin/who-we-serve", {
          headers: { origin: base },
          data: snapshot.content,
        })
      ).status() === 200,
    );
  }
  check(errors.length === 0);
  console.log(
    `${checks} rendered audience checks passed; ${local ? "includes synthetic local Admin save/error/duplicate/refresh checks" : "hosted read-only checks"}.`,
  );
} finally {
  await browser.close();
}
