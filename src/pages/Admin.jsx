import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

const Admin = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroAsistencia, setFiltroAsistencia] = useState("Todos");
  const [modalData, setModalData] = useState(null);

  // CSS para Dancing Script
  useEffect(() => {
    if (!document.querySelector('link[href*="Dancing+Script"]')) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      try {
  const response = await fetch("https://cyan-bat-386226.hostingersite.com/ver_confirmaciones.php");
        const data = await response.json();
        console.log("Datos recibidos:", data); // Log para depuración
        setDatos(data);
      } catch (err) {
        console.error("Error al cargar los datos", err);
      }
      setCargando(false);
    };
    fetchData();
  }, []);

  // WebSocket desactivado temporalmente para producción
  // useEffect(() => {
  //   const socket = new WebSocket("ws://127.0.0.1:8080");

  //   socket.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     if (message.action === "add") {
  //       setDatos((prevDatos) => [message.data, ...prevDatos]);
  //     } else if (message.action === "update") {
  //       setDatos((prevDatos) =>
  //         prevDatos.map((item) => (item.id === message.data.id ? message.data : item))
  //       );
  //     } else if (message.action === "delete") {
  //       setDatos((prevDatos) => prevDatos.filter((item) => item.id !== message.id));
  //     }
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  // Calculate metrics
  // Contar confirmados con lógica flexible para "sí" y "si"
  const totalConfirmados = Array.isArray(datos) 
    ? datos.filter((row) => {
        const asistencia = row.asistencia?.toLowerCase().trim();
        return asistencia === "sí" || asistencia === "si";
      }).length 
    : 0;
  
  const totalInvitadosExtra = Array.isArray(datos)
    ? datos.reduce((acc, row) => {
        const asistencia = row.asistencia?.toLowerCase().trim();
        if ((asistencia === "sí" || asistencia === "si") && row.invitados && row.invitados !== "[]" && row.invitados !== "null" && row.invitados.trim() !== '') {
          let invitadosValidos = [];
          
          try {
            // Limpiar caracteres escapados
            const invitadosLimpio = row.invitados.replace(/\\/g, '');
            const invitadosArray = JSON.parse(invitadosLimpio);
            if (Array.isArray(invitadosArray)) {
              // Solo contar elementos que no estén vacíos
              invitadosArray.forEach(inv => {
                const invitadoLimpio = inv ? inv.trim() : '';
                if (invitadoLimpio !== '' && invitadoLimpio !== 'null') {
                  invitadosValidos.push(invitadoLimpio);
                }
              });
            }
          } catch (e) {
            // Si no es JSON, tratarlo como texto separado por comas
            const invitadosLimpio = row.invitados.replace(/\\/g, '');
            const invitadosArray = invitadosLimpio.split(',');
            invitadosArray.forEach(inv => {
              let invitadoLimpio = inv ? inv.trim() : '';
              // Remover corchetes y comillas
              invitadoLimpio = invitadoLimpio.replace(/[\[\]"']/g, '');
              if (invitadoLimpio !== '' && invitadoLimpio !== 'null') {
                invitadosValidos.push(invitadoLimpio);
              }
            });
          }
          
          return acc + invitadosValidos.length;
        }
        return acc;
      }, 0)
    : 0;
    
  const totalGeneral = totalConfirmados + totalInvitadosExtra;

  const handleSearch = (e) => setBusqueda(e.target.value);
  const handleFilter = (e) => setFiltroAsistencia(e.target.value);

  const filteredData = Array.isArray(datos)
    ? datos.filter((row) => {
        const matchesSearch = row.nombre.toLowerCase().includes(busqueda.toLowerCase()) || row.wsp.includes(busqueda);
        const matchesFilter = filtroAsistencia === "Todos" || row.asistencia === filtroAsistencia;
        return matchesSearch && matchesFilter;
      })
    : [];

  const openModal = (data) => setModalData(data);
  const closeModal = () => setModalData(null);

  return (
    <section className="min-h-screen bg-gradient-to-br from-bgSection to-primary p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-dancing text-white mb-3 drop-shadow-lg">
          Julieta & Ariel
        </h1>
        <p className="text-white text-lg font-light opacity-90">
          Panel de Confirmaciones - 29.11.2025
        </p>
      </div>

      {/* Debug Info */}
      {!cargando && datos.length === 0 && (
        <div className="bg-accent/20 border border-accent text-accent px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
          <p className="font-medium">No hay datos disponibles. Verificando conexión...</p>
          <p className="text-sm mt-1">Estado: {datos ? "Array definido" : "Array undefined"}</p>
          <p className="text-sm">Cantidad de registros: {datos.length}</p>
        </div>
      )}

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-white/20">
          <p className="text-lg font-medium text-primary mb-2">Confirmados</p>
          <p className="text-3xl font-bold text-accent">{totalConfirmados}</p>
          <p className="text-sm text-gray-600 mt-1">Personas principales</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-white/20">
          <p className="text-lg font-medium text-primary mb-2">Acompañantes</p>
          <p className="text-3xl font-bold text-primary">{totalInvitadosExtra}</p>
          <p className="text-sm text-gray-600 mt-1">Invitados adicionales</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-white/20">
          <p className="text-lg font-medium text-primary mb-2">Total Asistentes</p>
          <p className="text-4xl font-bold text-accent">{totalGeneral}</p>
          <p className="text-sm text-gray-600 mt-1">Confirmados + Acompañantes</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="busqueda" className="block text-sm font-medium text-primary mb-2">
              Buscar por nombre o teléfono
            </label>
            <input
              type="text"
              id="busqueda"
              value={busqueda}
              onChange={handleSearch}
              placeholder="Escribir aquí..."
              className="w-full px-4 py-2 border border-bgSection rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="filtro" className="block text-sm font-medium text-primary mb-2">
              Filtrar por asistencia
            </label>
            <select
              id="filtro"
              value={filtroAsistencia}
              onChange={handleFilter}
              className="w-full px-4 py-2 border border-bgSection rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            >
              <option value="Todos">Todos</option>
              <option value="sí">Confirmados</option>
              <option value="no">No confirmados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cargando ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <p className="text-white mt-4">Cargando confirmaciones...</p>
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((row) => (
            <div key={row.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm text-accent font-medium">
                  {new Date(row.fecha).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  (() => {
                    const asistencia = row.asistencia?.toLowerCase().trim();
                    return (asistencia === 'sí' || asistencia === 'si');
                  })()
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {(() => {
                    const asistencia = row.asistencia?.toLowerCase().trim();
                    return (asistencia === 'sí' || asistencia === 'si') ? 'Confirmado' : 'No asiste';
                  })()}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-primary mb-3">{row.nombre}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">WhatsApp:</span>
                  <a
                    href={`https://wa.me/${row.wsp.replace(/\s|\+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 hover:underline"
                  >
                    {row.wsp}
                  </a>
                </div>
                
                {row.musica && (
                  <div className="flex items-start">
                    <span className="text-gray-600 w-20">Música:</span>
                    <span className="text-gray-800 italic">{row.musica}</span>
                  </div>
                )}
                
                {row.mensaje && (
                  <div className="flex items-start">
                    <span className="text-gray-600 w-20">Mensaje:</span>
                    <span className="text-gray-800 flex-1">{row.mensaje}</span>
                  </div>
                )}
                
                {row.invitados && row.invitados !== "[]" && row.invitados !== "null" && row.invitados.trim() !== '' && (() => {
                  let invitadosValidos = [];
                  
                  try {
                    const invitadosArray = JSON.parse(row.invitados);
                    if (Array.isArray(invitadosArray)) {
                      invitadosArray.forEach(inv => {
                        const invitadoLimpio = inv ? inv.trim() : '';
                        if (invitadoLimpio !== '' && invitadoLimpio !== 'null') {
                          invitadosValidos.push(invitadoLimpio);
                        }
                      });
                    }
                  } catch (e) {
                    const invitadosArray = row.invitados.split(',');
                    invitadosArray.forEach(inv => {
                      const invitadoLimpio = inv ? inv.trim() : '';
                      if (invitadoLimpio !== '' && invitadoLimpio !== 'null') {
                        invitadosValidos.push(invitadoLimpio);
                      }
                    });
                  }
                  
                  return invitadosValidos.length > 0;
                })() && (
                  <div className="flex items-start">
                    <span className="text-gray-600 w-20">Acompañantes:</span>
                    <span className="text-gray-800">
                      {(() => {
                        let invitadosValidos = [];
                        
                        try {
                          // Limpiar caracteres escapados
                          const invitadosLimpio = row.invitados.replace(/\\/g, '');
                          const invitadosArray = JSON.parse(invitadosLimpio);
                          if (Array.isArray(invitadosArray)) {
                            invitadosArray.forEach(inv => {
                              const invitadoLimpio = inv ? inv.trim() : '';
                              if (invitadoLimpio !== '' && invitadoLimpio !== 'null') {
                                invitadosValidos.push(invitadoLimpio);
                              }
                            });
                          }
                        } catch (e) {
                          // Si no es JSON, tratarlo como texto
                          const invitadosLimpio = row.invitados.replace(/\\/g, '');
                          const invitadosArray = invitadosLimpio.split(',');
                          invitadosArray.forEach(inv => {
                            let invitadoLimpio = inv ? inv.trim() : '';
                            // Remover corchetes y comillas
                            invitadoLimpio = invitadoLimpio.replace(/[\[\]"']/g, '');
                            if (invitadoLimpio !== '' && invitadoLimpio !== 'null') {
                              invitadosValidos.push(invitadoLimpio);
                            }
                          });
                        }
                        
                        return `${invitadosValidos.join(', ')} (${invitadosValidos.length})`;
                      })()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => openModal(row)}
                  className="text-accent hover:text-primary font-medium transition-colors"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <p className="text-gray-500 text-lg">No se encontraron confirmaciones.</p>
              <p className="text-gray-400 text-sm mt-2">
                {busqueda || filtroAsistencia !== "Todos" 
                  ? "Intenta cambiar los filtros de búsqueda" 
                  : "Aún no hay confirmaciones registradas"}
              </p>
            </div>
          </div>
        )}
      </div>

      {modalData && <Modal data={modalData} onClose={closeModal} />}
      
      {/* Botón de actualización flotante */}
      <button
        onClick={() => window.location.reload()}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-accent to-primary text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50"
        title="Actualizar datos"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      
      {/* Auto-refresh cada 30 segundos */}
      <script>
        {`setTimeout(() => window.location.reload(), 30000)`}
      </script>
    </section>
  );
};

export default Admin;
