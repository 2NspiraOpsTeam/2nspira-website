import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const assets = {
  manufacturing: {
    path: new URL("../public/images/work/manufacturing-command-center.png", import.meta.url),
    expected: "ac60bc003dac6d6eed48e49a7e1b109bcf009f32d53d08fa957404bcb548bd16",
  },
  waterBear: {
    path: new URL("../public/images/work/water-bear-mecca.png", import.meta.url),
    expected: "a81b38e8fb60839c4c6c37c661d9f0983f229cca3a4821816d6aa02ac8ae8011",
  },
};

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const manufacturingHash = sha256(assets.manufacturing.path);
const waterBearHash = sha256(assets.waterBear.path);

if (manufacturingHash === waterBearHash) {
  throw new Error(
    `Work asset verification failed: Manufacturing and Water Bear are identical (${manufacturingHash}).`,
  );
}

for (const [name, asset] of Object.entries(assets)) {
  const actual = name === "manufacturing" ? manufacturingHash : waterBearHash;
  if (actual !== asset.expected) {
    throw new Error(
      `Work asset verification failed: ${name} SHA-256 is ${actual}; expected ${asset.expected}.`,
    );
  }
}

console.log("Work asset verification passed: Manufacturing and Water Bear are distinct and approved.");
