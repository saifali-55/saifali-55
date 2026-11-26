import type { Metadata } from "next";
import HeroB from "@/components/hero/HeroB";
import PreviewShell from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Hero B — منتج جريء",
  robots: { index: false, follow: false },
};

export default function HeroBPreview() {
  return (
    <main>
      <PreviewShell>
        <HeroB />
      </PreviewShell>
    </main>
  );
}
