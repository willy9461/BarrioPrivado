"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import createClient from "@/lib/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        // 💡 Agregamos fallback con || null
        setUserEmail(session.user.email || null);
      }
    };
    getUser();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">🏘️ El Remanso</h1>
        <nav className="space-y-4">
          <SidebarLink href="/dashboard" label="Inicio" />
          <SidebarLink href="/dashboard/expensas" label="Expensas" />
          <SidebarLink href="/dashboard/usuarios" label="Usuarios" />
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <span className="text-gray-700">📧 {userEmail}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded hover:bg-gray-700 transition-colors"
    >
      {label}
    </Link>
  );
}
