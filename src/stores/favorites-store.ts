import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteType = "accommodation" | "activity";

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  addedAt: Date;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (id: string, type: FavoriteType) => void;
  removeFavorite: (id: string, type?: FavoriteType) => void;
  isFavorite: (id: string, type?: FavoriteType) => boolean;
  getFavoritesByType: (type: FavoriteType) => FavoriteItem[];
  clearFavorites: () => void;
  clearFavoritesByType: (type: FavoriteType) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id, type) => {
        const existing = get().favorites.find(
          (fav) => fav.id === id && fav.type === type,
        );

        if (!existing) {
          set((state) => ({
            favorites: [
              ...state.favorites,
              {
                id,
                type,
                addedAt: new Date(),
              },
            ],
          }));
        }
      },

      removeFavorite: (id, type) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) =>
            type ? !(fav.id === id && fav.type === type) : fav.id !== id,
          ),
        }));
      },

      isFavorite: (id, type) => {
        const { favorites } = get();
        return type
          ? favorites.some((fav) => fav.id === id && fav.type === type)
          : favorites.some((fav) => fav.id === id);
      },

      getFavoritesByType: (type) => {
        return get()
          .favorites.filter((fav) => fav.type === type)
          .sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
      },

      clearFavorites: () => set({ favorites: [] }),

      clearFavoritesByType: (type) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.type !== type),
        }));
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
);
