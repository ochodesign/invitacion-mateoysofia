import React from "react";

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
  <section className="relative flex flex-col items-center justify-center bg-transparent overflow-visible w-full" style={{padding:'0', margin:'0', zIndex:2}}>
  <div className="relative flex flex-col items-center justify-center w-full" style={{overflow:'visible', paddingTop:'-60px', paddingBottom:'-60px', marginTop:'-60px', marginBottom:'-60px', zIndex:2}}>
        {/* Líneas doradas decorativas, SVG más grande y centrado */}
  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{maxWidth:'100vw',overflow:'visible',zIndex:2}}>
          <circle cx="210" cy="210" r="180" stroke="#fa8072" strokeWidth="2" fill="none" />
          <circle cx="210" cy="210" r="195" stroke="#fa8072" strokeWidth="1" fill="none" />
          <circle cx="210" cy="210" r="208" stroke="#fa8072" strokeWidth="1" fill="none" />
        </svg>
  <div className="relative bg-white rounded-full shadow-xl flex flex-col items-center justify-center w-[340px] h-[340px] max-w-full px-4 py-8 border-0 mx-auto" style={{margin:'0 auto', zIndex:3}}>
          <div className="text-3xl md:text-4xl font-bold text-accent mb-1 font-lora">Faltan</div>
          <div className="w-12 h-1 mx-auto mb-2 border-b-2 border-accent rounded-full"></div>
          <div className="flex justify-center gap-6 text-2xl md:text-3xl font-bold text-accent mb-2">
            <div className="flex flex-col items-center">
              <span>{timeLeft.days}</span>
              <span className="text-accent text-base font-normal mt-1">días</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{timeLeft.hours}</span>
              <span className="text-accent text-base font-normal mt-1">hs</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{timeLeft.minutes}</span>
              <span className="text-accent text-base font-normal mt-1">min</span>
            </div>
            <div className="flex flex-col items-center">
              <span>{timeLeft.seconds}</span>
              <span className="text-accent text-base font-normal mt-1">seg</span>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#fa8072" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21s-6.5-4.35-9-8.5C.5 8.5 4 5 7.5 5c1.74 0 3.41 1.01 4.5 2.09C13.09 6.01 14.76 5 16.5 5 20 5 23.5 8.5 21 12.5c-2.5 4.15-9 8.5-9 8.5z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
