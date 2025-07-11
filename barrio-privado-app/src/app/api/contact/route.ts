import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { nombre, email, mensaje } = await request.json();

  // Configura tu transporte SMTP (ejemplo con Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // tu email
      pass: process.env.EMAIL_PASS, // tu contraseña o app password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web Contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // tu email
      subject: "Nuevo mensaje de contacto",
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
      html: `<p><b>Nombre:</b> ${nombre}</p><p><b>Email:</b> ${email}</p><p><b>Mensaje:</b> ${mensaje}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}