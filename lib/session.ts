import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * TODO (autenticação - Better Auth):
 * Este ficheiro assume que `lib/auth.ts` está totalmente configurado por ti
 * (registo, login, hashing de password, etc.) e que o `user.id` da sessão
 * corresponde ao `users.id` da tabela `users` do schema Turso (db/schema.ts).
 * Não precisas de mexer nestas funções — só confirma que continuam a fazer
 * sentido depois de terminares o teu setup do Better Auth (nomeadamente se
 * criares as páginas /login e /register, que ainda não existem neste projeto).
 */

export async function getCurrentSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await getCurrentSession();
  return session?.user?.id ?? null;
}

/** Usa isto em Server Components / Server Actions que exigem sessão ativa. */
export async function requireUserId(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }
  return userId;
}
