import Link from "next/link";
import { GithubLogoIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TechnologyBadge } from "@/components/TechnologyBadge";
import type { ProjectWithTechnologies, UserRow } from "@/db/queries";

type Props = {
  project: ProjectWithTechnologies & { owner?: UserRow | null };
  showOwner?: boolean;
};

export function ProjectCard({ project, showOwner = false }: Props) {
  return (
    <Card className="h-full">
      {project.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-40 w-full border-b border-border object-cover"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center border-b border-border bg-muted text-xs text-muted-foreground">
          Sem imagem
        </div>
      )}
      <CardHeader>
        <CardTitle>
          <Link href={`/projeto/${project.id}`} className="hover:underline">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
        {showOwner && project.owner ? (
          <Link
            href={`/portfolio/${project.owner.id}`}
            className="text-[11px] text-muted-foreground hover:text-foreground"
          >
            por {project.owner.name}
          </Link>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <TechnologyBadge key={tech.id} name={tech.name} />
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Link href={`/projeto/${project.id}`} className="text-xs font-medium hover:underline">
          Ver detalhes →
        </Link>
        <div className="flex items-center gap-3 text-muted-foreground">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="Repositório GitHub">
              <GithubLogoIcon size={16} />
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Abrir site">
              <ArrowSquareOutIcon size={16} />
            </a>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
