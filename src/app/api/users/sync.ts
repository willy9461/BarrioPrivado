import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Endpoint para sincronizar usuario de Supabase Auth con la tabla SQL `users`
export async function POST(req: NextRequest) {
  try {
    const { id, email } = await req.json();
    if (!id || !email) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // Buscar si el usuario ya existe en la tabla users
    let user = await prisma.user.findUnique({ where: { id } });

    // Si no existe, lo creamos
    if (!user) {
      user = await prisma.user.create({
        data: {
          id, // El id de Supabase Auth (UUID)
          email,
          // Puedes agregar más campos aquí si tu modelo lo permite
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error en /api/users/sync:", error); // Mantener el registro detallado
    return NextResponse.json({ error: "Error en la sincronización de usuario" }, { status: 500 });
  }
}
