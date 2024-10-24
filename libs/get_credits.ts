"use server"

import connectMongo from "@/libs/mongoose"
import User from "@/models/User"
import { getServerSession } from "next-auth"
import authOptions from "@/libs/next-auth"

const getCredits = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return 0;
  }
  await connectMongo();
  const user = await User.findOne({ email: (session as any).user.email });
  return user?.credits;
}

export default getCredits;