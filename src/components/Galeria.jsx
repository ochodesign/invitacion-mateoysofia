import React, { useState } from "react";

const imagenes = [
  "/img/galeria/galeria1.webp",
  "/img/galeria/galeria2.webp",
  "/img/galeria/galeria3.webp",
  "/img/galeria/galeria4.webp",
];

const Galeria = () => {
  const [lightbox, setLightbox] = useState(null);
  return (
  <section className="w-full py-10 px-2 sm:px-4 bg-bgSection flex flex-col items-center overflow-x-hidden mt-20">
  <h2 className="text-2xl md:text-3xl font-lora font-bold text-primary mb-6">Sobre Nosotros</h2>
      <div className="flex flex-col items-center mb-6">
        <img src="/img/galeria/sobrenosotros.webp" alt="Karina y Sergio" className="w-40 h-40 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-primary shadow-xl mb-4" />
        <p className="text-primary font-lora text-center max-w-xl mb-2">Nuestra historia juntos está llena de momentos únicos. ¡Queremos compartir este día especial con vos!</p>
        <p className="text-primary font-lora text-center max-w-2xl text-base">El amor es ese hilo invisible que une nuestras vidas, que nos impulsa a crecer, a soñar y a acompañarnos en cada paso. Es la risa compartida, el apoyo en los días difíciles y la alegría de construir un futuro juntos. Creemos que el amor se celebra en los pequeños gestos cotidianos y en los grandes momentos, como este que queremos vivir con quienes más queremos. Gracias por ser parte de nuestra historia y por acompañarnos en este nuevo capítulo.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-4">
        {imagenes.map((img, i) => (
          <button key={img} className="focus:outline-none" onClick={() => setLightbox(i)}>
            <img src={img} alt={`Galería ${i+1}`} className="w-48 h-64 sm:w-56 sm:h-72 object-cover rounded-xl border-4 border-primary shadow-xl hover:scale-105 transition-transform" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox imagenes={imagenes} index={lightbox} setIndex={setLightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
};

function Lightbox({ imagenes, index, setIndex, onClose }) {
  React.useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowLeft') setIndex((index - 1 + imagenes.length) % imagenes.length);
      if (e.key === 'ArrowRight') setIndex((index + 1) % imagenes.length);
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, imagenes.length, setIndex, onClose]);
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary text-accent rounded-full p-3 shadow-lg hover:bg-primary-dark transition"
        onClick={e => {e.stopPropagation(); setIndex((index - 1 + imagenes.length) % imagenes.length);}}
        aria-label="Anterior"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <img src={imagenes[index]} alt="Ampliada" className="max-w-[90vw] max-h-[80vh] rounded-lg border-4 border-accent shadow-2xl" onClick={e => e.stopPropagation()} />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-accent rounded-full p-3 shadow-lg hover:bg-primary-dark transition"
        onClick={e => {e.stopPropagation(); setIndex((index + 1) % imagenes.length);}}
        aria-label="Siguiente"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      <button
        className="absolute top-4 right-4 bg-primary text-accent rounded-full p-2 shadow-lg hover:bg-primary-dark transition"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

export default Galeria;
