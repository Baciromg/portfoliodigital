import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <p className="font-heading text-6xl font-semibold text-foreground/20">404</p>
      <h1 className="text-lg font-semibold">Página não encontrada</h1>
      <p className="max-w-sm text-xs text-muted-foreground">
        O recurso que procuras não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-9 items-center bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
