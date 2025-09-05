import { useCharacterStore } from "../store/useCharacterStore";
import { useState } from "react";

export default function Comments({ id }: { id: string }) {
  const { comments, addComment } = useCharacterStore();
  const [newComment, setNewComment] = useState("");

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Comentarios</h2>

      {/* Lista de comentarios */}
      <ul className="space-y-3 mb-6">
        {(comments[Number(id)] || []).map((c, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 border-b-gray-200 border border-transparent"
          >
            {/* Avatar inicial */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              {c.charAt(0).toUpperCase()}
            </div>
            {/* Texto */}
            <p className="text-gray-700 text-sm leading-snug">{c}</p>
          </li>
        ))}
      </ul>

      {/* Formulario */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newComment.trim()) {
              addComment(Number(id), newComment.trim());
              setNewComment("");
            }
          }}
          placeholder="Escribe un comentario..."
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm  outline-none"
        />
        <button
          onClick={() => {
            if (newComment.trim()) {
              addComment(Number(id), newComment.trim());
              setNewComment("");
            }
          }}
          className="btn-send text-white px-5 py-2 rounded-xl shadow-sm text-sm"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
