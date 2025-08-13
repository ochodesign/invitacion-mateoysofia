import React, { useState } from "react";

const PASSWORD = "Julieta8a";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setError("");
      onLogin();
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-xs">
        <h2 className="text-xl font-bold mb-4 text-center">Acceso Admin</h2>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border px-3 py-2 rounded pr-10"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary focus:outline-none"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2 12c2.25 4 6.5 7 10 7 1.61 0 3.13-.39 4.45-1.08m3.57-2.92A10.45 10.45 0 0 0 22 12c-2.25-4-6.5-7-10-7-1.27 0-2.5.19-3.67.54M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>
            )}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold">Ingresar</button>
      </form>
    </div>
  );
};

export default AdminLogin;
