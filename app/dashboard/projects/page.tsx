import Link from "next/link";
import { getCurrentSession } from "@/lib/session";
import { getProjectsByUserId } from "@/db/queries";
import { deleteProjectAction } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { TechnologyBadge } from "@/components/TechnologyBadge";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";

export default async function DashboardProjectsPage() {
  const session = await getCurrentSession();
  const userId = session!.user.id;
  const projects = await getProjectsByUserId(userId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-lg font-semibold">Os meus projetos</h1>
        <Link href="/dashboard/projects/new">
          <Button size="sm">+ Novo projeto</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Ainda não tens projetos. Cria o primeiro para apareceres no portfólio público.
        </p>
      ) : (
        <ul className="divide-y divide-border ring-1 ring-foreground/10">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{project.title}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <TechnologyBadge key={t.id} name={t.name} />
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/projeto/${project.id}`}
                  className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                >
                  Ver
                </Link>
                <Link href={`/dashboard/projects/${project.id}/edit`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                <DeleteProjectButton action={deleteProjectAction.bind(null, project.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
