import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "مفاهيم الواجهة الرئيسية",
  robots: { index: false, follow: false },
};

const concepts = [
  { href: "/preview/hero-a", code: "A", name: "ورقي تحريري", en: "Editorial paper" },
  { href: "/preview/hero-b", code: "B", name: "منتج جريء", en: "Bold product" },
  { href: "/preview/hero-c", code: "C", name: "سريري هادئ", en: "Calm clinical", pick: true },
];

export default function PreviewIndex() {
  return (
    <main className="wrap py-16">
      <p className="text-sm text-ink-2">سلامتك · معاينة مفاهيم الواجهة الرئيسية</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">ثلاثة اتجاهات للقسم الأول</h1>
      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {concepts.map((c) => (
          <li key={c.code}>
            <Link
              href={c.href}
              className="block rounded-card border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <span className="flex items-center gap-2 text-xs text-ink-3">
                Hero {c.code}
                {c.pick && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-semibold text-accent">التوصية</span>
                )}
              </span>
              <span className="mt-1 block font-display text-lg font-semibold">{c.name}</span>
              <span className="block text-sm text-ink-2">{c.en}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink-2">
        <Link href="/" className="font-medium text-accent">
          الموقع الكامل
        </Link>{" "}
        يستخدم المفهوم C.
      </p>
    </main>
  );
}
