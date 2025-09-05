import { useCharacterStore } from "../store/useCharacterStore";
import { useState } from "react";
import Filters from "./Filters";
import searchIcon from "@/assests/icons/search.svg";
import filterIcon from "@/assests/icons/filter.svg";


export default function SearchBar() {
  const { filters, setFilters } = useCharacterStore();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
        <img src={searchIcon} className="" alt="" />
        <input
          type="text"
          placeholder="Search or filter results"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="flex-1 bg-transparent outline-none px-2 text-gray-700"
        />
        <button
          className={`text-primary-600 cursor-pointer rounded-lg item transition ${showFilters ? 'btn-selected' : 'hover:bg-gray-200'}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <img src={filterIcon} alt="" />
        </button>
      </div>
      {showFilters && <Filters onClose={()=> setShowFilters(false)}/> }
    </div>
  );
}
