import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentSession } from "@/lib/session";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/portfolios", label: "Portfólios" },
  { href: "/about_me", label: "Sobre Mim" },
  { href: "/contactos", label: "Contactos" },
];

export async function Navbar() {
  let hasSession = false;
  try {
    const session = await getCurrentSession();
    hasSession = Boolean(session?.user);
  } catch {
    hasSession = false;
  }

  return (
    <header className="sticky top-0 z-50 apple-glass border-b border-black/5 transition-all">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 text-sm font-medium">
        {/* Logótipo */}
        <Link href="/" className="text-[#1d1d1f] font-semibold tracking-tight hover:opacity-70 transition-opacity">
          DevPortfolio<span className="text-[#86868b]">.</span>
        </Link>

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center gap-8 text-[#86868b]">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#1d1d1f] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ações / Autenticação */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {hasSession ? (
            <Link
              href="/dashboard"
              className="apple-card px-4 py-1.5 text-xs font-medium text-[#1d1d1f] hover:bg-white/80 transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}