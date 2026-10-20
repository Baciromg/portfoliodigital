import { getCurrentSession } from "@/lib/session";
import { getUserById } from "@/db/queries";
import { updateProfileAction } from "@/actions/profile";
import { ProfileForm } from "@/components/ProfileForm";

export default async function DashboardProfilePage() {
  const session = await getCurrentSession();
  const user = await getUserById(session!.user.id);

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-heading text-lg font-semibold">O meu perfil</h1>
      <ProfileForm action={updateProfileAction} defaultValues={user} />
    </div>
  );
}
