import Link from "next/link";
import { getFeaturedProjects, getAllTechnologies } from "@/db/queries";
import { ProjectCard } from "@/components/ProjectCard";
import { TechnologyBadge } from "@/components/TechnologyBadge";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const [projects, technologies] = await Promise.all([
    getFeaturedProjects(6),
    getAllTechnologies(),
  ]);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            DevPortfolio · UC02834
          </p>
          <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Uma plataforma para os portfólios da turma.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Explora os projetos desenvolvidos ao longo do curso, filtra por tecnologia e
            descobre o trabalho de cada formando.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/portfolios">
              <Button>Explorar portfólios</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Área de gestão</Button>
            </Link>
          </div>
        </div>
      </section>

      {technologies.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-2 px-4 py-6 sm:px-6">
            {technologies.map((tech) => (
              <TechnologyBadge key={tech.id} name={tech.name} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Projetos recentes</h2>
          <Link
            href="/portfolios"
            className="text-xs text-muted-foreground hover:text-foreground hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Ainda não há projetos publicados. Sê o primeiro a partilhar o teu trabalho.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} showOwner />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
