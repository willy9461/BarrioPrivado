import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/dashboard/expensas", label: "Expensas" },
  { href: "/dashboard/usuarios", label: "Usuarios" },
];

export default function DashboardNav({ user }: { user: User }) {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
        >
          🏘️ El Remanso
        </Link>
        {/* Hacemos el render de los links de navegación de forma dinámica */}
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/profile"
          className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          {user.email ?? "Mi Perfil"}
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}