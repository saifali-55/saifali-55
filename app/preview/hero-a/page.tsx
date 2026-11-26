import type { Metadata } from "next";
import HeroA from "@/components/hero/HeroA";
import PreviewShell from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Hero A — ورقي تحريري",
  robots: { index: false, follow: false },
};

export default function HeroAPreview() {
  return (
    <main>
      <PreviewShell>
        <HeroA />
      </PreviewShell>
    </main>
  );
}
