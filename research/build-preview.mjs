// Builds self-contained HTML previews of the site from the running production server:
// CSS inlined, Google Fonts instead of self-hosted woff2, images as data URIs, and no
// framework JavaScript (Hero A's canvas gets a small vanilla port). For hosts that serve a
// bundle of static files without a normal web origin, such as claude.ai artifacts.
//
// Usage:  npm run build && npm run start        (in another shell)
//         node research/build-preview.mjs [outDir]   → outDir/index.html + site.html + hero-*.html
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = path.resolve(process.argv[2] ?? "research/.tmp/pub");
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const pages = [
  { route: "/", file: "site.html", form: true },
  { route: "/preview/hero-a", file: "hero-a.html", canvas: true },
  { route: "/preview/hero-b", file: "hero-b.html" },
  { route: "/preview/hero-c", file: "hero-c.html" },
];

const GOOGLE_FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Markazi+Text:wght@400..700&family=Readex+Pro:wght@160..700&display=swap">';

const mimes = { webp: "image/webp", png: "image/png", svg: "image/svg+xml" };
const dataUri = (file) =>
  `data:${mimes[path.extname(file).slice(1)]};base64,${readFileSync(file).toString("base64")}`;

async function text(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

// Vanilla port of HeroA's DotField effect (components/hero/HeroA.tsx), for pages without React.
const DOTFIELD = String.raw`(function(){
var canvas=document.querySelector('section[aria-labelledby="hero-a-title"] canvas');if(!canvas)return;
var ctx=canvas.getContext("2d");if(!ctx)return;
var reduce=matchMedia("(prefers-reduced-motion: reduce)"),scheme=matchMedia("(prefers-color-scheme: dark)");
var GAP=26,BAND_ROWS=4,WAVE=340,TAIL=1.8,SPEED=120;
var w=0,h=0,dpr=1,raf=0,visible=true,rgb="15,122,85",last=0,base=null;
function readAccent(){var hex=getComputedStyle(canvas).getPropertyValue("--accent").trim();var m=/^#?([0-9a-f]{6})$/i.exec(hex);if(m){var v=parseInt(m[1],16);rgb=((v>>16)&255)+","+((v>>8)&255)+","+(v&255);}}
function baseRowOf(){return Math.round((h*0.56)/GAP);}
function buildBase(){var cols=Math.ceil(w/GAP)+1,rows=Math.ceil(h/GAP)+1,baseRow=baseRowOf(),x0=(w%GAP)/2;var off=document.createElement("canvas");off.width=canvas.width;off.height=canvas.height;var o=off.getContext("2d");if(!o)return;o.setTransform(dpr,0,0,dpr,0,0);o.fillStyle="rgba("+rgb+",0.22)";o.beginPath();for(var r=0;r<rows;r++){if(Math.abs(r-baseRow)<=BAND_ROWS)continue;var y=r*GAP;for(var c=0;c<cols;c++)o.rect(x0+c*GAP-1,y-1,2,2);}o.fill();base=off;}
function resize(){var r=canvas.parentElement.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,1.5);w=r.width;h=r.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);buildBase();if(reduce.matches)draw(0,true);}
function ecg(u){if(u<0||u>1)return 0;if(u<0.2)return 0.14*Math.sin((u/0.2)*Math.PI);if(u<0.3)return 0;if(u<0.34)return -0.14*((u-0.3)/0.04);if(u<0.39)return -0.14+1.14*((u-0.34)/0.05);if(u<0.44)return 1-1.34*((u-0.39)/0.05);if(u<0.5)return -0.34+0.34*((u-0.44)/0.06);if(u<0.56)return 0;if(u<0.8)return 0.3*Math.sin(((u-0.56)/0.24)*Math.PI);return 0;}
function draw(t,still){ctx.clearRect(0,0,w,h);var cols=Math.ceil(w/GAP)+1,baseRow=baseRowOf(),x0=(w%GAP)/2;var span=w+WAVE*(1+TAIL),phase0=w+WAVE*TAIL-w*0.42;var head=still?w*0.4:w+WAVE*TAIL-((phase0+(t/1000)*SPEED)%span);
if(base){ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(base,0,0);ctx.setTransform(dpr,0,0,dpr,0,0);}
for(var r=baseRow-BAND_ROWS;r<=baseRow+BAND_ROWS;r++){var dist=Math.abs(r-baseRow),weight=1-dist/(BAND_ROWS+1),y=r*GAP,rowGlow=dist===0?1:0.4*weight;
for(var c=0;c<cols;c++){var x=x0+c*GAP,u=(x-head)/WAVE,v=0,lit=0;if(u>=0&&u<=1){v=ecg(u);lit=0.35+Math.min(1,Math.abs(v)*1.8)*0.65;}else if(u>1&&u<1+TAIL){lit=0.45*(1-(u-1)/TAIL);}
var dy=-v*46*weight,g=lit*rowGlow,a=0.22+g*0.72,size=2+g*1.8;ctx.fillStyle="rgba("+rgb+","+a.toFixed(3)+")";ctx.fillRect(x-size/2,y+dy-size/2,size,size);}}}
function loop(t){raf=0;if(!visible||document.hidden)return;if(t-last>=32){last=t;draw(t,false);}raf=requestAnimationFrame(loop);}
function start(){if(reduce.matches){draw(0,true);return;}if(!raf)raf=requestAnimationFrame(loop);}
function stop(){if(raf)cancelAnimationFrame(raf);raf=0;}
readAccent();resize();start();
new ResizeObserver(resize).observe(canvas.parentElement);
new IntersectionObserver(function(es){visible=es[0].isIntersecting;if(visible)start();else stop();}).observe(canvas);
document.addEventListener("visibilitychange",function(){if(document.hidden)stop();else start();});
scheme.addEventListener("change",function(){readAccent();buildBase();if(reduce.matches)draw(0,true);});
reduce.addEventListener("change",function(){stop();start();});
})();`;

// The static preview has no API: explain instead of posting the form anywhere.
const FORM_NOTE = String.raw`(function(){var f=document.getElementById("join-form");if(!f)return;f.addEventListener("submit",function(e){e.preventDefault();var s=f.querySelector("[data-join-status]");if(s)s.textContent="هذه معاينة ثابتة. التسجيل يعمل على الموقع الحقيقي عند تشغيله.";});})();`;

const cssCache = new Map();
async function cssFor(href) {
  if (!cssCache.has(href)) {
    let css = await text(BASE + href);
    // self-hosted next/font faces → replaced by the Google Fonts stylesheet
    css = css.replace(/@font-face\s*\{[^}]*\}/g, (rule) => (rule.includes(".woff2") ? "" : rule));
    cssCache.set(href, css);
  }
  return cssCache.get(href);
}

const icon = dataUri(path.join("app", "icon.svg"));

for (const p of pages) {
  let html = await text(BASE + p.route);

  // stylesheets → one inline <style>, in document order
  let inlined = "";
  for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)) {
    const href = /href="([^"]+)"/.exec(m[0])?.[1];
    if (!href) continue;
    inlined += (await cssFor(href.split("?")[0])) + "\n";
    html = html.replace(m[0], "");
  }

  // no framework JS, no preloads, no server icon link
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link[^>]+rel="(?:preload|modulepreload)"[^>]*>/g, "");
  html = html.replace(/<link[^>]+rel="icon"[^>]*>/g, "");

  // next/image → the original file as a data URI
  html = html.replace(/<img\b[^>]*>/g, (tag) => {
    const src = /src="([^"]+)"/.exec(tag)?.[1] ?? "";
    const m = /%2Fimg%2F([^&"]+)|\/img\/([^"?]+)/.exec(src);
    const name = m?.[1] ?? m?.[2];
    if (!name) return tag;
    const file = path.join("public", "img", decodeURIComponent(name));
    // React serialises the attribute as `srcSet`; strip both spellings.
    return tag.replace(/\s(?:srcset|sizes)="[^"]*"/gi, "").replace(/\ssrc="[^"]+"/, ` src="${dataUri(file)}"`);
  });

  // internal links → flat files
  html = html
    .replace(/href="\/preview\/hero-([abc])\/?"/g, 'href="hero-$1.html"')
    .replace(/href="\/preview\/?"/g, 'href="index.html"')
    .replace(/href="\/"/g, 'href="site.html"');

  html = html.replace("</head>", `${GOOGLE_FONTS}<link rel="icon" href="${icon}"><style>${inlined}</style></head>`);
  if (p.canvas) html = html.replace("</body>", `<script>${DOTFIELD}</script></body>`);
  if (p.form) html = html.replace("</body>", `<script>${FORM_NOTE}</script></body>`);

  writeFileSync(path.join(OUT, p.file), html);
  console.log("wrote", p.file, Math.round(html.length / 1024) + "KB");
}

// thumbnails for the index (light theme, 1440×900, downscaled)
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
for (const p of pages) {
  await page.goto(BASE + p.route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2800);
  const png = await page.screenshot();
  const small = await sharp(png).resize(1040).png({ compressionLevel: 9 }).toBuffer();
  p.thumb = `data:image/png;base64,${small.toString("base64")}`;
}
await browser.close();

const [site, a, b, c] = pages;
const arrow =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const card = (href, thumb, alt, code, name, en, rows, pick) => `
    <a class="card" href="${href}">
      <img src="${thumb}" alt="${alt}" width="1040" height="650">
      <div class="body">
        <div class="code">${code}${pick ? ' <span class="chip">التوصية</span>' : ""}</div>
        <div class="name">${name}<span>${en}</span></div>
        <dl>${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
        <span class="open">افتح ${arrow}</span>
      </div>
    </a>`;

const index = `<title>مفاهيم واجهة سلامتك</title>
${GOOGLE_FONTS}
<style>
  /* Layout: paper index; one wide card for the full site, then the three hero concepts. */
  :root{--bg:#f7f4ec;--surface:#ffffff;--ink:#15201b;--ink-2:#51605a;--ink-3:#8a958f;--line:rgba(21,32,27,.14);--accent:#0f7a55;--accent-ink:#ffffff;--accent-soft:rgba(15,122,85,.1);
    --font-body:"IBM Plex Sans Arabic","Noto Sans Arabic","Segoe UI",Tahoma,Arial,sans-serif;--font-display:"Readex Pro","Noto Kufi Arabic","Segoe UI",Tahoma,Arial,sans-serif}
  @media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#0e1411;--surface:#151d19;--ink:#eef3f0;--ink-2:#a9b5af;--ink-3:#6f7b75;--line:rgba(238,243,240,.14);--accent:#3dd69c;--accent-ink:#07261a;--accent-soft:rgba(61,214,156,.14);color-scheme:dark}}
  :root[data-theme="dark"]{--bg:#0e1411;--surface:#151d19;--ink:#eef3f0;--ink-2:#a9b5af;--ink-3:#6f7b75;--line:rgba(238,243,240,.14);--accent:#3dd69c;--accent-ink:#07261a;--accent-soft:rgba(61,214,156,.14);color-scheme:dark}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font-body);font-size:16px;line-height:1.7}
  .wrap{max-width:1120px;margin-inline:auto;padding-inline:20px;padding-block:40px 56px}
  @media (min-width:768px){.wrap{padding-inline:32px;padding-block:56px 72px}}
  .eyebrow{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:12px;font-size:14px;color:var(--ink-2)}
  .eyebrow strong{font-family:var(--font-display);font-size:20px;color:var(--ink);font-weight:600}
  h1{font-family:var(--font-display);font-weight:600;font-size:clamp(28px,2vw + 20px,40px);line-height:1.25;margin:32px 0 8px;text-wrap:balance}
  .lead{max-width:64ch;margin:0;color:var(--ink-2);font-size:17px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:36px}
  .card{display:flex;flex-direction:column;min-width:0;background:var(--surface);border:1px solid var(--line);border-radius:20px;overflow:hidden;color:inherit;text-decoration:none;transition:border-color 160ms ease,transform 160ms ease}
  .card.wide{grid-column:1 / -1}
  @media (min-width:768px){.card.wide{flex-direction:row}.card.wide img{width:52%;max-width:52%;border-bottom:0;border-inline-start:1px solid var(--line);aspect-ratio:16/10}.card.wide .body{flex:1;justify-content:center}}
  .card:hover{border-color:var(--accent);transform:translateY(-2px)}
  .card:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
  .card img{display:block;width:100%;max-width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top;border-bottom:1px solid var(--line);background:var(--bg)}
  .card .body{padding:18px 20px 20px;display:flex;flex-direction:column;gap:6px}
  .code{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-3);letter-spacing:.04em}
  .chip{display:inline-block;padding:2px 10px;border-radius:999px;background:var(--accent-soft);color:var(--accent);font-weight:600;font-size:12px;letter-spacing:0}
  .name{font-family:var(--font-display);font-weight:600;font-size:22px;line-height:1.3}
  .name span{color:var(--ink-3);font-weight:500;font-size:15px;margin-inline-start:8px}
  dl{margin:6px 0 0;display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:14px}
  dt{color:var(--ink-3)}dd{margin:0;color:var(--ink-2)}
  .open{margin-top:12px;font-weight:600;color:var(--accent);display:inline-flex;align-items:center;gap:6px}
  .open svg{width:1em;height:1em;transform:scaleX(-1)}
  .notes{margin-top:40px;padding-top:20px;border-top:1px solid var(--line);display:grid;gap:10px;font-size:14px;color:var(--ink-2);max-width:72ch}
  .notes p{margin:0}.num{font-variant-numeric:tabular-nums}
  @media (prefers-reduced-motion: reduce){.card{transition:none}.card:hover{transform:none}}
</style>

<main class="wrap" dir="rtl" lang="ar">
  <div class="eyebrow"><strong>سلامتك</strong><span>معاينة · salamtak.tech · بغداد</span></div>
  <h1>الموقع الكامل، وثلاثة اتجاهات للقسم الأول</h1>
  <p class="lead">صفحات حيّة بالعربية وبالاتجاه من اليمين إلى اليسار، تتبع سمة النظام الفاتحة أو الداكنة. الموقع الكامل يستخدم المفهوم C.</p>
  <div class="grid">
    ${card("site.html", site.thumb, "معاينة الموقع الكامل: الواجهة الرئيسية ثم كيف يشتغل، لمن، الرسوم، الأسئلة، والتسجيل للتجربة المبكرة", "الموقع", "الموقع الكامل", "salamtak.tech", [["الأقسام", "الواجهة · كيف يشتغل · لمن · للأطباء والصيدليات · الأسئلة · التجربة المبكرة"], ["الواجهة", "المفهوم C، سريري هادئ"]], false).replace('class="card"', 'class="card wide"')}
    ${card("hero-a.html", a.thumb, "معاينة المفهوم أ: خلفية ورقية، عنوان بخط سيريفي عربي، دائرة مرسومة حول كلمة، وهاتف واحد مع تعليق هامشي", "Hero A", "ورقي تحريري", "Editorial paper", [["المرجع", "Speedinvest · Village Global · Hummingbird"], ["الحركة", "خط تخطيط القلب يتشكّل من حقل النقاط ويسير باتجاه القراءة"]], false)}
    ${card("hero-b.html", b.thumb, "معاينة المفهوم ب: كتلة خضراء كاملة العرض، عنوان ضخم من سطرين، ثلاثة هواتف مروحية، وشريط أرقام مفصول بخطوط", "Hero B", "منتج جريء", "Bold product", [["المرجع", "BECO · Antler · Everywhere"], ["الحركة", "نبض قلب يتموّج خلف الهواتف، والنقطة في العنوان تنبض معه"]], false)}
    ${card("hero-c.html", c.thumb, "معاينة المفهوم ج: مساحة بيضاء، كلمة واحدة متدرجة اللون، ثلاث بطاقات للجمهور، وهاتف واحد يحمل عرض سعر ووصفة موقّعة", "Hero C", "سريري هادئ", "Calm clinical", [["المرجع", "Rock Health · Verge · Hub71"], ["الحركة", "رمز QR للوصفة يرسم نفسه، ثم يُرسم توقيع الطبيب"]], true)}
  </div>
  <div class="notes">
    <p>شاشات الهاتف مؤقتة بالمقاس الصحيح <span class="num">712×1534</span> وستُستبدل بلقطات التطبيق الحقيقية. نموذج التسجيل في هذه المعاينة لا يرسل شيئاً؛ على الموقع الحقيقي يُخزَّن الطلب عبر /api/join.</p>
    <p>كل صفحة اجتازت الفحص: عنوان H1 واحد يحتوي «احجز طبيبك في بغداد»، زرّا دعوة قابلان للتركيز، لا تمرير أفقي عند <span class="num">390</span> بكسل، لا أخطاء في وحدة التحكم، ودرجة إتاحة <span class="num">100</span> في Lighthouse.</p>
  </div>
</main>
`;
writeFileSync(path.join(OUT, "index.html"), index);
console.log("wrote index.html", Math.round(index.length / 1024) + "KB  →", OUT);
