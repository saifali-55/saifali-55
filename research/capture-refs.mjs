// Captures the hero (first viewport) of each reference site at 1440×900.
// Usage: node research/capture-refs.mjs   → research/shots/refs/<name>.png
// Needs outbound access to the ten hosts below; the sandbox used for the
// first pass denied them (see research/notes.md).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const refs = [
  ["speedinvest", "https://www.speedinvest.com/"],
  ["villageglobal", "https://www.villageglobal.com/"],
  ["antler", "https://www.antler.co/"],
  ["hummingbird", "https://www.hummingbird.vc/"],
  ["everywhere", "https://www.everywhere.vc/"],
  ["rockhealth", "https://www.rockhealthcapital.com/"],
  ["cherry", "https://www.cherry.vc/"],
  ["beco", "https://www.becocapital.com/"],
  ["hub71", "https://www.hub71.com/"],
  ["verge", "https://www.verge.fund/"],
];

const out = path.join(process.cwd(), "research", "shots", "refs");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [name, url] of refs) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(1500); // let entrance animations settle
    await page.screenshot({ path: path.join(out, `${name}.png`) });
    console.log("ok  ", name);
  } catch (err) {
    console.log("FAIL", name, String(err).split("\n")[0]);
  }
}
await browser.close();
