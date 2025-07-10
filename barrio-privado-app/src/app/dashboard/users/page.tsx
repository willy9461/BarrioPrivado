
"use client";

import { useEffect, useState } from "react";
import createClient from "@/lib/supabase/client";

interface Usuario {
  id: string;
  email: string;
  nombre: string;
  created_at: string;
}

export default function UsuariosPage() {
  const supabase = createClient();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuarios() {
      const { data, error } = await supabase.from("User").select("*");

      if (error) {
        console.error("Error al cargar usuarios:", error.message);
      } else {
        setUsuarios(data);
      }

      setLoading(false);
    }

    fetchUsuarios();
  }, [supabase]);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usuarios registrados</h1>
      <ul className="space-y-2">
        {usuarios.map((u) => (
          <li key={u.id} className="bg-white p-4 shadow rounded">
            <p><strong>Nombre:</strong> {u.nombre}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Registrado el:</strong> {new Date(u.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
