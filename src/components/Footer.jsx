import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-primary text-white flex flex-col items-center font-lora text-base overflow-x-hidden px-2">
      <div className="text-2xl font-bold tracking-wide mb-2">Julieta & Ariel</div>
      <div className="italic text-lg text-accent max-w-2xl text-center mb-4 px-2" style={{fontFamily:'Lora,serif', textShadow:'0 1px 4px rgba(0,0,0,0.18)'}}>
        "El amor es la certeza de que, pase lo que pase, siempre elegiremos caminar juntos."
      </div>
      <div className="mt-2 mb-1 text-white text-sm">© {new Date().getFullYear()} Nuestra Boda</div>
      <div className="text-xs text-white mt-2">
        Diseñado por <a href="https://ochodesignweb.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Ocho Design</a>
      </div>
    </footer>
  );
};

export default Footer;
