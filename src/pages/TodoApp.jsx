import React, { useState, useEffect } from "react";

function TodoForm({ onAdd }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (value.trim()) {
          onAdd(value.trim());
          setValue("");
        }
      }}
      className="flex gap-2 mb-4"
    >
      <input
        className="border-2 border-green-300 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        placeholder="Nueva tarea..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Agregar</button>
    </form>
  );
}

function TodoItem({ todo, onToggle, onDelete }) {
  // Detectar si estamos en la pestaña de completadas
  const isCompletadasTab = window.todoFilter === 'completadas';
  return (
    <li className={
      `flex items-center justify-between py-2 px-2 rounded-lg mb-1 shadow-sm border transition-all duration-200 relative overflow-hidden ` +
      (todo.completed && isCompletadasTab
        ? 'bg-green-200 border-green-400 animate-pulse-completed' : 'bg-white border-yellow-200')
    }>
      <span className={
        `flex-1 select-none transition-colors duration-200 ` +
        (todo.completed && isCompletadasTab
          ? 'text-green-800 font-extrabold text-xl flex items-center gap-2 drop-shadow-glow' : todo.completed ? 'line-through text-gray-400' : '')
      }>
        {todo.completed && isCompletadasTab ? <><span className="text-3xl animate-bounce">🎉✅</span> <span className="animate-glow">{todo.text}</span></> : todo.text}
      </span>
      <button
        className={`ml-2 rounded-full w-7 h-7 flex items-center justify-center transition text-lg ${todo.completed ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
        onClick={onToggle}
        title={todo.completed ? "Marcar como pendiente" : "Marcar como completada"}
      >
        {todo.completed ? '🛑' : '✅'}
      </button>
      <button
        className="ml-2 text-red-500 hover:text-white hover:bg-red-500 rounded-full w-7 h-7 flex items-center justify-center transition"
        onClick={onDelete}
        title="Eliminar"
      >
        <span className="text-lg">✕</span>
      </button>
      {/* Confeti animado solo en completadas */}
      {todo.completed && isCompletadasTab && (
        <span className="absolute left-0 top-0 w-full h-full pointer-events-none z-10 animate-confetti">🎊</span>
      )}
    </li>
  );
}



function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) return <p className="text-gray-400">No hay tareas.</p>;
  // Pasar el filtro global como prop para saber si estamos en completadas
  useEffect(() => {
    window.todoFilter = window.todoFilterValue;
  });
  return (
    <ul className="divide-y">
      {todos.map((todo, i) => (
        <TodoItem
          key={i}
          todo={todo}
          onToggle={() => onToggle(i)}
          onDelete={() => onDelete(i)}
        />
      ))}
    </ul>
  );
}

function TodoApp() {
  // Guardar el filtro global para los hijos
  useEffect(() => {
    window.todoFilterValue = filter;
  }, [filter]);
  // Ayuda UX
  const ayuda = "Usá ✅ para marcar como completada y 🛑 para volver a pendiente.";
  // Estado de tareas y filtro
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("todas");

  // Guardar en localStorage cada vez que cambian las tareas
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Acciones
  const addTodo = text => setTodos([...todos, { text, completed: false }]);
  const toggleTodo = idx => setTodos(todos => todos.map((t, i) => i === idx ? { ...t, completed: !t.completed } : t));
  const deleteTodo = idx => setTodos(todos => todos.filter((_, i) => i !== idx));

  // Filtros
  const filteredTodos =
    filter === "todas"
      ? todos
      : filter === "completadas"
      ? todos.filter(t => t.completed)
      : todos.filter(t => !t.completed);

  // Contador de tareas activas (pendientes)
  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className={
      `max-w-md mx-auto rounded-xl shadow-lg p-6 mt-8 border-2 border-green-300 ` +
      (filter === 'completadas' ? 'bg-gradient-to-br from-green-200 via-green-100 to-green-50 animate-glowbox' : 'bg-gradient-to-br from-green-100 via-yellow-50 to-red-100')
    }>
      <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
        <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="inline-block w-3 h-3 rounded-full bg-red-400"></span>
        Lista de Tareas
      </h2>
      {filter === 'completadas' && (
        <div className="mb-4 text-center animate-fadein">
          <span className="text-4xl block mb-2">🏆</span>
          <span className="text-green-700 font-bold text-lg">¡Felicitaciones! Todas estas tareas fueron completadas 🎉</span>
        </div>
      )}
      <TodoForm onAdd={addTodo} />
      <div className="mb-2 text-xs text-gray-500 italic flex items-center gap-2">
        <span role="img" aria-label="info">ℹ️</span> {ayuda}
      </div>
      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("todas")}
          className={`px-2 py-1 rounded text-sm font-semibold border transition ${filter === "todas" ? "bg-green-500 text-white border-green-500" : "bg-white border-green-300 text-green-700 hover:bg-green-100"}`}>Todas</button>
        <button onClick={() => setFilter("pendientes")}
          className={`px-2 py-1 rounded text-sm font-semibold border transition ${filter === "pendientes" ? "bg-yellow-400 text-white border-yellow-400" : "bg-white border-yellow-300 text-yellow-700 hover:bg-yellow-100"}`}>Pendientes</button>
        <button onClick={() => setFilter("completadas")}
          className={`px-2 py-1 rounded text-sm font-semibold border transition ${filter === "completadas" ? "bg-red-400 text-white border-red-400" : "bg-white border-red-300 text-red-700 hover:bg-red-100"}`}>Completadas</button>
      </div>
      {/* Contador */}
      <div className="mb-2 text-sm text-gray-700">
        Tareas activas: <span className="font-bold text-green-700">{activeCount}</span>
      </div>
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      {/* Animaciones CSS para completadas */}
      <style>{`
        @keyframes glowbox {
          0% { box-shadow: 0 0 0px 0 #22c55e44; }
          50% { box-shadow: 0 0 32px 8px #22c55e88; }
          100% { box-shadow: 0 0 0px 0 #22c55e44; }
        }
        .animate-glowbox { animation: glowbox 2s infinite; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadein { animation: fadein 1s; }
        @keyframes confetti { 0% { opacity: 0; transform: translateY(-20px) scale(0.8); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(40px) scale(1.2); } }
        .animate-confetti { animation: confetti 1.5s linear; }
        @keyframes pulse-completed { 0%,100% { background-color: #bbf7d0; } 50% { background-color: #4ade80; } }
        .animate-pulse-completed { animation: pulse-completed 1.5s infinite; }
        .drop-shadow-glow { filter: drop-shadow(0 0 6px #22c55e); }
        @keyframes glow { 0%,100% { text-shadow: 0 0 0 #22c55e; } 50% { text-shadow: 0 0 12px #22c55e; } }
        .animate-glow { animation: glow 1.2s infinite; }
      `}</style>
    </div>
  );
}



export default TodoApp;
