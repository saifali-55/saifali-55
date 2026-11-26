// Screenshots + structural checks for the three hero previews.
// Usage:  npm run build && npm run start   (in another shell)
//         node research/capture.mjs [a,b,c]
// Writes research/shots/hero-<x>-<view>.png and research/checks.json
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const heroes = (process.argv[2] ?? "a,b,c").split(",").map((s) => s.trim());
const out = path.join(process.cwd(), "research", "shots");
mkdirSync(out, { recursive: true });

const views = [
  { name: "desktop-light", viewport: { width: 1440, height: 900 }, colorScheme: "light" },
  { name: "desktop-dark", viewport: { width: 1440, height: 900 }, colorScheme: "dark" },
  {
    name: "mobile",
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    fullPage: true,
  },
];

const H1_PHRASE = "احجز طبيبك في بغداد";
const browser = await chromium.launch();
const report = {};

for (const h of heroes) {
  report[h] = {};
  for (const v of views) {
    const ctx = await browser.newContext({
      viewport: v.viewport,
      colorScheme: v.colorScheme,
      isMobile: v.isMobile ?? false,
      hasTouch: v.hasTouch ?? false,
      deviceScaleFactor: v.deviceScaleFactor ?? 1,
      locale: "ar-IQ",
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));

    await page.goto(`${BASE}/preview/hero-${h}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2800); // let one-shot entrance motion finish

    const checks = await page.evaluate((phrase) => {
      const html = document.documentElement;
      // measure real overflow: lift the overflow clip for the measurement
      const prevB = document.body.style.overflowX;
      const prevH = html.style.overflowX;
      document.body.style.overflowX = "visible";
      html.style.overflowX = "visible";
      const scrollW = html.scrollWidth;
      const clientW = html.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (r.right > clientW + 1 || r.left < -1) {
          // ignore children of clipping ancestors (overflow hidden/clip)
          let p = el.parentElement;
          let clipped = false;
          while (p && p !== document.body) {
            const o = getComputedStyle(p).overflowX;
            if (o === "hidden" || o === "clip") {
              clipped = true;
              break;
            }
            p = p.parentElement;
          }
          if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]} ${Math.round(r.left)}–${Math.round(r.right)}`);
        }
      }
      document.body.style.overflowX = prevB;
      html.style.overflowX = prevH;

      const h1s = [...document.querySelectorAll("h1")];
      const hero = document.querySelector("section[aria-labelledby]");
      const join = hero?.querySelector('a[href="#join"]');
      const prov = hero?.querySelector('a[href="#providers"]');
      const focusable = (a) => {
        if (!a) return false;
        a.focus();
        return document.activeElement === a;
      };
      const visible = (a) => !!a && a.getBoundingClientRect().height > 0;
      return {
        dir: html.getAttribute("dir"),
        lang: html.getAttribute("lang"),
        h1Count: h1s.length,
        h1HasPhrase: h1s.length === 1 && h1s[0].textContent.includes(phrase),
        h1Text: h1s[0]?.textContent.replace(/\s+/g, " ").trim(),
        overflow: scrollW > clientW,
        scrollW,
        clientW,
        offenders: offenders.slice(0, 8),
        ctaJoin: { present: !!join, visible: visible(join), focusable: focusable(join), text: join?.textContent.trim() },
        ctaProviders: { present: !!prov, visible: visible(prov), focusable: focusable(prov), text: prov?.textContent.trim() },
        fontsLoaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family).filter((x, i, a) => a.indexOf(x) === i),
      };
    }, H1_PHRASE);

    // blur before the shot so no focus ring shows
    await page.evaluate(() => document.activeElement?.blur());
    await page.waitForTimeout(100);

    const file = path.join(out, `hero-${h}-${v.name}.png`);
    await page.screenshot({ path: file, fullPage: !!v.fullPage });

    report[h][v.name] = { ...checks, consoleErrors, screenshot: path.relative(process.cwd(), file) };
    const ok =
      checks.h1Count === 1 && checks.h1HasPhrase && !checks.overflow && checks.offenders.length === 0 &&
      checks.ctaJoin.focusable && checks.ctaProviders.focusable && consoleErrors.length === 0;
    console.log(`${ok ? "PASS" : "FAIL"} hero-${h} ${v.name}  h1=${checks.h1Count} phrase=${checks.h1HasPhrase} overflow=${checks.overflow} (${checks.scrollW}/${checks.clientW}) offenders=${checks.offenders.length} ctas=${checks.ctaJoin.focusable}/${checks.ctaProviders.focusable} console=${consoleErrors.length}`);
    if (checks.offenders.length) console.log("   overflow:", checks.offenders.join(" | "));
    if (consoleErrors.length) console.log("   console:", consoleErrors.slice(0, 3).join(" | "));
    await ctx.close();
  }
}

await browser.close();
writeFileSync(path.join(process.cwd(), "research", "checks.json"), JSON.stringify(report, null, 2));
console.log("wrote research/checks.json");
