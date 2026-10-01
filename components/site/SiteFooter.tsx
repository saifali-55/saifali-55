import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <div className="wrap flex flex-col gap-6 text-sm text-ink-2 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[34rem]">
          <p className="font-display text-lg font-semibold text-ink">سلامتك</p>
          <p className="mt-1.5 leading-relaxed">
            تطبيق عربي لحجز الأطباء ومقارنة عروض الصيدليات في بغداد. المختبرات قريباً. نحن في مرحلة
            ما قبل الإطلاق.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link href="#how" className="hover:text-ink">كيف يشتغل</Link></li>
          <li><Link href="#providers" className="hover:text-ink">للأطباء والصيدليات</Link></li>
          <li><Link href="#faq" className="hover:text-ink">الأسئلة</Link></li>
          <li><Link href="#join" className="hover:text-ink">التجربة المبكرة</Link></li>
          <li><Link href="/preview" className="hover:text-ink">مفاهيم الواجهة</Link></li>
        </ul>
      </div>
      <div className="wrap mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-3">
        <span>© 2026 سلامتك · بغداد</span>
        <span dir="ltr">salamtak.tech</span>
      </div>
    </footer>
  );
}
