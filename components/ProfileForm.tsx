"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UserRow } from "@/db/queries";

export function ProfileForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues: UserRow | null;
}) {
  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" defaultValue={defaultValues?.name ?? ""} required maxLength={120} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={defaultValues?.bio ?? ""}
          rows={4}
          placeholder="Uma breve apresentação para o teu portfólio público."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="avatarUrl">URL do avatar</Label>
        <Input
          id="avatarUrl"
          name="avatarUrl"
          type="url"
          defaultValue={defaultValues?.avatarUrl ?? ""}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="githubUrl">GitHub</Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={defaultValues?.githubUrl ?? ""}
            placeholder="https://github.com/..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="linkedinUrl">LinkedIn</Label>
          <Input
            id="linkedinUrl"
            name="linkedinUrl"
            type="url"
            defaultValue={defaultValues?.linkedinUrl ?? ""}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      <Button type="submit">Guardar perfil</Button>
    </form>
  );
}
