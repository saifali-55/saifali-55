import Link from "next/link";

const nav = [
  { href: "#how", t: "كيف يشتغل" },
  { href: "#audiences", t: "لمن" },
  { href: "#providers", t: "للأطباء والصيدليات" },
  { href: "#faq", t: "الأسئلة" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-semibold text-ink">
          سلامتك
          <span className="ms-2 text-sm font-normal text-ink-3">بغداد</span>
        </Link>

        <nav aria-label="أقسام الصفحة" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-ink-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-ink">
                  {n.t}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#join"
          className="inline-flex h-10 shrink-0 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
        >
          سجّل للتجربة المبكرة
        </Link>
      </div>
    </header>
  );
}
