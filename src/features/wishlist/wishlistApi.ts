import { apiSlice } from "../api/apiSlice";

import type { ApiResponse } from "../../types/auth";
import type { Wishlist } from "../../types/wishlist";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<ApiResponse<Wishlist>, void>({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),

      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation<
      ApiResponse<Wishlist>,
      string
    >({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "POST",
      }),

      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<
      ApiResponse<Wishlist>,
      string
    >({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;