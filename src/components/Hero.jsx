import React from "react";
import { Heart, Sparkles, Calendar, ChevronDown, Flower2, Infinity } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative w-screen min-h-[90vh] flex flex-col justify-center items-center text-center bg-cover bg-center hero-bg-responsive overflow-hidden max-w-full"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        /* Prevenir scroll horizontal globalmente */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        /* Asegurar que todos los elementos absolutos no salgan del viewport */
        * {
          box-sizing: border-box;
        }
        
        .hero-bg-responsive {
          background-image: url('/img/bg-hero/bgherodk.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 100vw;
          max-width: 100%;
        }
        @media (max-width: 639px) {
          .hero-bg-responsive {
            background-image: url('/img/bg-hero/bgheromb.webp');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 100vw;
            max-width: 100%;
          }
        }
        .floating-hearts {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-5deg); }
        }
      `}</style>
      
      {/* Overlay gradiente mejorado - más oscuro para mejor contraste del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      
      {/* Decoraciones flotantes para desktop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Esquina superior izquierda */}
        <div className="absolute top-8 left-8 hidden md:block">
          <div className="relative">
            <Heart className="w-6 h-6 text-accent/70 absolute top-0 left-0 animate-pulse" />
            <Sparkles className="w-8 h-8 text-white/60 absolute top-6 left-6 floating-hearts" />
            <Flower2 className="w-5 h-5 text-accent/60 absolute top-12 left-2 animate-pulse" style={{animationDelay: '2s'}} />
          </div>
        </div>
        
        {/* Esquina superior derecha */}
        <div className="absolute top-8 right-8 hidden md:block">
          <div className="relative">
            <Sparkles className="w-7 h-7 text-accent/60 absolute top-0 right-0 animate-pulse" style={{animationDelay: '1s'}} />
            <Heart className="w-5 h-5 text-white/70 absolute top-8 right-8 floating-hearts" />
            <Flower2 className="w-6 h-6 text-accent/50 absolute top-14 right-2 animate-pulse" style={{animationDelay: '3s'}} />
          </div>
        </div>
        
        {/* Esquina inferior izquierda */}
        <div className="absolute left-4 bottom-8 hidden md:block">
          <div className="relative">
            <Flower2 className="w-7 h-7 text-white/60 absolute bottom-0 left-0 floating-hearts" />
            <Heart className="w-5 h-5 text-accent/70 absolute bottom-6 left-6 animate-pulse" style={{animationDelay: '0.5s'}} />
            <Sparkles className="w-6 h-6 text-white/50 absolute bottom-12 left-2 animate-pulse" style={{animationDelay: '2.5s'}} />
          </div>
        </div>
        
        {/* Esquina inferior derecha */}
        <div className="absolute right-4 bottom-8 hidden md:block">
          <div className="relative">
            <Heart className="w-8 h-8 text-white/60 absolute bottom-0 right-0 animate-pulse" style={{animationDelay: '1.5s'}} />
            <Flower2 className="w-10 h-10 text-accent/70 absolute bottom-4 right-4 floating-hearts" />
            <Sparkles className="w-6 h-6 text-white/50 absolute bottom-10 right-0 animate-pulse" style={{animationDelay: '4s'}} />
          </div>
        </div>
        
        {/* Decoraciones flotantes para móvil - ajustadas para evitar overflow */}
        <div className="absolute inset-0 md:hidden overflow-hidden">
          <Heart className="absolute top-8 right-2 w-5 h-5 text-accent/60 animate-pulse" />
          <Sparkles className="absolute top-12 left-2 w-4 h-4 text-white/60 animate-pulse" style={{animationDelay: '2s'}} />
          <Flower2 className="absolute bottom-16 right-2 w-6 h-6 text-accent/50 floating-hearts" />
          <Heart className="absolute bottom-20 left-2 w-4 h-4 text-white/50 animate-pulse" style={{animationDelay: '3s'}} />
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full py-16 w-full max-w-full px-4 sm:px-6">
        {/* Fecha con decoración romántica */}
        <div className="flex items-center justify-center w-full mb-8 max-w-full">
          <div className="hidden sm:flex flex-1 items-center justify-end mr-6 max-w-[calc(50%-100px)]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-accent/60"></div>
            <Flower2 className="w-5 h-5 text-accent/80 mx-2" />
          </div>
          
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-3 border border-white/20 flex-shrink-0">
            <Calendar className="w-5 h-5 text-accent mr-3" />
            <AnimatedHeroText tag="span" className="text-white text-base sm:text-lg font-semibold tracking-widest" text="29.11.2025" />
            <Heart className="w-5 h-5 text-accent ml-3 animate-pulse" />
          </div>
          
          <div className="hidden sm:flex flex-1 items-center justify-start ml-6 max-w-[calc(50%-100px)]">
            <Flower2 className="w-5 h-5 text-accent/80 mx-2" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/40 to-accent/60"></div>
          </div>
        </div>
        
        {/* Nombres con animación y decoración */}
        <div className="relative mb-6">
          {/* Decoración alrededor de los nombres */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-4">
              <Sparkles className="w-6 h-6 text-accent animate-pulse" style={{animationDelay: '0.5s'}} />
              <Heart className="w-8 h-8 text-accent/80 animate-pulse" />
              <Sparkles className="w-6 h-6 text-accent animate-pulse" style={{animationDelay: '1.5s'}} />
            </div>
          </div>
          
          <AnimatedHeroText />
          
          {/* Decoración debajo de los nombres */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              <Infinity className="w-6 h-6 text-accent floating-hearts" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent via-accent to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Frase de amor con decoración y padding mejorado */}
        <div className="relative w-full max-w-3xl mx-auto px-4">
          <div className="absolute -left-4 top-0 hidden md:block">
            <Heart className="w-6 h-6 text-accent/60 animate-pulse" style={{animationDelay: '2s'}} />
          </div>
          <div className="absolute -right-4 bottom-0 hidden md:block">
            <Heart className="w-6 h-6 text-accent/60 animate-pulse" style={{animationDelay: '3s'}} />
          </div>
          
          <AnimatedHeroText 
            tag="p" 
            className="text-white text-base sm:text-lg md:text-2xl font-lora font-light italic mt-6 mb-8 w-full max-w-2xl mx-auto drop-shadow-lg px-4 sm:px-6 md:px-8 text-center leading-relaxed" 
            text={'"Amar es una decisión y nosotros decidimos amarnos hoy y siempre."'} 
          />
          
          {/* Pequeñas decoraciones móvil */}
          <div className="absolute top-0 left-0 md:hidden">
            <Sparkles className="w-3 h-3 text-accent/60 animate-pulse" />
          </div>
          <div className="absolute bottom-0 right-0 md:hidden">
            <Sparkles className="w-3 h-3 text-accent/60 animate-pulse" style={{animationDelay: '2s'}} />
          </div>
        </div>
        
        {/* Flecha scroll mejorada con scroll suave */}
        <a 
          href="#countdown" 
          className="mt-8 group"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('countdown')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
            <ChevronDown className="w-8 h-8 text-white animate-bounce group-hover:text-accent transition-colors" />
          </div>
        </a>
        
        {/* Decoración de corazones flotantes adicionales */}
        <div className="absolute top-1/4 left-8 hidden lg:block">
          <Heart className="w-4 h-4 text-white/30 floating-hearts" />
        </div>
        <div className="absolute top-1/3 right-12 hidden lg:block">
          <Sparkles className="w-5 h-5 text-accent/40 animate-pulse" style={{animationDelay: '4s'}} />
        </div>
        <div className="absolute bottom-1/4 left-16 hidden lg:block">
          <Flower2 className="w-6 h-6 text-accent/30 floating-hearts" />
        </div>
        <div className="absolute bottom-1/3 right-8 hidden lg:block">
          <Heart className="w-5 h-5 text-white/40 animate-pulse" style={{animationDelay: '5s'}} />
        </div>
      </div>
    </section>
  );
};

// Animación de fade-in y slide-up para el texto del Hero
function AnimatedHeroText({ tag = "h1", className = "", text = null }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);
  const baseClass =
    "transition-all duration-1000 ease-out " +
    (show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");
  if (!text) {
    // Responsive: mobile en 3 líneas, desktop en una sola línea
    return (
      <>
        {/* Mobile: 3 líneas */}
        <h1
          className={
            `block md:hidden text-4xl xs:text-5xl italic font-bold text-white mb-2 drop-shadow-lg flex flex-col items-center justify-center w-full max-w-full break-words ${baseClass}` +
            (className ? ` ${className}` : "")
          }
          style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            wordBreak: "break-word", 
            lineHeight: "1.1" 
          }}
        >
          <span className="block text-5xl xs:text-6xl">Julieta</span>
          <span className="text-accent text-5xl xs:text-6xl font-serif my-1">&</span>
          <span className="block text-5xl xs:text-6xl">Ariel</span>
        </h1>
        {/* Desktop: una sola línea */}
        <h1
          className={
            `hidden md:flex italic font-bold text-white mb-2 drop-shadow-lg flex-row items-center gap-4 justify-center w-full max-w-full break-words ${baseClass}` +
            (className ? ` ${className}` : "")
          }
          style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            wordBreak: "break-word", 
            lineHeight: "1.1" 
          }}
        >
          <span className="text-5xl lg:text-6xl">Julieta</span>
          <span className="text-accent text-5xl lg:text-6xl font-serif mx-2">&</span>
          <span className="text-5xl lg:text-6xl">Ariel</span>
        </h1>
      </>
    );
  }
  const Tag = tag;
  return (
    <Tag className={className + " " + baseClass}>{text}</Tag>
  );
}

export default Hero;
