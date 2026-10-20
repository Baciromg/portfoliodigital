CREATE TABLE `project_technologies` (
	`project_id` integer NOT NULL,
	`technology_id` integer NOT NULL,
	CONSTRAINT `project_technologies_pk` PRIMARY KEY(`project_id`, `technology_id`),
	CONSTRAINT `fk_project_technologies_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_project_technologies_technology_id_technologies_id_fk` FOREIGN KEY (`technology_id`) REFERENCES `technologies`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`image_url` text,
	`github_url` text,
	`live_url` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `fk_projects_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `technologies` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE,
	`color` text,
	`icon` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`bio` text,
	`avatar_url` text,
	`github_url` text,
	`linkedin_url` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
DROP TABLE `tabela_Exemplo`;