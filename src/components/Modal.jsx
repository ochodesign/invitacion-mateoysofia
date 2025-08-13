import React from "react";

const Modal = ({ data, onClose }) => {
  const handleSubmit = e => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos editados al backend
    console.log("Datos enviados:", data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-96">
        <h2 className="text-xl font-bold mb-4">Editar Invitado</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="font-semibold">Nombre</label>
          <input
            type="text"
            defaultValue={data.nombre}
            className="border rounded px-2 py-1"
          />
          <label className="font-semibold">Asistencia</label>
          <select defaultValue={data.asistencia} className="border rounded px-2 py-1">
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          <label className="font-semibold">WhatsApp</label>
          <input
            type="text"
            defaultValue={data.wsp}
            className="border rounded px-2 py-1"
          />
          <label className="font-semibold">Música</label>
          <input
            type="text"
            defaultValue={data.musica}
            className="border rounded px-2 py-1"
          />
          <label className="font-semibold">Mensaje</label>
          <textarea
            defaultValue={data.mensaje}
            className="border rounded px-2 py-1"
          ></textarea>
          <label className="font-semibold">Invitados adicionales</label>
          <input
            type="text"
            defaultValue={data.invitados?.join(", ")}
            className="border rounded px-2 py-1"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
