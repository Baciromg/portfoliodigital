"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProjectSandbox({
  liveUrl,
  longDescription,
}: {
  liveUrl?: string | null;
  longDescription?: string | null;
}) {
  const [tab, setTab] = useState<"preview" | "about">(liveUrl ? "preview" : "about");

  return (
    <div className="ring-1 ring-foreground/10">
      <div className="flex border-b border-border" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "preview"}
          onClick={() => setTab("preview")}
          className={cn(
            "px-4 py-2 text-xs font-medium transition-colors",
            tab === "preview"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Pré-visualização
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "about"}
          onClick={() => setTab("about")}
          className={cn(
            "px-4 py-2 text-xs font-medium transition-colors",
            tab === "about"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Sobre o projeto
        </button>
      </div>

      <div className="min-h-[320px]">
        {tab === "preview" ? (
          liveUrl ? (
            <iframe
              src={liveUrl}
              title="Pré-visualização do projeto"
              className="h-[480px] w-full"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div className="flex h-[320px] items-center justify-center px-6 text-center text-xs text-muted-foreground">
              Este projeto ainda não tem um link de demonstração online.
            </div>
          )
        ) : (
          <div className="whitespace-pre-line px-6 py-6 text-sm leading-relaxed text-foreground/90">
            {longDescription || "Sem descrição detalhada disponível para este projeto."}
          </div>
        )}
      </div>
    </div>
  );
}
