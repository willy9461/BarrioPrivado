"use client";

import { useState } from "react";
import createClient from "@/lib/supabase/client";
import Link from "next/link";

export default function RegisterPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Registro exitoso. Por favor, revisá tu correo y confirmá tu cuenta antes de iniciar sesión.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/remanso02.jpg')", zIndex: 0 }}
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60" style={{ zIndex: 1 }} />
      {/* Título */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">El Remanso</h1>
      </div>
      {/* Formulario centrado */}
      <form
        onSubmit={handleRegister}
        className="relative bg-blue-100 p-6 rounded shadow-md w-full max-w-sm z-10"
      >
        <h2 className="text-2xl text-blue-900 font-semibold mb-4 text-center">Crear cuenta</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-700 text-sm mb-4 font-semibold">{success}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Registrarse
        </button>
      </form>
      {/* Botón volver al inicio debajo del formulario */}
      <Link
        href="/"
        className="relative z-10 mt-4 inline-block bg-white bg-opacity-80 text-blue-900 font-semibold px-4 py-2 rounded shadow hover:bg-opacity-100 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
