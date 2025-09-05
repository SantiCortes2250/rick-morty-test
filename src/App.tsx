import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import { useCharacterStore } from "./store/useCharacterStore";
import { useEffect } from "react";

export default function App() {
  const { darkMode } = useCharacterStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
    </Routes>
  );
}
