import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Slidebar";
import CharacterDetail from "../components/CharacterDetail";
import { useCharacterStore } from "../store/useCharacterStore";

export default function HomePage() {
  const { darkMode } = useCharacterStore();

  return (
    <div className={`h-screen ${darkMode ? "dark bg-gray-800 text-gray-200" : ""}`}>
      {/* Desktop layout */}
      <div className="hidden lg:flex ">
        <div className="w-1/3 dark:border-gray-700 ">
          <Sidebar />
        </div>
        <main className="flex-1 px-6">
          <Routes>
            <Route
              path="/"
              element={<p className="text-gray-400 mt-4 text-2xl font-semibold">Select a character</p>} 
            />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </main>
      </div>

      {/* Mobile layout */}
      <div className="block lg:hidden h-full">
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </div>
  );
}
