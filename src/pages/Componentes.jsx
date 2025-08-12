import React from "react";
// Puedes importar más componentes reutilizables aquí
import Footer from "../components/Footer";

const Componentes = () => (
  <div>
  {/* <Header /> eliminado porque el componente ya no existe */}
    <main>
      {/* Botón al Formulario */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold mb-2">Botón al Formulario</h2>
        {/* Botón Ir al Formulario eliminado */}
      </div>
      {/* Aquí puedes agregar más bloques para otros componentes */}
    </main>
    <Footer />
  </div>
);

export default Componentes;
