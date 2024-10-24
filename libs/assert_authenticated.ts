import { getServerSession } from "next-auth";
import authOptions from "@/libs/next-auth";

export const assertAuthenticated = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  }
  return true;
}