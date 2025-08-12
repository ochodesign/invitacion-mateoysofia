import React, { useState } from "react";

const Regalos = () => {
  const [copied, setCopied] = useState("");
  const cbu = "1910020955002050550832";
  const alias = "luna.miel.viajes";
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1800);
  };
  return (
  <section className="w-full py-10 px-2 sm:px-4 bg-bgSection flex flex-col items-center overflow-x-hidden">
  <h2 className="text-2xl md:text-3xl font-lora font-bold text-primary mb-4 flex items-center gap-2">
        <span className="inline-block align-middle">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="14" width="24" height="14" rx="3" fill="currentColor" className="text-primary"/>
            <rect x="2" y="10" width="28" height="6" rx="2" fill="currentColor" className="text-primary"/>
            <rect x="14" y="10" width="4" height="18" rx="2" fill="#fff"/>
            <path d="M16 10C13 7 10 5 9 7c-1 2 2 5 7 3" stroke="#C97B63" strokeWidth="2" fill="none"/>
            <path d="M16 10c3-3 6-5 7-3 1 2-2 5-7 3" stroke="#C97B63" strokeWidth="2" fill="none"/>
          </svg>
        </span>
        Regalos
      </h2>
  <div className="text-primary font-lora text-center max-w-xl">
        <p className="mb-4">Tu presencia es el mejor regalo, pero si deseas hacernos un presente, aquí tienes nuestras opciones:</p>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-primary w-fit">
            <span className="font-semibold text-primary">CBU:</span> <span className="select-all text-primary">{cbu}</span>
            <button
              onClick={() => handleCopy(cbu, "cbu")}
              className="ml-2 px-2 py-1 text-xs rounded bg-primary text-white font-bold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label="Copiar CBU"
            >
              {copied === "cbu" ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-primary w-fit">
            <span className="font-semibold text-primary">Alias:</span> <span className="select-all text-primary">{alias}</span>
            <button
              onClick={() => handleCopy(alias, "alias")}
              className="ml-2 px-2 py-1 text-xs rounded bg-primary text-white font-bold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label="Copiar Alias"
            >
              {copied === "alias" ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-primary w-fit">
            <span className="font-semibold text-primary">Banco:</span> <span className="select-all text-primary">Credicoop</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Regalos;
