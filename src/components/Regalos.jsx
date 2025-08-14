import React, { useState } from "react";
import { Gift, Heart, Copy, Check, CreditCard, Building2, Hash, Sparkles } from "lucide-react";

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
    <section className="w-full py-16 px-4 bg-gradient-to-br from-bgSection via-base-light to-bgSection flex flex-col items-center overflow-x-hidden">
      {/* Header decorativo */}
      <div className="text-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-accent mr-3 animate-pulse" />
          <Gift className="w-10 h-10 text-primary" />
          <Sparkles className="w-6 h-6 text-accent ml-3 animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-3 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-accent animate-pulse" />
          Regalos
          <Heart className="w-8 h-8 text-accent animate-pulse" />
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full"></div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
        {/* Mensaje principal */}
        <div className="text-center mb-10 w-full">
          <div className="bg-contrast/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-bgSection mx-auto">
            <Heart className="w-12 h-12 text-accent mx-auto mb-4 animate-pulse" />
            <p className="text-base sm:text-lg text-primary font-lora leading-relaxed mb-4 text-center">
              Tu presencia es el mejor regalo, pero si deseas hacernos un presente para nuestra luna de miel:
            </p>
            <div className="flex items-center justify-center gap-2 text-accent font-medium flex-wrap">
              <Sparkles className="w-4 h-4" />
              <span className="italic text-center">¡Cada aporte nos ayuda a crear recuerdos inolvidables!</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Datos bancarios */}
        <div className="space-y-4 w-full">
          {/* CBU */}
          <div className="bg-contrast/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-bgSection hover:shadow-xl transition-all duration-300 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center flex-1 min-w-0">
                <div className="p-3 bg-primary/10 rounded-full mr-4 flex-shrink-0">
                  <Hash className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-primary text-lg block mb-1">CBU</span>
                  <div className="select-all text-sm sm:text-base font-mono tracking-wider bg-bgSection/30 px-3 py-2 rounded-lg break-all w-full text-center sm:text-left">
                    {cbu}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(cbu, "cbu")}
                className={`w-full sm:w-auto px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0 ${
                  copied === "cbu" 
                    ? 'bg-accent text-contrast shadow-lg scale-105' 
                    : 'bg-primary text-contrast hover:bg-primary/90 hover:shadow-lg hover:scale-105'
                }`}
                aria-label="Copiar CBU"
              >
                {copied === "cbu" ? (
                  <>
                    <Check className="w-4 h-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Alias */}
          <div className="bg-contrast/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-bgSection hover:shadow-xl transition-all duration-300 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center flex-1 min-w-0">
                <div className="p-3 bg-accent/10 rounded-full mr-4 flex-shrink-0">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-primary text-lg block mb-1">Alias</span>
                  <div className="select-all text-sm sm:text-base font-mono tracking-wider bg-bgSection/30 px-3 py-2 rounded-lg w-full text-center sm:text-left">
                    {alias}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(alias, "alias")}
                className={`w-full sm:w-auto px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0 ${
                  copied === "alias" 
                    ? 'bg-accent text-contrast shadow-lg scale-105' 
                    : 'bg-primary text-contrast hover:bg-primary/90 hover:shadow-lg hover:scale-105'
                }`}
                aria-label="Copiar Alias"
              >
                {copied === "alias" ? (
                  <>
                    <Check className="w-4 h-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Banco */}
          <div className="bg-contrast/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-bgSection w-full">
            <div className="flex items-center justify-center sm:justify-start">
              <div className="p-3 bg-bgSection/20 rounded-full mr-4 flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <span className="font-semibold text-primary text-lg block mb-1">Banco</span>
                <span className="text-sm sm:text-base text-base font-medium">Banco Credicoop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="mt-10 text-center w-full">
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6 border border-accent/20 mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-accent mr-2" />
              <Sparkles className="w-4 h-4 text-primary" />
              <Heart className="w-5 h-5 text-accent ml-2" />
            </div>
            <p className="text-primary font-lora italic text-base sm:text-lg text-center">
              ¡Gracias por ser parte de nuestro sueño!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Regalos;
