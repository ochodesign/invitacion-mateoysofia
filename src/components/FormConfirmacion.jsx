import React, { useState } from "react";


const FormConfirmacion = () => {
  const [form, setForm] = useState({
    nombre: "",
    invitados: [],
    wsp: "",
    musica: "",
    mensaje: "",
    asistencia: ""
  });
  const [nuevoInvitado, setNuevoInvitado] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('asistencia', form.asistencia);
    formData.append('wsp', form.wsp);
    formData.append('musica', form.musica);
    formData.append('mensaje', form.mensaje);
    formData.append('invitados', JSON.stringify(form.invitados));

    fetch('guardar_confirmacion.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.text())
      .then(res => {
        if (res.trim() === 'ok') {
          setExito('¡Confirmación enviada!');
          setForm({ nombre: "", invitados: [], wsp: "", musica: "", mensaje: "", asistencia: "" });
          setNuevoInvitado("");
        } else {
          setExito('Hubo un error al enviar la confirmación.');
        }
        setEnviando(false);
      })
      .catch(() => {
        setExito('Hubo un error al enviar la confirmación.');
        setEnviando(false);
      });
  };
  return (
    <section className="flex justify-center py-8 bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-100 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-2"
      >
        <label className="font-semibold">¿Confirmas asistencia?</label>
        <select
          name="asistencia"
          value={form.asistencia}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1"
        >
          <option value="">Selecciona una opción</option>
          <option value="Si">Sí, confirmo asistencia</option>
          <option value="No">No podré asistir</option>
        </select>
  <label className="font-semibold">Nombre y apellido</label>
  <input name="nombre" value={form.nombre} onChange={handleChange} required className="border rounded px-2 py-1" placeholder="Ej: Julieta González" disabled={!form.asistencia} />
        <label className="font-semibold">Invitados adicionales</label>
        {/* Invitados agregados: no editables, solo con X para quitar */}
        <div className="flex flex-col gap-2">
          {form.invitados.map((inv, i) =>
            inv.trim() === "" ? null : (
              <div key={i} className="flex items-center mb-2 gap-2">
                <input
                  value={inv}
                  disabled
                  className="border rounded px-2 py-1 flex-1 bg-gray-100 text-gray-600"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({
                      ...prev,
                      invitados: prev.invitados.filter((_, idx) => idx !== i)
                    }));
                  }}
                  className="text-red-500 font-bold px-2 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors"
                  title="Quitar invitado"
                  disabled={!form.asistencia}
                >
                  ×
                </button>
              </div>
            )
          )}
          {/* Campo para añadir invitado */}
          <div className="flex items-center mb-2 gap-2">
            <input
              value={nuevoInvitado}
              onChange={e => setNuevoInvitado(e.target.value)}
              placeholder="Nombre del invitado"
              className="border rounded px-2 py-1 flex-1"
              disabled={!form.asistencia}
            />
            <button
              type="button"
              onClick={() => {
                if (nuevoInvitado.trim() !== "") {
                  setForm(prev => ({
                    ...prev,
                    invitados: [...prev.invitados, nuevoInvitado.trim()]
                  }));
                  setNuevoInvitado("");
                }
              }}
              className="text-green-600 font-bold px-2 py-1 border border-green-300 rounded hover:bg-green-50 transition-colors"
              title="Añadir invitado"
              disabled={!form.asistencia}
            >
              +
            </button>
          </div>
        </div>
        <label className="font-semibold">WhatsApp</label>
        <input name="wsp" value={form.wsp} onChange={handleChange} required className="border rounded px-2 py-1" placeholder="Ej: 11 2345 6789" disabled={!form.asistencia} />
        <label className="font-semibold">Recomendar una música</label>
        <input name="musica" value={form.musica} onChange={handleChange} className="border rounded px-2 py-1" placeholder="Ej: Movidito movidito Sebastian" disabled={!form.asistencia} />
        <label className="font-semibold">Mensaje para los novios</label>
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} className="border rounded px-2 py-1" disabled={!form.asistencia} />
        <button type="submit" disabled={enviando || !form.asistencia || (form.invitados.length === 0 && nuevoInvitado.trim() === "")} className="bg-accent text-white rounded px-4 py-2 mt-4">{enviando ? "Enviando..." : "Enviar"}</button>
        {exito && <div className="text-green-600 font-bold mt-2">{exito}</div>}
      </form>
    </section>
  );

}
export default FormConfirmacion;
