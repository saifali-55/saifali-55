/**
 * Review scaffold for the /preview/* routes.
 * Renders the hero, then the two anchor targets the hero CTAs point at, so
 * reviewers can tab through and land somewhere real. Not part of the hero.
 */
export default function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <section id="join" className="wrap scroll-mt-8 py-16" aria-labelledby="join-title">
        <h2 id="join-title" className="text-2xl font-semibold">
          التجربة المبكرة
        </h2>
        <p className="mt-3 max-w-prose text-ink-2">
          نفتح التسجيل تدريجياً في بغداد. سجّل بريدك أو رقمك وسنتواصل معك عندما يحين دورك.
        </p>
      </section>
      <section
        id="providers"
        className="wrap scroll-mt-8 border-t border-line py-16"
        aria-labelledby="providers-title"
      >
        <h2 id="providers-title" className="text-2xl font-semibold">
          للأطباء والصيدليات
        </h2>
        <p className="mt-3 max-w-prose text-ink-2">
          لا توجد رسوم اشتراك. عمولة 5% على الطبيب و3% على الصيدلية، وفقط على المعاملات المؤكدة
          بالرمز. أول 50 معاملة شهرياً مجانية. المختبرات قريباً.
        </p>
      </section>
    </>
  );
}
