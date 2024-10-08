import { useState } from "react";

const Preview = ({ selectedImage, outputImage }: { selectedImage: string; outputImage: string }) => {
  if (!selectedImage) {
    return <div className="flex-grow bg-black flex sm:block justify-center">
      <div
        className="
          flex justify-center items-center min-h-full
          text-white/50 text-3xl font-bold uppercase select-none
          text-center
        "
      >
        Upload an image to get started.
      </div>
    </div>
  };
  return (
    <div className="flex-grow bg-black">
      {!outputImage ? (
        <img
          src={selectedImage}
          alt="Preview"
          className="w-full h-full object-contain rounded-lg"
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="diff aspect-[16/9]">
            <div className="diff-item-1">
              <img alt="daisy" src={selectedImage} />
            </div>
            <div className="diff-item-2">
              <img
                alt="daisy"
                src={outputImage} />
            </div>
            <div className="diff-resizer"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Preview;