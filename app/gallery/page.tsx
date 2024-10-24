import { listObjects } from "@/libs/aws/s3/list";
import { authOptions } from "@/libs/next-auth";
import { getServerSession } from "next-auth";
import config from "@/config";
import Image from "next/image";
import Header from "@/components/Custom/AppHeader";
import Link from "next/link";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { redirect } from "next/navigation";

const GalleryPage = async () => {
  await connectMongo();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await User.findOne({ email: session.user.email });

  const objects = await listObjects(session?.user.id);

  return <div>
    <Header />
    <div className="grid grid-cols-3 gap-4">
      {objects.map((object, index) => (
        <Link key={index} href={`/gallery/${Buffer.from(object.Key).toString('base64')}`} className="aspect-video">
          <Image src={`${config.s3.aws_prefix}/${object.Key}`} alt="Gallery" width={500} height={300} className="rounded-md hover:scale-105 transition-all duration-300" />
        </Link>
      ))}
      {Array.from({ length: user.pendingImageCount }).map((_, index) => (
        <div key={index} className="aspect-video bg-gray-500 animate-pulse rounded-md"></div>
      ))}
    </div>
  </div>;
}

export default GalleryPage;
