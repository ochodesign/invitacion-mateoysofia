import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { Heart, Sparkles, Users, Calendar, MessageSquare, Music, Phone, RefreshCw, Search, Filter, UserCheck, UserX, Crown, Flower2, MapPin, Clock } from "lucide-react";

const Admin = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroAsistencia, setFiltroAsistencia] = useState("Todos");
  const [modalData, setModalData] = useState(null);

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
    <section className="min-h-screen bg-gradient-to-br from-bgSection via-white to-bgSection/30 p-4 relative overflow-hidden">
      {/* Decoraciones flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-20 left-8 w-8 h-8 text-accent/20 animate-pulse hidden lg:block" />
        <Sparkles className="absolute top-32 right-12 w-6 h-6 text-primary/30 animate-pulse hidden lg:block" style={{animationDelay: '2s'}} />
        <Flower2 className="absolute bottom-40 left-16 w-10 h-10 text-accent/15 animate-pulse hidden lg:block" style={{animationDelay: '4s'}} />
        <Crown className="absolute top-60 left-1/4 w-7 h-7 text-primary/20 animate-pulse hidden lg:block" style={{animationDelay: '6s'}} />
        <Heart className="absolute bottom-32 right-8 w-6 h-6 text-accent/25 animate-pulse hidden lg:block" style={{animationDelay: '8s'}} />
        <Sparkles className="absolute top-40 left-1/3 w-5 h-5 text-primary/25 animate-pulse hidden lg:block" style={{animationDelay: '3s'}} />
      </div>

      {/* Header mejorado */}
      <div className="relative text-center mb-12">
        {/* Decoraciones superiores */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-4">
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            <Crown className="w-8 h-8 text-primary animate-pulse" style={{animationDelay: '1s'}} />
            <Sparkles className="w-6 h-6 text-accent animate-pulse" style={{animationDelay: '2s'}} />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-lora font-bold text-primary mb-4 drop-shadow-lg">
          Julieta & Ariel
        </h1>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-6 h-6 text-accent" />
          <p className="text-primary text-xl font-lora font-medium">
            Panel de Confirmaciones
          </p>
          <Users className="w-6 h-6 text-accent" />
        </div>
        
        {/* Fecha del evento con iconos */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-accent text-lg font-lora font-semibold">29.11.2025</span>
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        
        {/* Decoración inferior */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <Heart className="w-6 h-6 text-primary" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-accent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Debug Info mejorado */}
      {!cargando && datos.length === 0 && (
        <div className="relative bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30 text-primary px-8 py-6 rounded-2xl mb-8 backdrop-blur-sm shadow-lg">
          <div className="absolute -top-3 left-6">
            <Clock className="w-6 h-6 text-accent bg-white rounded-full p-1 shadow-md" />
          </div>
          <p className="font-lora font-semibold text-lg mb-2">Verificando conexión con el servidor...</p>
          <div className="space-y-1 text-sm font-medium">
            <p>Estado del array: {datos ? "✅ Definido" : "❌ Undefined"}</p>
            <p>Cantidad de registros: <span className="text-accent">{datos.length}</span></p>
          </div>
        </div>
      )}

      {/* Metrics Section mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="relative group bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border-2 border-primary/20 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-accent to-primary p-3 rounded-full shadow-lg">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="pt-4">
            <p className="text-lg font-lora font-semibold text-primary mb-3">Confirmados</p>
            <p className="text-4xl font-bold text-accent mb-2">{totalConfirmados}</p>
            <p className="text-sm text-gray-600 font-medium">Personas principales</p>
          </div>
          {/* Decoración de hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
        
        <div className="relative group bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border-2 border-primary/20 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="pt-4">
            <p className="text-lg font-lora font-semibold text-primary mb-3">Acompañantes</p>
            <p className="text-4xl font-bold text-primary mb-2">{totalInvitadosExtra}</p>
            <p className="text-sm text-gray-600 font-medium">Invitados adicionales</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
        
        <div className="relative group bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border-2 border-primary/20 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-accent via-primary to-accent p-3 rounded-full shadow-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="pt-4">
            <p className="text-lg font-lora font-semibold text-primary mb-3">Total Asistentes</p>
            <p className="text-5xl font-bold text-accent mb-2">{totalGeneral}</p>
            <p className="text-sm text-gray-600 font-medium">Confirmados + Acompañantes</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
      </div>

      {/* Search and Filter Section mejorado */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-10 border-2 border-primary/20">
        <div className="absolute -top-4 left-8">
          <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full shadow-lg">
            <Search className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <label htmlFor="busqueda" className="flex items-center gap-2 text-base font-lora font-semibold text-primary">
              <Search className="w-4 h-4 text-accent" />
              Buscar por nombre o teléfono
            </label>
            <div className="relative">
              <input
                type="text"
                id="busqueda"
                value={busqueda}
                onChange={handleSearch}
                placeholder="Escribir aquí..."
                className="w-full px-4 py-3 pl-10 border-2 border-bgSection/50 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 font-medium"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-3">
            <label htmlFor="filtro" className="flex items-center gap-2 text-base font-lora font-semibold text-primary">
              <Filter className="w-4 h-4 text-accent" />
              Filtrar por asistencia
            </label>
            <div className="relative">
              <select
                id="filtro"
                value={filtroAsistencia}
                onChange={handleFilter}
                className="w-full px-4 py-3 pl-10 border-2 border-bgSection/50 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 font-medium appearance-none"
              >
                <option value="Todos">Todos</option>
                <option value="sí">Confirmados</option>
                <option value="no">No confirmados</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cargando ? (
          <div className="col-span-full text-center py-16">
            <div className="relative">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent/30 border-t-accent"></div>
              <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-accent animate-pulse" />
            </div>
            <p className="text-primary mt-6 font-lora text-lg">Cargando confirmaciones...</p>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm text-gray-600">Conectando con el servidor</span>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((row) => (
            <div key={row.id} className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-primary/20 hover:border-accent/50 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              {/* Decoración superior */}
              <div className="absolute -top-3 left-6">
                <div className="bg-gradient-to-r from-accent to-primary p-2 rounded-full shadow-lg">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Decoraciones de hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-5 h-5 text-accent animate-pulse" />
              </div>
              
              {/* Contenido de la tarjeta */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 pt-2">
                  <div className="flex items-center gap-2 text-sm text-accent font-semibold">
                    <Clock className="w-4 h-4" />
                    {new Date(row.fecha).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                    (() => {
                      const asistencia = row.asistencia?.toLowerCase().trim();
                      return (asistencia === 'sí' || asistencia === 'si');
                    })()
                      ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200' 
                      : 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200'
                  }`}>
                    {(() => {
                      const asistencia = row.asistencia?.toLowerCase().trim();
                      return (asistencia === 'sí' || asistencia === 'si') ? (
                        <>
                          <UserCheck className="w-3 h-3" />
                          Confirmado
                        </>
                      ) : (
                        <>
                          <UserX className="w-3 h-3" />
                          No asiste
                        </>
                      );
                    })()}
                  </div>
                </div>
                
                <h3 className="text-xl font-lora font-bold text-primary mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  {row.nombre}
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                    <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-600 font-medium">WhatsApp:</span>
                    <a
                      href={`https://wa.me/${row.wsp.replace(/\s|\+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 hover:underline font-semibold transition-colors"
                    >
                      {row.wsp}
                    </a>
                  </div>
                  
                  {row.musica && (
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-purple-50/50">
                      <Music className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-600 font-medium">Música:</span>
                        <p className="text-gray-800 italic mt-1">{row.musica}</p>
                      </div>
                    </div>
                  )}
                  
                  {row.mensaje && (
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-blue-50/50">
                      <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-600 font-medium">Mensaje:</span>
                        <p className="text-gray-800 mt-1">{row.mensaje}</p>
                      </div>
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
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-accent/10">
                      <Users className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-600 font-medium">Acompañantes:</span>
                        <div className="mt-1">
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
                            
                            return (
                              <div className="flex flex-wrap gap-1">
                                {invitadosValidos.map((inv, idx) => (
                                  <span key={idx} className="inline-block bg-accent/20 text-accent px-2 py-1 rounded-md text-xs font-medium">
                                    {inv}
                                  </span>
                                ))}
                                <span className="text-accent font-bold ml-1">({invitadosValidos.length})</span>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-12 border-2 border-primary/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="pt-4">
                <p className="text-primary text-xl font-lora font-semibold mb-3">No se encontraron confirmaciones</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-accent" />
                  <p className="text-gray-600 font-medium">
                    {busqueda || filtroAsistencia !== "Todos" 
                      ? "Intenta cambiar los filtros de búsqueda" 
                      : "Aún no hay confirmaciones registradas"}
                  </p>
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm text-gray-500">Los invitados comenzarán a confirmar pronto</span>
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{animationDelay: '1s'}} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalData && <Modal data={modalData} onClose={closeModal} />}
      
      {/* Botón de actualización flotante mejorado */}
      <button
        onClick={() => window.location.reload()}
        className="group fixed bottom-8 right-8 bg-gradient-to-r from-accent via-primary to-accent text-white p-4 rounded-full shadow-2xl hover:shadow-accent/25 transition-all duration-500 hover:scale-110 z-50 border-2 border-white/20"
        title="Actualizar datos"
      >
        <div className="relative">
          <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </div>
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
        </div>
      </button>
      
      {/* Footer romántico */}
      <div className="mt-16 text-center pb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Heart className="w-5 h-5 text-accent animate-pulse" />
          <span className="text-primary font-lora text-lg font-semibold">
            Julieta & Ariel - 29.11.2025
          </span>
          <Heart className="w-5 h-5 text-accent animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-gray-600 text-sm">Panel de administración de confirmaciones</span>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Admin;
