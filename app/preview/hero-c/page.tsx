import type { Metadata } from "next";
import HeroC from "@/components/hero/HeroC";
import PreviewShell from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Hero C — سريري هادئ",
  robots: { index: false, follow: false },
};

export default function HeroCPreview() {
  return (
    <main>
      <PreviewShell>
        <HeroC />
      </PreviewShell>
    </main>
  );
}
