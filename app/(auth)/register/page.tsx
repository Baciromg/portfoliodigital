"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (res.error) {
      setError(res.error.message || "Erro ao criar conta");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Registar Conta</h1>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border p-2 text-sm text-black"
          />
        </div>
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
          Criar Conta
        </button>
      </form>
    </div>
  );
}