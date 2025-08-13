import React, { useState, useEffect } from "react";

const Admin = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      try {
        const res = await fetch("https://cyan-bat-386226.hostingersite.com/ver_confirmaciones.php");
        const json = await res.json();
        console.log("Datos obtenidos del backend:", json); // Log para depuración
        setDatos(json);
      } catch (err) {
        console.error("Error al cargar los datos", err);
      }
      setCargando(false);
    };
    fetchData();
  }, []);

  const totalInvitados = datos.reduce((acc, row) => {
    const invitadosAdicionales = row.invitados ? row.invitados.length : 0;
    return acc + 1 + invitadosAdicionales; // 1 por el invitado principal
  }, 0);

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Confirmaciones recibidas</h2>
      <p className="text-center font-semibold mb-4">Total de invitados: {totalInvitados}</p>
      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {datos.length > 0 ? (
            datos.map((row, i) => (
              <div key={i} className="border rounded-lg p-4 shadow-md">
                <p className="text-sm font-semibold">Fecha: <span className="font-normal">{row.fecha}</span></p>
                <p className="text-sm font-semibold">Nombre: <span className="font-normal">{row.nombre}</span></p>
                <p className="text-sm font-semibold">Asistencia: <span className="font-normal">{row.asistencia}</span></p>
                <p className="text-sm font-semibold">WhatsApp: <span className="font-normal">{row.wsp}</span></p>
                <p className="text-sm font-semibold">Música: <span className="font-normal">{row.musica}</span></p>
                <p className="text-sm font-semibold">Mensaje: <span className="font-normal">{row.mensaje}</span></p>
                <p className="text-sm font-semibold">Invitados: <span className="font-normal">{row.invitados && row.invitados.length > 0 ? row.invitados.join(", ") : "Sin invitados"}</span></p>
              </div>
            ))
          ) : (
            <p className="text-center">No hay datos para mostrar.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Admin;
