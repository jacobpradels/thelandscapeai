import Link from "next/link";
const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between w-full bg-black text-white">
      <Link className="flex items-center justify-center gap-2 animated-gradient-text" href="/">
        <div className="space-x-1">
          <span className="font-bold text-xl">LANDSCAPE</span>
          <span className="font-medium text-xl">AI</span>
        </div>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
          How it works
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#examples">
          Examples
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
          FAQ
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
          Pricing
        </Link>
      </nav>
    </header>
  );
}

export default Header;