import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // accommodation IDs
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) => {
        set((state) => ({
          favorites: [...state.favorites, id],
        }));
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        }));
      },

      isFavorite: (id) => {
        return get().favorites.includes(id);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
    },
  ),
);
