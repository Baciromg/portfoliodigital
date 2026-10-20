import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/db/queries";
import { ProjectSandbox } from "@/components/ProjectSandbox";
import { TechnologyBadge } from "@/components/TechnologyBadge";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  if (Number.isNaN(projectId)) notFound();

  const project = await getProjectById(projectId);
  if (!project || !project.owner) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
      <Link
        href={`/portfolio/${project.owner.id}`}
        className="text-xs text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Voltar ao portfólio de {project.owner.name}
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-semibold">{project.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Código-fonte
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Abrir em nova aba
          </a>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <TechnologyBadge key={tech.id} name={tech.name} />
        ))}
      </div>

      <div className="mt-8">
        <ProjectSandbox liveUrl={project.liveUrl} longDescription={project.longDescription} />
      </div>
    </div>
  );
}
