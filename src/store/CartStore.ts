import { create } from "zustand";
import type { Product } from "../types/product";

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

const loadCart = (): CartItem[] => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// set is a function provided by Zustand that allows you to update the state of the store. In this case, it's used to add products to the cart and manage the quantity of each product in the cart.
export const useCartStore = create<CartState>((set) => ({
  cart: loadCart(),

  addToCart: (product) =>
    // similar to prev state => new state, but with a function that takes the previous state as an argument and returns the new state based on it, allowing for more complex state updates that depend on the current state
    set((state) => {
      let updatedCart: CartItem[];
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }

      saveCart(updatedCart);
      return { cart: updatedCart };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      saveCart(updatedCart);
      return { cart: updatedCart };
    }),

  increaseQty: (id) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      saveCart(updatedCart);
      return { cart: updatedCart };
    }),

  decreaseQty: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
      saveCart(updatedCart);
      return { cart: updatedCart };
    }),
}));
