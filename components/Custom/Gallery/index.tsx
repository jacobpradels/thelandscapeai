import Image from "next/image";
import "./gallery.css";

const env = process.env.NODE_ENV

const prefix = env === "development" ? "/images" : "https://thelandscapeai-photos.s3.us-east-2.amazonaws.com"

let images = [
  "desert-7.webp",
  "modern-pool-.6.webp",
  "od-light-pool-.4-notheme.jpeg",
  "online-mediterranean.webp",
  "online-modern.webp",
  "online-tropical.webp",
  "mediterannean.jpeg",
  "english-cottage.jpeg",
  "home-after.jpeg",
]

images = images.map(image => `${prefix}/${image}`)

const totalImages = images.length;
const imagesPerRow = 3;
const rows = Math.ceil(totalImages / imagesPerRow);

const imageRows = Array.from({ length: rows }, (_, index) => images.slice(index * imagesPerRow, (index + 1) * imagesPerRow));


const Gallery = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2 overflow-hidden" id="examples">
      {imageRows.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex gallery-row ${rowIndex % 2 === 0 ? 'gallery-row right' : 'gallery-row left'}`}>
          {row.map((image, index) => (
            <div key={index} className="aspect-video">
              <Image
                src={image}
                alt="Gallery"
                sizes="100vw"
                width={500}
                height={300}
                className="rounded-md hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default Gallery;