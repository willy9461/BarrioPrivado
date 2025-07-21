"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh(); // Importante para que el layout del servidor detecte el cambio de sesión
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
    >
      Cerrar Sesión
    </button>
  );
}