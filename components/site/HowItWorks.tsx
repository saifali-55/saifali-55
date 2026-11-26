import SectionHeading from "./SectionHeading";

// A real sequence, so the numbering carries information.
const steps = [
  {
    t: "احجز موعدك",
    d: "اختر التخصص والطبيب والوقت من التطبيق، بلا اتصالات ولا انتظار على الخط.",
  },
  {
    t: "رمز الوصول",
    d: "يصلك رمز من 4 أرقام. تعطيه للاستقبال عند وصولك فيُؤكَّد موعدك بلا دور ولا ورق.",
  },
  {
    t: "الوصفة الرقمية",
    d: "الطبيب يكتب الوصفة في التطبيق، موقّعة وبرمز QR، وتصلك في ثوانٍ.",
  },
  {
    t: "عروض الصيدليات",
    d: "الصيدليات القريبة ترسل أسعارها على وصفتك. تختار العرض الأنسب وتستلم برمز الاستلام.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-16 md:py-24" aria-labelledby="how-title">
      <div className="wrap">
        <SectionHeading
          id="how-title"
          eyebrow="كيف يشتغل"
          title="من الحجز حتى الدواء، بأربع خطوات"
          lead="كل خطوة تُؤكَّد برمز، فلا تضيع مواعيد ولا تُحتسب عمولة على شيء لم يحصل."
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map((s, k) => (
            <li key={s.t} className="border-t border-line-strong pt-5">
              <span className="tabular font-display text-4xl leading-none font-semibold text-accent">
                {k + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
