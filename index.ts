
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: process.env.Turso_URl!,
  authToken: process.env.Turso_Token!,
});

export const db = drizzle({ client });