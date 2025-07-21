import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/expensas", label: "Expensas" },
  { href: "/dashboard/users", label: "Usuarios" },
];

export default function DashboardNav({ user }: { user: User }) {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md border-b">
      <div className="flex items-center space-x-6">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
        >
          🏘️ Barrio Privado
        </Link>
        {/* Enlaces de navegación */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-700">
          <span className="hidden sm:inline">Hola, </span>
          <Link
            href="/dashboard/profile"
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {user.email?.split('@')[0] || "Usuario"}
          </Link>
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}