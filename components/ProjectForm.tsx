"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectWithTechnologies } from "@/db/queries";

export function ProjectForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ProjectWithTechnologies;
}) {
  const defaultTechnologies = defaultValues?.technologies.map((t) => t.name).join(", ") ?? "";

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" defaultValue={defaultValues?.title} required maxLength={120} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Descrição curta</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          required
          rows={2}
          maxLength={280}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="longDescription">Descrição detalhada</Label>
        <Textarea
          id="longDescription"
          name="longDescription"
          defaultValue={defaultValues?.longDescription ?? ""}
          rows={6}
          placeholder="Contexto, decisões técnicas, desafios, aprendizagens..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="imageUrl">URL da imagem de capa</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={defaultValues?.imageUrl ?? ""}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="liveUrl">URL do site (demo)</Label>
          <Input
            id="liveUrl"
            name="liveUrl"
            type="url"
            defaultValue={defaultValues?.liveUrl ?? ""}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="githubUrl">URL do repositório GitHub</Label>
        <Input
          id="githubUrl"
          name="githubUrl"
          type="url"
          defaultValue={defaultValues?.githubUrl ?? ""}
          placeholder="https://github.com/..."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="technologies">Tecnologias (separadas por vírgula)</Label>
        <Input
          id="technologies"
          name="technologies"
          defaultValue={defaultTechnologies}
          placeholder="Next.js, TypeScript, Tailwind CSS"
        />
      </div>

      <Button type="submit">Guardar projeto</Button>
    </form>
  );
}
