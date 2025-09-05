import SearchBar from "./SearchBar";
import CharacterList from "./CharacterList";
import StarredCharacterList from "./StarredCharacterLists";
import ResultsFilters from "./ResultsFilters";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-6 w-full md:w-1/4 p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Rick and Morty list
      </h1>
      <SearchBar />
    <ResultsFilters total={0} />
      <StarredCharacterList />
      <CharacterList />
    </div>
  );
}
