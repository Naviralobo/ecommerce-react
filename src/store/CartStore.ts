import { create } from "zustand";
import type { Product } from "../types/product";

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
};
// set is a function provided by Zustand that allows you to update the state of the store. In this case, it's used to add products to the cart and manage the quantity of each product in the cart.
export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) =>
    // similar to prev state => new state, but with a function that takes the previous state as an argument and returns the new state based on it, allowing for more complex state updates that depend on the current state
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),
}));
