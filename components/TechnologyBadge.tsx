import { cn } from "@/lib/utils";

export function TechnologyBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground ring-1 ring-inset ring-foreground/15",
        className,
      )}
    >
      {name}
    </span>
  );
}
