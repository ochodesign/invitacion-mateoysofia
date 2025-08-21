
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const BotonWhatsappFlotante = ({ telefono = "541164623427", mensaje = "Hola Sofía, tengo algunas dudas sobre el sitio y me gustaría consultarte." }) => {
  const [visible, setVisible] = useState(false);
  const [showMsg, setShowMsg] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (visible) {
      setShowMsg(true);
      const timer = setTimeout(() => setShowMsg(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [visible]);
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex flex-col items-end transition-opacity duration-500 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{transitionProperty:'opacity'}}
    >
      {/* Mensaje flotante */}
      {showMsg && (
  <div className="mb-2 bg-bgSection text-primary font-lora text-sm px-4 py-2 rounded-lg shadow-lg border border-accent animate-fadein" style={{maxWidth:240, letterSpacing:'.01em'}}>
          ¿Tienes dudas sobre el sitio? <span className="font-semibold">¡Escribile a la Pareja por WhatsApp!</span>
        </div>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
  className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
};

export default BotonWhatsappFlotante;
