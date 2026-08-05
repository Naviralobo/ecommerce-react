import { apiSlice } from "../api/apiSlice";
import type { ApiResponse } from "../../types/auth";
import type { Product } from "../../types/product";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;