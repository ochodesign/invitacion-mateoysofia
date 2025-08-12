import React, { useState } from "react";

const FormConfirmacion = () => {
  // ...implementación del formulario de confirmación...
  const [nombre, setNombre] = useState("");
  const [asistira, setAsistira] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [comida, setComida] = useState("");
  const [musica, setMusica] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío (fetch o similar)
    setEnviado(true);
  };

  return (
  <section className="w-full py-10 px-2 sm:px-4 bg-primary flex flex-col items-center overflow-x-hidden">
  <h2 className="text-2xl md:text-3xl font-lora font-bold text-white mb-6">Confirmar Asistencia</h2>
      {enviado ? (
  <div className="text-white font-lora text-lg bg-primary-dark rounded px-6 py-4 shadow-md">¡Gracias por confirmar tu asistencia!<br/>Tu respuesta fue registrada correctamente.</div>
      ) : (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white/90 rounded-xl p-6 shadow-lg">
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1" htmlFor="nombre">Nombre y Apellido *</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Juan Pérez"
            className="border border-primary rounded px-4 py-2 font-lora overflow-x-hidden whitespace-nowrap"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
            style={{maxWidth:'100%'}}
          />
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1" htmlFor="asistira">Confirmar asistencia *</label>
          <select
            id="asistira"
            className="border border-primary rounded px-4 py-2 font-lora overflow-x-hidden"
            value={asistira}
            onChange={(e) => setAsistira(e.target.value)}
            required
            style={{maxWidth:'100%'}}
          >
            <option value="">Seleccioná una opción</option>
            <option value="si">Sí, asistiré</option>
            <option value="no">No podré asistir</option>
          </select>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1" htmlFor="comida">Preferencias alimentarias</label>
          <textarea
            id="comida"
            placeholder="Ej: vegetariano, menú niños, etc."
            className="border border-primary rounded px-4 py-2 font-lora overflow-x-hidden"
            value={comida}
            onChange={(e) => setComida(e.target.value)}
            rows={2}
            style={{maxWidth:'100%', resize:'none'}}
          />
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1" htmlFor="musica">Sugerencia de música</label>
          <textarea
            id="musica"
            placeholder="Ej: La Cumbita"
            className="border border-primary rounded px-4 py-2 font-lora overflow-x-hidden"
            value={musica}
            onChange={(e) => setMusica(e.target.value)}
            rows={2}
            style={{maxWidth:'100%', resize:'none'}}
          />
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1" htmlFor="mensaje">Mensaje para los novios</label>
          <textarea
            id="mensaje"
            placeholder="(opcional)"
            className="border border-primary rounded px-4 py-2 font-lora overflow-x-hidden"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={2}
            style={{maxWidth:'100%', resize:'none'}}
          />

          <button
            type="submit"
            className="bg-primary text-white font-lora font-bold py-3 text-lg rounded-xl border-2 border-primary-dark shadow-xl hover:bg-primary-dark hover:text-accent hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/40 mt-2"
            style={{letterSpacing:'0.04em'}}
          >
            Confirmar asistencia
          </button>
        </form>
      )}
    </section>
  );
};

export default FormConfirmacion;
