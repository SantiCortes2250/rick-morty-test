import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../queries/characters";
import CharacterCard from "./CharacterItem";
import { useCharacterStore } from "../store/useCharacterStore";

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

export default function StarredCharacterList() {
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);
  const { favorites } = useCharacterStore();

  if (loading) return <p className="p-4 font-semibold text-sm">Loading...</p>;
  if (error) return <p className="p-4 font-semibold text-sm text-red-500">Error: {error.message}</p>;

  // only starred characters
  const characters =
    data?.characters?.results.filter((c) => favorites.includes(Number(c.id))) ||
    [];

  if (characters.length === 0) {
    return (
      <p className="text-gray-500 text-sm font-semibold">
        Don't have starred characters
      </p>
    );
  }

  return (
    <>
    <h2 className="text-sm font-semibold text-gray-500">STARRED CHARACTERS ({favorites.length})</h2>
      <ul className="">
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
