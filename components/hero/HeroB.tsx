/**
 * Hero B — "Bold product"
 * Inspired by: BECO Capital (full-bleed colour, oversized type), Antler (big
 * stats separated by rules), Everywhere Ventures (two-line headline, index
 * labels).
 *
 * Signature motion: a heartbeat ripple radiating from behind the three fanned
 * phones, with the headline's full stop beating in time. Pure CSS.
 */

import Image from "next/image";
import Link from "next/link";
import { readex } from "@/lib/fonts";
import s from "./HeroB.module.css";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

// Only facts about the product. Never traction.
const stats = [
  { k: "01", v: "0", unit: "د.ع", l: "ما يدفعه المريض للتطبيق" },
  { k: "02", v: "3", l: "أطراف في تطبيق واحد: مريض، طبيب، صيدلية" },
  { k: "03", v: "4", l: "أرقام في رمز الوصول الذي تعطيه للاستقبال" },
  { k: "04", v: "50", l: "معاملة مؤكدة مجاناً كل شهر لمقدّمي الخدمة" },
];

export default function HeroB() {
  return (
    <section
      className={`${readex.variable} ${s.hero} relative isolate overflow-hidden`}
      aria-labelledby="hero-b-title"
    >
      <div className={s.ripple} aria-hidden="true">
        <span className={s.ring} />
        <span className={s.ring} />
      </div>

      <div className="wrap relative pt-6 pb-12 md:pt-8 md:pb-14">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-bold">سلامتك</span>
          <span className="rounded-full border border-(--block-line) px-3.5 py-1 text-xs text-(--block-ink-2) md:text-sm">
            بغداد · تجربة مبكرة
          </span>
        </div>

        {/* oversized two-line headline */}
        <h1
          id="hero-b-title"
          className="rise mt-9 font-display text-[clamp(2.6rem,1rem+5.8vw,5.4rem)] leading-[1.1] font-bold md:mt-12"
          style={i(0)}
        >
          <span className="block">
            احجز طبيبك في بغداد
            <span className={s.beat} aria-hidden="true">
              .
            </span>
          </span>
          <span className="block text-(--block-hi)">وصفتك بسعر تختاره أنت.</span>
        </h1>

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:items-end md:gap-8">
          {/* lead, CTAs, index-table stats */}
          <div className="md:col-span-7">
            <p
              className="rise max-w-[36rem] text-lg leading-relaxed text-(--block-ink-2) md:text-xl"
              style={i(1)}
            >
              منصة واحدة للمريض والطبيب والصيدلية: حجز، رمز وصول، وصفة رقمية، وعروض أسعار من
              الصيدليات القريبة، والمريض ما يدفع فلس للتطبيق.
            </p>

            <div className="rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" style={i(2)}>
              <Link
                href="#join"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-(--block-ink) px-7 text-base font-semibold text-(--block) transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
              >
                سجّل للتجربة المبكرة
                <Arrow />
              </Link>
              <Link
                href="#providers"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-(--block-line) px-6 text-base font-medium text-(--block-ink) transition-colors hover:bg-white/10"
              >
                أنا طبيب أو صيدلية
                <Arrow />
              </Link>
            </div>

            <ul
              className="rise mt-10 grid grid-cols-2 border-t border-(--block-line) md:grid-cols-4"
              style={i(3)}
              aria-label="حقائق عن سلامتك"
            >
              {stats.map((st) => (
                <li
                  key={st.k}
                  className="border-(--block-line) py-5 pe-3 even:border-s even:ps-4 nth-[n+3]:border-t md:border-s md:ps-5 md:first:border-s-0 md:first:ps-0 md:nth-[n+3]:border-t-0"
                >
                  <span className="tabular block font-display text-xs font-medium tracking-[0.12em] text-(--block-hi)">
                    {st.k}
                  </span>
                  <span className="tabular mt-1.5 block font-display text-4xl leading-none font-bold md:text-5xl">
                    {st.v}
                    {st.unit && (
                      <span className="ms-1.5 text-base font-medium text-(--block-ink-2)">{st.unit}</span>
                    )}
                  </span>
                  <span className="mt-2.5 block text-sm leading-snug text-(--block-ink-2)">{st.l}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* three fanned phones */}
          <div
            className="rise relative mx-auto h-[19rem] w-full max-w-[24rem] md:col-span-5 md:h-[26.5rem] md:max-w-none"
            style={i(4)}
          >
            <Phone
              src="/img/dhome.webp"
              alt="شاشة الطبيب: مواعيد اليوم ورمز وصول المريض المؤكد"
              className="bottom-0 left-1/2 w-[9rem] -translate-x-[118%] rotate-[-11deg] md:w-[11.5rem]"
            />
            <Phone
              src="/img/home.webp"
              alt="شاشة المريض الرئيسية: الموعد القادم ورمز الوصول"
              className="bottom-0 left-1/2 w-[9rem] translate-x-[18%] rotate-[11deg] md:w-[11.5rem]"
            />
            <Phone
              src="/img/offers.webp"
              alt="شاشة عروض الصيدليات على الوصفة مع الأسعار"
              className="bottom-[-0.5rem] left-1/2 z-10 w-[10.5rem] -translate-x-1/2 md:w-[13rem]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── pieces ───────────────────────── */

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[1.05em] rtl:-scale-x-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Phone({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`${s.phone} absolute aspect-[712/1534] origin-bottom overflow-hidden rounded-[2rem] border-[5px] border-bezel bg-bezel md:rounded-[2.4rem] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute top-2 left-1/2 z-10 h-[1rem] w-[3.6rem] -translate-x-1/2 rounded-full bg-bezel"
      />
      <Image
        src={src}
        alt={alt}
        width={712}
        height={1534}
        sizes="(min-width: 768px) 208px, 168px"
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
