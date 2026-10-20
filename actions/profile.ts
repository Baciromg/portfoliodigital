"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/session";
import { updateUserProfile } from "@/db/queries";

export async function updateProfileAction(formData: FormData) {
  const userId = await requireUserId();

  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("O nome é obrigatório.");

  await updateUserProfile(userId, {
    name,
    bio: String(formData.get("bio") || "").trim() || null,
    avatarUrl: String(formData.get("avatarUrl") || "").trim() || null,
    githubUrl: String(formData.get("githubUrl") || "").trim() || null,
    linkedinUrl: String(formData.get("linkedinUrl") || "").trim() || null,
  });

  revalidatePath("/dashboard/profile");
  revalidatePath(`/portfolio/${userId}`);
  redirect("/dashboard/profile");
}
