import { Camera, Sparkles } from "lucide-react";
import Arrow from "@/components/Custom/Icons/Arrow";

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-base-200 flex justify-center items-center bg-black text-white h-[75vh] border">
      <div className="container px-4 md:px-6 flex justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-2xl">
            <Camera className="w-6 h-6" />
            Snap a Photo
          </div>
          <div className="h-[30vh] w-[50vh] border border-white rounded-xl">
            image_placeholder
          </div>
        </div>
        <Arrow extraStyle="w-12 -rotate-90 -scale-x-100" />
        <div className="flex flex-col items-center gap-2 text-2xl">
          AI Magic
          <div className="h-[30vh] w-[20vh] border">
            placeholder
          </div>
        </div>
        <Arrow extraStyle="w-12 -rotate-90" />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6" />
            Stunning Results
          </div>
          <div className="h-[30vh] w-[50vh] border border-white rounded-xl">
            image_placeholder
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;