import SearchBar from "./SearchBar";
import CharacterList from "./CharacterList";
import StarredCharacterList from "./StarredCharacterLists";
import ResultsFilters from "./ResultsFilters";
import DarkModeButton from "./DarkModeButton";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen gap-6 w-full p-6 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="flex justify-between text-xl font-bold text-gray-900 mb-2 dark:text-gray-200">
        Rick and Morty list
        <DarkModeButton />
      </h1>
      <SearchBar />
      <ResultsFilters />
      <div className="flex flex-col gap-6 p-2 overflow-y-auto">
      <StarredCharacterList />
      <CharacterList />
      </div>
    </div>
  );
}
