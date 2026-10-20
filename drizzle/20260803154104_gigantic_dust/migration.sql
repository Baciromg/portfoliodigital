CREATE TABLE `tabela_Exemplo` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`age` integer,
	`email` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL
);
