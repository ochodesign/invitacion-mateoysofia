import React from "react";
import { Calendar, Clock, MapPin, Shirt, PartyPopper, ExternalLink, Navigation, Heart, Sparkles, Church, Users } from "lucide-react";

const InfoEvento = () => {
  return (
    <section className="relative w-full py-16 px-4 bg-gradient-to-br from-contrast via-base-light to-contrast flex flex-col items-center overflow-x-hidden">
      {/* Header decorativo */}
      <div className="text-center mb-12 w-full">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-accent mr-3 animate-pulse" />
          <Calendar className="w-10 h-10 text-primary" />
          <Sparkles className="w-6 h-6 text-accent ml-3 animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-3 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-accent animate-pulse" />
          Información del Evento
          <Heart className="w-8 h-8 text-accent animate-pulse" />
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full"></div>
      </div>

      {/* Cards del evento */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-12 items-stretch justify-center">
        
        {/* Card Ceremonia */}
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-8 text-center h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="p-4 bg-primary/10 rounded-full mb-6 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
            <Church className="w-12 h-12 text-primary" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-accent mr-2" />
            <span className="font-lora text-primary font-bold text-2xl">Ceremonia</span>
            <Heart className="w-5 h-5 text-accent ml-2" />
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-semibold">Sábado 14 de septiembre 2025</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Clock className="w-5 h-5 text-accent" />
              <span>10:45 hs</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Church className="w-5 h-5 text-accent" />
              <span className="font-semibold">San Juan Bautista</span>
            </div>
            <div className="flex items-start justify-center gap-2 text-primary">
              <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-center">Nueva York 4717, Villa Devoto</span>
            </div>
          </div>
          
          <a
            href="https://www.google.com/maps?q=Nueva+York+4717,+Villa+Devoto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-contrast px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            Ver en Maps
          </a>
        </div>

        {/* Card Dress Code */}
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-8 text-center h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="p-4 bg-primary/10 rounded-full mb-6 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
            <Shirt className="w-12 h-12 text-primary" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-accent mr-2" />
            <span className="font-lora text-primary font-bold text-2xl">¿Cómo vestirse?</span>
            <Heart className="w-5 h-5 text-accent ml-2" />
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Shirt className="w-5 h-5 text-primary" />
              <span className="font-semibold">Elegante Sport</span>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
              <p className="text-primary text-sm italic">
                ¡La comodidad es clave para disfrutar al máximo!
              </p>
            </div>
          </div>
        </div>

        {/* Card Fiesta */}
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-8 text-center h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="p-4 bg-primary/10 rounded-full mb-6 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
            <PartyPopper className="w-12 h-12 text-primary" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-accent mr-2" />
            <span className="font-lora text-primary font-bold text-2xl">Fiesta</span>
            <Heart className="w-5 h-5 text-accent ml-2" />
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center gap-2">
              <PartyPopper className="w-5 h-5 text-accent" />
              <span className="font-lora text-primary font-bold text-xl">Salon Del Rio</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Clock className="w-5 h-5 text-accent" />
              <span className="font-semibold">De 20 a 06 hs</span>
            </div>
            <div className="flex items-start justify-center gap-2 text-primary">
              <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-center">Antonio Malaver 401, Vicente López</span>
            </div>
          </div>
          
          <a
            href="https://www.google.com/maps?rlz=1C1GCEU_esAR1068AR1068&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE5NTlqMGoxqAIAsAIA&um=1&ie=UTF-8&fb=1&gl=ar&sa=X&geocode=KR39qTJbsbyVMZDoGTrU_d7N&daddr=Antonio+Malaver+401,+B1636GYA+Vicente+L%C3%B3pez,+Provincia+de+Buenos+Aires"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-contrast px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            Ver en Maps
          </a>
        </div>
      </div>

      {/* Mapa Ceremonia */}
      <div className="w-full max-w-4xl mb-8">
        <div className="bg-contrast/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-bgSection">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-accent mr-2" />
            <h3 className="text-xl font-lora font-bold text-primary">Ubicación de la Ceremonia</h3>
          </div>
          <div className="text-center mb-4">
            <span className="font-semibold text-primary">Nueva York 4717, Villa Devoto</span>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Mapa Iglesia San Juan Bautista"
              src="https://www.google.com/maps?q=Nueva+York+4717,+Villa+Devoto&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Nueva+York+4717,+Villa+Devoto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-contrast font-lora font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Navigation className="w-5 h-5" />
              Cómo llegar
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mapa Salón */}
      <div className="w-full max-w-4xl mb-8">
        <div className="bg-contrast/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-bgSection">
          <div className="flex items-center justify-center mb-4">
            <PartyPopper className="w-6 h-6 text-accent mr-2" />
            <h3 className="text-xl font-lora font-bold text-primary">Ubicación del Salón</h3>
          </div>
          <div className="text-center mb-4">
            <span className="font-semibold text-primary">Antonio Malaver 401, Vicente López</span>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Mapa Salón Del Rio"
              src="https://www.google.com/maps?q=Antonio+Malaver+401,+Vicente+López&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Antonio+Malaver+401,+Vicente+López"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-contrast font-lora font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Navigation className="w-5 h-5" />
              Cómo llegar
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoEvento;
