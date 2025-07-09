
"use client";

import { useEffect, useState } from "react";
import createClient from "@/lib/supabase/client";

interface Expensa {
  id: string;
  monto: number;
  descripcion: string;
  pagada: boolean;
  mes: string;
  created_at: string;
}

export default function ExpensasPage() {
  const supabase = createClient();
  const [expensas, setExpensas] = useState<Expensa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpensas() {
      const { data, error } = await supabase.from("Expensa").select("*");

      if (error) {
        console.error("Error al cargar expensas:", error.message);
      } else {
        setExpensas(data);
      }

      setLoading(false);
    }

    fetchExpensas();
  }, [supabase]);

  if (loading) return <p>Cargando expensas...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Expensas</h1>
      <ul className="space-y-2">
        {expensas.map((e) => (
          <li key={e.id} className="bg-white p-4 shadow rounded">
            <p><strong>Mes:</strong> {e.mes}</p>
            <p><strong>Monto:</strong> ${e.monto}</p>
            <p><strong>Descripción:</strong> {e.descripcion}</p>
            <p><strong>Pagada:</strong> {e.pagada ? "✅ Sí" : "❌ No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
