# Salamtak hero concepts — comparison

Three hero directions for salamtak.tech, each a self-contained React component
with its own preview route. Run locally with:

```sh
npm install
npm run dev      # then open the routes below
```

| Route | Component | Direction |
| --- | --- | --- |
| `/preview/hero-a` | `components/hero/HeroA.tsx` | A · Editorial paper (ورقي تحريري) |
| `/preview/hero-b` | `components/hero/HeroB.tsx` | B · Bold product (منتج جريء) |
| `/preview/hero-c` | `components/hero/HeroC.tsx` | C · Calm clinical (سريري هادئ) |

Shared across all three: `dir="rtl"` with logical properties only, Google Fonts
through `next/font` with real fallback stacks, light and dark via tokens on
`:root` + `prefers-color-scheme`, the single Salamtak green (`#0F7A55` light /
`#3DD69C` dark), the required H1 phrase, both CTAs, honest copy only, one
signature motion per hero, `prefers-reduced-motion` honoured, no motion
libraries. Phone mockups use the placeholder files in `public/img/` at
712×1534; drop the real screenshots in with the same names.

---

## The three concepts

| | **A · Editorial paper** | **B · Bold product** | **C · Calm clinical** |
| --- | --- | --- | --- |
| **Direction** | A warm paper page that reads like a well-set magazine opener: serif Arabic display, one hand-drawn loop around the word that matters (تتنافس), footnote marks that resolve to three honest footnotes, one phone with a margin annotation. | A full-bleed green block with an oversized two-line headline, three fanned phones (doctor / offers / patient) and an index-numbered stats strip separated by hairline rules. Dark mode shifts the block to deep green instead of keeping a glaring fill. | White space, two colours, one gradient word (أهدأ), a single floating phone carrying two live chips (cheapest offer, signed prescription) and three quiet audience doors: مريض / طبيب / صيدلية, with labs marked قريباً. |
| **Inspiration** | Speedinvest (paper, serif, dot field), Village Global (drawn loop), Hummingbird (footnotes, annotations) | BECO Capital (full-bleed colour, oversized type), Antler (stats with rules), Everywhere (two-line headline, index labels) | Rock Health (restraint, black/green), Verge (gradient word, one human figure), Hub71 (three audience CTAs) |
| **Type** | Markazi Text display · IBM Plex Sans Arabic body | Readex Pro 700 display · Plex body | Readex Pro 600 display · Plex body |
| **Signature motion** | **ECG out of the dot field.** A canvas dot grid; one band of dots bends and brightens into a PQRST trace that travels right-to-left (reading direction), leaving a fading baseline. Cached base layer, 30 fps, paused off-screen, static frame under reduced motion. The loop and annotation arrow draw themselves once. | **Heartbeat ripple.** Two rings per beat (lub-dub) radiate from behind the phones every 2.6 s; the full stop in line one beats in time. Two animated elements, CSS only. Static faint rings under reduced motion. | **The prescription QR draws itself.** A real Version-2 QR for salamtak.tech appears band by band on the diagonal, then the doctor's signature is stroked and the check appears. CSS only, ~2.5 s once. Fully drawn under reduced motion. |
| **Strengths** | Most distinctive voice; the footnotes make the honest claims feel considered rather than defensive; the circled word says what the product *does* in one gesture; excellent on paper-like dark mode. | Fastest to understand: product on screen, business model in four honest numbers, two-sided audience in the three phones. Strongest at 390 px, where the fan bleeds off the bottom like a real app page. Very low motion cost. | Reads as trustworthy, which is the scarce resource for a pre-launch health brand. The live offer chip explains the differentiator (pharmacies send price offers) without a paragraph. Three doors speak to all three sides of the marketplace at once. Lightest page; smallest motion budget; cleanest dark mode. |
| **Risks** | Serif Arabic can read "literary" rather than "product"; the drawn loop may feel whimsical for a clinic. Canvas is the only hero with JavaScript motion (now 50 ms TBT on simulated mobile, but still the costliest). Footnotes need discipline as the page grows. | Full-bleed green is loud for healthcare and constrains the palette of everything below it. Oversized Arabic wraps unpredictably on narrow devices (capped at 5.4 rem; 4 lines at 390 px). Reads "consumer app", which may not reassure conservative clinics. | Closest to the generic "white healthtech SaaS" look; the gradient word is a trend that will date. Five links in the hero (two CTAs + three doors) need the doors to stay visibly secondary. The floating phone and chips need real screenshots to land. |
| **Lighthouse a11y (mobile / desktop)** | 100 / 100 | 100 / 100 | 100 / 100 |
| **Lighthouse perf (mobile / desktop)** | 93 / 100 | 89 / 100 | 88 / 100 |

Lighthouse was run against `next start` inside the sandbox (details in
`research/lighthouse.json`). SEO scores 63 on every preview route for one reason
only: the preview pages are deliberately `noindex`. Performance numbers are
indicative; mobile LCP is dominated by simulated slow-4G font and image
delivery, not by the heroes' motion.

---

## Verification (research/checks.json, research/shots/)

| Check | A | B | C |
| --- | --- | --- | --- |
| Exactly one `<h1>`, contains «احجز طبيبك في بغداد» | ✓ | ✓ | ✓ |
| Primary CTA `#join` and secondary `#providers` are real `<a>`, visible, focusable | ✓ | ✓ | ✓ |
| No horizontal overflow at 390×844 (measured with the body clip lifted) | ✓ | ✓ | ✓ |
| No console errors or page errors (light, dark, mobile) | ✓ | ✓ | ✓ |
| Fonts loaded through `next/font` (self-hosted, swap) | ✓ | ✓ | ✓ |
| `prefers-reduced-motion`: no infinite animations running, final states shown | ✓ | ✓ | ✓ |
| Screenshots 1440×900 light + dark, 390×844 full page | `hero-a-*.png` | `hero-b-*.png` | `hero-c-*.png` |

Regenerate everything with `npm run build && npm run start`, then
`npm run shots` (Playwright) — Lighthouse was run from a separate install so it
does not weigh down the project's dependencies.

---

## Recommendation: **C · Calm clinical**

Salamtak is pre-launch, in healthcare, with no users, reviews or store listing to
lean on. The only thing the hero can offer is credibility, and C is the one
whose *restraint itself* reads as credibility. It also solves the structural
problem the other two only gesture at: this is a three-sided marketplace that
needs patients, doctors and pharmacies to sign up for the same early trial, and
C gives each of them a door in the hero without diluting the primary CTA. The
live offer chip (أرخص عرض على وصفتك: 16,000 د.ع) shows the differentiator in one
glance, and the self-drawing QR plus signature says "real prescription" without
a claim we cannot back.

Take two things with it: B's index-numbered stats strip belongs directly under
C's hero as the next section (the four honest numbers are the best copy on the
page), and A's footnote habit belongs in the pricing/FAQ sections where the 5% /
3% / first-50-free terms need to be stated precisely. Keep B in the drawer for a
launch-day campaign page once there are store links; keep A's drawn loop as a
candidate brand gesture for print and social.
