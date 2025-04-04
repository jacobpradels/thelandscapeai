"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { styles } from "@/libs/styles";
import OptionalFeatures from "@/components/Custom/Dashboard/OptionalFeatures";
import Preview from "@/components/Custom/Dashboard/Preview";
import Creativity from "./Creativity";
import ProcessMode from "./ProcessMode";
import BuyCreditsModal from "./BuyCreditsModal";

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
      + `Please make modifications to the prompt to incorporate the style. You can modify key components, but do not remove key structures.`
      + `Ex: Changing a wall color is ok, removing a wall is not.`
      + `The goal is to get a prompt that can be passed to an img2img model that will generate a high quality professionally designed space image scene, add any additional details that you believe will help with that goal while maintaining the style and key components.`
      + `Important: Don't say like "change X to Y", just say the desired outcome. Ex: "I want a marble countertop" instead of "change the granite to marble"`
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

const DashboardPanel = ({ user_id, credits, is_premium }: { user_id: string, credits: number, is_premium: boolean }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [caption, setCaption] = React.useState("");
  const [style, setStyle] = React.useState<keyof typeof styles | null>(Array.from(Object.keys(styles))[0] as keyof typeof styles);
  const [outputImage, setOutputImage] = React.useState(null);
  const [optionalFeatures, setOptionalFeatures] = React.useState<string[]>([]);
  const [creativity, setCreativity] = React.useState(50);
  const [processMode, setProcessMode] = React.useState("Depth");

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

  const controlTypeFromProcessMode = (mode: string) => {
    switch (mode) {
      case "Hard Edge":
        return "canny";
      case "Soft Edge":
        return "soft_edge";
      case "Depth":
        return "depth";
      default:
        return "canny";
    }
  }

  const handleGenerate = async () => {
    if (credits <= 0) {
      (document.getElementById('my_modal_1') as HTMLDialogElement).showModal();
      return;
    }
    if (style && selectedImage && !isLoading) {
      setIsLoading(true);
      let captionRes = null;
      try {
        console.log("Interrogating image");
        setIsLoading(true);
        captionRes = await interrogateImage(selectedImage);
        console.log("Finished Interrogating");
        setCaption(captionRes);
      } catch (error) {
        console.error('Error processing image:', error);
        setIsLoading(false);
        return;
      }
      try {
        const prompt = await handleChat(
          style !== "None" ? `I want to create a ${style} space, which can be described as ${styles[style].join(", ")}. ` : "I want to create a space. "
            + `Additionally, I want to add the following features: ${optionalFeatures.join(", ")}. `
            + `Please modify this prompt: ${caption}`);
        console.log("Starting generation");
        const response = await fetch('/api/main/generate/replicate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt:
              "Keep the proportions of the space unchanged. "
              + "Try to keep the shape and layout as close to the original as possible."
              + prompt,
            image: selectedImage,
            creativity: creativity,
            control_type: controlTypeFromProcessMode(processMode),
            user_id: user_id,
            metadata: {
              "style": style,
              "optionalFeatures": JSON.stringify(optionalFeatures),
              "processMode": processMode,
              "creativity": creativity.toString(),
            },
            is_premium: is_premium,
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

  if (!user_id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex-col-reverse sm:flex-row flex-grow flex text-white">
      <BuyCreditsModal />
      <div className="w-full sm:w-1/4 bg-black p-4 flex flex-col gap-4 shrink-0 grow-0">
        <div className="flex flex-col h-full">
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
            <label className="label uppercase font-bold">Upload Image</label>
            <input
              type="file"
              className="file-input w-full max-w-xs animated-gradient-background"
              onChange={handleImageChange}
            />
            <div className="dropdown text-white font-bold">
              <label className="label uppercase">Style</label>
              <div tabIndex={0} role="button" className="btn btn-neutral m-1 flex justify-between w-full text-white">
                {style ? style : ""}
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
            <OptionalFeatures optionalFeatures={optionalFeatures} setOptionalFeatures={setOptionalFeatures} />
            <ProcessMode mode={processMode} setMode={setProcessMode} />
            <Creativity creativity={creativity} setCreativity={setCreativity} />
          </div>
          <div className="flex justify-center mt-4 shrink-0">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loading loading-spinner loading-md" />
                <span>Generating...</span>
              </div>
            ) : (
              <button
                className="btn w-full animated-gradient-background border-none"
                onClick={handleGenerate}
              >Generate</button>
            )}
          </div>
        </div>
      </div>
      {/* Preview */}
      <Preview selectedImage={selectedImage} outputImage={outputImage} />
    </div>
  );
}

export default DashboardPanel;
