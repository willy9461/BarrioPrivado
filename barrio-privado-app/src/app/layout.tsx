import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "El Remanso",
  description: "Panel del barrio privado",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
