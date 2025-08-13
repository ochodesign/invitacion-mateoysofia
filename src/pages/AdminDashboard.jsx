import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({ nombre: '', whatsapp: '', musica: '', mensaje: '', acompaniantes: [], asistira: 'si', id: null });
  const [showNoDropdown, setShowNoDropdown] = useState(false);

  const fetchDatos = () => {
    setLoading(true);
    fetch("https://darkorange-salamander-413596.hostingersite.com/backend/listar_confirmaciones.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDatos(data.data);
        } else {
          setError(data.message || "Error al cargar los datos");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error de conexión con el servidor");
        setLoading(false);
      });
  };
  useEffect(() => { fetchDatos(); }, []);

  const handleEdit = (item) => {
    setEditando(item.id);
    setFormEdit({
      nombre: item.nombre,
      whatsapp: item.whatsapp,
      musica: item.musica,
      mensaje: item.mensaje,
      acompaniantes: Array.isArray(item.acompaniantes) ? item.acompaniantes : [],
      asistira: item.asistira,
      id: item.id
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdit(f => ({ ...f, [name]: value }));
  };

  const handleEditAcomp = (i, value) => {
    setFormEdit(f => {
      const acomp = [...f.acompaniantes];
      acomp[i] = { nombre: value };
      return { ...f, acompaniantes: acomp };
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', formEdit.id);
    formData.append('nombre', formEdit.nombre);
    formData.append('whatsapp', formEdit.whatsapp);
    formData.append('musica', formEdit.musica);
    formData.append('mensaje', formEdit.mensaje);
    formData.append('asistira', formEdit.asistira);
    formData.append('acompaniantes', JSON.stringify(formEdit.acompaniantes));
    const res = await fetch('https://darkorange-salamander-413596.hostingersite.com/public/editar_confirmacion.php', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      setEditando(null);
      fetchDatos();
    } else {
      alert(data.message || 'Error al guardar');
    }
  };

  const invitadosNo = datos.filter(d => d.asistira === 'no');
  // Calcular total de asistentes (titular + acompañantes solo de los que asisten)
  const invitadosSi = datos.filter(d => d.asistira === 'si');
  const totalAsistentes = invitadosSi.reduce((acc, curr) => {
    let acomp = Array.isArray(curr.acompaniantes) ? curr.acompaniantes.filter(a => a.nombre && a.nombre.trim() !== '').length : 0;
    return acc + 1 + acomp;
  }, 0);

  return (
    <div className="min-h-screen bg-primary/10 p-0 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-8">
        <h1 className="text-4xl font-dancing text-accent font-bold mb-2 text-center drop-shadow">Panel de Administración</h1>
        <p className="text-primary-dark text-center mb-8 font-lora">Visualiza y gestiona la información de los invitados</p>
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-primary/30">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span className="text-2xl font-lora font-bold text-primary flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-accent"></span> Invitados confirmados</span>
            <span className="text-primary-dark text-base font-semibold bg-green-100 rounded px-3 py-1 border border-green-200">Total que van: <span className="font-bold text-primary">{totalAsistentes}</span></span>
          </div>
          <div style={{maxHeight:'60vh', overflowY:'auto'}}>
            {/* Vista tabla en desktop, cards en mobile */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-primary/20">
              <table className="min-w-full text-primary text-base font-lora">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-4 py-3 font-bold text-accent border-b border-primary/20">Nombre</th>
                    <th className="px-4 py-3 font-bold text-accent border-b border-primary/20">Acompañantes</th>
                    <th className="px-4 py-3 font-bold text-accent border-b border-primary/20">WhatsApp</th>
                    <th className="px-4 py-3 font-bold text-accent border-b border-primary/20">Música elegida</th>
                    <th className="px-4 py-3 font-bold text-accent border-b border-primary/20">Confirmado</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="text-center py-8">Cargando...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={6} className="text-center text-red-500 py-8">{error}</td></tr>
                  ) : datos.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-8">No hay confirmaciones registradas.</td></tr>
                  ) : (
                    datos.map((item) => (
                      editando === item.id ? (
                        <tr key={item.id} className="bg-yellow-50">
                          <td className="px-2 py-2"><input className="border rounded px-2 py-1 w-full" name="nombre" value={formEdit.nombre} onChange={handleEditChange} /></td>
                          <td className="px-2 py-2">
                            {formEdit.acompaniantes.map((a, i) => (
                              <input key={i} className="border rounded px-2 py-1 mb-1 w-full" value={a.nombre} onChange={e => handleEditAcomp(i, e.target.value)} />
                            ))}
                          </td>
                          <td className="px-2 py-2"><input className="border rounded px-2 py-1 w-full" name="whatsapp" value={formEdit.whatsapp} onChange={handleEditChange} /></td>
                          <td className="px-2 py-2"><input className="border rounded px-2 py-1 w-full" name="musica" value={formEdit.musica} onChange={handleEditChange} /></td>
                          <td className="px-2 py-2">
                            <select name="asistira" value={formEdit.asistira} onChange={handleEditChange} className="border rounded px-2 py-1">
                              <option value="si">Sí</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="px-2 py-2">
                            <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={handleSaveEdit}>Guardar</button>
                            <button className="bg-gray-300 px-2 py-1 rounded" onClick={()=>setEditando(null)}>Cancelar</button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item.id}>
                          <td className="px-4 py-2">{item.nombre}</td>
                          <td className="px-4 py-2">{Array.isArray(item.acompaniantes) ? item.acompaniantes.map((a, i) => a.nombre).filter(Boolean).join(", ") : ""}</td>
                          <td className="px-4 py-2">
                            <a href={`https://wa.me/54${item.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-600 hover:underline">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.93.547 3.73 1.497 5.26L2 22l4.89-1.47A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.61 0-3.13-.39-4.45-1.08l-.32-.17-2.9.87.87-2.83-.21-.33A7.963 7.963 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.29-5.71c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.44.1-.13.2-.5.65-.62.78-.12.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.11-1.38-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.01-.35-.05-.1-.44-1.07-.6-1.47-.16-.39-.32-.34-.44-.35-.11-.01-.24-.01-.37-.01-.13 0-.34.05-.52.25-.18.2-.7.68-.7 1.65 0 .97.7 1.91.8 2.05.1.13 1.38 2.12 3.36 2.89.47.16.84.25 1.13.32.47.1.9.09 1.24.05.38-.04 1.18-.48 1.35-.94.17-.46.17-.85.12-.94-.05-.09-.18-.13-.38-.23z"/></svg>
                              {item.whatsapp}
                            </a>
                          </td>
                          <td className="px-4 py-2">{item.musica}</td>
                          <td className={"px-4 py-2 font-bold " + (item.asistira === "si" ? "text-green-600" : "text-red-500")}>{item.asistira === "si" ? "Sí" : "No"}</td>
                          <td className="px-4 py-2"><button className="text-blue-600 underline" onClick={()=>handleEdit(item)}>Editar</button></td>
                        </tr>
                      )
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Dropdown debajo del contenedor de invitados confirmados */}
            <div className="mt-6 w-full max-w-2xl mx-auto">
              <button
                className="flex items-center gap-2 bg-gray-100 text-primary px-4 py-2 rounded shadow-sm font-semibold focus:outline-none w-full justify-between border border-gray-200 hover:bg-gray-200 transition-colors"
                onClick={() => setShowNoDropdown(v => !v)}
                aria-expanded={showNoDropdown}
                aria-controls="dropdown-no-vienen"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg>
                  Invitados que no podrán asistir
                  <span className="bg-gray-200 text-primary rounded-full px-2 py-0.5 text-xs font-semibold ml-2">{invitadosNo.length}</span>
                </span>
                <svg className={"w-4 h-4 text-gray-500 transition-transform " + (showNoDropdown ? "rotate-180" : "rotate-0")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                id="dropdown-no-vienen"
                className={`transition-all duration-300 overflow-hidden ${showNoDropdown ? 'max-h-96 mt-2' : 'max-h-0'} bg-white border border-gray-200 rounded-xl shadow`}
                style={{padding: showNoDropdown ? '1rem' : '0 1rem'}}
              >
                {showNoDropdown && (
                  <>
                    {invitadosNo.length === 0 ? <div className="text-gray-400 text-center">Nadie confirmó que no podrá asistir.</div> : (
                      <ul className="list-disc pl-4 text-sm">
                        {invitadosNo.map(inv=>(
                          <li key={inv.id} className="mb-1">
                            <span className="font-semibold">{inv.nombre}</span> {Array.isArray(inv.acompaniantes) && inv.acompaniantes.length > 0 && (
                              <span className="text-gray-500">(Acompañantes: {inv.acompaniantes.map(a=>a.nombre).filter(Boolean).join(", ")})</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* Cards para mobile */}
            <div className="md:hidden flex flex-col gap-4 mt-4">
              {loading ? (
                <div className="text-center py-8">Cargando...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
              ) : datos.length === 0 ? (
                <div className="text-center py-8">No hay confirmaciones registradas.</div>
              ) : (
                datos.map(item => (
                  editando === item.id ? (
                    <form key={item.id} onSubmit={handleSaveEdit} className="bg-yellow-50 border border-yellow-300 rounded-xl shadow p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary">Nombre:</span>
                        <input className="border rounded px-2 py-1 w-full" name="nombre" value={formEdit.nombre} onChange={handleEditChange} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">Acompañantes:</span>
                        <div className="flex flex-col gap-1 w-full">
                          {formEdit.acompaniantes.map((a, i) => (
                            <input key={i} className="border rounded px-2 py-1" value={a.nombre} onChange={e => handleEditAcomp(i, e.target.value)} />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">WhatsApp:</span>
                        <input className="border rounded px-2 py-1 w-full" name="whatsapp" value={formEdit.whatsapp} onChange={handleEditChange} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">Música:</span>
                        <input className="border rounded px-2 py-1 w-full" name="musica" value={formEdit.musica} onChange={handleEditChange} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">Confirmado:</span>
                        <select name="asistira" value={formEdit.asistira} onChange={handleEditChange} className="border rounded px-2 py-1">
                          <option value="si">Sí</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Guardar</button>
                        <button type="button" className="bg-gray-300 px-2 py-1 rounded" onClick={()=>setEditando(null)}>Cancelar</button>
                      </div>
                    </form>
                  ) : (
                    <div key={item.id} className="bg-white border border-primary/20 rounded-xl shadow p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary">Nombre:</span>
                        <span className="text-accent">{item.nombre}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">Acompañantes:</span>
                        <span>{Array.isArray(item.acompaniantes) ? item.acompaniantes.map((a, i) => a.nombre).filter(Boolean).join(", ") : ""}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">WhatsApp:</span>
                        <a href={`https://wa.me/54${item.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-600 hover:underline">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.93.547 3.73 1.497 5.26L2 22l4.89-1.47A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.61 0-3.13-.39-4.45-1.08l-.32-.17-2.9.87.87-2.83-.21-.33A7.963 7.963 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.29-5.71c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.44.1-.13.2-.5.65-.62.78-.12.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.11-1.38-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.01-.35-.05-.1-.44-1.07-.6-1.47-.16-.39-.32-.34-.44-.35-.11-.01-.24-.01-.37-.01-.13 0-.34.05-.52.25-.18.2-.7.68-.7 1.65 0 .97.7 1.91.8 2.05.1.13 1.38 2.12 3.36 2.89.47.16.84.25 1.13.32.47.1.9.09 1.24.05.38-.04 1.18-.48 1.35-.94.17-.46.17-.85.12-.94-.05-.09-.18-.13-.38-.23z"/></svg>
                          {item.whatsapp}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">Música:</span>
                        <span>{item.musica}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">Confirmado:</span>
                        <span className={item.asistira === "si" ? "text-green-600 font-bold" : "text-red-500 font-bold"}>{item.asistira === "si" ? "Sí" : "No"}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button className="text-blue-600 underline" onClick={()=>handleEdit(item)}>Editar</button>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
