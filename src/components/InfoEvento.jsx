import React from "react";
import { RingsSVG } from "./WeddingSVGs";

const InfoEvento = () => {
  // ...implementación de la sección de información del evento con SVGs decorativos...
  return (
  <section className="relative w-full py-10 px-2 sm:px-4 bg-white flex flex-col items-center overflow-x-hidden">
      <div className="flex flex-col items-center mb-8">
  <h2 className="text-2xl md:text-3xl font-lora font-bold text-primary mt-2">Información del Evento</h2>
      </div>


      {/* NUEVO DISEÑO DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-8 items-stretch justify-center">
        {/* Card Ceremonia */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl border-2 border-primary p-6 text-center h-full">
  <img src="/img/servicios/iglesia.svg" alt="Ceremonia" className="w-16 h-16 mb-4 object-contain" style={{filter: 'drop-shadow(0 0 2px #5A0B0B)'}} />
  <span className="font-lora text-primary font-bold text-xl mb-2">Ceremonia</span>
  <span className="text-primary font-semibold">Sábado 29 de noviembre 2025</span>
  <span className="text-primary">10:45 hs</span>
  <span className="text-primary">San Juan Bautista</span>
  <span className="text-primary text-sm">Nueva York 4717, Villa Devoto</span>
  <a
    href="https://www.google.com/maps?q=Nueva+York+4717,+Villa+Devoto"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary underline text-sm mt-2"
  >
    Ver en Google Maps
  </a>
</div>
        {/* Card Dress Code */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl border-2 border-primary p-6 text-center h-full">
          <img src="/img/servicios/parejas.svg" alt="Dress code elegante sport" className="w-16 h-16 mb-4 object-contain" style={{filter: 'drop-shadow(0 0 2px #5A0B0B)'}} />
          <span className="font-lora text-primary font-bold text-xl mb-2">¿Cómo ir vestido?</span>
          <span className="text-primary font-semibold">Elegante sport</span>
          <span className="text-primary">Look prolijo y cómodo, sin corbata.</span>
        </div>
        {/* Card Fiesta */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl border-2 border-primary p-6 text-center h-full">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="#fff" className="text-primary"/>
            <path d="M24 14a8 8 0 0 1 8 8c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 8-8zm0 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" className="text-primary"/>
          </svg>
          <span className="font-lora text-primary font-bold text-xl mb-2">Fiesta</span>
          <span className="font-lora text-primary font-bold text-lg mt-2 mb-1">Puro Cuento</span>
          <span className="text-primary font-semibold">De 12 a 17 hs</span>
          <span className="text-primary text-sm">Nueva York 4975, C1419HEK Cdad. Autónoma de Buenos Aires</span>
          <a
            href="https://www.google.com/maps?q=Nueva+York+4975,+C1419HEK+Ciudad+Autónoma+de+Buenos+Aires"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-sm mt-2"
          >
            Ver en Google Maps
          </a>
        </div>
      </div>
  <div className="w-full flex justify-center mb-4">
        <iframe
          title="Mapa Iglesia San Juan Bautista"
          src="https://www.google.com/maps?q=Nueva+York+4717,+Villa+Devoto&output=embed"
          width="100%"
          height="220"
          style={{ border: 0, borderRadius: '1rem', maxWidth: 600 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="w-full flex justify-center">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Nueva+York+4717,+Villa+Devoto"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white font-lora font-bold py-2 px-6 rounded shadow hover:bg-primary-dark hover:text-white transition"
        >
          Cómo llegar
        </a>
      </div>
    </section>
  );
};

export default InfoEvento;
