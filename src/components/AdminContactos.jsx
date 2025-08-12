import React, { useState, useEffect } from 'react';

// Formatea el teléfono para WhatsApp (solo números, sin espacios, guiones, etc.)
function formatTelefono(telefono) {
  // Elimina todo lo que no sea número
  let num = String(telefono).replace(/\D/g, '');
  // Si empieza con 0, lo quita
  if (num.startsWith('0')) num = num.slice(1);
  // Si empieza con 15, lo quita (caso típico de celulares en Argentina)
  if (num.startsWith('15')) num = num.slice(2);
  // Si ya empieza con 549, lo dejamos así
  if (num.startsWith('549')) return num;
  // Si ya empieza con 54 pero no 549, agregamos el 9
  if (num.startsWith('54') && !num.startsWith('549')) return '549' + num.slice(2);
  // Si no tiene código país, lo agregamos
  return '549' + num;
}


function AdminContactos() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("nombre");
  const [pagina, setPagina] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [nuevos, setNuevos] = useState(0); // cantidad de mensajes nuevos no leídos
  const porPagina = 10;

  // Carga inicial y polling
  useEffect(() => {
    let mounted = true;
    const fetchContactos = () => {
      fetch('/backend/get-contactos.php')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            if (mounted) {
              setContactos(data.contactos);
              // Calcular mensajes no leídos
              const noLeidos = data.contactos.filter(c => !c.leido).length;
              setNuevos(noLeidos);
            }
          }
          if (mounted) setLoading(false);
        })
        .catch(() => mounted && setLoading(false));
    };
    fetchContactos();
    const interval = setInterval(fetchContactos, 10000); // cada 10s
    return () => { mounted = false; clearInterval(interval); };
    // eslint-disable-next-line
  }, []);

  const marcarComoLeido = (id) => {
    fetch('/backend/marcar-leido.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ id }).toString()
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setContactos(prev => 
          prev.map(c => c.id === id ? { ...c, leido: 1 } : c)
        );
      }
    });
  };

  // Edición inline
  const handleEdit = (contacto) => {
    setEditId(contacto.id);
    setEditData({ ...contacto });
  };
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleEditSave = (id) => {
    // Aquí deberías hacer un fetch a un endpoint PHP para guardar la edición
    // Por ahora solo actualiza localmente
    setContactos(prev => prev.map(c => c.id === id ? { ...editData, id } : c));
    setEditId(null);
  };
  const handleEditCancel = () => {
    setEditId(null);
  };

  // Eliminación segura
  const handleDelete = (id) => {
    setConfirmDelete(id);
  };
  const confirmDeleteYes = (id) => {
    // Aquí deberías hacer un fetch a un endpoint PHP para eliminar
    setContactos(prev => prev.filter(c => c.id !== id));
    setConfirmDelete(null);
  };
  const confirmDeleteNo = () => {
    setConfirmDelete(null);
  };

  // Exportar a CSV
  const exportarCSV = () => {
    const encabezado = ['ID','Nombre','Email','Teléfono','Fecha','Mensaje','Leído'];
    const filas = contactosFiltrados.map(c => [
      c.id, c.nombre, c.email, c.telefono, c.fecha, c.mensaje.replace(/\n/g, ' '), c.leido ? 'Sí' : 'No'
    ]);
    let csv = [encabezado, ...filas].map(fila => fila.map(val => '"'+String(val).replace(/"/g,'""')+'"').join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contactos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtrado y búsqueda
  const filtrarContactos = () => {
    let filtrados = contactos;
    if (search.trim() !== "") {
      filtrados = contactos.filter(c => {
        if (filtro === "nombre") return c.nombre.toLowerCase().includes(search.toLowerCase());
        if (filtro === "email") return c.email.toLowerCase().includes(search.toLowerCase());
        if (filtro === "telefono") return (c.telefono || "").toLowerCase().includes(search.toLowerCase());
        if (filtro === "fecha") return c.fecha && new Date(c.fecha).toLocaleDateString().includes(search);
        return true;
      });
    }
    return filtrados;
  };

  const contactosFiltrados = filtrarContactos();
  const totalPaginas = Math.ceil(contactosFiltrados.length / porPagina);
  const contactosPagina = contactosFiltrados.slice((pagina-1)*porPagina, pagina*porPagina);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPagina(1);
  };
  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
    setPagina(1);
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Mensajes de Contacto</h1>
        <div className="relative">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
          {nuevos > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border border-white shadow" style={{minWidth:'22px',textAlign:'center'}}>
              {nuevos > 10 ? '+10' : nuevos}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <input
          type="text"
          placeholder={`Buscar por ${filtro}`}
          value={search}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded w-64"
        />
        <select value={filtro} onChange={handleFiltroChange} className="border px-2 py-2 rounded">
          <option value="nombre">Nombre</option>
          <option value="email">Email</option>
          <option value="telefono">Teléfono</option>
          <option value="fecha">Fecha</option>
        </select>
        <span className="text-gray-500 ml-2">{contactosFiltrados.length} resultados</span>
        <button onClick={exportarCSV} className="ml-auto bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900">Exportar CSV</button>
      </div>

      {contactosFiltrados.length === 0 ? (
        <p className="text-gray-500">No hay mensajes.</p>
      ) : (
        <div className="space-y-4">
          {contactosPagina.map(contacto => (
            <div 
              key={contacto.id} 
              className={`p-6 border rounded-lg ${
                contacto.leido ? 'bg-gray-50' : 'bg-white border-blue-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  {editId === contacto.id ? (
                    <>
                      <input name="nombre" value={editData.nombre} onChange={handleEditChange} className="border px-2 py-1 rounded mb-1 w-full" />
                      <input name="email" value={editData.email} onChange={handleEditChange} className="border px-2 py-1 rounded mb-1 w-full" />
                      <input name="telefono" value={editData.telefono || ''} onChange={handleEditChange} className="border px-2 py-1 rounded mb-1 w-full" />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg">{contacto.nombre}</h3>
                      <p className="text-gray-600">{contacto.email}</p>
                      {contacto.telefono && (
                        <p className="text-gray-600">{contacto.telefono}</p>
                      )}
                    </>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(contacto.fecha).toLocaleString()}
                  </p>
                  {!contacto.leido && (
                    <>
                      <span className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded mb-1 font-semibold">Mensaje no leído</span>
                      <button
                        onClick={() => marcarComoLeido(contacto.id)}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-base hover:bg-blue-700 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 relative z-10"
                        style={{minHeight:'44px', minWidth:'44px', touchAction:'manipulation'}}
                      >
                        Marcar como leído
                      </button>
                    </>
                  )}
                  {editId === contacto.id ? (
                    <>
                      <button onClick={() => handleEditSave(contacto.id)} className="ml-2 bg-green-600 text-white px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-green-400 relative z-10" style={{minHeight:'44px', minWidth:'44px', touchAction:'manipulation'}}>Guardar</button>
                      <button onClick={handleEditCancel} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-gray-400 relative z-10" style={{minHeight:'44px', minWidth:'44px', touchAction:'manipulation'}}>Cancelar</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(contacto)} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 relative z-10" style={{minHeight:'44px', minWidth:'44px', touchAction:'manipulation'}}>Editar</button>
                  )}
                  <button onClick={() => handleDelete(contacto.id)} className="ml-2 bg-red-600 text-white px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-red-400 relative z-10" style={{minHeight:'44px', minWidth:'44px', touchAction:'manipulation'}}>Eliminar</button>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                {editId === contacto.id ? (
                  <textarea name="mensaje" value={editData.mensaje} onChange={handleEditChange} className="border px-2 py-1 rounded w-full" rows={3} />
                ) : (
                  <p className="whitespace-pre-wrap">{contacto.mensaje}</p>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <a 
                  href={`mailto:${contacto.email}?subject=Re: Tu mensaje&body=Hola ${contacto.nombre},%0A%0A`}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Responder por Email
                </a>
                {contacto.telefono && (
                  <a 
                    href={`https://wa.me/${formatTelefono(contacto.telefono)}?text=Hola ${encodeURIComponent(contacto.nombre)}, recibí tu mensaje.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
              {/* Confirmación de eliminación */}
              {confirmDelete === contacto.id && (
                <div className="mt-4 bg-red-100 border border-red-400 p-4 rounded flex items-center gap-4">
                  <span>¿Seguro que deseas eliminar este mensaje?</span>
                  <button onClick={() => confirmDeleteYes(contacto.id)} className="bg-red-600 text-white px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-red-400 relative z-10" style={{minHeight:'44px', minWidth:'44px', touchAction:'manipulation'}}>Sí, eliminar</button>
                  <button onClick={confirmDeleteNo} className="bg-gray-400 text-white px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-gray-400 relative z-10" style={{minHeight:'44px', minWidth:'44px', touchAction:'manipulation'}}>Cancelar</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex gap-2 mt-8 justify-center items-center">
          <button
            onClick={() => setPagina(p => Math.max(1, p-1))}
            disabled={pagina === 1}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >Anterior</button>
          <span className="mx-2">Página {pagina} de {totalPaginas}</span>
          <button
            onClick={() => setPagina(p => Math.min(totalPaginas, p+1))}
            disabled={pagina === totalPaginas}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default AdminContactos;
