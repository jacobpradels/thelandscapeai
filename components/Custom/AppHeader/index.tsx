import Link from "next/link";
import ButtonAccount from "@/components/ButtonAccount";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between w-full bg-black text-white">
      <div className="flex items-center gap-4">
        <Link className="flex items-center justify-center gap-2 animated-gradient-text" href="/dashboard">
          <div className="space-x-1">
            <span className="font-bold text-xl">LANDSCAPE</span>
            <span className="font-medium text-xl">AI</span>
          </div>
        </Link>
        <Link
          href="/gallery"
          className="text-white/50 hover:text-gray-300 uppercase font-extrabold"
        >
          Gallery
        </Link>
      </div>
      <ButtonAccount />
    </header>
  )
}

export default Header;