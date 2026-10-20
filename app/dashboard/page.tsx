import Link from "next/link";

export default function Home() {
  const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Drizzle ORM",
    "Turso",
    "HTML5",
    "CSS3",
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
          DevPortfolio · UC02834
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
          Uma plataforma para os portfólios da turma.
        </h1>
        <p className="text-lg sm:text-xl text-[#86868b] font-normal leading-relaxed">
          Explora os projetos desenvolvidos ao longo do curso, filtra por tecnologia e descobre o trabalho de cada formando.
        </p>

        {/* Botões de Ação */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/portfolios"
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-6 py-3 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow"
          >
            Explorar portfólios
          </Link>
          <Link
            href="/dashboard"
            className="apple-card px-6 py-3 rounded-full font-medium text-sm text-[#1d1d1f] hover:bg-white/80 transition-all"
          >
            Área de gestão
          </Link>
        </div>

        {/* Stack Tecnológica */}
        <div className="pt-8 flex flex-wrap justify-center gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/5 text-[#86868b]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Secção de Projetos Recentes */}
      <section className="mt-20 pt-12 border-t border-black/5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
            Projetos recentes
          </h2>
          <Link
            href="/portfolios"
            className="text-sm text-[#0071e3] hover:underline font-medium"
          >
            Ver todos &rarr;
          </Link>
        </div>

        {/* Estado Vazio (Empty State) */}
        <div className="apple-card p-12 text-center space-y-3">
          <p className="text-[#1d1d1f] font-medium text-lg">
            Ainda não há projetos publicados.
          </p>
          <p className="text-[#86868b] text-sm">
            Sê o primeiro a partilhar o teu trabalho.
          </p>
        </div>
      </section>
    </div>
  );
}