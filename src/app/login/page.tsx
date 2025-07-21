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
    <main className="relative flex flex-col items-center justify-center h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/remanso09.jpg')", zIndex: 0 }}
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60" style={{ zIndex: 1 }} />
      {/* Título */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">El Remanso</h1>
      </div>
      {/* Formulario centrado */}
      <div className="relative bg-blue-100 p-6 rounded shadow-md w-full max-w-sm z-10">
        <h2 className="text-2xl text-blue-900 font-semibold mb-4 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-blue-800"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-medium text-blue-800"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && <p className="mb-4 text-center text-sm text-red-600">{errorMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-blue-800">
          ¿No tienes una cuenta?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
      
      <Link
        href="/"
        className="relative z-10 mt-4 inline-block bg-white bg-opacity-80 text-blue-900 font-semibold px-4 py-2 rounded shadow hover:bg-opacity-100 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
