import Link from "next/link";
import ButtonAccount from "@/components/ButtonAccount";
import DashboardPanel from "@/components/Custom/Dashboard/DashboardPanel";

const DashboardHeader = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between w-full bg-black text-white">
      <Link className="flex items-center justify-center gap-2 animated-gradient-text" href="/">
        <div className="space-x-1">
          <span className="font-bold text-xl">LANDSCAPE</span>
          <span className="font-medium text-xl">AI</span>
        </div>
      </Link>
      <ButtonAccount />
    </header>
  )
}
export default async function Dashboard() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <DashboardHeader />
      <DashboardPanel />
    </main>
  );
}