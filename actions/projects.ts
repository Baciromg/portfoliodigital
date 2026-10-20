"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/session";
import { createProject, updateProject, deleteProject, type ProjectInput } from "@/db/queries";

function parseProjectForm(formData: FormData): ProjectInput {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const longDescription = String(formData.get("longDescription") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const githubUrl = String(formData.get("githubUrl") || "").trim();
  const liveUrl = String(formData.get("liveUrl") || "").trim();
  const technologyNames = String(formData.get("technologies") || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!title) throw new Error("O título é obrigatório.");
  if (title.length > 120) throw new Error("O título é demasiado longo (máx. 120 caracteres).");
  if (!description) throw new Error("A descrição curta é obrigatória.");

  return {
    title,
    description,
    longDescription: longDescription || null,
    imageUrl: imageUrl || null,
    githubUrl: githubUrl || null,
    liveUrl: liveUrl || null,
    technologyNames,
  };
}

export async function createProjectAction(formData: FormData) {
  const userId = await requireUserId();
  const input = parseProjectForm(formData);

  await createProject(userId, input);

  revalidatePath("/dashboard/projects");
  revalidatePath("/portfolios");
  revalidatePath(`/portfolio/${userId}`);
  redirect("/dashboard/projects");
}

export async function updateProjectAction(projectId: number, formData: FormData) {
  const userId = await requireUserId();
  const input = parseProjectForm(formData);

  const updated = await updateProject(projectId, userId, input);
  if (!updated) {
    throw new Error("Projeto não encontrado, ou não tens permissão para o editar.");
  }

  revalidatePath("/dashboard/projects");
  revalidatePath(`/projeto/${projectId}`);
  revalidatePath("/portfolios");
  revalidatePath(`/portfolio/${userId}`);
  redirect("/dashboard/projects");
}

export async function deleteProjectAction(projectId: number) {
  const userId = await requireUserId();

  const ok = await deleteProject(projectId, userId);
  if (!ok) {
    throw new Error("Projeto não encontrado, ou não tens permissão para o eliminar.");
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/portfolios");
  revalidatePath(`/portfolio/${userId}`);
}
