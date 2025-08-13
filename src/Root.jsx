import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";


const Root = () => {
  const [isLogged, setIsLogged] = useState(() => {
    return localStorage.getItem("admin_logged") === "true";
  });

  useEffect(() => {
    localStorage.setItem("admin_logged", isLogged ? "true" : "false");
  }, [isLogged]);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={isLogged ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default Root;
