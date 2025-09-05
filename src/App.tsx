import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Slidebar";
import CharacterDetail from "./components/CharacterDetail";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Panel derecho para detalle */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={<p className="text-gray-500">Selecciona un personaje</p>}
          />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </main>
    </div>
  );
}
