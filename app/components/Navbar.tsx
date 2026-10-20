import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 apple-glass border-b border-black/5 transition-all">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between text-sm font-medium">
        <Link href="/" className="text-[#1d1d1f] font-semibold tracking-tight hover:opacity-70 transition-opacity">
          DevPortfolio
        </Link>

        <nav className="flex items-center gap-8 text-[#86868b]">
          <Link href="/portfolios" className="hover:text-[#1d1d1f] transition-colors">
            Portfólios
          </Link>
          <Link href="/about_me" className="hover:text-[#1d1d1f] transition-colors">
            Sobre Mim
          </Link>
          <Link href="/contactos" className="hover:text-[#1d1d1f] transition-colors">
            Contactos
          </Link>
        </nav>

        <div>
          <Link href="/dashboard" className="apple-button text-xs py-1.5 px-4">
            Área Pessoal
          </Link>
        </div>
      </div>
    </header>
  );
}