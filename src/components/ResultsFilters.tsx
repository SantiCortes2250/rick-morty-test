import { useCharacterStore } from "../store/useCharacterStore";

export default function ResultsFilters() {
  const { filters, total } = useCharacterStore();

  // Verificar si hay filtros distintos al default
  const activeFilters = [
    filters.favorites !== "all",
    filters.status !== "all",
    filters.species !== "all",
    filters.gender !== "all",
    filters.sort !== "asc",
  ].filter(Boolean).length;

  return (
    <div className="flex justify-between items-center">
      {/* Cantidad de resultados */}
       {activeFilters > 0 && (
      <span className="text-blue-600 font-semibold">{total} Results</span>
       )}

      {/* Badge de filtros */}
      {activeFilters > 0 && (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          {activeFilters} Filter{activeFilters > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
