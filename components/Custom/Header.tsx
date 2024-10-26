import Link from "next/link";
import { Menu } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

const links = [
  {
    name: "How it works",
    href: "#features",
  },
  {
    name: "Examples",
    href: "#examples",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
]

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between w-full bg-black text-white">
      <Link className="flex items-center justify-center gap-2 animated-gradient-text" href="/">
        <div className="space-x-1">
          <span className="font-bold text-xl">LANDSCAPE</span>
          <span className="font-medium text-xl">AI</span>
        </div>
      </Link>
      <div className="dropdown dropdown-end sm:hidden">
        <div tabIndex={0} role="button" className="bg-black text-white">
          <Menu className="h-6 w-6" />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content animated-gradient-background rounded-box z-[1] mt-4 w-52 p-2 shadow border-2 border-white">
          {links.map((link) => (
            <li
              key={link.name}
              className="hover:bg-white hover:text-black rounded-md w-full"
            >
              <Link className="text-sm font-medium hover:underline underline-offset-4" href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
        {links.map((link) => (
          <Link className="text-sm font-medium hover:underline underline-offset-4" key={link.name} href={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;