import { useState } from "react";
import { useCharacterStore } from "../store/useCharacterStore";
import backIcon from "@/assests/icons/back.svg";

export default function Filters({ onClose }: { onClose: () => void }) {
  const { filters, setFilters } = useCharacterStore();

  const [localFilters, setLocalFilters] = useState(filters);

  const hasChanges = JSON.stringify(localFilters) !== JSON.stringify(filters);

  const ButtonGroup = ({
    options,
    value,
    onChange,
  }: {
    options: { label: string; value: string }[];
    value: string;
    onChange: (val: string) => void;
  }) => (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg cursor-pointer border border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 font-semibold transition ${
            value === opt.value
              ? "btn-selected"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  const applyFilters = () => {
    setFilters(localFilters); 
    onClose();
  };

  return (
    <div className="modal-filter flex flex-col gap-6 w-full  overflow-y-auto p-6 bg-white border border-gray-200 shadow-md  absolute z-10 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex md:hidden justify-between items-center">
        <button onClick={onClose}>
          <img src={backIcon} alt="" />
        </button>
        <h2 className="text-lg font-semibold">Filters</h2>
        <div></div>
      </div>
      {/* Character filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Character</h3>
        <ButtonGroup
          options={[
            { label: "All", value: "all" },
            { label: "Starred", value: "starred" },
            { label: "Others", value: "others" },
          ]}
          value={localFilters.favorites}
          onChange={(val) =>
            setLocalFilters({
              ...localFilters,
              favorites: val as "all" | "starred" | "others",
            })
          }
        />
      </div>

      {/* Specie filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Specie</h3>
        <ButtonGroup
          options={[
            { label: "All", value: "all" },
            { label: "Human", value: "Human" },
            { label: "Alien", value: "Alien" },
          ]}
          value={localFilters.species}
          onChange={(val) => setLocalFilters({ ...localFilters, species: val })}
        />
      </div>

      {/* Status filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Status</h3>
        <ButtonGroup
          options={[
            { label: "All", value: "all" },
            { label: "Alive", value: "Alive" },
            { label: "Dead", value: "Dead" },
          ]}
          value={localFilters.status}
          onChange={(val) => setLocalFilters({ ...localFilters, status: val })}
        />
      </div>

      {/* Gender filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Gender</h3>
        <ButtonGroup
          options={[
            { label: "All", value: "all" },
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          value={localFilters.gender}
          onChange={(val) => setLocalFilters({ ...localFilters, gender: val })}
        />
      </div>

      {/* Sort filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Sort</h3>
        <ButtonGroup
          options={[
            { label: "A - Z", value: "asc" },
            { label: "Z - A", value: "desc" },
          ]}
          value={localFilters.sort}
          onChange={(val) =>
            setLocalFilters({
              ...localFilters,
              sort: val as "asc" | "desc",
            })
          }
        />
      </div>

      {/* Apply button */}
      <button
        onClick={applyFilters}
        className={`w-full py-2 rounded-lg font-semibold transition cursor-pointer btn-filter ${
          hasChanges
            ? "filter-changed text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Filter
      </button>
    </div>
  );
}
