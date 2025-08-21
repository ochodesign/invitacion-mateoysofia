import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const RomanticWelcome = ({ onComplete }) => {
  useEffect(() => {
    // Ir directo a la web sin transiciones
    const timer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: '#C97B63',
      }}
    >
      {/* Partículas románticas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Contenido principal */}
      <div className="relative text-center">
        {/* Nombres principales - aparecen de inmediato */}
        <div className="opacity-100">
          <h1 className="text-6xl md:text-8xl italic text-white mb-4 tracking-wider" style={{ fontFamily: 'Dancing Script, Brush Script MT, cursive' }}>
            <span className="inline-block">
              Mateo
            </span>
            <span className="inline-block mx-6">
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-white fill-current animate-pulse" />
            </span>
            <span className="inline-block">
              Sofía
            </span>
          </h1>
        </div>

        {/* Texto romántico - aparece de inmediato */}
        <p className="text-lg md:text-xl text-white/90 font-light italic mb-8 tracking-wide opacity-100">
          Te invitamos a celebrar nuestro amor
        </p>

        {/* Indicador de carga sutil */}
        <div className="mt-12 opacity-100">
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/80 rounded-full animate-pulse"
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
  );
};

export default RomanticWelcome;
