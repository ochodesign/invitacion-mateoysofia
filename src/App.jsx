
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import InfoEvento from "./components/InfoEvento";
import Galeria from "./components/Galeria";
import FormConfirmacion from "./components/FormConfirmacion";
import Regalos from "./components/Regalos";
import Footer from "./components/Footer";
import BotonWhatsappFlotante from "./components/BotonWhatsappFlotante";
import FadeInSection from "./components/FadeInSection";
import RomanticWelcome from "./components/RomanticWelcome";
import Admin from "./pages/Admin";

const EVENT_DATE = "2025-11-29T20:00:00";

function MainPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <RomanticWelcome onComplete={handleWelcomeComplete} />;
  }

  return (
    <main>
      <Hero />
      <div id="countdown" className="flex justify-center mb-12">
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;