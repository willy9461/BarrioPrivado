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
    <div className="min-h-screen flex flex-col">
      {/* Navbar  */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white bg-opacity-80 shadow-md fixed top-0 left-0 z-20">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition cursor-pointer">
              🏘️ El Remanso
            </span>
          </Link>
          <SidebarLink href="/dashboard" label="Inicio" />
          <SidebarLink href="/dashboard/expensas" label="Expensas" />
          <SidebarLink href="/dashboard/usuarios" label="Usuarios" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">📧 {userEmail}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-800 text-white px-4 py-1 rounded hover:bg-blue-900 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      {/* Espaciador para el navbar fijo */}
      <div className="h-20" />
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
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
