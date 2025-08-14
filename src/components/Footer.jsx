import React from "react";
import { Heart, Sparkles, Calendar, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-primary text-white flex flex-col items-center font-lora text-base overflow-x-hidden px-4">
      {/* Decoración superior */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-20"></div>
        <div className="flex items-center mx-4">
          <Sparkles className="w-4 h-4 text-accent mr-2 animate-pulse" />
          <Heart className="w-6 h-6 text-accent animate-pulse" />
          <Sparkles className="w-4 h-4 text-accent ml-2 animate-pulse" />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-20"></div>
      </div>

      {/* Nombres de los novios */}
      <div className="text-3xl font-bold tracking-wide mb-3 font-dancing italic text-accent flex items-center">
        <Heart className="w-6 h-6 text-accent mr-3 opacity-70" />
        Julieta & Ariel
        <Heart className="w-6 h-6 text-accent ml-3 opacity-70" />
      </div>

      {/* Frase romántica */}
      <div className="italic text-lg text-accent max-w-2xl text-center mb-6 px-2 leading-relaxed" style={{fontFamily:'Lora,serif', textShadow:'0 1px 4px rgba(0,0,0,0.18)'}}>
        "El amor es la certeza de que, pase lo que pase, siempre elegiremos caminar juntos."
      </div>

      {/* Información de contacto y fecha */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
        <div className="flex items-center text-white/90 hover:text-accent transition-colors">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Noviembre 2025</span>
        </div>
        <div className="flex items-center text-white/90 hover:text-accent transition-colors">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Buenos Aires</span>
        </div>
        <div className="flex items-center text-white/90 hover:text-accent transition-colors">
          <Phone className="w-4 h-4 mr-2" />
          <span>+54 9 11 3130-7799</span>
        </div>
      </div>

      {/* Separador decorativo */}
      <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>

      {/* Copyright */}
      <div className="flex items-center text-white/80 text-sm mb-2">
        <Heart className="w-4 h-4 mr-2 text-accent" />
        <span>© {new Date().getFullYear()} Nuestra Boda</span>
        <Heart className="w-4 h-4 ml-2 text-accent" />
      </div>

      {/* Créditos de diseño */}
      <div className="text-xs text-white/70 flex items-center">
        <span>Diseñado con</span>
        <Heart className="w-3 h-3 mx-1 text-accent animate-pulse" />
        <span>por</span>
        <a 
          href="https://ochodesignweb.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="ml-1 text-accent hover:text-white transition-colors flex items-center underline decoration-dotted"
        >
          Ocho Design
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>

      {/* Decoración inferior */}
      <div className="flex items-center justify-center mt-6 opacity-50">
        <Sparkles className="w-3 h-3 text-accent mr-2 animate-pulse" />
        <div className="w-8 h-px bg-accent"></div>
        <Heart className="w-4 h-4 text-accent mx-2" />
        <div className="w-8 h-px bg-accent"></div>
        <Sparkles className="w-3 h-3 text-accent ml-2 animate-pulse" />
      </div>
    </footer>
  );
};

export default Footer;
