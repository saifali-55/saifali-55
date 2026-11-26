/**
 * Hero C — "Calm clinical"
 * Inspired by: Rock Health Capital (restraint, two colours), Verge (one
 * gradient word), Hub71 (three audience entry points in the hero).
 *
 * Signature motion: the digital prescription's QR draws itself, then the
 * doctor's signature is drawn and verified. CSS only. The QR is a real
 * Version-2 code for https://salamtak.tech, embedded as a module matrix.
 */

import Image from "next/image";
import Link from "next/link";
import { readex } from "@/lib/fonts";
import s from "./HeroC.module.css";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

const doors = [
  { href: "#join", t: "مريض", d: "احجز، استلم وصفتك، وقارن العروض", Icon: IconPatient },
  { href: "#providers", t: "طبيب", d: "عيادتك بلا ورق، ووصفة موقّعة بثوانٍ", Icon: IconDoctor },
  { href: "#providers", t: "صيدلية", d: "وصفات قريبة منك، وأنت تحدد السعر", Icon: IconPharmacy },
];

export default function HeroC({ showBrand = true }: { showBrand?: boolean }) {
  return (
    <section
      className={`${readex.variable} ${s.hero} relative isolate overflow-hidden text-ink`}
      aria-labelledby="hero-c-title"
    >
      <div className={`wrap relative pb-16 md:pb-20 ${showBrand ? "pt-7 md:pt-9" : "pt-4 md:pt-6"}`}>
        {/* eyebrow (hidden when the hero sits under the site header) */}
        {showBrand && (
          <div className="flex items-center justify-between text-sm text-ink-2">
            <span className="font-display text-xl font-semibold text-ink">سلامتك</span>
            <span>بغداد · تجربة مبكرة</span>
          </div>
        )}

        <div className={`grid items-center gap-14 md:grid-cols-12 md:gap-8 ${showBrand ? "mt-12 md:mt-16" : "mt-8 md:mt-12"}`}>
          {/* copy */}
          <div className="md:col-span-8">
            <h1
              id="hero-c-title"
              className="rise font-display text-[clamp(2.5rem,1.2rem+4.2vw,4.6rem)] leading-[1.14] font-semibold text-balance"
              style={i(0)}
            >
              احجز طبيبك في بغداد،
              <br />
              بخطوات <span className={s.grad}>أهدأ</span>.
            </h1>

            <p
              className="rise mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-2 md:mt-8 md:text-xl"
              style={i(1)}
            >
              من الحجز حتى استلام الدواء: رمز وصول، وصفة رقمية موقّعة، وعروض أسعار من صيدليات
              قريبة، كلها في تطبيق واحد وبلا أي رسوم على المريض.
            </p>

            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={i(2)}>
              <Link
                href="#join"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-medium text-accent-ink transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5"
              >
                سجّل للتجربة المبكرة
                <Arrow />
              </Link>
              <Link
                href="#providers"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-base font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                أنا طبيب أو صيدلية
                <Arrow />
              </Link>
            </div>

            {/* three audience entry points */}
            <nav className="rise mt-12 md:mt-14" aria-label="ابدأ حسب دورك" style={i(3)}>
              <ul className="grid gap-2.5 sm:grid-cols-3">
                {doors.map(({ href, t, d, Icon }) => (
                  <li key={t}>
                    <Link
                      href={href}
                      className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 transition-colors hover:border-accent sm:block sm:p-4"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1 sm:mt-3 sm:block">
                        <span className="flex items-center gap-1.5 font-display text-base font-semibold">
                          {t}
                          <Arrow className="size-4 text-ink-3 transition-colors group-hover:text-accent" />
                        </span>
                        <span className="block text-sm leading-snug text-ink-2">{d}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-3">
                <span className="me-1.5 inline-block size-1.5 rounded-full bg-ink-3 align-middle" aria-hidden="true" />
                المختبرات: قريباً.
              </p>
            </nav>
          </div>

          {/* single floating phone with live chips */}
          <div className="rise relative mx-auto w-[15rem] md:col-span-4 md:w-[16.5rem] md:justify-self-center" style={i(4)}>
            <div className={`${s.glow} top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2`} aria-hidden="true" />

            <div className={s.float}>
              <div
                className={`${s.phone} relative aspect-[712/1534] overflow-hidden rounded-phone border-[7px] border-bezel bg-bezel ring-1 ring-bezel-ring`}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 left-1/2 z-10 h-[1.35rem] w-[5.2rem] -translate-x-1/2 rounded-full bg-bezel"
                />
                <Image
                  src="/img/offers.webp"
                  alt="شاشة عروض الصيدليات على الوصفة: ثلاثة عروض بأسعار مختلفة والأقل سعراً مميّز"
                  width={712}
                  height={1534}
                  sizes="(min-width: 768px) 272px, 240px"
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              {/* live offer chip */}
              <div
                className={`${s.card} absolute top-[17%] -start-10 z-20 rounded-2xl bg-surface p-3.5 pe-5 ring-1 ring-line md:-start-20`}
              >
                <div className="flex items-center gap-2 text-xs text-ink-2">
                  <span className={`${s.live} size-2 rounded-full bg-accent`} aria-hidden="true" />
                  أرخص عرض على وصفتك
                </div>
                <div className="tabular mt-1 font-display text-2xl leading-none font-semibold">
                  16,000 <span className="text-sm font-medium text-ink-2">د.ع</span>
                </div>
                <div className="mt-1.5 text-xs text-ink-3">صيدلية على بُعد 1.2 كم</div>
              </div>

              {/* prescription card: QR draws itself, then the signature */}
              <div
                className={`${s.card} absolute bottom-[12%] -end-6 z-20 flex items-center gap-3 rounded-2xl bg-surface p-3 pe-4 ring-1 ring-line md:-end-16`}
              >
                <QR />
                <div>
                  <div className="text-xs text-ink-2">وصفة رقمية</div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    موقّعة من الطبيب
                    <svg aria-hidden="true" viewBox="0 0 16 16" className={`${s.tick} size-3.5 text-accent`}>
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <svg aria-hidden="true" viewBox="0 0 90 24" className={`${s.sig} mt-1 h-5 w-[5.6rem]`}>
                    <path pathLength={1} d="M3 17 C 10 4, 15 22, 23 12 S 38 3, 45 14 S 58 22, 67 8 S 80 11, 87 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── pieces ───────────────────────── */

function Arrow({ className = "size-[1.05em]" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${className} rtl:-scale-x-100`}
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

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "size-5",
};

function IconPatient() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function IconDoctor() {
  return (
    <svg {...iconProps}>
      <path d="M6 3v6a6 6 0 0 0 12 0V3" />
      <path d="M12 15v2a4 4 0 0 0 8 0v-1" />
      <circle cx="20" cy="13" r="2" />
    </svg>
  );
}

function IconPharmacy() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="9" width="18" height="12" rx="3" />
      <path d="M12 9V5M9 3h6M12 13v4M10 15h4" />
    </svg>
  );
}

/* Real QR (version 2, EC level M) for https://salamtak.tech — 25×25 modules. */
const QR_ROWS = [
  "1111111000110001001111111",
  "1000001010111111001000001",
  "1011101000001011001011101",
  "1011101001111010001011101",
  "1011101010010011101011101",
  "1000001000101111101000001",
  "1111111010101010101111111",
  "0000000001001110000000000",
  "1010101000010101100010010",
  "1011000110101100111000001",
  "1011011001001110001100111",
  "1011110100100111000100010",
  "0110101110011100111101011",
  "0010110100011000111001001",
  "1010101011011010110100111",
  "0110000011001101110010010",
  "1011111101110010111111000",
  "0000000010010000100011011",
  "1111111000100101101011011",
  "1000001001010000100011000",
  "1011101011101000111111011",
  "1011101000011100000111100",
  "1011101011011011000010001",
  "1000001000001111110011010",
  "1111111011110011111100011",
];

const QR_N = QR_ROWS.length;
const QR_Q = 1; // quiet zone (modules)
// group modules into diagonal bands (r + c) so the code "draws" corner to corner
const QR_BANDS: string[] = Array.from({ length: QR_N * 2 - 1 }, () => "");
for (let r = 0; r < QR_N; r++) {
  for (let c = 0; c < QR_N; c++) {
    if (QR_ROWS[r][c] === "1") QR_BANDS[r + c] += `M${c + QR_Q} ${r + QR_Q}h1v1h-1z`;
  }
}

function QR() {
  const size = QR_N + QR_Q * 2;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={`${s.qr} size-[4.25rem] shrink-0 rounded-md bg-white p-0.5 text-[#15201b]`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="رمز QR لوصفة رقمية، يشير إلى salamtak.tech"
    >
      {QR_BANDS.map((d, k) =>
        d ? <path key={k} d={d} fill="currentColor" style={{ "--k": k } as React.CSSProperties} /> : null,
      )}
    </svg>
  );
}
