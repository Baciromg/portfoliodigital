"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await authClient.signIn.email({
      email,
      password,
    });

    if (res.error) {
      setError("Credenciais inválidas");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Entrar no DevPortfolio</h1>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border p-2 text-sm text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border p-2 text-sm text-black"
          />
        </div>
        <button type="submit" className="w-full rounded-md bg-primary py-2 text-white font-medium">
          Entrar
        </button>
        <p className="text-center text-sm text-gray-500">
          Ainda não tens conta?{" "}
          <Link href="/register" className="text-primary underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}