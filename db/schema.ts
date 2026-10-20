import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user as authUser } from "../auth-schema";

export * from "../auth-schema";

export const users = authUser;

export const technologies = sqliteTable("technologies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  color: text("color"),
  icon: text("icon"),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => authUser.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  imageUrl: text("image_url"),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const projectTechnologies = sqliteTable("project_technologies", {
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  technologyId: integer("technology_id")
    .notNull()
    .references(() => technologies.id, { onDelete: "cascade" }),
});