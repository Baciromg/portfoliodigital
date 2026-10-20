import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-20 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Sobre mim
      </p>
      <h1 className="mt-3 font-heading text-2xl font-semibold">
        {/* TODO: escreve aqui a tua apresentação pessoal para o relatório */}
        O teu nome aqui
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Esta página é estática e serve para te apresentares fora da área de portfólio
        (que é gerada automaticamente a partir dos teus projetos). Substitui este texto
        por uma breve biografia, percurso e objetivos com o curso.
      </p>
      <Link
        href="/contactos"
        className="mt-6 inline-flex text-xs font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
      >
        Ver contactos →
      </Link>
    </div>
  );
}
