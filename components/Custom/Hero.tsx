import { Camera, CheckCircle } from "lucide-react";
import Google from "@/components/Custom/Icons/Google";
import Login from "@/components/Custom/Login";


const HeroSection = () => {
  return (
    <section className="w-full flex justify-center items-center bg-black text-white">
      <div className="container sm:my-24 flex flex-col sm:flex-row items-center justify-start sm:justify-between space-y-4 w-full">
        <div className="space-y-2 max-w-full mx-auto text-center sm:text-left">
          <h1 className="font-bold tracking-tighter text-4xl md:text-8xl">
            Transform Your Yard
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Snap a photo, and watch as AI reimagines your outdoor space into a stunning landscape.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle className="text-green-500" />
            Trusted by 10,000+ homeowners
          </div>
        </div>
        <Login />
      </div>
    </section>
  );
}

export default HeroSection;