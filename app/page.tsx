import Link from "next/link";

const concepts = [
  { href: "/preview/hero-a", code: "A", name: "ورقي تحريري", en: "Editorial paper" },
  { href: "/preview/hero-b", code: "B", name: "منتج جريء", en: "Bold product" },
  { href: "/preview/hero-c", code: "C", name: "سريري هادئ", en: "Calm clinical" },
];

export default function Home() {
  return (
    <main className="wrap py-16">
      <p className="text-sm text-ink-2">سلامتك · معاينة مفاهيم الواجهة الرئيسية</p>
      <h1 className="mt-2 text-3xl font-semibold">ثلاثة اتجاهات للقسم الأول</h1>
      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {concepts.map((c) => (
          <li key={c.code}>
            <Link
              href={c.href}
              className="block rounded-card border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <span className="block text-xs text-ink-3">Hero {c.code}</span>
              <span className="mt-1 block text-lg font-medium">{c.name}</span>
              <span className="block text-sm text-ink-2">{c.en}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
