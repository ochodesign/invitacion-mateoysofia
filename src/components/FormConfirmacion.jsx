import React, { useState } from "react";

const FormConfirmacion = () => {
  // ...implementación del formulario de confirmación...
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [asistira, setAsistira] = useState("");
  const [mensaje, setMensaje] = useState("");
  // const [comida, setComida] = useState("");
  const [acompaniantes, setAcompaniantes] = useState([{ nombre: "" }]);
  const [musica, setMusica] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== INICIO DEBUG FORMULARIO ===');
    
    setEnviando(true);
    
    // Datos simplificados
    const datos = {
      nombre: nombre,
      whatsapp: whatsapp,
      asistira: asistira,
      mensaje: mensaje || '',
      musica: musica || ''
    };
    
    console.log('Enviando datos:', datos);
    
    try {
      const res = await fetch("/backend/guardar_confirmacion.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      console.log('Respuesta recibida:', res.status, res.statusText);
      const responseText = await res.text();
      console.log('Texto respuesta:', responseText);
      if (res.ok) {
        setEnviado(true);
        console.log('¡Éxito! Formulario enviado');
        // Reset del formulario después de 3 segundos
        setTimeout(() => {
          setEnviado(false);
          setEnviando(false);
        }, 3000);
      } else {
        console.log('Error en respuesta del servidor');
        alert("Error al enviar la confirmación. Intenta de nuevo.");
        setEnviando(false);
      }
    } catch (err) {
      console.error('Error en fetch:', err);
      alert("Error de conexión con el servidor.");
      setEnviando(false);
    }
    console.log('=== FIN DEBUG FORMULARIO ===');
  };

  return (
  <section className="w-full py-10 px-2 sm:px-4 bg-primary flex flex-col items-center overflow-x-hidden">
  <h2 className="text-2xl md:text-3xl font-lora font-bold text-white mb-6">Confirmar Asistencia</h2>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white/90 rounded-xl p-6 shadow-lg">
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
            disabled={!asistira}
          />
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1">Invitado(s)</label>
          {acompaniantes.map((a, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Ej: hija, pareja, amigo, etc."
                className="border border-primary rounded px-4 py-2 font-lora flex-1"
                value={a.nombre}
                onChange={e => {
                  const nuevos = [...acompaniantes];
                  nuevos[idx].nombre = e.target.value;
                  setAcompaniantes(nuevos);
                }}
                disabled={!asistira}
              />
              {acompaniantes.length > 1 && (
                <button type="button" className="text-red-500 font-bold px-2" onClick={() => setAcompaniantes(acompaniantes.filter((_, i) => i !== idx))} disabled={!asistira}>X</button>
              )}
            </div>
          ))}
          <button type="button" className="bg-accent text-white px-3 py-1 rounded mb-2 font-lora" onClick={() => setAcompaniantes([...acompaniantes, { nombre: "" }])} disabled={!asistira}>
            Agregar invitado
          </button>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1" htmlFor="whatsapp">WhatsApp *</label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="Ej: 11 2345 6789"
            className="border border-primary rounded px-4 py-2 font-lora overflow-x-hidden whitespace-nowrap"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
            autoComplete="tel"
            style={{maxWidth:'100%'}}
            disabled={!asistira}
            pattern="[0-9\s\+\-]{8,15}"
            title="Por favor ingresa un número de WhatsApp válido."
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
            disabled={!asistira}
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
            disabled={!asistira}
          />

          <button
            type="submit"
            className={`font-lora font-bold py-3 text-lg rounded-xl border-2 shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 mt-2 ${
              enviado 
                ? 'bg-green-500 text-white border-green-600 focus:ring-green-400' 
                : enviando
                ? 'bg-gray-400 text-white border-gray-500 cursor-not-allowed'
                : 'bg-primary text-white border-primary-dark hover:bg-primary-dark hover:text-accent hover:scale-105 focus:ring-primary/40'
            }`}
            style={{letterSpacing:'0.04em'}}
            disabled={!asistira || enviando}
            onClick={() => console.log('CLICK en botón enviar, asistira:', asistira)}
          >
            {enviado ? '✓ Mensaje enviado con éxito' : enviando ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
    </section>
  );
};

export default FormConfirmacion;
