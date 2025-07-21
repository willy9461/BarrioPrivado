"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { type User } from "@supabase/supabase-js";
import LogoutButton from "@/components/LogoutButton";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Creamos el cliente de Supabase para el navegador
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, [supabase.auth]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending"); // Inicia el envío

    const form = e.target as HTMLFormElement;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormStatus("success"); // Éxito
        form.reset();
      } else {
        setFormStatus("error"); // Error del servidor
      }
    } catch (error) {
      console.error("Error de red al enviar el formulario:", error);
      setFormStatus("error"); // Error de red o de cliente
    }
  };

  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white bg-opacity-80 shadow-md fixed top-0 left-0 z-20">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-gray-600 text-blue-900 transition"
        >
          El Remanso
        </Link>
        {/* Botón hamburguesa para mobile */}
        <button
          className="md:hidden text-blue-900 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Menú de navegación */}
        <div
          className={`flex-col md:flex-row md:flex items-center gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-gray-100 bg-opacity-95 md:bg-transparent transition-all duration-300 z-30 ${
            menuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <a
            href="#sobre"
            className=" hover:text-gray-600 text-blue-900 font-medium transition py-4 md:py-0 text-lg md:text-base text-center w-full md:w-auto"
            onClick={() => setMenuOpen(false)}
          >
            Sobre nosotros
          </a>
          <a
            href="#ubicacion"
            className=" hover:text-gray-600 text-blue-900 font-medium transition py-4 md:py-0 text-lg md:text-base text-center w-full md:w-auto"
            onClick={() => setMenuOpen(false)}
          >
            Ubicación
          </a>
          <a
            href="#amenities"
            className=" hover:text-gray-600 text-blue-900 font-medium transition py-4 md:py-0 text-lg md:text-base text-center w-full md:w-auto"
            onClick={() => setMenuOpen(false)}
          >
            Instalaciones
          </a>
          {/* Renderizado condicional basado en el estado del usuario */}
          {!loading &&
            (user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-200 hover:text-gray-600 transition font-medium ml-4 text-center w-full md:w-auto"
                >
                  Ir al Perfil
                </Link>
                <div className="ml-2">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-200 hover:text-gray-600 transition font-medium ml-4 text-center w-full md:w-auto"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-blue-900 px-5 py-2 rounded hover:bg-blue-100 hover:text-blue-900 transition font-medium ml-2 text-center w-full md:w-auto"
                >
                  Registrarse
                </Link>
              </>
            ))}
        </div>
      </nav>

      {/* Hero con parallax */}
      <section className="relative h-[100vh] pt-20">
        {/* Imagen de fondo fija */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/heroElRemanso.jpg')" }}
        />

        {/* Capa oscura encima */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Contenido sobre el fondo */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">El Remanso</h1>
          <p className="text-lg md:text-2xl mb-6 max-w-xl">
            Naturaleza, tranquilidad y comunidad. <br />
            Viví como soñás.
          </p>
          <a
            href="#sobre"
            className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Conocé más
          </a>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section
        id="sobre"
        className="min-h-screen bg-white flex items-center justify-center text-center p-8"
      >
        <div>
          <h2 className="text-3xl text-blue-900 font-semibold mb-4 mt-12">
            Sobre El Remanso
          </h2>
          <p className="max-w-2xl text-gray-700">
            El Remanso es un barrio cerrado diseñado para vivir en contacto con
            la naturaleza, con todas las comodidades modernas y un ambiente de
            comunidad único.
          </p>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="my-8 w-full max-w-3xl"
          >
            <SwiperSlide>
              <Image
                src="/remanso05.jpg"
                alt="Imagen 5"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso02.jpg"
                alt="Imagen 2"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso03.jpg"
                alt="Imagen 3"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso04.jpg"
                alt="Imagen 4"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso01.jpg"
                alt="Imagen 51"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso06.jpg"
                alt="Imagen 6"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso07.jpg"
                alt="Imagen 7"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso08.jpg"
                alt="Imagen 8"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/remanso09.jpg"
                alt="Imagen 9"
                className="rounded-lg shadow"
                width={900}
                height={600}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section
        id="ubicacion"
        className="min-h-screen bg-gray-100 flex items-center justify-center p-8"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Texto descriptivo */}
          <div>
            <h2 className="text-3xl text-blue-900 font-bold mb-4">Ubicación</h2>
            <p className="text-gray-700 mb-6">
              El Remanso está ubicado en una zona estratégica a minutos de la
              ciudad, rodeado de naturaleza y con acceso directo desde la ruta
              129.Ideal para quienes buscan tranquilidad sin alejarse del
              confort urbano.
            </p>
            <a
              href="https://www.google.com/maps/place/El+Remanso,+Provincia+de+Buenos+Aires" // Reemplazá por tu ubicación exacta
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Ver en Google Maps
            </a>
          </div>

          {/* Mapa embebido */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.051401029997!2d-57.69190568924829!3d-30.250542240758712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ad2937cad89ce1%3A0x65edbeeb80930cb9!2sBarrio%20El%20Remanso%20-%20Monte%20Caseros!5e1!3m2!1ses-419!2spt!4v1750616242446!5m2!1ses-419!2spt"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <section
        id="amenities"
        className="bg-white py-20 px-6 md:px-10 lg:px-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-900">
          Instalaciones del Barrio
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Amenity 1 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-green-600">🏀</div>
            <h3 className="text-xl font-semibold mb-2">Canchas deportivas</h3>
            <p className="text-gray-600">
              Espacios para fútbol, tenis y básquet con iluminación nocturna.
            </p>
          </div>

          {/* Amenity 2 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-blue-500">🏊‍♂️</div>
            <h3 className="text-xl font-semibold mb-2">Piscina y solárium</h3>
            <p className="text-gray-600">
              Zona recreativa con pileta, reposeras y quincho techado.
            </p>
          </div>

          {/* Amenity 3 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-yellow-500">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">Seguridad 24/7</h3>
            <p className="text-gray-600">
              Acceso controlado, cámaras de vigilancia y sistemas de alarmas.
            </p>
          </div>

          {/* Amenity 4 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-pink-500">🏡</div>
            <h3 className="text-xl font-semibold mb-2">Capilla</h3>
            <p className="text-gray-600">
              Capilla réplica exacta de la Porciúncula de San Francisco de Asís
            </p>
          </div>

          {/* Amenity 5 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-indigo-500">🌳</div>
            <h3 className="text-xl font-semibold mb-2">Espacios verdes</h3>
            <p className="text-gray-600">
              Senderos para caminar y lago artificial.
            </p>
          </div>

          {/* Amenity 6 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-red-500">🚸</div>
            <h3 className="text-xl font-semibold mb-2">Zona kids</h3>
            <p className="text-gray-600">
              Juegos infantiles seguros y entretenidos para los más chicos.
            </p>
          </div>
        </div>
      </section>
      <section
        id="contacto"
        className="bg-gray-900 text-white py-20 px-6 md:px-10 lg:px-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Contacto</h2>
        <form
          onSubmit={handleContactSubmit}
          className="max-w-xl mx-auto flex flex-col gap-6"
        >
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            required
            className="p-3 rounded text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            required
            className="p-3 rounded text-black"
          />
          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            required
            className="p-3 rounded text-black"
            rows={5}
          />
          <button
            type="submit"
            className="w-1/2 md:w-full mx-auto bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded transition disabled:bg-gray-500"
            disabled={formStatus === "sending"}
          >
            {formStatus === "sending" ? "Enviando..." : "Enviar"}
          </button>
          {formStatus === "success" && (
            <p className="text-green-400 mt-4">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
            </p>
          )}
          {formStatus === "error" && (
            <p className="text-red-400 mt-4">
              Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
            </p>
          )}
        </form>
      </section>
      <footer className="bg-gray-800 text-gray-500 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} El Remanso. Todos los derechos
          reservados.
        </p>
        <p className="text-xs mt-2">Desarrollado por Guillermo Galarraga</p>
      </footer>
    </main>
  );
}
