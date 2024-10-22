import Image from "next/image";
import Arrow from "@/components/Custom/Icons/Arrow";

const imagePrefix = process.env.NODE_ENV === "development" ? "/images" : "https://thelandscapeai-photos.s3.us-east-2.amazonaws.com"

const FeaturesSection = () => {
  return (
    <div
      id="features"
      className="
        w-full bg-base-200 flex justify-center
        items-center bg-black text-white min-h-[75vh]
        py-12 px-2
      "
    >
      <div className="h-full w-full flex flex-col items-center justify-center">
        <span className="text-center text-4xl mb-4 leading-relaxed md:leading-normal">
          Reimagine your yard in <span className="animated-gradient-background font-extrabold p-1">seconds</span>
        </span>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-video rounded-xl overflow-hidden">
              <Image src={`${imagePrefix}/home.jpg`} alt="Placeholder" width={500} height={300} objectFit="cover" />
            </div>
          </div>
          <Arrow extraStyle="stroke-white fill-white h-12 w-12 md:-rotate-90 -scale-x-100" />
          <div className="h-[600px] w-[400px] rounded-xl flex flex-col items-center justify-center gap-0 sm:-gap-8">
            <div className="w-full rounded-md -rotate-6 z-10 overflow-hidden">
              <Image
                src={`${imagePrefix}/english-cottage.jpeg`}
                alt="English Cottage"
                width={500}
                height={300}
                className="-translate-y-10"
              />
            </div>
            <div className="w-full rounded-md overflow-hidden z-20">
              <Image
                src={`${imagePrefix}/home-after.jpeg`}
                alt="Home After"
                width={500}
                height={300}
                className="-translate-y-10"
              />
            </div>
            <div className="w-full object-fit overflow-hidden rounded-md -rotate-6 md:rotate-6 z-30">
              <Image
                src={`${imagePrefix}/mediterannean.jpeg`}
                alt="Mediterannean"
                width={500}
                height={300}
                className="-translate-y-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;