import React, { useState, useEffect } from 'react';

function AdminContactos() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchContactos = () => {
      fetch('/backend/listar_confirmaciones.php')
        .then(res => res.json())
        .then(data => {
          if (data.success && mounted) {
            setContactos(data.data);
          }
          if (mounted) setLoading(false);
        })
        .catch(() => mounted && setLoading(false));
    };
    fetchContactos();
    const interval = setInterval(fetchContactos, 10000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const exportarCSV = () => {
    const encabezado = ['ID','Nombre','Whatsapp','Acompañantes','Música','Mensaje','Asistirá','Fecha'];
    const filas = contactos.map(c => [
      c.id,
      c.nombre,
      c.whatsapp,
      Array.isArray(c.acompaniantes) ? c.acompaniantes.join('; ') : '',
      c.musica,
      c.mensaje ? c.mensaje.replace(/\n/g, ' ') : '',
      c.asistira,
      c.fecha
    ]);
    let csv = [encabezado, ...filas].map(fila => fila.map(val => '"'+String(val).replace(/"/g,'""')+'"').join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'confirmaciones.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Confirmaciones de Asistencia</h1>
        <button onClick={exportarCSV} className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark">Exportar CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Whatsapp</th>
              <th className="px-4 py-2 border">Acompañantes</th>
              <th className="px-4 py-2 border">Música</th>
              <th className="px-4 py-2 border">Mensaje</th>
              <th className="px-4 py-2 border">Asistirá</th>
              <th className="px-4 py-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map(c => (
              <tr key={c.id}>
                <td className="px-4 py-2 border">{c.id}</td>
                <td className="px-4 py-2 border">{c.nombre}</td>
                <td className="px-4 py-2 border">{c.whatsapp}</td>
                <td className="px-4 py-2 border">{Array.isArray(c.acompaniantes) ? c.acompaniantes.join(', ') : ''}</td>
                <td className="px-4 py-2 border">{c.musica}</td>
                <td className="px-4 py-2 border">{c.mensaje}</td>
                <td className="px-4 py-2 border">{c.asistira}</td>
                <td className="px-4 py-2 border">{c.fecha ? new Date(c.fecha).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminContactos;
