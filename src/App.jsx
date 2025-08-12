
import React from "react";

import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import InfoEvento from "./components/InfoEvento";
import Galeria from "./components/Galeria";
import FormConfirmacion from "./components/FormConfirmacion";
import Regalos from "./components/Regalos";
import Footer from "./components/Footer";
import BotonWhatsappFlotante from "./components/BotonWhatsappFlotante";
import FadeInSection from "./components/FadeInSection";

const EVENT_DATE = "2025-11-29T20:00:00";

function App() {
  return (
    <main>
  <Hero />
      <div className="flex justify-center -mt-24 mb-12">
        <Countdown targetDate={EVENT_DATE} />
      </div>
      <FadeInSection><Galeria /></FadeInSection>
      <FadeInSection><InfoEvento /></FadeInSection>
      <FadeInSection><FormConfirmacion /></FadeInSection>
      <FadeInSection><Regalos /></FadeInSection>
      <Footer />
  <BotonWhatsappFlotante telefono="541131307799" mensaje="Hola Julieta, tengo algunas dudas sobre el sitio y me gustaría consultarte." />
    </main>
  );
}

export default App;