import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.Turso_URl!,
    authToken: process.env.Turso_Token!,
  },
});