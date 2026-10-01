import type { Metadata, Viewport } from "next";
import { plex, readex } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://salamtak.tech"),
  title: {
    default: "سلامتك — احجز طبيبك في بغداد",
    template: "%s · سلامتك",
  },
  description:
    "سلامتك تطبيق عربي يربط المريض بالطبيب والصيدلية في بغداد: حجز، رمز وصول، وصفة رقمية، وعروض أسعار من الصيدليات القريبة.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1411" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${plex.variable} ${readex.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
