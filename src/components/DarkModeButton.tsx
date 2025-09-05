import { useCharacterStore } from "../store/useCharacterStore";

export default function DarkModeButton() {

const { darkMode, toggleDarkMode } = useCharacterStore();


return (

<button
  onClick={toggleDarkMode}
  className="rounded text-gray-800 cursor-pointer"
>
  {darkMode ? "☀️" : "🌙"}
</button>       

);

}
