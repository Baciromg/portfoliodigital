import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import { getProjectById } from "@/db/queries";
import { updateProjectAction } from "@/actions/projects";
import { ProjectForm } from "@/components/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  if (Number.isNaN(projectId)) notFound();

  const session = await getCurrentSession();
  const project = await getProjectById(projectId);

  if (!project || project.userId !== session?.user.id) {
    notFound();
  }

  const boundAction = updateProjectAction.bind(null, projectId);

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-heading text-lg font-semibold">Editar projeto</h1>
      <ProjectForm action={boundAction} defaultValues={project} />
    </div>
  );
}
