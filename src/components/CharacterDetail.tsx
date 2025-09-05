import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTER } from "../queries/character";
import { useCharacterStore } from "../store/useCharacterStore";
import favoriteIcon from "@/assests/icons/favorite.svg";
import notFavoriteIcon from "@/assests/icons/not-favorite.svg";
import backButtonIcon from "@/assests/icons/back.svg";
import Comments from "./Comments";

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  type?: string;
};

type CharacterQueryData = {
  character: Character;
};

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<CharacterQueryData>(GET_CHARACTER, {
    variables: { id },
  });

  const { favorites, toggleFavorite} =
    useCharacterStore();
  const isFavorite = favorites.includes(Number(id));
  const character = data?.character;




  if (loading) return <p className="p-4 font-semibold text-lg">Loading...</p>;
  if (error) return <p className="p-4 font-semibold text-lg text-red-500">Error: {error.message}</p>;
  if (!character) return <p className="p-4 font-semibold text-lg">Not found</p>;

  return (
    <div className="p-6 h-screen overflow-y-auto">
       <div className="w-full lg:flex-1">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-4 lg:hidden text-purple-600 font-semibold"
      >
        {<img src={backButtonIcon} alt="back" />}
      </button>
    </div>

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
