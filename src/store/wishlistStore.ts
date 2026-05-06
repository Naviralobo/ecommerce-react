import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

type WishlistState = {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
};

//stateCreator defines the type of the function and adds types to get and set, which are functions provided by Zustand to manage the state of the store. This ensures that when we use get and set within the wishlistConfig function, we have proper type checking and autocompletion for the state properties and methods.
//stateCreator is just a blueprint to create the actual store
const wishlistConfig: StateCreator<WishlistState> = (set, get) => ({
  wishlist: [],

  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.some((p) => p.id === product.id);

      return {
        wishlist: exists
          ? state.wishlist.filter((p) => p.id !== product.id)
          : [...state.wishlist, product],
      };
    });
  },

  isInWishlist: (id) => {
    return get().wishlist.some((p) => p.id === id);
  },
});

// Apply middleware (persist layer) to save data to localStorage and create the actual store using the wishlistConfig blueprint. The persist middleware takes care of saving the wishlist state to localStorage under the key "wishlist-storage" and rehydrating it when the app loads, ensuring that the user's wishlist is preserved across sessions.
const persistedWishlistConfig = persist(wishlistConfig, {
  name: "wishlist-storage",
});

export const useWishlistStore = create<WishlistState>()(
  persistedWishlistConfig,
);

// export const useWishlistStore = create<WishlistState>()(
//   persist(
//     (set, get) => ({
//       wishlist: [],

//       toggleWishlist: (product) => {
//         const exists = get().wishlist.find((p) => p.id === product.id);

//         if (exists) {
//           set({
//             wishlist: get().wishlist.filter((p) => p.id !== product.id),
//           });
//         } else {
//           set({
//             wishlist: [...get().wishlist, product],
//           });
//         }
//       },

//       isInWishlist: (id) => {
//         return get().wishlist.some((p) => p.id === id);
//       },
//     }),
//     {
//       name: "wishlist-storage",
//     },
//   ),
// );
