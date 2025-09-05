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
  darkMode: boolean;
  selectedId: number | null;
  total: number;
  favorites: number[];
  comments: Record<number, string[]>;
  filters: Filters;
  toggleDarkMode: () => void;
  toggleFavorite: (id: number) => void;
  removeComment: (id: number, index: number) => void;
  addComment: (id: number, comment: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  setTotal: (total: number) => void;
  setSelectedId: (id: number | null) => void;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      favorites: [],
      comments: {},
      total: 0,
      selectedId: null,
      darkMode: false,
      filters: {
        favorites: "all",
        species: "all",
        status: "all",
        gender: "all",
        search: "",
        sort: "asc",
      },
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

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

      removeComment: (characterId, index) =>
        set((state) => {
          const updated = [...(state.comments[characterId] || [])];
          updated.splice(index, 1);
          return {
            comments: {
              ...state.comments,
              [characterId]: updated,
            },
          };
        }),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      setTotal: (total) => set(() => ({ total })),
      setSelectedId: (id) => set(() => ({ selectedId: id })),
    }),
    { name: "character-storage" }
  )
);
