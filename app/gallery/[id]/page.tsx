import Header from "@/components/Custom/AppHeader";
import config from "@/config";
import { inspectObject } from "@/libs/aws/s3/inspect";
import { authOptions } from "@/libs/next-auth";
import { getServerSession } from "next-auth";
import Preview from "@/components/Custom/Dashboard/Preview";
import { redirect } from "next/navigation";
import { Pencil, Download, Trash } from "lucide-react";


const GalleryImagePage = async ({ params }: { params: { id: string } }) => {
  const id = Buffer.from(params.id, 'base64').toString('ascii');
  const session = await getServerSession(authOptions);

  if (id.split("/")[0] !== session?.user.id) {
    redirect("/dashboard");
  }

  const object = await inspectObject(id) as any;
  return (
    <main className="min-h-screen w-full flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col-reverse sm:flex-row-reverse h-full w-full">
        <div className="flex flex-col gap-4 sm:w-1/3 w-full p-4">
          <div>
            <div className="font-bold uppercase">
              Style
            </div>
            <div>
              {object?.Metadata?.style}
            </div>
          </div>
          <div>
            <div className="font-bold uppercase">
              Optional Features:
            </div>
            <div className="flex flex-wrap gap-2">
              {JSON.parse(object.Metadata.optionalfeatures ?? "[]").map((feature: string) =>
                <div className="badge badge-outline capitalize animated-gradient-background" key={feature}>{feature}</div>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold uppercase">
              Process Mode
            </div>
            <div>
              {object.Metadata.processmode}
            </div>
          </div>
          <div>
            <div className="font-bold uppercase">
              Creativity
            </div>
            <div>
              {object.Metadata.creativity}
            </div>
          </div>
          <div>
            <div className="font-bold uppercase">
              Expires
            </div>
            <div>
              {object.ExpiresString}
            </div>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-lg">Compare with original</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
          </div>
          <div className="btn btn-neutral animated-gradient-background">
            <Download className="w-4 h-4" />
            Download
          </div>
          <div className="btn btn-neutral animated-gradient-background">
            <Pencil className="w-4 h-4" />
            Modify
          </div>
          <div className="btn btn-neutral animated-gradient-background">
            <Trash className="w-4 h-4" />
            Delete
          </div>
        </div>
        <Preview selectedImage={`${config.s3.aws_prefix}/${id}`} outputImage={undefined} />
      </div>
    </main>
  )
}

export default GalleryImagePage;