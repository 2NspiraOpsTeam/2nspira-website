import { test } from "node:test";
import assert from "node:assert/strict";
import { assertCurrentMain } from "./release-freshness.mjs";
const older = "a".repeat(40), newer = "b".repeat(40);
test("current main can proceed", () => assert.doesNotThrow(() => assertCurrentMain(newer, { exec: () => `${newer}\trefs/heads/main\n` })));
test("delayed older build is refused", () => assert.throws(() => assertCurrentMain(older, { exec: () => `${newer}\trefs/heads/main\n` }), /not current main/));
test("malformed upstream fails closed", () => assert.throws(() => assertCurrentMain(newer, { exec: () => "not a ref" }), /not current main/));
test("unreachable upstream fails closed", () => assert.throws(() => assertCurrentMain(newer, { exec: () => { throw new Error("network unavailable"); } }), /network unavailable/));
