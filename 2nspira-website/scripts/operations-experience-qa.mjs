const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ||
    "/opt/homebrew/lib/node_modules/playwright/index.mjs"
);
import { build } from "esbuild";
import { DatabaseSync } from "node:sqlite";
import { readFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const root = process.cwd();
const base = process.argv[2] || "http://localhost:8894";
const bundle = await build({
  entryPoints: [root + "/src/lib/operations/handler.ts"],
  bundle: true,
  write: false,
  platform: "node",
  format: "esm",
});
const { handleOperations } = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);
const sql = new DatabaseSync(":memory:");
sql.exec(
  await readFile(root + "/migrations/careers/0007_operations_demo.sql", "utf8"),
);
const db = {
  prepare(query) {
    let v = [];
    return {
      bind(...values) {
        v = values;
        return this;
      },
      async first() {
        return sql.prepare(query).get(...v) ?? null;
      },
      async run() {
        return { meta: { changes: sql.prepare(query).run(...v).changes } };
      },
    };
  },
};
const env = {
  CAREERS_DB: db,
  CHAT_API_KEY: "mock-provider",
  CHAT_FREE_ONLY: "verified",
  CHAT_RATE_LIMIT: { limit: async () => ({ success: true }) },
};
const proposal = {
  classification: "Billing discrepancy",
  summary:
    "The fictional ledger shows two $480 captures against INV-1023. This is a possible duplicate that requires human investigation.",
  priority: "High",
  team: "Finance",
  caseTitle: "Investigate possible duplicate · INV-1023",
  task: "Compare PAY-201 and PAY-202 against the synthetic invoice before proposing a resolution.",
  draft:
    "Hello Alex, thank you for flagging the two charges. We suggest that Finance investigate the payment references for INV-1023. No refund or adjustment has been made. We will need to confirm the findings before advising on a resolution.",
};
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  extraHTTPHeaders: { "x-forwarded-proto": "https" },
});
const page = await context.newPage();
let cookie = "",
  fail = false;
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.route("**/api/demos/operations", async (route) => {
  const req = route.request();
  const response = await handleOperations(
    new Request("https://test.local/api/demos/operations", {
      method: req.method(),
      headers: {
        origin: "https://test.local",
        "content-type": "application/json",
        cookie,
      },
      ...(req.method() === "POST" ? { body: req.postData() } : {}),
    }),
    env,
    async () => {
      await new Promise((r) => setTimeout(r, 150));
      return fail
        ? new Response("{}", { status: 500 })
        : Response.json({
            choices: [{ message: { content: JSON.stringify(proposal) } }],
          });
    },
  );
  if (response.headers.get("set-cookie"))
    cookie = response.headers.get("set-cookie").split(";")[0];
  await route.fulfill({
    status: response.status,
    contentType: "application/json",
    body: await response.text(),
  });
});
await context.addInitScript(() => {
  window.SpeechRecognition = class {
    start() { window.__speech = this; }
    stop() { this.onend?.(); }
    abort() { this.onend?.(); }
  };
});
await page.goto(base + "/demos/ai-operations");
await page.getByRole('button', {name:'Speak your request', exact:true}).click();
assert.equal(await page.getByRole('button', {name:'Process request', exact:true}).isDisabled(), true);
await page.evaluate(() => { window.__speech.onresult({results:[{isFinal:true,0:{transcript:'Fictional invoice INV-1023 has two charges. Please investigate.'}}]}); window.__speech.onend(); });
await page.waitForFunction(() => document.querySelector('textarea').value.startsWith('Fictional invoice'));
assert.equal(await page.getByLabel('Incoming message').inputValue(), 'Fictional invoice INV-1023 has two charges. Please investigate.');
assert.equal(await page.getByRole('heading', {name:'One request. A clearer path forward.'}).isVisible(), true);
await page.getByRole('button', {name:'Speak your request', exact:true}).click();
await page.evaluate(() => { window.__speech.onerror({error:'not-allowed'}); window.__speech.onend(); });
await page.getByText('Microphone access was not allowed.', {exact:false}).waitFor();
await page.getByRole('button', {name:'Speak your request', exact:true}).click();
await page.getByRole('button', {name:'Stop listening', exact:true}).click();
await page.getByText('No transcript received.', {exact:false}).waitFor();
console.log('PASS mocked speech: transcript, no auto-submit, denied permission, stop, retry');
await page
  .getByRole("button", { name: "Process request", exact: true })
  .waitFor();
await page
  .getByRole("button", { name: "Process request", exact: true })
  .click();
await page
  .getByRole("heading", { name: "Investigate possible duplicate · INV-1023", exact: true }).first()
  .waitFor();
await page.getByRole("button", { name: "Review & create case" }).click();
await page.getByRole("dialog").waitFor();
await page.keyboard.press("Escape");
assert.equal(
  await page.locator('dialog[aria-labelledby="approval-title"]').isVisible(),
  false,
);
await page.getByRole("button", { name: "Review & create case" }).click();
await page.getByRole("button", { name: "Confirm approval" }).click();
await page.getByText(/Saved sandbox record:.*CASE-/).waitFor();
assert.equal(await page.getByRole('heading',{name:'Case workspace',exact:true}).isVisible(),true);
assert.equal(await page.getByText('Created · Open',{exact:true}).isVisible(),true);
await page.getByRole("button", { name: "Review & create task" }).click();
await page.getByRole("button", { name: "Confirm approval" }).click();
await page.getByText(/Saved sandbox record:.*TASK-/).waitFor();
assert.equal(await page.getByText('Created · To do',{exact:true}).isVisible(),true);
const email = page
  .getByRole("article")
  .filter({
    has: page.getByRole("heading", { name: "Reply draft · simulated outbox" }),
  });
await email.getByRole("button", { name: "Edit", exact: true }).click();
await email
  .getByLabel("Reply text")
  .fill(
    "A human-edited fictional reply. Please investigate before deciding a resolution.",
  );
await email.getByRole("button", { name: "Save for fresh review" }).click();
await page.getByRole("button", { name: "Review & approve reply" }).click();
await page.getByRole("button", { name: "Confirm approval" }).click();
await page
  .getByRole("button", { name: "Simulate sending approved reply" })
  .click();
await page
  .getByText("From incoming request to coordinated follow-through.", { exact: false })
  .waitFor();
await page.reload();
await page
  .getByText("From incoming request to coordinated follow-through.", { exact: false })
  .waitFor();
await mkdir("/tmp/operations-upgrade-qa", { recursive: true });
for (const width of [1440, 768, 390, 320]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `/tmp/operations-upgrade-qa/operations-${width}.png`,
    fullPage: true,
  });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    `overflow ${width}`,
  );
  console.log(`PASS rendered ${width}px, saved records and outbox`);
}
await page.getByRole("button", { name: "Reset demo", exact: true }).click();
await page.getByRole("button", { name: "Reset my demo" }).click();
await page
  .getByRole("heading", { name: "One request. A clearer path forward." })
  .waitFor();
await page
  .getByRole("button", { name: "Write a fictional request", exact: false })
  .click();
const input = page.getByLabel("Incoming message");
assert.equal(await input.inputValue(), "");
assert.equal(
  await page
    .getByRole("button", { name: "Process request", exact: true })
    .isDisabled(),
  true,
);
await input.fill("Synthetic outage scenario");
fail = true;
await page
  .getByRole("button", { name: "Process request", exact: true })
  .click();
await page.getByRole("heading", { name: "Analysis paused" }).waitFor();
assert.equal(
  await page
    .getByText("Real AI analysis could not be completed.", { exact: false })
    .count(),
  1,
);
console.log(
  "PASS custom clear, empty disabled, provider failure, reset, dialog Escape, edit approval, refresh",
);
assert.deepEqual(errors, []);
console.log("PASS no page exceptions");
const unsupported = await browser.newContext({extraHTTPHeaders:{'x-forwarded-proto':'https'}});
await unsupported.addInitScript(() => { delete window.SpeechRecognition; delete window.webkitSpeechRecognition; });
const fallback = await unsupported.newPage();
await fallback.goto(base + "/demos/ai-operations");
await fallback.getByText('Voice input is not supported in this browser.',{exact:false}).waitFor();
assert.equal(await fallback.getByRole('button',{name:'Speak your request',exact:true}).isDisabled(),true);
assert.equal(await fallback.getByLabel('Incoming message').isEnabled(),true);
console.log('PASS unsupported browser typing fallback');
await browser.close();
