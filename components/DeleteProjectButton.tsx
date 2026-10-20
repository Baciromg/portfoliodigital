"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function DeleteProjectButton({ action }: { action: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => {
        if (!confirm("Eliminar este projeto? Esta ação não pode ser desfeita.")) return;
        startTransition(async () => {
          await action();
        });
      }}
    >
      {isPending ? "A eliminar..." : "Eliminar"}
    </Button>
  );
}
