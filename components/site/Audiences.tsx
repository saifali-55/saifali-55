import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    t: "المريض",
    img: "/img/home.webp",
    alt: "شاشة المريض الرئيسية: الموعد القادم ورمز الوصول",
    points: [
      "حجز الطبيب من التطبيق",
      "رمز وصول من 4 أرقام بدل الانتظار بالدور",
      "وصفة رقمية تصلك فور كتابتها",
      "مقارنة عروض الصيدليات القريبة والاختيار بنفسك",
    ],
    note: "لا تدفع للتطبيق شيئاً: 0 د.ع.",
    cta: { href: "#join", t: "سجّل كمريض" },
  },
  {
    t: "الطبيب",
    img: "/img/dhome.webp",
    alt: "شاشة الطبيب: مواعيد اليوم وتأكيد الوصول بالرمز",
    points: [
      "جدول مواعيد اليوم في مكان واحد",
      "تأكيد وصول المريض بالرمز",
      "وصفة رقمية موقّعة بثوانٍ",
      "بلا ورق، وبلا مكالمات لتأكيد المواعيد",
    ],
    note: "5% على المعاملات المؤكدة فقط.",
    cta: { href: "#providers", t: "التفاصيل للأطباء" },
  },
  {
    t: "الصيدلية",
    img: "/img/phhome.webp",
    alt: "شاشة الصيدلية: وصفات قريبة وإرسال عرض سعر",
    points: [
      "وصفات قريبة منك فور كتابتها",
      "ترسل عرض السعر بضغطة",
      "المريض يختار، وأنت تسلّم برمز الاستلام",
      "أول 50 معاملة مؤكدة كل شهر مجانية",
    ],
    note: "3% على المعاملات المؤكدة فقط.",
    cta: { href: "#providers", t: "التفاصيل للصيدليات" },
  },
];

export default function Audiences() {
  return (
    <section
      id="audiences"
      className="scroll-mt-20 border-t border-line bg-surface-2/50 py-16 md:py-24"
      aria-labelledby="audiences-title"
    >
      <div className="wrap">
        <SectionHeading
          id="audiences-title"
          eyebrow="لمن"
          title="تطبيق واحد، ثلاثة أطراف"
          lead="المريض يحجز ويقارن، الطبيب يكتب الوصفة، والصيدلية تتنافس على تنفيذها. المختبرات تلحق قريباً."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {groups.map((g) => (
            <li key={g.t} className="flex flex-col overflow-hidden rounded-card border border-line bg-surface">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-bg">
                <Image
                  src={g.img}
                  alt={g.alt}
                  width={712}
                  height={1534}
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="absolute inset-x-[14%] top-[6%] w-[72%] rounded-t-[1.6rem] border-[5px] border-b-0 border-bezel bg-bezel object-cover object-top shadow-xl"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="font-display text-xl font-semibold">{g.t}</h3>
                <ul className="mt-3 space-y-2 text-ink-2">
                  {g.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-medium text-ink">{g.note}</p>
                <Link href={g.cta.href} className="mt-auto inline-flex items-center gap-1.5 pt-5 font-medium text-accent">
                  {g.cta.t}
                  <Arrow />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-center gap-2 text-sm text-ink-2">
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">قريباً</span>
          المختبرات: طلب التحاليل من الطبيب، وإرجاع النتائج إلى ملف المريض، بنفس الرمز ونفس الشروط.
        </p>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 rtl:-scale-x-100"
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
