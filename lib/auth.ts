import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/index";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      user: schema.users,
    },
  }),

  user: {
    modelName: "users",
  },

  emailAndPassword: {
    enabled: true,
  },
});