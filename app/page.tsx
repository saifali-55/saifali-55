import HeroC from "@/components/hero/HeroC";
import Audiences from "@/components/site/Audiences";
import Faq from "@/components/site/Faq";
import HowItWorks from "@/components/site/HowItWorks";
import Join from "@/components/site/Join";
import Providers from "@/components/site/Providers";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroC showBrand={false} />
        <HowItWorks />
        <Audiences />
        <Providers />
        <Faq />
        <Join />
      </main>
      <SiteFooter />
    </>
  );
}
