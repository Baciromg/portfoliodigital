export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-[11px] text-muted-foreground sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} DevPortfolio — Projeto Final UC02834</p>
        <p>Construído com Next.js, Drizzle ORM, Better Auth e Turso.</p>
      </div>
    </footer>
  );
}
