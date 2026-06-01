import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types';
import { products } from '../data/products';

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, spec: string, quantity?: number) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, spec, quantity = 1) => {
        const items = get().items;
        const existing = items.findIndex(
          (i) => i.productId === productId && i.spec === spec
        );
        if (existing >= 0) {
          const next = [...items];
          next[existing] = { ...next[existing], quantity: next[existing].quantity + quantity };
          set({ items: next });
        } else {
          set({ items: [...items, { productId, spec, quantity }] });
        }
      },
      removeItem: (index) => {
        set({ items: get().items.filter((_, i) => i !== index) });
      },
      updateQuantity: (index, quantity) => {
        if (quantity < 1) return;
        const next = [...get().items];
        next[index] = { ...next[index], quantity };
        set({ items: next });
      },
      clearCart: () => set({ items: [] }),
      totalCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => {
          const p = products.find((p) => p.id === item.productId);
          return sum + (p?.price ?? 0) * item.quantity;
        }, 0),
    }),
    { name: 'runhe-cart' }
  )
);
