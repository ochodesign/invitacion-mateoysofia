import React from "react";
import { Heart, Sparkles, Calendar, ChevronDown, Flower2, Infinity } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative w-screen min-h-[90vh] flex flex-col justify-center items-center text-center bg-cover bg-center hero-bg-responsive overflow-hidden max-w-full bg-bgSection"
    >
  {/* Overlay gradiente más oscuro para mejor contraste del texto */}
  <div className="absolute inset-0 bg-black/50"></div>
      {/* Decoraciones flotantes y modernas */}
      {/* ...decoraciones existentes... */}
      {/* Contenido principal Hero */}
      <div className="relative z-30 flex flex-col justify-center items-center w-full px-4 py-8">
        {/* Fecha arriba del Hero */}
        <div className="w-full flex justify-center mb-8">
          <AnimatedHeroText tag="span" className="text-bordo font-semibold tracking-widest text-xl md:text-2xl bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-bordo/30 drop-shadow-lg" text="15.11.2025" />
        </div>
        {/* Nombres */}
        <AnimatedHeroText className="text-bordo drop-shadow-2xl font-dancing text-7xl md:text-9xl lg:text-[8rem] z-10 relative pointer-events-auto mb-6" />
        {/* Frase romántica */}
        <AnimatedHeroText 
          tag="p" 
          className="text-white text-xl md:text-2xl font-lora italic w-full max-w-2xl mx-auto drop-shadow-lg px-4 text-center leading-relaxed z-10" 
          text={
            <>
              <span className="block">Amar es una decisión</span>
              <span className="block">y nosotros decidimos amarnos hoy y siempre.</span>
            </>
          } 
        />
      </div>
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
    <div className="absolute inset-0 bg-bgSection/30 backdrop-blur-sm"></div>
      
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
        {/* Decoraciones sutiles y modernas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Heart className="absolute top-10 left-10 w-8 h-8 text-accent/40 animate-pulse" />
          <Sparkles className="absolute top-20 right-10 w-8 h-8 text-accent/30 animate-pulse" />
          <Flower2 className="absolute bottom-10 left-16 w-10 h-10 text-accent/20 animate-pulse" />
          <Heart className="absolute bottom-16 right-16 w-8 h-8 text-accent/30 animate-pulse" />
        </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full py-16 w-full max-w-full px-4 sm:px-6">
        {/* Fecha con decoración romántica */}
        <div className="flex items-center justify-center w-full mb-8 max-w-full">
          <div className="hidden sm:flex flex-1 items-center justify-end mr-6 max-w-[calc(50%-100px)]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-accent/60"></div>
            <Flower2 className="w-5 h-5 text-accent/80 mx-2" />
          </div>
          
          <div className="flex items-center bg-primary/80 backdrop-blur-sm rounded-full px-4 sm:px-6 py-3 border border-primary flex-shrink-0">
            <Calendar className="w-5 h-5 text-accent mr-3" />
            {/* Fecha ya está arriba, se elimina aquí para evitar duplicado */}
            <Heart className="w-5 h-5 text-accent ml-3 animate-pulse" />
          </div>
          
          <div className="hidden sm:flex flex-1 items-center justify-start ml-6 max-w-[calc(50%-100px)]">
            <Flower2 className="w-5 h-5 text-accent/80 mx-2" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/40 to-accent/60"></div>
          </div>
        </div>
          {/* Fecha destacada con borde plata y fondo translúcido */}
        {/* Frase de amor con decoración y padding mejorado */}
        <div className="relative w-full max-w-3xl mx-auto px-4">
          <div className="absolute -left-4 top-0 hidden md:block">
            <Heart className="w-6 h-6 text-accent/60 animate-pulse" style={{animationDelay: '2s'}} />
          </div>
          <div className="absolute -right-4 bottom-0 hidden md:block">
            <Heart className="w-6 h-6 text-accent/60 animate-pulse" style={{animationDelay: '3s'}} />
          </div>
          
          {/* Frase de amor ya está arriba, se elimina duplicado para mejor UX */}
          
          {/* Pequeñas decoraciones móvil */}
          <div className="absolute top-0 left-0 md:hidden">
            <Sparkles className="w-3 h-3 text-accent/60 animate-pulse" />
          </div>
          <div className="absolute bottom-0 right-0 md:hidden">
            <Sparkles className="w-3 h-3 text-accent/60 animate-pulse" style={{animationDelay: '2s'}} />
          </div>
        </div>
          {/* Frase de amor elegante y centrada */}
          {/* Solo una instancia, ya está arriba */}
        
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
            `block md:hidden text-6xl xs:text-7xl italic font-bold text-white mb-2 drop-shadow-lg flex flex-col items-center justify-center w-full max-w-full break-words ${baseClass}` +
            (className ? ` ${className}` : "")
          }
          style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            wordBreak: "break-word", 
            lineHeight: "1.1" 
          }}
        >
          <span className="block text-7xl xs:text-8xl text-white">Sofía</span>
          <span className="text-primary text-7xl xs:text-8xl font-serif my-1">&</span>
          <span className="block text-7xl xs:text-8xl text-white">Mateo</span>
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
          <span className="text-8xl lg:text-9xl text-white">Mateo</span>
          <span className="text-primary text-8xl lg:text-9xl font-serif mx-2">&</span>
          <span className="text-8xl lg:text-9xl text-white">Sofía</span>
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
