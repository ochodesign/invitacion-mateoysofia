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
  <section className="relative flex flex-col items-center justify-center w-full py-16 bg-gradient-to-br from-white via-[#f8e1e1] to-bordo/10 backdrop-blur-lg overflow-visible text-bordo">
      {/* SVG decorativo superior */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[80px] z-10" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,70 Q90,10 170,70" stroke="#C97B63" strokeWidth="6" fill="none" />
        <circle cx="10" cy="70" r="8" fill="#C97B63" />
        <circle cx="170" cy="70" r="8" fill="#C97B63" />
        <circle cx="90" cy="20" r="10" fill="#C0C0C0" />
      </svg>
      {/* Corazones animados flotantes */}
      <Heart className="absolute top-8 left-16 w-8 h-8 text-bordo/40 animate-pulse" style={{animationDelay:'0.5s'}} />
      <Heart className="absolute bottom-8 right-16 w-8 h-8 text-bordo/40 animate-pulse" style={{animationDelay:'1.5s'}} />
      <Sparkles className="absolute top-1/2 left-8 w-6 h-6 text-bordo/30 animate-spin" style={{animationDuration:'6s'}} />
      <Sparkles className="absolute bottom-1/3 right-8 w-6 h-6 text-bordo/30 animate-spin" style={{animationDuration:'8s'}} />
      {/* Contenedor principal */}
  <div className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8 rounded-3xl shadow-xl border border-bordo/30 bg-gradient-to-br from-white via-[#f8e1e1] to-bordo/10 text-bordo">
        {/* Header con íconos animados */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Heart className="w-8 h-8 text-bordo animate-pulse" />
          <Calendar className="w-8 h-8 text-bordo animate-bounce" style={{animationDuration:'2s'}} />
          <Sparkles className="w-6 h-6 text-bordo animate-spin" style={{animationDuration:'4s'}} />
        </div>
  <div className="flex flex-row items-center justify-center gap-8 mb-8">
          {/* Días */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-bold text-bordo drop-shadow-lg animate-fade-in">{timeLeft.days}</span>
            <span className="text-bordo text-base font-semibold mt-2 flex items-center gap-1"><Calendar className="w-4 h-4 text-bordo" />días</span>
          </div>
          {/* Horas */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-bold text-bordo drop-shadow-lg animate-fade-in">{timeLeft.hours}</span>
            <span className="text-bordo text-base font-semibold mt-2 flex items-center gap-1"><Clock className="w-4 h-4 text-bordo" />horas</span>
          </div>
          {/* Minutos */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-bold text-bordo drop-shadow-lg animate-fade-in">{timeLeft.minutes}</span>
            <span className="text-bordo text-base font-semibold mt-2 flex items-center gap-1"><Timer className="w-4 h-4 text-bordo" />min</span>
          </div>
          {/* Segundos */}
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-bold text-bordo drop-shadow-lg animate-fade-in">{timeLeft.seconds}</span>
            <span className="text-bordo text-base font-semibold mt-2 flex items-center gap-1"><Zap className="w-4 h-4 text-bordo animate-pulse" />seg</span>
          </div>
        </div>
        {/* Línea decorativa animada */}
        <div className="w-full flex justify-center items-center mb-4">
          <div className="w-16 h-px bg-bordo animate-pulse" />
          <Heart className="w-6 h-6 text-bordo mx-2 animate-bounce" style={{animationDuration:'2s'}} />
          <div className="w-16 h-px bg-bordo animate-pulse" />
        </div>
        <div className="w-full flex justify-center mt-4">
          <p className="text-bordo text-lg italic font-lora text-center animate-fade-in">para el día más especial</p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
