const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright-core"
);
import assert from "node:assert/strict";
const base = process.argv[2] || "http://localhost:3307";
const browser = await chromium.launch({ channel: "chrome", headless: true });
let n = 0;
const check = (x) => {
  assert.ok(x);
  n++;
};
try {
  const c = await browser.newContext({
    extraHTTPHeaders: { "x-forwarded-proto": "https" },
  });
  const p = await c.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 1024, 768, 390, 320]) {
    await p.setViewportSize({ width, height: 900 });
    await p.goto(base + "/");
    await p.getByRole("heading", { name: /A clearer vision/ }).waitFor();
    check(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    check(
      (await p
        .getByRole("heading", { name: "Watch. Read. Play.", exact: true })
        .count()) === 0,
    );
    check(
      await p
        .locator("#challenges-heading")
        .evaluate(
          (el) =>
            !!(
              el.compareDocumentPosition(
                document.querySelector("#services-heading"),
              ) & Node.DOCUMENT_POSITION_FOLLOWING
            ),
        ),
    );
    const desktop = width >= 1024;
    if (!desktop)
      await p.getByRole("button", { name: "Open menu", exact: true }).click();
    const nav = p.getByRole("navigation", {
      name: desktop ? "Main navigation" : "Mobile navigation",
      exact: true,
    });
    check(
      (
        await nav
          .locator(":scope > button, :scope > a, :scope > div > button")
          .allTextContents()
      )
        .join("|")
        .includes("Services"),
    );
    check(
      (await nav
        .getByRole("link", { name: "Book a Conversation", exact: true })
        .getAttribute("href")) ===
        "https://calendar.app.google/54Gv2GFrkUFsNs4i9",
    );
    check(
      (await nav
        .getByRole("button", { name: "Creative Studio", exact: true })
        .count()) === 0,
    );
    await nav.getByRole("button", { name: "Who We Serve", exact: true }).click();
    await nav
      .getByRole("link", { name: "View all audiences", exact: true })
      .waitFor({ state: "visible" });
    await nav.getByRole("button", { name: "About Us", exact: true }).click();
    check(
      await nav.getByRole("link", { name: "Careers", exact: true }).isVisible(),
    );
    await nav
      .locator("summary")
      .filter({ hasText: /^Creative Studio$/ })
      .click();
    for (const name of ["Watch", "Read", "Shop"]) {
      await nav
        .locator("summary")
        .filter({ hasText: new RegExp("^" + name + "$") })
        .click();
      await nav
        .getByRole("link", { name: "Explore " + name, exact: true })
        .waitFor({ state: "visible" });
      check(true);
    }
    await p.screenshot({
      path: `/tmp/consulting-navigation-${width}.png`,
      fullPage: false,
    });
    if (!desktop)
      await p.getByRole("button", { name: "Close menu", exact: true }).click();
    else await p.keyboard.press("Escape");
    const footer = p.getByRole("contentinfo");
    for (const name of [
      "Careers",
      "Watch",
      "Read",
      "Shop",
      "Who We Serve",
      "Client login",
    ])
      check(
        (await footer.getByRole("link", { name, exact: true }).count()) === 1,
      );
  }
  for (const path of [
    "/work",
    "/who-we-serve",
    "/demos",
    "/demos/education",
    "/demos/manufacturing",
    "/demos/property-management",
    "/studio",
    "/studio/watch",
    "/studio/read",
    "/shop",
    "/careers",
    "/contact",
  ])
    check((await c.request.get(base + path)).status() === 200);
  await p.goto(base + "/work");
  check(
    (await p
      .getByRole("heading", {
        name: "Clients & project relationships",
        exact: true,
      })
      .count()) === 0,
  );
  await p.screenshot({
    path: "/tmp/consulting-work-desktop.png",
    fullPage: true,
  });
  check(errors.length === 0);
  console.log(`${n} consulting navigation/route checks passed.`);
} finally {
  await browser.close();
}
