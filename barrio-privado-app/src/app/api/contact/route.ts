import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}

export async function POST(request: Request) {
  const { nombre, email, mensaje } = await request.json();

  // Configuro mi transporte SMTP (ejemplo con Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web Contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, 
      subject: "Nuevo mensaje de contacto",
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
      html: `<p><b>Nombre:</b> ${nombre}</p><p><b>Email:</b> ${email}</p><p><b>Mensaje:</b> ${mensaje}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    let errorMessage = "Error desconocido";
    if (isErrorWithMessage(error)) {
      errorMessage = error.message;
    }
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}