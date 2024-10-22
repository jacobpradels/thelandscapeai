import DashboardPanel from "@/components/Custom/Dashboard/DashboardPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import Header from "@/components/Custom/AppHeader";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <main className="min-h-screen w-full flex flex-col">
      <Header />
      <DashboardPanel user_id={session?.user.id} />
    </main>
  );
}