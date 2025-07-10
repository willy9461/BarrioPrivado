"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white bg-opacity-80 shadow-md fixed top-0 left-0 z-20">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition"
        >
          El Remanso
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#sobre"
            className="text-gray-700 hover:text-blue-500 font-medium transition"
          >
            Sobre nosotros
          </a>
          <a
            href="#ubicacion"
            className="text-gray-700 hover:text-blue-500 font-medium transition"
          >
            Ubicación
          </a>
          <a
            href="#amenities"
            className="text-gray-700 hover:text-blue-500 font-medium transition"
          >
            Instalaciones
          </a>
          <a
            href="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 transition font-semibold ml-4"
          >
            Iniciar sesión
          </a>
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

      {/* Sección siguiente */}
      <section
        id="sobre"
        className="min-h-screen bg-white flex items-center justify-center text-center p-8"
      >
        <div>
          <h2 className="text-3xl font-semibold mb-4">Sobre El Remanso</h2>
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
              <Image src="/remanso01.jpg" alt="Imagen 1" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso02.jpg" alt="Imagen 2" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso03.jpg" alt="Imagen 3" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso04.jpg" alt="Imagen 4" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso05.jpg" alt="Imagen 5" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso06.jpg" alt="Imagen 6" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso07.jpg" alt="Imagen 7" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso08.jpg" alt="Imagen 8" className="rounded-lg shadow" width={900} height={600} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/remanso09.jpg" alt="Imagen 9" className="rounded-lg shadow" width={900} height={600} />
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
            <h2 className="text-3xl font-bold mb-4">Ubicación</h2>
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
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Ver en Google Maps
            </a>
          </div>

          {/* Mapa embebido */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.051401029997!2d-57.69190568924829!3d-30.250542240758712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ad2937cad89ce1%3A0x65edbeeb80930cb9!2sBarrio%20El%20Remanso%20-%20Monte%20Caseros!5e1!3m2!1ses-419!2spt!4v1750616242446!5m2!1ses-419!2spt"
              width="600"
              height="450"
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
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
    </main>
  );
}
