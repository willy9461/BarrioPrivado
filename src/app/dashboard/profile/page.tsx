import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Obtener información adicional del usuario desde nuestra base de datos
  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      Expensa: {
        orderBy: { dueDate: 'desc' },
        take: 5 // Últimas 5 expensas
      }
    }
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Perfil de Usuario</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información del usuario */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Información de la Cuenta</h2>
          <div className="space-y-3">
            <p>
              <strong className="font-semibold">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="font-semibold">Nombre:</strong> {userProfile?.name || 'No especificado'}
            </p>
            <p>
              <strong className="font-semibold">Rol:</strong> {userProfile?.role || 'USER'}
            </p>
            <p>
              <strong className="font-semibold">Último inicio de sesión:</strong>{" "}
              {user.last_sign_in_at
                ? new Date(user.last_sign_in_at).toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' })
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Resumen de expensas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mis Expensas Recientes</h2>
          {userProfile?.Expensa && userProfile.Expensa.length > 0 ? (
            <div className="space-y-3">
              {userProfile.Expensa.map((expensa) => (
                <div key={expensa.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">${expensa.amount}</p>
                  <p className="text-sm text-gray-600">
                    Vence: {new Date(expensa.dueDate).toLocaleDateString('es-AR')}
                  </p>
                  <p className="text-xs">
                    <span className={`px-2 py-1 rounded ${expensa.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {expensa.paid ? 'Pagada' : 'Pendiente'}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tienes expensas registradas.</p>
          )}
        </div>
      </div>
    </>
  );
}