import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteStore {
  productIds: string[];
  toggle: (id: string) => void;
  isFavorited: (id: string) => boolean;
  count: () => number;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (id) => {
        const ids = get().productIds;
        if (ids.includes(id)) {
          set({ productIds: ids.filter((i) => i !== id) });
        } else {
          set({ productIds: [...ids, id] });
        }
      },
      isFavorited: (id) => get().productIds.includes(id),
      count: () => get().productIds.length,
    }),
    { name: 'runhe-favorites' }
  )
);
