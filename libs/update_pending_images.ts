import { getServerSession } from "next-auth";
import authOptions from "@/libs/next-auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export const updatePendingImages = async (diff: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  await connectMongo();

  const user = await User.findOne({email: (session as any).user.email});
  if (!user) {
    console.log("User not found");
    return;
  }

  if (!user.pendingImageCount) {
    user.pendingImageCount = 0 + diff;
  } else {
    user.pendingImageCount += diff;
  }

  await user.save();
}
