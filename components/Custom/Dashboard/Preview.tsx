import { useState } from "react";

const Preview = ({ selectedImage, outputImage }: { selectedImage: string; outputImage: string }) => {
  return (
    <div className="flex-grow flex bg-black aspect-[16/9] overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        {outputImage ? (
          // <img
          //   src={outputImage}
          //   alt="Preview"
          //   className="w-full object-cover rounded-lg"
          // />
          <div className="diff aspect-[16/9]">
            <div className="diff-item-1">
              <img alt="daisy" src={outputImage} />
            </div>
            <div className="diff-item-2">
              <img
                alt="daisy"
                src={selectedImage} />
            </div>
            <div className="diff-resizer"></div>
          </div>
        ) : selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className="h-full object-contain rounded-lg"
          />
        ) : (
          <div className="text-white/50 text-3xl font-bold uppercase select-none text-center">
            Upload an image to get started.
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;