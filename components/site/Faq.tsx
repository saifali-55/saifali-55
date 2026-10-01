import SectionHeading from "./SectionHeading";

const faqs = [
  {
    q: "هل التطبيق متاح الآن؟",
    a: "لا. نحن في مرحلة ما قبل الإطلاق في بغداد. سجّل للتجربة المبكرة وسنتواصل معك عندما يُفتح التسجيل تدريجياً في منطقتك.",
  },
  {
    q: "كم يدفع المريض؟",
    a: "لا شيء للتطبيق. تدفع ثمن الدواء للصيدلية مباشرة عند الاستلام، ولا توجد أي رسوم أو عمولة على المريض.",
  },
  {
    q: "ما هو رمز الوصول؟",
    a: "رمز من 4 أرقام تستلمه عند الحجز وتعطيه للاستقبال عند وصولك. به يُؤكَّد الموعد، ولا تُحسب عمولة الطبيب إلا بعده.",
  },
  {
    q: "كيف تُختار الصيدلية؟",
    a: "الصيدليات القريبة ترسل عروض أسعارها على وصفتك. تقارن السعر والمسافة وتوفّر الأدوية، وتختار بنفسك، ثم تستلم برمز الاستلام.",
  },
  {
    q: "هل الوصفة الرقمية موثوقة؟",
    a: "تحمل توقيع الطبيب ورمز QR، وتتحقق منها الصيدلية داخل التطبيق قبل التسليم.",
  },
  {
    q: "ماذا عن خصوصية بياناتي؟",
    a: "بيانات المرضى مشفّرة على مستوى الحقول، ولا يصل أي طرف إلا إلى ما يحتاجه لإتمام الخدمة: الصيدلية ترى الوصفة، لا ملفك الطبي.",
  },
  {
    q: "والمختبرات؟",
    a: "قريباً. الطبيب يطلب التحليل من التطبيق، والمختبر يرجع النتيجة إلى ملف المريض، بنفس آلية الرمز ونفس الشروط.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-line py-16 md:py-24"
      aria-labelledby="faq-title"
    >
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionHeading id="faq-title" eyebrow="الأسئلة الشائعة" title="أسئلة تجينا كثير" />
        </div>
        <div className="md:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-t border-line py-4 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 text-ink-3 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
