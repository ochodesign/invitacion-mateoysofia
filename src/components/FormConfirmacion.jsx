import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Users, 
  Phone, 
  Music, 
  MessageCircle, 
  UserPlus, 
  X, 
  Send, 
  CheckCircle,
  XCircle,
  Sparkles
} from 'lucide-react';


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

  // Detectar parámetros de URL para mensajes de éxito/error del fallback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
      setExito('¡Confirmación enviada exitosamente! ✨💕');
      // Limpiar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('error')) {
      setExito(`Error: ${decodeURIComponent(urlParams.get('error'))}`);
      // Limpiar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('asistencia', form.asistencia);
    formData.append('wsp', form.wsp);
    formData.append('musica', form.musica);
    formData.append('mensaje', form.mensaje);
    formData.append('invitados', JSON.stringify(form.invitados));

    try {
      // Usar URL relativa como funcionaba antes
      const response = await fetch('guardar_confirmacion.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Manejar respuesta JSON
      if (result.success) {
        setExito('¡Confirmación enviada exitosamente! ✨💕');
        setForm({ nombre: "", invitados: [], wsp: "", musica: "", mensaje: "", asistencia: "" });
        setNuevoInvitado("");
      } else {
        setExito(`Error: ${result.error || 'Hubo un error al enviar la confirmación.'}`);
      }

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      // Si hay error de JSON, intentar con texto plano como fallback
      if (error.message.includes('JSON')) {
        setExito('Confirmación enviada pero con formato de respuesta inesperado.');
      } else {
        setExito(`Error de conexión: ${error.message}`);
      }
    }
    
    setEnviando(false);
  };
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-bgSection via-base-light to-bgSection min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header con corazón */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-accent mr-2 animate-pulse" />
            <Sparkles className="w-6 h-6 text-primary" />
            <Heart className="w-8 h-8 text-accent ml-2 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2 font-serif">
            Confirma tu Asistencia
          </h2>
          <p className="text-base font-light">
            ¡Esperamos celebrar contigo este día especial!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-contrast/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-bgSection"
        >
          {/* Confirmación de Asistencia */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-semibold text-primary mb-4">
              <Heart className="w-5 h-5 text-accent mr-3" />
              ¿Confirmas tu asistencia?
            </label>
            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, asistencia: "Si" }))}
                className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                  form.asistencia === "Si"
                    ? 'border-accent bg-accent/10 text-accent shadow-md'
                    : 'border-bgSection text-base hover:border-accent hover:bg-accent/5'
                }`}
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                Sí, confirmo asistencia
              </button>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, asistencia: "No" }))}
                className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                  form.asistencia === "No"
                    ? 'border-primary bg-primary/10 text-primary shadow-md'
                    : 'border-bgSection text-base hover:border-primary hover:bg-primary/5'
                }`}
              >
                <XCircle className="w-5 h-5 mr-3" />
                No podré asistir
              </button>
            </div>
          </div>

          {/* Nombre */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-primary mb-3">
              <Users className="w-5 h-5 text-accent mr-3" />
              Nombre y apellido
            </label>
            <input 
              name="nombre" 
              value={form.nombre} 
              onChange={handleChange} 
              required 
              className="w-full p-4 border-2 border-bgSection rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 disabled:bg-bgSection/30 disabled:text-base/60" 
              placeholder="Ej: Julieta González" 
              disabled={!form.asistencia} 
            />
          </div>

          {/* Invitados adicionales */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-primary mb-3">
              <UserPlus className="w-5 h-5 text-accent mr-3" />
              Invitados adicionales
            </label>
            
            {/* Lista de invitados agregados */}
            <div className="space-y-2 mb-4">
              {form.invitados.map((inv, i) =>
                inv.trim() === "" ? null : (
                  <div key={i} className="flex items-center gap-3 p-3 bg-bgSection/20 rounded-lg border border-bgSection">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="flex-1 text-primary font-medium">{inv}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(prev => ({
                          ...prev,
                          invitados: prev.invitados.filter((_, idx) => idx !== i)
                        }));
                      }}
                      className="p-1 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Quitar invitado"
                      disabled={!form.asistencia}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Campo para agregar nuevo invitado */}
            <div className="flex items-center gap-3 p-3 bg-bgSection/10 rounded-lg border-2 border-dashed border-bgSection">
              <UserPlus className="w-4 h-4 text-bgSection" />
              <input
                value={nuevoInvitado}
                onChange={e => setNuevoInvitado(e.target.value)}
                placeholder="Nombre del invitado (ej: María, mi esposa)"
                className="flex-1 bg-transparent border-none outline-none text-primary placeholder-base/60"
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
                className="p-2 bg-accent text-contrast rounded-lg hover:bg-accent/90 transition-colors disabled:bg-bgSection disabled:text-base/60"
                title="Añadir invitado"
                disabled={!form.asistencia || nuevoInvitado.trim() === ""}
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-primary mb-3">
              <Phone className="w-5 h-5 text-accent mr-3" />
              WhatsApp
            </label>
            <input 
              name="wsp" 
              value={form.wsp} 
              onChange={handleChange} 
              required 
              className="w-full p-4 border-2 border-bgSection rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 disabled:bg-bgSection/30 disabled:text-base/60" 
              placeholder="Ej: 11 2345 6789" 
              disabled={!form.asistencia} 
            />
          </div>

          {/* Música */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-primary mb-3">
              <Music className="w-5 h-5 text-accent mr-3" />
              Recomendar una música
            </label>
            <input 
              name="musica" 
              value={form.musica} 
              onChange={handleChange} 
              className="w-full p-4 border-2 border-bgSection rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 disabled:bg-bgSection/30 disabled:text-base/60" 
              placeholder="Ej: La cumparsita" 
              disabled={!form.asistencia} 
            />
          </div>

          {/* Mensaje */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-semibold text-primary mb-3">
              <MessageCircle className="w-5 h-5 text-accent mr-3" />
              Mensaje para los novios
            </label>
            <textarea 
              name="mensaje" 
              value={form.mensaje} 
              onChange={handleChange} 
              className="w-full p-4 border-2 border-bgSection rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 disabled:bg-bgSection/30 disabled:text-base/60 resize-none" 
              placeholder="Escribe un mensaje especial para los novios..."
              rows="4"
              disabled={!form.asistencia} 
            />
          </div>

          {/* Botón de envío */}
          <button 
            type="submit" 
            disabled={enviando || !form.asistencia} 
            className={`w-full flex items-center justify-center p-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              enviando 
                ? 'bg-bgSection text-base cursor-not-allowed'
                : !form.asistencia
                ? 'bg-bgSection/50 text-base/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-accent text-contrast hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {enviando ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-contrast mr-3"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-3" />
                Enviar Confirmación
              </>
            )}
          </button>

          {/* Mensaje de éxito */}
          {exito && (
            <div className={`mt-4 p-4 rounded-xl text-center font-medium ${
              exito.includes('error') || exito.includes('Hubo')
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-accent/10 text-accent border border-accent/30'
            }`}>
              {exito.includes('error') || exito.includes('Hubo') ? (
                <XCircle className="w-5 h-5 inline mr-2" />
              ) : (
                <CheckCircle className="w-5 h-5 inline mr-2" />
              )}
              {exito}
            </div>
          )}
        </form>
      </div>
    </section>
  );

}
export default FormConfirmacion;
