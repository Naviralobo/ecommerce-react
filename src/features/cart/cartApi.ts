import { apiSlice } from "../api/apiSlice";
import type { ApiResponse } from "../../types/auth";
import type { Cart } from "../../types/cart";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ApiResponse<Cart>, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),

      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<
      ApiResponse<Cart>,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,
        method: "POST",
        data: { quantity },
      }),

      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<ApiResponse<Cart>, string>({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<ApiResponse<Cart>, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
