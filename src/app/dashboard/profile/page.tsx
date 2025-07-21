import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Perfil de Usuario</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <p className="mb-2">
          <strong className="font-semibold">ID de Usuario:</strong> {user.id}
        </p>
        <p className="mb-2">
          <strong className="font-semibold">Email:</strong> {user.email}
        </p>
        <p>
          <strong className="font-semibold">Último inicio de sesión:</strong>{" "}
          {user.last_sign_in_at
            ? new Date(user.last_sign_in_at).toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' })
            : 'N/A'}
        </p>
      </div>
    </>
  );
}