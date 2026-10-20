import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/index";
import { users, technologies, projects, projectTechnologies } from "@/db/schema";

export type TechnologyRow = typeof technologies.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
export type UserRow = typeof users.$inferSelect;

export type ProjectWithTechnologies = ProjectRow & {
  technologies: TechnologyRow[];
};

export type ProjectWithOwner = ProjectWithTechnologies & {
  owner: UserRow | null;
};

/**
 * Junta as tecnologias associadas a uma lista de projetos (tabela de junção
 * project_technologies). Feito em duas queries em vez de um JOIN com
 * agregação para manter o código simples e fácil de perceber.
 */
async function attachTechnologies<T extends { id: number }>(
  rows: T[],
): Promise<(T & { technologies: TechnologyRow[] })[]> {
  if (rows.length === 0) return [];

  const ids = rows.map((r) => r.id);
  const links = await db
    .select({
      projectId: projectTechnologies.projectId,
      technology: technologies,
    })
    .from(projectTechnologies)
    .innerJoin(technologies, eq(projectTechnologies.technologyId, technologies.id))
    .where(inArray(projectTechnologies.projectId, ids));

  const byProject = new Map<number, TechnologyRow[]>();
  for (const link of links) {
    const list = byProject.get(link.projectId) ?? [];
    list.push(link.technology);
    byProject.set(link.projectId, list);
  }

  return rows.map((row) => ({
    ...row,
    technologies: byProject.get(row.id) ?? [],
  }));
}

// ----------------------------------------------------------------------------
// Tecnologias
// ----------------------------------------------------------------------------

export async function getAllTechnologies() {
  return db.select().from(technologies).orderBy(technologies.name);
}

/** Devolve os ids das tecnologias com estes nomes, criando as que não existem. */
export async function getOrCreateTechnologyIds(names: string[]): Promise<number[]> {
  const clean = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
  if (clean.length === 0) return [];

  const existing = await db.select().from(technologies);
  const byName = new Map(existing.map((t) => [t.name.toLowerCase(), t]));

  const ids: number[] = [];
  for (const name of clean) {
    const found = byName.get(name.toLowerCase());
    if (found) {
      ids.push(found.id);
    } else {
      const [created] = await db.insert(technologies).values({ name }).returning();
      ids.push(created.id);
    }
  }
  return ids;
}

// ----------------------------------------------------------------------------
// Utilizadores
// ----------------------------------------------------------------------------

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user ?? null;
}

export async function getAllUsersWithProjectCount() {
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      bio: users.bio,
      avatarUrl: users.avatarUrl,
      githubUrl: users.githubUrl,
      linkedinUrl: users.linkedinUrl,
      createdAt: users.createdAt,
      projectCount: sql<number>`count(${projects.id})`,
    })
    .from(users)
    .leftJoin(projects, eq(projects.userId, users.id))
    .groupBy(users.id)
    .orderBy(users.name);
}

export type ProfileInput = {
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
};

export async function updateUserProfile(id: string, input: ProfileInput) {
  const [user] = await db
    .update(users)
    .set({
      name: input.name,
      bio: input.bio || null,
      avatarUrl: input.avatarUrl || null,
      githubUrl: input.githubUrl || null,
      linkedinUrl: input.linkedinUrl || null,
    })
    .where(eq(users.id, id))
    .returning();
  return user ?? null;
}

// ----------------------------------------------------------------------------
// Projetos
// ----------------------------------------------------------------------------

export async function getProjectsByUserId(userId: string) {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.updatedAt));
  return attachTechnologies(rows);
}

export async function getProjectById(id: number): Promise<ProjectWithOwner | null> {
  const [project] = await db.select().from(projects).where(eq(projects.id, id));
  if (!project) return null;

  const [withTech] = await attachTechnologies([project]);
  const owner = await getUserById(project.userId);
  return { ...withTech, owner };
}

export async function getPublicProjects(opts: { technologyId?: number; q?: string } = {}) {
  const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));
  const withTech = await attachTechnologies(rows);

  let filtered = withTech;
  if (opts.technologyId) {
    filtered = filtered.filter((p) => p.technologies.some((t) => t.id === opts.technologyId));
  }
  if (opts.q) {
    const q = opts.q.toLowerCase();
    filtered = filtered.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }

  const ownerIds = [...new Set(filtered.map((p) => p.userId))];
  const owners = ownerIds.length
    ? await db.select().from(users).where(inArray(users.id, ownerIds))
    : [];
  const ownerMap = new Map(owners.map((o) => [o.id, o]));

  return filtered.map((p) => ({ ...p, owner: ownerMap.get(p.userId) ?? null }));
}

export async function getFeaturedProjects(limit = 6) {
  const all = await getPublicProjects();
  return all.slice(0, limit);
}

export type ProjectInput = {
  title: string;
  description: string;
  longDescription?: string | null;
  imageUrl?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  technologyNames: string[];
};

export async function createProject(userId: string, input: ProjectInput) {
  const [project] = await db
    .insert(projects)
    .values({
      userId,
      title: input.title,
      description: input.description,
      longDescription: input.longDescription || null,
      imageUrl: input.imageUrl || null,
      githubUrl: input.githubUrl || null,
      liveUrl: input.liveUrl || null,
    })
    .returning();

  const techIds = await getOrCreateTechnologyIds(input.technologyNames);
  if (techIds.length) {
    await db
      .insert(projectTechnologies)
      .values(techIds.map((technologyId) => ({ projectId: project.id, technologyId })));
  }

  return project;
}

/** Só atualiza o projeto se pertencer ao userId indicado (proteção contra edição de projetos de terceiros). */
export async function updateProject(id: number, userId: string, input: ProjectInput) {
  const [project] = await db
    .update(projects)
    .set({
      title: input.title,
      description: input.description,
      longDescription: input.longDescription || null,
      imageUrl: input.imageUrl || null,
      githubUrl: input.githubUrl || null,
      liveUrl: input.liveUrl || null,
      updatedAt: sql`(unixepoch())`,
    })
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .returning();

  if (!project) return null;

  await db.delete(projectTechnologies).where(eq(projectTechnologies.projectId, id));
  const techIds = await getOrCreateTechnologyIds(input.technologyNames);
  if (techIds.length) {
    await db
      .insert(projectTechnologies)
      .values(techIds.map((technologyId) => ({ projectId: id, technologyId })));
  }

  return project;
}

/** Só elimina o projeto se pertencer ao userId indicado. */
export async function deleteProject(id: number, userId: string) {
  const result = await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .returning();
  return result.length > 0;
}
