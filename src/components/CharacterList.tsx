import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../queries/characters";
import CharacterCard from "./CharacterItem";
import { useCharacterStore } from "../store/useCharacterStore";
import { useEffect } from "react";

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

  let characters = data?.characters?.results || [];

  // Filtro de búsqueda
  if (filters.search) {
    characters = characters.filter((c: any) =>
      c.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  // Filtro de favoritos
  if (filters.favorites === "starred") {
    characters = characters.filter((c: any) =>
      favorites.includes(Number(c.id))
    );
  } else if (filters.favorites === "others") {
    characters = characters.filter(
      (c: any) => !favorites.includes(Number(c.id))
    );
  }

  // Filtros avanzados
  if (filters.status !== "all") {
    characters = characters.filter((c: any) => c.status === filters.status);
  }
  if (filters.species !== "all") {
    characters = characters.filter((c: any) => c.species === filters.species);
  }
  if (filters.gender !== "all") {
    characters = characters.filter((c: any) => c.gender === filters.gender);
  }

  // Orden
  //   characters.sort((a: any, b: any) =>
  //     filters.sort === "asc"
  //       ? a.name.localeCompare(b.name)
  //       : b.name.localeCompare(a.name)
  //   );

  // Actualizar total en el store solo cuando cambia
  useEffect(() => {
    setTotal(characters.length);
  }, [characters.length, setTotal]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <>
      <h2 className="text-sm font-semibold text-gray-500">
        CHARACTERS ({characters.length})
      </h2>
      <ul className="">
        {characters.map((c: any) => (
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
