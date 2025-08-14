import React from "react";
import { Heart, Sparkles, Calendar, Clock, Timer, Zap } from "lucide-react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(targetDate) - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative flex flex-col items-center justify-center bg-gradient-to-br from-bgSection/30 via-transparent to-bgSection/30 overflow-visible w-full py-16" style={{zIndex:2}}>
      <div className="relative flex flex-col items-center justify-center w-full" style={{overflow:'visible', zIndex:2}}>
        
        {/* Círculos decorativos animados con rosas */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{zIndex:1}}>
          <div className="relative w-[420px] h-[420px] max-w-[90vw] max-h-[90vw]">
            {/* Círculo exterior con gradiente */}
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border border-primary/20 animate-spin" style={{animationDuration: '20s'}}></div>
            <div className="absolute inset-4 rounded-full border border-accent/40 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* SVG Rosas decorativas alrededor del círculo */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Rosa superior */}
              <g transform="translate(210, 40)">
                <circle cx="0" cy="0" r="8" fill="#C97B63" opacity="0.8"/>
                <circle cx="0" cy="0" r="6" fill="#D4926A" opacity="0.9"/>
                <circle cx="0" cy="0" r="4" fill="#E8A677" opacity="1"/>
                <path d="M-3,-8 Q-6,-12 -2,-14 Q2,-12 6,-10 Q4,-6 0,-6 Q-4,-6 -3,-8 Z" fill="#7A5A3A" opacity="0.7"/>
                <path d="M3,-8 Q6,-10 8,-6 Q6,-4 4,-6 Q2,-8 3,-8 Z" fill="#7A5A3A" opacity="0.5"/>
              </g>
              
              {/* Rosa derecha */}
              <g transform="translate(370, 210) rotate(90)">
                <circle cx="0" cy="0" r="7" fill="#C97B63" opacity="0.7"/>
                <circle cx="0" cy="0" r="5" fill="#D4926A" opacity="0.8"/>
                <circle cx="0" cy="0" r="3" fill="#E8A677" opacity="1"/>
                <path d="M-2,-6 Q-5,-9 -1,-11 Q2,-9 5,-8 Q3,-5 0,-5 Q-3,-5 -2,-6 Z" fill="#7A5A3A" opacity="0.6"/>
              </g>
              
              {/* Rosa inferior */}
              <g transform="translate(210, 380) rotate(180)">
                <circle cx="0" cy="0" r="8" fill="#C97B63" opacity="0.8"/>
                <circle cx="0" cy="0" r="6" fill="#D4926A" opacity="0.9"/>
                <circle cx="0" cy="0" r="4" fill="#E8A677" opacity="1"/>
                <path d="M-3,-8 Q-6,-12 -2,-14 Q2,-12 6,-10 Q4,-6 0,-6 Q-4,-6 -3,-8 Z" fill="#7A5A3A" opacity="0.7"/>
                <path d="M3,-8 Q6,-10 8,-6 Q6,-4 4,-6 Q2,-8 3,-8 Z" fill="#7A5A3A" opacity="0.5"/>
              </g>
              
              {/* Rosa izquierda */}
              <g transform="translate(50, 210) rotate(270)">
                <circle cx="0" cy="0" r="7" fill="#C97B63" opacity="0.7"/>
                <circle cx="0" cy="0" r="5" fill="#D4926A" opacity="0.8"/>
                <circle cx="0" cy="0" r="3" fill="#E8A677" opacity="1"/>
                <path d="M-2,-6 Q-5,-9 -1,-11 Q2,-9 5,-8 Q3,-5 0,-5 Q-3,-5 -2,-6 Z" fill="#7A5A3A" opacity="0.6"/>
              </g>
              
              {/* Rosas diagonales más pequeñas */}
              <g transform="translate(320, 100) rotate(45)">
                <circle cx="0" cy="0" r="5" fill="#C97B63" opacity="0.6"/>
                <circle cx="0" cy="0" r="3" fill="#D4926A" opacity="0.7"/>
                <circle cx="0" cy="0" r="2" fill="#E8A677" opacity="0.9"/>
                <path d="M-1,-4 Q-3,-6 -1,-7 Q1,-6 3,-5 Q2,-3 0,-3 Q-2,-3 -1,-4 Z" fill="#7A5A3A" opacity="0.5"/>
              </g>
              
              <g transform="translate(100, 100) rotate(315)">
                <circle cx="0" cy="0" r="5" fill="#C97B63" opacity="0.6"/>
                <circle cx="0" cy="0" r="3" fill="#D4926A" opacity="0.7"/>
                <circle cx="0" cy="0" r="2" fill="#E8A677" opacity="0.9"/>
                <path d="M-1,-4 Q-3,-6 -1,-7 Q1,-6 3,-5 Q2,-3 0,-3 Q-2,-3 -1,-4 Z" fill="#7A5A3A" opacity="0.5"/>
              </g>
              
              <g transform="translate(100, 320) rotate(225)">
                <circle cx="0" cy="0" r="5" fill="#C97B63" opacity="0.6"/>
                <circle cx="0" cy="0" r="3" fill="#D4926A" opacity="0.7"/>
                <circle cx="0" cy="0" r="2" fill="#E8A677" opacity="0.9"/>
                <path d="M-1,-4 Q-3,-6 -1,-7 Q1,-6 3,-5 Q2,-3 0,-3 Q-2,-3 -1,-4 Z" fill="#7A5A3A" opacity="0.5"/>
              </g>
              
              <g transform="translate(320, 320) rotate(135)">
                <circle cx="0" cy="0" r="5" fill="#C97B63" opacity="0.6"/>
                <circle cx="0" cy="0" r="3" fill="#D4926A" opacity="0.7"/>
                <circle cx="0" cy="0" r="2" fill="#E8A677" opacity="0.9"/>
                <path d="M-1,-4 Q-3,-6 -1,-7 Q1,-6 3,-5 Q2,-3 0,-3 Q-2,-3 -1,-4 Z" fill="#7A5A3A" opacity="0.5"/>
              </g>
              
              {/* Hojas decorativas */}
              <g transform="translate(180, 70) rotate(30)">
                <ellipse cx="0" cy="0" rx="8" ry="3" fill="#272b00" opacity="0.4"/>
                <path d="M-6,0 Q0,-2 6,0 Q0,2 -6,0" fill="#5A7A3A" opacity="0.6"/>
              </g>
              
              <g transform="translate(240, 70) rotate(-30)">
                <ellipse cx="0" cy="0" rx="8" ry="3" fill="#272b00" opacity="0.4"/>
                <path d="M-6,0 Q0,-2 6,0 Q0,2 -6,0" fill="#5A7A3A" opacity="0.6"/>
              </g>
              
              <g transform="translate(350, 180) rotate(120)">
                <ellipse cx="0" cy="0" rx="6" ry="2" fill="#272b00" opacity="0.3"/>
                <path d="M-4,0 Q0,-1 4,0 Q0,1 -4,0" fill="#5A7A3A" opacity="0.5"/>
              </g>
              
              <g transform="translate(70, 240) rotate(-120)">
                <ellipse cx="0" cy="0" rx="6" ry="2" fill="#272b00" opacity="0.3"/>
                <path d="M-4,0 Q0,-1 4,0 Q0,1 -4,0" fill="#5A7A3A" opacity="0.5"/>
              </g>
            </svg>
            
            {/* Sparkles flotantes entre las rosas */}
            <Sparkles className="absolute top-8 right-12 w-6 h-6 text-accent animate-pulse" style={{animationDelay: '0.5s'}} />
            <Sparkles className="absolute bottom-12 left-8 w-4 h-4 text-primary animate-pulse" style={{animationDelay: '1.5s'}} />
            <Sparkles className="absolute top-16 left-16 w-5 h-5 text-accent animate-pulse" style={{animationDelay: '2s'}} />
            <Sparkles className="absolute bottom-8 right-16 w-4 h-4 text-primary animate-pulse" style={{animationDelay: '2.5s'}} />
          </div>
        </div>

        {/* Contenedor principal del contador */}
        <div className="relative bg-gradient-to-br from-contrast via-white to-contrast rounded-full shadow-2xl flex flex-col items-center justify-center w-[360px] h-[360px] max-w-[85vw] max-h-[85vw] px-6 py-8 border border-bgSection/20 backdrop-blur-sm" style={{zIndex:3}}>
          
          {/* Header con íconos */}
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-accent mr-2 animate-pulse" />
            <Calendar className="w-8 h-8 text-primary" />
            <Heart className="w-6 h-6 text-accent ml-2 animate-pulse" />
          </div>

          {/* Título */}
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-lora text-center">
            Faltan
          </div>
          
          {/* Línea decorativa */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-px bg-accent"></div>
            <Heart className="w-4 h-4 text-accent mx-2" />
            <div className="w-8 h-px bg-accent"></div>
          </div>

          {/* Contador principal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Días */}
            <div className="flex flex-col items-center bg-primary/5 rounded-xl p-3 border border-primary/10 hover:bg-primary/10 transition-colors">
              <Calendar className="w-5 h-5 text-primary mb-1" />
              <span className="text-2xl md:text-3xl font-bold text-primary">{timeLeft.days}</span>
              <span className="text-primary text-sm font-medium">días</span>
            </div>
            
            {/* Horas */}
            <div className="flex flex-col items-center bg-accent/5 rounded-xl p-3 border border-accent/10 hover:bg-accent/10 transition-colors">
              <Clock className="w-5 h-5 text-accent mb-1" />
              <span className="text-2xl md:text-3xl font-bold text-accent">{timeLeft.hours}</span>
              <span className="text-accent text-sm font-medium">horas</span>
            </div>
            
            {/* Minutos */}
            <div className="flex flex-col items-center bg-primary/5 rounded-xl p-3 border border-primary/10 hover:bg-primary/10 transition-colors">
              <Timer className="w-5 h-5 text-primary mb-1" />
              <span className="text-2xl md:text-3xl font-bold text-primary">{timeLeft.minutes}</span>
              <span className="text-primary text-sm font-medium">min</span>
            </div>
            
            {/* Segundos */}
            <div className="flex flex-col items-center bg-accent/5 rounded-xl p-3 border border-accent/10 hover:bg-accent/10 transition-colors animate-pulse">
              <Zap className="w-5 h-5 text-accent mb-1" />
              <span className="text-2xl md:text-3xl font-bold text-accent">{timeLeft.seconds}</span>
              <span className="text-accent text-sm font-medium">seg</span>
            </div>
          </div>

          {/* Footer romántico */}
          <div className="flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent mr-2 animate-pulse" />
            <Heart className="w-6 h-6 text-accent animate-pulse" />
            <Sparkles className="w-4 h-4 text-accent ml-2 animate-pulse" />
          </div>
          
          {/* Mensaje romántico */}
          <p className="text-primary text-sm italic mt-2 text-center font-lora">
            para el día más especial
          </p>
        </div>

        {/* Corazones flotantes adicionales */}
        <Heart className="absolute top-4 left-4 w-5 h-5 text-accent/60 animate-pulse" style={{animationDelay: '3s'}} />
        <Heart className="absolute bottom-4 right-4 w-6 h-6 text-primary/60 animate-pulse" style={{animationDelay: '1s'}} />
        <Heart className="absolute top-1/3 right-8 w-4 h-4 text-accent/50 animate-pulse" style={{animationDelay: '4s'}} />
        <Heart className="absolute bottom-1/3 left-8 w-5 h-5 text-primary/50 animate-pulse" style={{animationDelay: '2s'}} />
      </div>
    </section>
  );
};

export default Countdown;
