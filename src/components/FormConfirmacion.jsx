import React, { useState } from "react";

const FormConfirmacion = () => {
  const [formData, setFormData] = useState({
    nombre: "",
  wsp: "",
    asistira: "",
    mensaje: "",
    musica: ""
  });
  
  const [invitados, setInvitados] = useState([]);
  
  const [estado, setEstado] = useState({
    enviando: false,
    enviado: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInvitadoChange = (index, value) => {
    const nuevosInvitados = [...invitados];
    nuevosInvitados[index].nombre = value;
    setInvitados(nuevosInvitados);
  };

  const agregarInvitado = () => {
    setInvitados([...invitados, { nombre: "" }]);
  };

  const eliminarInvitado = (index) => {
    setInvitados(invitados.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
  wsp: "",
      asistira: "",
      mensaje: "",
      musica: ""
    });
    setInvitados([]);
    setEstado({
      enviando: false,
      enviado: false,
      error: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Preparar los datos incluyendo los invitados
    const invitadosTexto = invitados
      .filter(inv => inv.nombre.trim() !== "")
      .map(inv => inv.nombre.trim())
      .join(", ");
    
    const datosCompletos = {
      ...formData,
      invitados: invitadosTexto
    };
    
    console.log('🚀 Iniciando envío del formulario');
    console.log('📊 Datos a enviar:', datosCompletos);
    
    setEstado({
      enviando: true,
      enviado: false,
      error: null
    });
    
    try {
      // Determinar la URL base según el entorno
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const backendUrl = isLocal 
        ? 'https://julietayariel.site/backend/guardar_confirmacion.php'
        : '/backend/guardar_confirmacion.php';
      
      console.log('🌐 URL del backend:', backendUrl);
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosCompletos)
      });
      
      console.log('📡 Status response:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Respuesta cruda del servidor:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Error parseando JSON:', parseError);
        console.log('📄 Contenido que no se pudo parsear:', responseText);
        throw new Error('El servidor no devolvió un JSON válido');
      }
      
      console.log('📋 Respuesta del servidor:', result);
      
      if (response.ok && result.success) {
        setEstado({
          enviando: false,
          enviado: true,
          error: null
        });
        
        // Reiniciar formulario después de 3 segundos
        setTimeout(() => {
          resetForm();
        }, 3000);
        
      } else {
        const errorMessage = result.details ? 
          `${result.error}: ${result.details}` : 
          result.error || 'Error desconocido del servidor';
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error('❌ Error:', error);
      setEstado({
        enviando: false,
        enviado: false,
        error: error.message
      });
    }
  };

  return (
    <section className="w-full py-10 px-2 sm:px-4 bg-primary flex flex-col items-center overflow-x-hidden">
      <h2 className="text-2xl md:text-3xl font-lora font-bold text-white mb-6">
        Confirmar Asistencia
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white/90 rounded-xl p-6 shadow-lg">
        
        {/* Campo Asistencia */}
        <div>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1 block" htmlFor="asistira">
            ¿Asistirás al casamiento? *
          </label>
          <select
            id="asistira"
            name="asistira"
            className="w-full border border-primary rounded px-4 py-2 font-lora"
            value={formData.asistira}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="si">Sí, asistiré</option>
            <option value="no">No podré asistir</option>
          </select>
        </div>

        {/* Campo Nombre */}
        <div>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1 block" htmlFor="nombre">
            Nombre y Apellido *
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Juan Pérez"
            className="w-full border border-primary rounded px-4 py-2 font-lora"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={!formData.asistira}
          />
        </div>

        {/* Campo Invitados */}
        <div>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-2 block">
            Invitados adicionales
          </label>
          <p className="text-xs text-gray-600 mb-3 font-lora">
            ¿Vienes acompañado? Agrega a tus familiares o acompañantes
          </p>
          
          {invitados.length === 0 ? (
            <div className="text-center">
              <button
                type="button"
                className="bg-accent text-white px-6 py-3 rounded-lg font-lora hover:bg-accent/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                onClick={agregarInvitado}
                disabled={!formData.asistira}
              >
                + Agregar invitado
              </button>
              <p className="text-xs text-gray-500 mt-2 font-lora">
                Solo tú asistirás? No hay problema, deja esta sección vacía
              </p>
            </div>
          ) : (
            <>
              {invitados.map((invitado, index) => (
                <div key={index} className="flex gap-2 mb-3 p-3 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <label className="text-xs font-lora text-gray-600 mb-1 block">
                      Invitado {index + 1}:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: María (esposa), Juan (hijo), Ana (hermana)..."
                      className="w-full border border-primary rounded px-3 py-2 font-lora text-sm"
                      value={invitado.nombre}
                      onChange={(e) => handleInvitadoChange(index, e.target.value)}
                      disabled={!formData.asistira}
                    />
                  </div>
                  <button
                    type="button"
                    className="text-red-500 font-bold px-3 py-2 border border-red-300 rounded hover:bg-red-50 transition-colors self-end"
                    onClick={() => eliminarInvitado(index)}
                    disabled={!formData.asistira}
                    title="Eliminar invitado"
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <div className="flex gap-2 justify-center mt-3">
                <button
                  type="button"
                  className="bg-accent text-white px-4 py-2 rounded font-lora hover:bg-accent/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={agregarInvitado}
                  disabled={!formData.asistira}
                >
                  + Agregar otro invitado
                </button>
              </div>
            </>
          )}
        </div>

        {/* Campo WhatsApp */}
        <div>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1 block" htmlFor="wsp">
            WhatsApp *
          </label>
          <input
            id="wsp"
            name="wsp"
            type="tel"
            placeholder="Ej: 11 2345 6789"
            className="w-full border border-primary rounded px-4 py-2 font-lora"
            value={formData.wsp}
            onChange={handleChange}
            required
            disabled={!formData.asistira}
          />
        </div>

        {/* Campo Música */}
        <div>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1 block" htmlFor="musica">
            Sugerencia de música
          </label>
          <textarea
            id="musica"
            name="musica"
            placeholder="Ej: La Cumbita"
            className="w-full border border-primary rounded px-4 py-2 font-lora"
            value={formData.musica}
            onChange={handleChange}
            rows={2}
            disabled={!formData.asistira}
          />
        </div>

        {/* Campo Mensaje */}
        <div>
          <label className="font-lora text-primary-dark font-semibold text-sm mb-1 block" htmlFor="mensaje">
            Mensaje para los novios
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Escribe un mensaje para Julieta y Ariel (opcional)"
            className="w-full border border-primary rounded px-4 py-2 font-lora"
            value={formData.mensaje}
            onChange={handleChange}
            rows={3}
            disabled={!formData.asistira}
          />
        </div>

        {/* Mostrar errores */}
        {estado.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {estado.error}
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          className={`font-lora font-bold py-3 text-lg rounded-xl border-2 shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 mt-4 ${
            estado.enviado 
              ? 'bg-green-500 text-white border-green-600 focus:ring-green-400' 
              : estado.enviando
              ? 'bg-gray-400 text-white border-gray-500 cursor-not-allowed'
              : 'bg-primary text-white border-primary-dark hover:bg-primary-dark hover:text-accent hover:scale-105 focus:ring-primary/40'
          }`}
          disabled={!formData.asistira || estado.enviando}
        >
          {estado.enviado ? '✓ ¡Confirmación enviada con éxito!' : estado.enviando ? 'Enviando...' : 'Enviar Confirmación'}
        </button>
        
      </form>
    </section>
  );
};

export default FormConfirmacion;
