"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { styles } from "@/libs/styles";
import OptionalFeatures from "@/components/Custom/Dashboard/OptionalFeatures";
import Preview from "@/components/Custom/Dashboard/Preview";
import TimeOfDay from "@/components/Custom/Dashboard/TimeOfDay";
import Creativity from "./Creativity";

type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";

const numberToTimeOfDay = (num: number): TimeOfDay => {
  if (num === 0) return "Morning";
  if (num === 33) return "Afternoon";
  if (num === 66) return "Evening";
  return "Night";
}

const interrogateImage = async (image: string | ArrayBuffer) => {
  const response = await fetch('/api/main/interrogate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: image }),
  });
  const data = await response.json();
  return data.caption;
}

const handleChat = async (msg: string) => {
  const messages = [{
    role: "system",
    content: `You are a helpful assistant that is an expert in image generation. You will be given a prompt that is going to be fed into an img2img model along with a style.`
      + `Please make modifications to the prompt to incorporate the style.  You can modify key components, but do not remove key structures.`
      + `Ex: Changing a fence color is ok, removing the fence is not.`
      + `The goal is to get a prompt that can be passed to an img2img model that will generate a high quality professionally landscaped yard image scene, add any additional details that you believe will help with that goal while maintaining the style and key components.`
      + `Important: Don't say like "change X to Y", just say the desired outcome. Ex: "I want a stone patio" instead of "change the gravel to stone"`
      + `You can remove things like "The image shows..." or "The photo is a..." if it's not relevant to the prompt.`
  }, {
    role: "user",
    content: `${msg}`
  }];

  const response = await fetch('/api/main/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: messages }),
  });

  const data = await response.json();
  return data.response;
}

const DashboardPanel = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [caption, setCaption] = React.useState("");
  // const [caption, setCaption] = React.useState("The image shows a large grassy area with a few palm trees scattered throughout. The grass is neatly trimmed and appears to be well-maintained. There is a wooden fence on the left side of the image and a small shed on the right side. The sky is blue and there are a few clouds in the distance. The image appears to have been taken from a distance, looking towards the backyard.");
  const [style, setStyle] = React.useState<keyof typeof styles | null>(null);
  const [outputImage, setOutputImage] = React.useState(null);
  const [optionalFeatures, setOptionalFeatures] = React.useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = React.useState(0);
  const [creativity, setCreativity] = React.useState(50);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedImage(reader.result);
        setOutputImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (style && selectedImage && !isLoading) {
      setIsLoading(true);
      let captionRes = null;
      try {
        console.log("Interrogating image");
        setIsLoading(true);
        captionRes = await interrogateImage(selectedImage);
        setCaption(captionRes);
      } catch (error) {
        console.error('Error processing image:', error);
        setIsLoading(false);
        return;
      }
      try {
        const prompt = await handleChat(
          `I want to create a ${style} landscape, which can be described as ${styles[style].join(", ")}. `
          + `Additionally, I want to add the following features: ${optionalFeatures.join(", ")}. `
          + `The time of day should be ${numberToTimeOfDay(timeOfDay)}. `
          + `Please modify this prompt: ${caption}`);
        console.log(prompt);
        console.log("Starting generation");
        const response = await fetch('/api/main/generate/replicate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt:
              "Keep the proportions of the yard unchanged. "
              + "Try to keep the shape of the yard as close to the original as possible."
              + prompt,
            image: selectedImage
          }),
        });

        const data = await response.json();
        // setResponseId(data.id);
        setOutputImage(data.image);
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="w-full flex-col-reverse sm:flex-row flex-grow flex text-white">
      <div className="w-full sm:w-1/4 bg-black p-4 flex flex-col gap-4 shrink-0 grow-0">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <label className="label uppercase font-bold">Upload Image</label>
          <input
            type="file"
            className="file-input w-full max-w-xs animated-gradient-background"
            onChange={handleImageChange}
          />
          <div className="flex flex-col gap-2">
            <div className="dropdown text-black">
              <label className="label">Select Style</label>
              <div tabIndex={0} role="button" className="btn btn-neutral m-1 flex justify-between w-full text-white">
                {style ? style : "Select Style"}
                <ChevronDown className="w-4 h-4" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full text-white">
                {Object.keys(styles).map((style) => (
                  <li key={style}>
                    <a onClick={() => {
                      setStyle(style as keyof typeof styles);
                      (document.activeElement as HTMLElement).blur();
                    }}>{style}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <OptionalFeatures optionalFeatures={optionalFeatures} setOptionalFeatures={setOptionalFeatures} />
          <TimeOfDay timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} />
          <Creativity creativity={creativity} setCreativity={setCreativity} />
        </div>
        <div className="flex justify-center">
          {isLoading ? <div className="loading loading-spinner loading-md" /> : <button
            className="btn w-full animated-gradient-background border-none"
            onClick={handleGenerate}
          >Generate</button>}
        </div>
      </div>
      {/* Preview */}
      <Preview selectedImage={selectedImage} outputImage={outputImage} />
    </div>
  );
}

export default DashboardPanel;
