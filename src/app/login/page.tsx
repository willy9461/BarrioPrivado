"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Si el login es exitoso, sincronizar con nuestra base de datos
    if (data.user) {
      try {
        const res = await fetch("/api/users/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            id: data.user.id, 
            email: data.user.email 
          }),
        });

        if (!res.ok) {
          console.warn("Error al sincronizar usuario, pero login exitoso");
        }
      } catch (syncError) {
        console.warn("Error de sincronización:", syncError);
      }
    }

    // Redirige al dashboard
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Iniciar Sesión</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && <p className="mb-4 text-center text-sm text-red-500">{errorMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
