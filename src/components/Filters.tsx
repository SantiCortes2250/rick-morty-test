import { useState } from "react";
import { useCharacterStore } from "../store/useCharacterStore";

export default function Filters({ onClose }: { onClose: () => void }) {
  const { filters, setFilters } = useCharacterStore();

  // Estado local temporal (inicia con los filtros actuales del store)
  const [localFilters, setLocalFilters] = useState(filters);

    //Detecta cambios en los filtros
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
          className={`px-4 py-2 rounded-lg cursor-pointer border border-gray-200  font-semibold transition ${
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
    setFilters(localFilters); // ahora sí se aplican en el store
    onClose();
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl border border-gray-200 shadow-md  absolute mt-2 z-10">
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
          onChange={(val) =>
            setLocalFilters({ ...localFilters, species: val })
          }
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
          onChange={(val) =>
            setLocalFilters({ ...localFilters, status: val })
          }
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
          onChange={(val) =>
            setLocalFilters({ ...localFilters, gender: val })
          }
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
        className={`w-full py-2 rounded-lg font-semibold transition cursor-pointer ${
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
