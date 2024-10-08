import { Camera, CheckCircle } from "lucide-react";
import Google from "@/components/Custom/Icons/Google";
const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="relative flex items-center justify-between space-y-4 z-[10] w-full">
            <div className="space-y-2 max-w-full mr-6">
              <h1 className="font-bold tracking-tighter text-8xl">
                Transform Your Yard
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Snap a photo, and watch as AI reimagines your outdoor space into a stunning landscape.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="text-green-500" />
                <span>Trusted by 10,000+ homeowners</span>
              </div>
            </div>
            <div className="relative">
              <h2 className="absolute text-xl font-bold bg-black left-[5%] px-2">Get Started</h2>
              <div className="flex flex-col gap-2 bg-black rounded-lg text-white border-2 p-4 my-3">
                <input className="p-2 rounded-md input text-black w-72" placeholder="Type your email..." />
                <button className="btn btn-md border-none animated-gradient-background">
                  Create My Yard
                  <Camera className="ml-2 h-4 w-4" />
                </button>
                <div className="divider before:content-white after:content-white">or</div>
                <button className="btn btn-md">
                  <Google className="ml-2 h-4 w-4" />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;