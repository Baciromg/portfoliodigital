"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <h1 className="text-lg font-semibold">Ocorreu um erro</h1>
      <p className="max-w-sm text-xs text-muted-foreground">
        {error.message || "Algo correu mal. Tenta novamente."}
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
