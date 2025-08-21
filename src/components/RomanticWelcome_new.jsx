import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const RomanticWelcome = ({ onComplete }) => {
  const [split, setSplit] = useState(false);

  useEffect(() => {
    // Espera y luego inicia el split
    const timer = setTimeout(() => {
      setSplit(true);
    }, 1500);
    // Cuando split es true, espera la animación y luego va a la pantalla principal
    if (split) {
      const finish = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(finish);
    }
    return () => clearTimeout(timer);
  }, [split, onComplete]);

  return (
  <div className="fixed inset-0 z-50 bg-transparent">
      {/* Split panels */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {/* Panel izquierdo */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-[#C97B63] transition-all duration-1000 ease-in-out ${split ? '-translate-x-full' : ''}`}
        />
        {/* Panel derecho */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 bg-[#C97B63] transition-all duration-1000 ease-in-out ${split ? 'translate-x-full' : ''}`}
        />
      </div>
      {/* Contenido principal centrado */}
  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${split ? 'opacity-0 scale-90 bg-transparent' : 'opacity-100 scale-100 bg-transparent'}`} style={{zIndex:50}}>
        {/* Partículas románticas de fondo */}
  <div className="absolute inset-0 overflow-hidden bg-transparent">
          {[...Array(20)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-white/20 animate-pulse opacity-100"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `scale(${0.5 + Math.random() * 0.5})`,
              }}
            />
          ))}
        </div>
  <div className="relative text-center bg-transparent">
          {/* Nombres principales */}
          <h1 className="text-6xl md:text-8xl italic text-white mb-4 tracking-wider bg-transparent" style={{ fontFamily: 'Dancing Script, Brush Script MT, cursive' }}>
            <span className="inline-block">Mateo</span>
            <span className="inline-block mx-6">
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-white fill-current animate-pulse" />
            </span>
            <span className="inline-block">Sofía</span>
          </h1>
          {/* Texto romántico */}
          <p className="text-lg md:text-xl text-white/90 font-light italic mb-8 tracking-wide bg-transparent">Te invitamos a celebrar nuestro amor</p>
          {/* Indicador de carga sutil */}
          <div className="mt-12 bg-transparent">
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-bordo/80 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.5s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RomanticWelcome;
