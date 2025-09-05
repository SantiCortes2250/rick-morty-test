import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTER } from "../queries/character";
import { useCharacterStore } from "../store/useCharacterStore";
import favoriteIcon from "@/assests/icons/favorite.svg";
import notFavoriteIcon from "@/assests/icons/not-favorite.svg";
import Comments from "./Comments";

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  const { favorites, toggleFavorite} =
    useCharacterStore();
  const isFavorite = favorites.includes(Number(id));
  const character = data?.character;



  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
  if (!character) return <p className="p-4">No encontrado</p>;

  return (
    <div className="p-2 max-w-4xl mx-auto">
      {/* <Link to="/" className="text-blue-600 hover:underline">&larr; Volver</Link> */}

      <div className=" mx-auto p-4">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="relative inline-block w-30">
            <img
              src={character.image}
              alt={character.name}
              className="w-16 h-16 rounded-full"
            />
            <button
              className="absolute bottom-0 right-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleFavorite(Number(character.id));
              }}
            >
              {isFavorite ? (
                <img src={favoriteIcon} alt="favorite" />
              ) : (
                <img src={notFavoriteIcon} alt="not favorite" />
              )}
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {character.name}
            </h2>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 divide-y divide-gray-200">
          <div className="py-3">
            <p className="text-lg font-medium">Specie</p>
            <p className="text-lg text-gray-500">{character.species}</p>
          </div>
          <div className="py-3">
            <p className="text-lg font-medium">Status</p>
            <p className="text-lg text-gray-500">{character.status}</p>
          </div>
          <div className="py-3">
            <p className="text-lg font-medium">Ocupation</p>
            <p className="text-lg text-gray-500">
              {character.type || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      <Comments id={id!} />



    
    </div>
  );
}
