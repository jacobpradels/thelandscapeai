import HeroSection from "@/components/Custom/Hero";
import Header from "@/components/Custom/Header";
import FeaturesSection from "@/components/Custom/Features";
import Footer from "@/components/Custom/Footer";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Custom/Gallery";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center w-full">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
        <Gallery />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
