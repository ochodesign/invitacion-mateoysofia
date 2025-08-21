import React from "react";
import { Heart, Sparkles, Users, Camera, Quote, Infinity, Flower2 } from "lucide-react";

const imagenes = [
  "/img/galeria/galeria1.webp",
  "/img/galeria/galeria2.webp",
  "/img/galeria/galeria3.webp",
  "/img/galeria/galeria4.webp",
];

const Galeria = () => {
  // ...existing code...
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bgSection via-contrast to-bgSection/60 flex flex-col items-center overflow-hidden">
      {/* Decoraciones flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-20 left-8 w-6 h-6 text-accent/30 animate-pulse hidden lg:block" />
        <Sparkles className="absolute top-32 right-12 w-5 h-5 text-primary/40 animate-pulse hidden lg:block" style={{animationDelay: '2s'}} />
        <Flower2 className="absolute bottom-40 left-16 w-7 h-7 text-accent/20 animate-pulse hidden lg:block" style={{animationDelay: '4s'}} />
        <Heart className="absolute bottom-32 right-8 w-5 h-5 text-primary/30 animate-pulse hidden lg:block" style={{animationDelay: '6s'}} />
      </div>

      {/* Título con decoración */}
      <div className="relative mb-12 text-center">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <Heart className="w-6 h-6 text-primary animate-pulse" style={{animationDelay: '1s'}} />
            <Sparkles className="w-5 h-5 text-accent animate-pulse" style={{animationDelay: '2s'}} />
          </div>
        </div>
        
  <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Sobre Nosotros</h2>
        
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <Users className="w-5 h-5 text-primary" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent via-accent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Contenido principal mejorado */}
      <div className="flex flex-col items-center mb-16 max-w-4xl mx-auto">
        {/* Imagen con decoración romántica */}
        <div className="relative mb-8 group">
          {/* Decoraciones alrededor de la imagen */}
          <div className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Heart className="w-6 h-6 text-accent animate-pulse" />
          </div>
          <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" style={{animationDelay: '0.5s'}} />
          </div>
          <div className="absolute -bottom-3 -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Flower2 className="w-5 h-5 text-accent animate-pulse" style={{animationDelay: '1s'}} />
          </div>
          <div className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Infinity className="w-6 h-6 text-primary animate-pulse" style={{animationDelay: '1.5s'}} />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl transform scale-110"></div>
            <img 
              src="/img/galeria/sobrenosotros.webp" 
              alt="Sofía y Mateo" 
              className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105" 
              style={{ objectPosition: '50% center' }}
            />
          </div>
        </div>

        {/* Textos con mejor diseño */}
        <div className="text-center space-y-6">
          {/* Frase principal con icono de quote */}
          <div className="relative">
            <Quote className="absolute -top-2 -left-6 w-8 h-8 text-accent/40 hidden md:block" />
            <p className="text-xl md:text-2xl font-lora font-medium text-primary leading-relaxed px-4">
              Nuestra historia juntos está llena de momentos únicos. 
              <span className="block mt-2 text-accent font-semibold">
                ¡Queremos compartir este día especial con vos!
              </span>
            </p>
            <Quote className="absolute -bottom-2 -right-6 w-8 h-8 text-accent/40 rotate-180 hidden md:block" />
          </div>

          {/* Texto expandido con mejor tipografía */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Heart className="w-6 h-6 text-accent bg-white rounded-full p-1 shadow-md" />
            </div>
            
            <p className="text-primary font-lora text-center text-lg leading-relaxed">
              El amor es ese hilo invisible que une nuestras vidas, que nos impulsa a crecer, a soñar y a acompañarnos en cada paso. 
              Es la risa compartida, el apoyo en los días difíciles y la alegría de construir un futuro juntos.
            </p>
            
            <div className="flex items-center justify-center my-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              <Infinity className="w-6 h-6 text-primary mx-4" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-accent to-transparent"></div>
            </div>
            
            <p className="text-primary font-lora text-center text-lg leading-relaxed">
              Creemos que el amor se celebra en los pequeños gestos cotidianos y en los grandes momentos, como este que queremos vivir con quienes más queremos. 
              <span className="block mt-4 text-accent font-semibold">
                Gracias por ser parte de nuestra historia y por acompañarnos en este nuevo capítulo.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Título de galería con iconos */}
      <div className="relative mb-8 text-center">
        <div className="flex items-center justify-center gap-4">
          <Camera className="w-6 h-6 text-accent" />
          <h3 className="text-2xl md:text-3xl font-lora font-semibold text-primary">Nuestra Galería</h3>
          <Camera className="w-6 h-6 text-accent" />
        </div>
        <div className="mt-2 flex items-center justify-center">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <Sparkles className="w-4 h-4 text-accent mx-3" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent via-primary to-transparent"></div>
        </div>
      </div>

      {/* Grid de imágenes mejorado y centrado */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 max-w-6xl mx-auto">
      {imagenes.map((img, i) => (
        <div 
          key={img} 
          className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 hover:border-accent transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
          <img 
            src={img} 
            alt={`Galería ${i+1}`} 
            className="w-full h-48 sm:h-64 lg:h-72 object-cover" 
          />
        </div>
      ))}
      </div>
    </section>
  );
};

export default Galeria;
