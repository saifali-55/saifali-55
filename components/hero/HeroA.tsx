"use client";

/**
 * Hero A — "Editorial paper"
 * Inspired by: Speedinvest (paper, serif, dot field), Village Global (drawn loop
 * around one word), Hummingbird (footnote marks, margin annotation).
 *
 * Signature motion: an ECG trace that forms out of the dot field and travels
 * right-to-left behind the headline. Canvas, no libraries, paused off-screen,
 * static frame under prefers-reduced-motion.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { markazi } from "@/lib/fonts";
import s from "./HeroA.module.css";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function HeroA() {
  return (
    <section
      className={`${markazi.variable} relative isolate overflow-hidden bg-bg text-ink`}
      aria-labelledby="hero-a-title"
    >
      <DotField />

      <div className="wrap relative pt-7 pb-14 md:pt-8 md:pb-14">
        {/* masthead */}
        <div className="tabular flex items-center justify-between border-b border-line-strong pb-3 text-xs text-ink-2 md:text-sm">
          <span className="font-serif text-xl font-semibold text-ink md:text-2xl">سلامتك</span>
          <span>بغداد · نسخة تجريبية مبكرة</span>
          <span className="hidden sm:inline">salamtak.tech</span>
        </div>

        <div className="mt-10 grid items-end gap-12 md:mt-12 md:grid-cols-12 md:gap-8">
          {/* copy */}
          <div className="md:col-span-8">
            <h1
              id="hero-a-title"
              className="rise font-serif text-[clamp(2.9rem,1.7rem+5.4vw,6.4rem)] leading-[1.12] font-medium text-balance"
              style={i(0)}
            >
              احجز طبيبك في بغداد، وخلّي الصيدليات <Circled>تتنافس</Circled> على وصفتك.
            </h1>

            <p
              className="rise mt-7 max-w-[38rem] text-lg leading-[1.75] text-ink-2 md:mt-9 md:text-[1.3rem]"
              style={i(1)}
            >
              تطبيق عربي يربطك بالطبيب والصيدلية في مكان واحد: احجز موعدك، استلم وصفتك الرقمية
              <Fn n={1} />، قارن عروض الأسعار من الصيدليات القريبة
              <Fn n={2} />، وما تدفع فلس للتطبيق
              <Fn n={3} />.
            </p>

            <div className="rise mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7" style={i(2)}>
              <Link
                href="#join"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-medium text-accent-ink transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 active:translate-y-0"
              >
                سجّل للتجربة المبكرة
                <Arrow />
              </Link>
              <Link
                href="#providers"
                className="inline-flex items-center gap-2 self-start font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent sm:self-auto"
              >
                أنا طبيب أو صيدلية
                <Arrow />
              </Link>
            </div>
          </div>

          {/* phone + margin annotation */}
          <figure
            className="rise relative mx-auto w-[15rem] md:col-span-4 md:w-[16.5rem] md:justify-self-start md:pt-24"
            style={i(3)}
          >
            <figcaption className="relative mb-12 text-center font-serif text-xl leading-snug text-accent md:absolute md:top-0 md:-start-6 md:mb-0 md:w-[15rem] md:rotate-[-5deg] md:text-start md:text-2xl">
              رمز وصول من 4 أرقام، بدل الانتظار بالدور
              <svg
                aria-hidden="true"
                viewBox="0 0 80 60"
                className={`${s.arrow} absolute top-full start-1/2 mt-0.5 h-10 w-14 -translate-x-1/2 md:start-auto md:end-10 md:translate-x-0`}
              >
                <path pathLength={1} d="M40 3 C 30 18, 32 34, 40 52 M31 44 L 40 55 L 49 44" />
              </svg>
            </figcaption>
            <Phone />
          </figure>
        </div>

        {/* footnotes */}
        <ol className="rise mt-14 grid max-w-[64rem] gap-3 border-t border-line pt-5 text-sm leading-relaxed text-ink-2 md:mt-12 md:grid-cols-3 md:gap-8" style={i(4)}>
          <Note n={1}>
            الوصفة الرقمية تحمل رمز QR وتوقيع الطبيب، وتصلك داخل التطبيق فور كتابتها.
          </Note>
          <Note n={2}>
            الصيدليات القريبة ترسل عروض أسعارها على وصفتك؛ تختار أنت، ثم تستلم برمز استلام.
          </Note>
          <Note n={3}>
            لا رسوم على المريض. الطبيب والصيدلية يدفعان عمولة صغيرة على المعاملات المؤكدة بالرمز
            فقط، وأول 50 معاملة شهرياً مجانية. المختبرات قريباً.
          </Note>
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── pieces ───────────────────────── */

function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap px-[0.08em]">
      <span className="relative z-10">{children}</span>
      <svg aria-hidden="true" viewBox="0 0 200 80" preserveAspectRatio="none" className={s.loop}>
        <path
          pathLength={1}
          d="M62 12 C 110 2, 186 6, 194 36 C 200 66, 120 82, 56 74 C 10 68, -4 44, 18 26 C 30 16, 56 12, 86 10"
        />
      </svg>
    </span>
  );
}

function Fn({ n }: { n: number }) {
  return (
    <sup className="ms-0.5 text-[0.62em] leading-none">
      <a
        href={`#fn-a-${n}`}
        id={`fnref-a-${n}`}
        aria-label={`الحاشية ${n}`}
        className="tabular font-sans font-medium text-accent no-underline"
      >
        {n}
      </a>
    </sup>
  );
}

function Note({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li id={`fn-a-${n}`} className="flex gap-2.5 scroll-mt-6">
      <span className="tabular shrink-0 font-medium text-accent">{n}</span>
      <span>{children}</span>
    </li>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[1.05em] rtl:-scale-x-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Phone() {
  return (
    <div
      className={`${s.phone} relative aspect-[712/1534] overflow-hidden rounded-phone border-[7px] border-bezel bg-bezel ring-1 ring-bezel-ring`}
    >
      <span
        aria-hidden="true"
        className="absolute top-2.5 left-1/2 z-10 h-[1.35rem] w-[5.2rem] -translate-x-1/2 rounded-full bg-bezel"
      />
      <Image
        src="/img/home.webp"
        alt="شاشة التطبيق الرئيسية للمريض: الموعد القادم ورمز الوصول المكوّن من أربعة أرقام"
        width={712}
        height={1534}
        sizes="(min-width: 768px) 272px, 240px"
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/* ─────────────── signature motion: ECG out of the dot field ─────────────── */

function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");

    const GAP = 26; // dot pitch (px)
    const BAND_ROWS = 4; // rows each side of the baseline that bend
    const WAVE = 340; // length of one PQRST complex (px)
    const TAIL = 1.8; // waves of lit baseline left behind the complex
    const SPEED = 120; // px/s, right-to-left (reading direction)

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let rgb = "15,122,85";
    let last = 0;
    // the calm dots never change between resizes: rasterise them once
    let base: HTMLCanvasElement | null = null;

    const readAccent = () => {
      const hex = getComputedStyle(canvas).getPropertyValue("--accent").trim();
      const m = /^#?([0-9a-f]{6})$/i.exec(hex);
      if (m) {
        const v = parseInt(m[1], 16);
        rgb = `${(v >> 16) & 255},${(v >> 8) & 255},${v & 255}`;
      }
    };

    const baseRowOf = () => Math.round((h * 0.56) / GAP);

    const buildBase = () => {
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const baseRow = baseRowOf();
      const x0 = (w % GAP) / 2;
      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const o = off.getContext("2d");
      if (!o) return;
      o.setTransform(dpr, 0, 0, dpr, 0, 0);
      o.fillStyle = `rgba(${rgb},0.22)`;
      o.beginPath();
      for (let r = 0; r < rows; r++) {
        if (Math.abs(r - baseRow) <= BAND_ROWS) continue; // the band is drawn live
        const y = r * GAP;
        for (let c = 0; c < cols; c++) o.rect(x0 + c * GAP - 1, y - 1, 2, 2);
      }
      o.fill();
      base = off;
    };

    const resize = () => {
      const r = canvas.parentElement?.getBoundingClientRect();
      if (!r) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5); // 2px dots do not need more
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildBase();
      if (reduce.matches) draw(0, true);
    };

    // PQRST complex, u in [0,1] along the wave, returns -1..1
    const ecg = (u: number) => {
      if (u < 0 || u > 1) return 0;
      if (u < 0.2) return 0.14 * Math.sin((u / 0.2) * Math.PI); // P
      if (u < 0.3) return 0;
      if (u < 0.34) return -0.14 * ((u - 0.3) / 0.04); // Q
      if (u < 0.39) return -0.14 + 1.14 * ((u - 0.34) / 0.05); // R up
      if (u < 0.44) return 1 - 1.34 * ((u - 0.39) / 0.05); // R down to S
      if (u < 0.5) return -0.34 + 0.34 * ((u - 0.44) / 0.06); // back to baseline
      if (u < 0.56) return 0;
      if (u < 0.8) return 0.3 * Math.sin(((u - 0.56) / 0.24) * Math.PI); // T
      return 0;
    };

    const draw = (t: number, still = false) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const baseRow = baseRowOf();
      const x0 = (w % GAP) / 2;

      // trace head moves right → left and is already on screen at load;
      // the still frame parks it at ~40% width
      const span = w + WAVE * (1 + TAIL);
      const phase0 = w + WAVE * TAIL - w * 0.42;
      const head = still ? w * 0.4 : w + WAVE * TAIL - ((phase0 + (t / 1000) * SPEED) % span);

      // 1) calm dots: one cached bitmap
      if (base) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(base, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      // 2) band rows bend into the ECG trace (≈ 9 rows × columns, live)
      for (let r = baseRow - BAND_ROWS; r <= baseRow + BAND_ROWS; r++) {
        const dist = Math.abs(r - baseRow);
        const weight = 1 - dist / (BAND_ROWS + 1); // 1 at baseline → ~0.2 at the edge
        const y = r * GAP;
        const rowGlow = dist === 0 ? 1 : 0.4 * weight;
        for (let c = 0; c < cols; c++) {
          const x = x0 + c * GAP;
          const u = (x - head) / WAVE;
          let v = 0;
          let lit = 0;
          if (u >= 0 && u <= 1) {
            // inside the complex: the line is continuous, peaks glow brighter
            v = ecg(u);
            lit = 0.35 + Math.min(1, Math.abs(v) * 1.8) * 0.65;
          } else if (u > 1 && u < 1 + TAIL) {
            // the baseline it leaves behind, fading out
            lit = 0.45 * (1 - (u - 1) / TAIL);
          }
          const dy = -v * 46 * weight;
          const g = lit * rowGlow;
          const a = 0.22 + g * 0.72;
          const size = 2 + g * 1.8;
          ctx.fillStyle = `rgba(${rgb},${a.toFixed(3)})`;
          ctx.fillRect(x - size / 2, y + dy - size / 2, size, size);
        }
      }
    };

    // 30 fps is plenty for a 120 px/s trace and halves main-thread time on phones
    const loop = (t: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (t - last >= 32) {
        last = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduce.matches) {
        draw(0, true);
        return;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    readAccent();
    resize();
    start();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    const onScheme = () => {
      readAccent();
      buildBase();
      if (reduce.matches) draw(0, true);
    };
    const onReduce = () => {
      stop();
      start();
    };
    document.addEventListener("visibilitychange", onVis);
    scheme.addEventListener("change", onScheme);
    reduce.addEventListener("change", onReduce);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      scheme.removeEventListener("change", onScheme);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return <canvas ref={ref} className={s.canvas} aria-hidden="true" />;
}
