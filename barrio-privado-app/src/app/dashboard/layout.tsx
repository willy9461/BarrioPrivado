"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar  */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white bg-opacity-80 shadow-md fixed top-0 left-0 z-20">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition cursor-pointer">
              🏘️ El Remanso
            </span>
          </Link>
          <NavLink href="/dashboard" label="Inicio" />
          <NavLink href="/dashboard/expensas" label="Expensas" />
          <NavLink href="/dashboard/usuarios" label="Usuarios" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">📧 {userEmail}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition font-medium"
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

function NavLink({ href, label }: { href: string; label: string }) {
  const isActive = (currentPath: string, linkPath: string) => currentPath === linkPath || (linkPath !== "/" && currentPath.startsWith(linkPath));
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded hover:bg-gray-200 transition-colors ${isActive(path, href) ? "bg-gray-100 font-medium" : ""}`}
    >
      {label}
    </Link>
  );
}
