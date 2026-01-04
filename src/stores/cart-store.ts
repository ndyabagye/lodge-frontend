import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import { UGANDA_VAT } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          // Check if item already exists (for accommodations, same dates = same item)
          const existingItemIndex = state.items.findIndex((i) => {
            if (item.type === "accommodation") {
              return (
                i.item_id === item.item_id &&
                i.check_in_date === item.check_in_date &&
                i.check_out_date === item.check_out_date
              );
            }
            return i.id === item.id;
          });

          if (existingItemIndex !== -1) {
            // Update existing item quantity
            const newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + item.quantity,
            };
            return { items: newItems };
          }

          // Add new item
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const { items } = get();
        // console.log("The available items are:", items);
        return items.reduce((total, item) => total + item.total, 0);
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        // console.log("The subtotal is:", subtotal);
        return subtotal * UGANDA_VAT; // 18% tax - adjust as needed
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        // console.log("The tax is:", tax, "the subtotal is:", subtotal);
        return subtotal + tax;
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
