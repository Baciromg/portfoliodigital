"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-start gap-3 py-8">
      <h1 className="text-base font-semibold">Não foi possível concluir a ação</h1>
      <p className="max-w-md text-xs text-muted-foreground">{error.message}</p>
      <Button size="sm" onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  );
}
