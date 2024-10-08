import HeroSection from "@/components/Custom/Hero";
import Header from "@/components/Custom/Header";
import FeaturesSection from "@/components/Custom/Features";
import ExamplesSection from "@/components/Custom/Examples";
import Footer from "@/components/Custom/Footer";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center w-full">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
        <ExamplesSection />
        <FAQ />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
