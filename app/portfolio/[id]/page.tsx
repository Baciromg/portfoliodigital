import { notFound } from "next/navigation";
import { getUserById, getProjectsByUserId } from "@/db/queries";
import { ProjectCard } from "@/components/ProjectCard";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) notFound();

  const projects = await getProjectsByUserId(user.id);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-2 border-b border-border pb-8">
        <h1 className="font-heading text-2xl font-semibold">{user.name}</h1>
        {user.bio ? <p className="max-w-xl text-sm text-muted-foreground">{user.bio}</p> : null}
        <div className="mt-1 flex gap-4 text-xs">
          {user.githubUrl ? (
            <a
              href={user.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground hover:underline"
            >
              GitHub
            </a>
          ) : null}
          {user.linkedinUrl ? (
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground hover:underline"
            >
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        {projects.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Este formando ainda não publicou projetos.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
