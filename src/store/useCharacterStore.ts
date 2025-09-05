import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Filters {
  favorites: "all" | "starred" | "others";
  species: string;
  status: string;
  gender: string;
  search: string;
  sort: "asc" | "desc";
}

interface CharacterState {
  total: number;
  favorites: number[];
  comments: Record<number, string[]>;
  filters: Filters;
  toggleFavorite: (id: number) => void;
  addComment: (id: number, comment: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setTotal: (total: number) => void;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      favorites: [],
      comments: {},
      total: 0,
      filters: {
        favorites: "all",
        species: "all",
        status: "all",
        gender: "all",
        search: "",
        sort: "asc",
      },

      toggleFavorite: (id) =>
        set((state) => {
          const isFav = state.favorites.includes(id);
          return {
            favorites: isFav
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        }),

      addComment: (id, comment) =>
        set((state) => ({
          comments: {
            ...state.comments,
            [id]: [...(state.comments[id] || []), comment],
          },
        })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      setTotal: (total) => set(() => ({ total })),
    }),
    { name: "character-storage" }
  )
);
