# Visual research — hero references

> **Access note (2026-10-01).** This session runs in a sandboxed container whose
> egress policy denied every one of the ten reference hosts (HTTP 403 on CONNECT
> for `www.speedinvest.com`, `www.villageglobal.com`, `www.antler.co`,
> `www.hummingbird.vc`, `www.everywhere.vc`, `www.rockhealthcapital.com`,
> `www.cherry.vc`, `www.becocapital.com`, `www.hub71.com`, `www.verge.fund`),
> and the fallback fetch service and web archives were blocked as well. No live
> screenshots could be taken. The notes below are written from the brief's own
> description of each site plus prior familiarity with them, and they are kept to
> the level of **principles** (layout, type, colour, motion), which is all we
> borrow anyway. `research/capture-refs.mjs` captures the ten heroes at 1440×900
> into `research/shots/refs/` as soon as the hosts are allowed:
>
> ```sh
> node research/capture-refs.mjs
> ```

We borrow principles, not assets. No logos, imagery, or copy from any site.

---

## 1. Speedinvest — paper background, serif display, dot field, colour tiles

- **Works:** an off-white *paper* canvas instead of pure white, a serif display
  face for the headline, and a quiet field of dots that gives depth without
  competing with type. Colour arrives as flat tiles, not gradients, so the
  accent reads as a system.
- **Borrow:** warm paper token (`--bg: #f7f4ec`), serif Arabic display (Markazi
  Text), a low-contrast dot field as the hero's only texture, one accent used
  as flat fills.
- **Avoid:** letting the dot field become a particle show. It is a texture;
  keep alpha low and motion slow.

## 2. Village Global — hand-drawn circle around one word, warm serif

- **Works:** the headline is set calmly in a warm serif, and a single hand-drawn
  loop around one word tells you what the sentence is really about. Human,
  confident, cheap to render.
- **Borrow:** one circled word in the H1 (an SVG path drawn with
  `stroke-dashoffset`, 900ms, once), slightly imperfect so it reads as a pen,
  not a shape tool.
- **Avoid:** circling more than one word, or pairing the loop with underlines
  and highlights. One mark.

## 3. Antler — big stats separated by rules, confident headline

- **Works:** a declarative one-line headline, then a strip of oversized numbers
  separated by thin vertical rules. The rules do the layout work; no cards,
  no icons.
- **Borrow:** the stats strip grammar (number in display face, label in body
  face, hairline rules between) — restricted to the four honest Salamtak
  numbers: `0 د.ع`, `3`, `4`, `50`.
- **Avoid:** inventing scale we don't have (users, downloads, cities). Numbers
  are facts about the product, never about traction.

## 4. Hummingbird — footnote numbers, editorial grid, annotations

- **Works:** superscript footnote marks in the running text and small annotations
  in the margin turn a landing page into an essay. It signals care and lets the
  hero stay short while still being precise.
- **Borrow:** two or three footnote marks on the lead sentence resolving to one
  small footnote block at the base of the hero (arrival code, digital
  prescription, pharmacy offers).
- **Avoid:** footnotes that need reading to understand the headline; the H1
  must stand alone.

## 5. Everywhere Ventures — index-table layout, bold two-line headline

- **Works:** the headline is exactly two bold lines, and content below is laid
  out like an index or table (numbered rows, aligned columns) rather than
  cards. It feels engineered.
- **Borrow:** a two-line H1 where each line is a complete thought, and
  two-digit index labels (`01`–`04`) above the stats.
- **Avoid:** carrying the table metaphor into the mobile layout, where rows
  must stack; the index labels survive, the columns do not.

## 6. Rock Health Capital — giant wordmark, black/green restraint

- **Works:** almost nothing on the page except type and one green. The restraint
  itself reads as credibility, which matters for health.
- **Borrow:** a two-colour hero (ink + Salamtak green), generous white space,
  the brand green used sparingly for the one thing that matters.
- **Avoid:** a literal giant wordmark here — Salamtak is unknown, so the
  headline must do the talking, not the logo.

## 7. Cherry Ventures — founders-first, photo-led, highlighter accent

- **Works:** people photography carries the page and a highlighter accent picks
  out key phrases. Warm and human.
- **Borrow:** the highlighter idea only as a *gesture* (the drawn circle in Hero
  A does this job); the founders-first attitude translates to patients-first
  copy ("you pay nothing").
- **Avoid:** photo-led heroes. We are pre-launch with no real patients or
  doctors to show; stock photos would undercut the honest tone.

## 8. BECO Capital — full-bleed colour, oversized type

- **Works:** the whole viewport is one saturated colour block and the headline is
  set at a scale that would be absurd on white. Unmissable.
- **Borrow:** a full-bleed Salamtak-green block with oversized Readex Pro, and a
  dark-mode variant that shifts the block to deep green rather than keeping a
  glaring fill.
- **Avoid:** oversized type that fails to wrap at 390px. The Arabic headline has
  to be measured at mobile widths first, then scaled up.

## 9. Hub71 — three audience CTAs in the hero

- **Works:** the hero admits there is more than one audience and offers each a
  door (startups / investors / partners) without turning into a nav.
- **Borrow:** three quiet audience entry points (مريض / طبيب / صيدلية) under the
  main CTAs, plus a muted "مختبرات — قريباً" chip so labs are acknowledged
  without being promised.
- **Avoid:** making the three doors compete with the primary CTA. They sit
  lower, smaller, in the body face.

## 10. Verge — healthtech gradient headline, "lives" metric

- **Works:** a single gradient word inside an otherwise plain headline, and one
  human-scale metric instead of a dashboard of numbers.
- **Borrow:** one gradient word (green → mint) in Hero C; the restraint of one
  figure (`0 د.ع` — what the patient pays) when a number is shown.
- **Avoid:** a "lives impacted" style metric. We have no users yet; any such
  figure would be fiction.

---

## Synthesis → three directions

| Direction | Sources | What we keep |
| --- | --- | --- |
| **A · Editorial paper** | Speedinvest, Village Global, Hummingbird | paper token, serif display, one circled word, footnotes, dot field |
| **B · Bold product** | BECO, Antler, Everywhere | full-bleed green, oversized two-line H1, stats strip with rules, index labels |
| **C · Calm clinical** | Rock Health, Verge, Hub71 | white space, two-colour palette, one gradient word, three audience doors |

Shared rules across all three: RTL with logical properties only, Google Fonts
with real fallback stacks, `#0F7A55` / `#3DD69C` as the single accent, light
and dark via tokens on `:root`, honest copy, one signature motion per hero,
`prefers-reduced-motion` respected, no libraries for motion.
