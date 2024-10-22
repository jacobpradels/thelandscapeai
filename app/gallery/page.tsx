import { listObjects } from "@/libs/aws/s3/list";
import { authOptions } from "@/libs/next-auth";
import { getServerSession } from "next-auth";
import config from "@/config";
import Image from "next/image";
import Header from "@/components/Custom/AppHeader";
import Link from "next/link";

const GalleryPage = async () => {
  const session = await getServerSession(authOptions);

  const objects = await listObjects(session?.user.id);
  // const images = objects.map(object => `${config.s3.aws_prefix}/${object.Key}`);
  // console.log(objects);

  return <div>
    <Header />
    <div className="grid grid-cols-3 gap-4">
      {objects.map((object, index) => (
        <Link key={index} href={`/gallery/${Buffer.from(object.Key).toString('base64')}`} className="aspect-video">
          <Image src={`${config.s3.aws_prefix}/${object.Key}`} alt="Gallery" width={500} height={300} className="rounded-md hover:scale-105 transition-all duration-300" />
        </Link>
      ))}
    </div>
  </div>;
}

export default GalleryPage;
