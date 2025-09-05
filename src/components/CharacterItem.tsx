import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../store/useCharacterStore";
import favoriteIcon from "@/assests/icons/favorite.svg";
import notFavoriteIcon from "@/assests/icons/not-favorite.svg";

interface CharacterCardProps {
  id: number;
  name: string;
  species: string;
  image: string;
}

export default function CharacterCard({
  id,
  name,
  species,
  image,
}: CharacterCardProps) {
  const { favorites, toggleFavorite } = useCharacterStore();
  const isFavorite = favorites.includes(id);
  const navigate = useNavigate();

  return (
    <li
      key={id}
      onClick={() => navigate(`/character/${id}`)}
      className="item flex items-center justify-between p-4 rounded-md cursor-pointer border-t-gray-200 border border-transparent"
    >
      <div className="flex items-center gap-2">
        <img src={image} alt={name} className="w-8 h-8 rounded-full" />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{species}</p>
        </div>
      </div>
      <button
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // evita que el click "suba" al contenedor
          e.preventDefault(); // evita que dispare navegación si está dentro de un <Link>
          toggleFavorite(id);
        }}
      >
        {isFavorite ? (
          <img src={favoriteIcon} alt="favorite" />
        ) : (
          <img src={notFavoriteIcon} alt="not favorite" />
        )}
      </button>
    </li>
  );
}

