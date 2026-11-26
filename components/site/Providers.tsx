import Link from "next/link";
import SectionHeading from "./SectionHeading";

const fees = [
  { who: "المريض", fee: "0 د.ع", when: "لا رسوم أبداً. يدفع ثمن الدواء للصيدلية مباشرة." },
  { who: "الطبيب", fee: "5%", when: "عند تأكيد وصول المريض برمز الوصول." },
  { who: "الصيدلية", fee: "3%", when: "عند تسليم الدواء برمز الاستلام." },
  { who: "المختبر", fee: "3%", when: "عند تأكيد الطلب بالرمز. قريباً." },
];

export default function Providers() {
  return (
    <section id="providers" className="scroll-mt-20 py-16 md:py-24" aria-labelledby="providers-title">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <SectionHeading
            id="providers-title"
            eyebrow="للأطباء والصيدليات"
            title="بلا اشتراك. العمولة فقط على المعاملة المؤكدة بالرمز."
            lead="ما ينضاف لك مريض بالتطبيق ما تدفع شيئاً. تنحسب العمولة بس لمّن يوصل المريض ويعطي الرمز، أو لمّن تسلّم الدواء بالرمز."
          />
          <ul className="mt-8 space-y-3 text-ink-2">
            <li className="flex gap-2.5">
              <Check />
              <span>أول 50 معاملة مؤكدة كل شهر مجانية، لكل طبيب ولكل صيدلية.</span>
            </li>
            <li className="flex gap-2.5">
              <Check />
              <span>لا رسوم اشتراك ولا رسوم إدراج، ولا التزام بمدة.</span>
            </li>
            <li className="flex gap-2.5">
              <Check />
              <span>الوصفة الرقمية موقّعة وبرمز QR، تتحقق منها الصيدلية داخل التطبيق.</span>
            </li>
          </ul>
          <Link
            href="#join"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            سجّل عيادتك أو صيدليتك
          </Link>
        </div>

        <div id="pricing" className="scroll-mt-20 md:col-span-7">
          <table className="w-full border-collapse text-start">
            <caption className="mb-3 text-start text-sm text-ink-3">الرسوم، على المعاملات المؤكدة بالرمز فقط</caption>
            <thead>
              <tr className="border-b border-line-strong text-sm text-ink-3">
                <th scope="col" className="py-2 pe-3 text-start font-medium">الطرف</th>
                <th scope="col" className="py-2 pe-3 text-start font-medium">العمولة</th>
                <th scope="col" className="py-2 text-start font-medium">متى تُحسب</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f.who} className="border-b border-line align-top">
                  <th scope="row" className="py-4 pe-3 text-start font-display text-base font-semibold">
                    {f.who}
                  </th>
                  <td className="tabular py-4 pe-3 font-display text-2xl leading-none font-semibold text-accent md:text-3xl">
                    {f.fee}
                  </td>
                  <td className="py-4 text-ink-2">{f.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-1 size-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
