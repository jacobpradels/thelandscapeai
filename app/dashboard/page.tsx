import DashboardPanel from "@/components/Custom/Dashboard/DashboardPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import Header from "@/components/Custom/AppHeader";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  await connectMongo();
  const user = await User.findOne({ email: session?.user.email });
  return (
    <main className="min-h-screen w-full flex flex-col">
      <Header />
      <DashboardPanel user_id={session?.user.id} credits={user?.credits} />
    </main>
  );
}