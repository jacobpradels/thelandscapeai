import Image from "next/image";

const ExampleCard = ({ title, beforeImage, beforeAlt, afterImage, afterAlt }) =>  {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="grid gap-4">
          <div>
            <h4 className="font-semibold mb-2">Before</h4>
            <Image src={beforeImage} alt={beforeAlt} width={400} height={300} className="rounded-lg object-cover w-full" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">After</h4>
            <Image src={afterImage} alt={afterAlt} width={400} height={300} className="rounded-lg object-cover w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExampleCard;