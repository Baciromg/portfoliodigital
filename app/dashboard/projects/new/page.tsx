import { createProjectAction } from "@/actions/projects";
import { ProjectForm } from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-heading text-lg font-semibold">Novo projeto</h1>
      <ProjectForm action={createProjectAction} />
    </div>
  );
}
