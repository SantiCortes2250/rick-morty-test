import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../queries/characters";
import CharacterCard from "./CharacterItem";
import { useCharacterStore } from "../store/useCharacterStore";
import { useMemo, useEffect } from "react";

type Character = {
  id: string;
  name: string;
  species: string;
  image: string;
  status: string;
  gender: string;
};

type CharactersData = {
  characters: {
    results: Character[];
  };
};

export default function CharacterList() {
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);
  const { favorites, filters, setTotal } = useCharacterStore();

  const characters = useMemo(() => {
    let results = data?.characters?.results || [];

    // 🚫 Excluir personajes que ya están en favoritos
    results = results.filter((c) => !favorites.includes(Number(c.id)));

    // 🔍 Filtro búsqueda
    if (filters.search) {
      results = results.filter((c) =>
        c.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // ⚡ Filtros avanzados
    if (filters.status !== "all") {
      results = results.filter((c) => c.status === filters.status);
    }
    if (filters.species !== "all") {
      results = results.filter((c) => c.species === filters.species);
    }
    if (filters.gender !== "all") {
      results = results.filter((c) => c.gender === filters.gender);
    }

    // ↕ Ordenar
    results = [...results].sort((a, b) =>
      filters.sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return results;
  }, [data, filters, favorites]);

  // 📝 Actualizar total
  useEffect(() => {
    setTotal(characters.length);
  }, [characters.length, setTotal]);

  if (loading) return <p className="p-4 font-semibold text-lg">Loading...</p>;
  if (error) return <p className="p-4font-semibold text-lg text-red-500">Error: {error.message}</p>;

  return (
    <>
      <h2 className="text-sm font-semibold text-gray-500">
        CHARACTERS ({characters.length})
      </h2>
      <ul>
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            id={Number(c.id)}
            name={c.name}
            species={c.species}
            image={c.image}
          />
        ))}
      </ul>
    </>
  );
}
