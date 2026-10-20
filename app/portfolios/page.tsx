import Link from "next/link";
import { getAllUsersWithProjectCount, getAllTechnologies, getPublicProjects } from "@/db/queries";
import { TechnologyBadge } from "@/components/TechnologyBadge";
import { cn } from "@/lib/utils";

export default async function PortfoliosPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string }>;
}) {
  const { tech } = await searchParams;
  const technologyId = tech ? Number(tech) : undefined;

  const [technologies, users] = await Promise.all([
    getAllTechnologies(),
    getAllUsersWithProjectCount(),
  ]);

  let visibleUserIds: Set<string> | null = null;
  if (technologyId) {
    const projects = await getPublicProjects({ technologyId });
    visibleUserIds = new Set(projects.map((p) => p.userId));
  }

  const filteredUsers = visibleUserIds ? users.filter((u) => visibleUserIds!.has(u.id)) : users;

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-heading text-lg font-semibold">Portfólios</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Descobre os portfólios de todos os formandos da turma.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/portfolios"
          className={cn(
            "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ring-1 ring-inset ring-foreground/15",
            !technologyId && "bg-foreground text-background ring-foreground",
          )}
        >
          Todas
        </Link>
        {technologies.map((t) => (
          <Link key={t.id} href={`/portfolios?tech=${t.id}`}>
            <TechnologyBadge
              name={t.name}
              className={cn(
                technologyId === t.id && "bg-foreground text-background ring-foreground",
              )}
            />
          </Link>
        ))}
      </div>

      {filteredUsers.length === 0 ? (
        <p className="mt-10 text-xs text-muted-foreground">
          Nenhum portfólio encontrado para este filtro.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Link
              key={user.id}
              href={`/portfolio/${user.id}`}
              className="group flex flex-col gap-2 p-4 ring-1 ring-foreground/10 transition-colors hover:bg-foreground/5"
            >
              <p className="text-sm font-medium group-hover:underline">{user.name}</p>
              {user.bio ? (
                <p className="line-clamp-2 text-xs text-muted-foreground">{user.bio}</p>
              ) : null}
              <p className="mt-1 text-[11px] text-muted-foreground">
                {user.projectCount} projeto{user.projectCount === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
