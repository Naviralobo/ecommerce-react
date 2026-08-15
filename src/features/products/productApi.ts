import { apiSlice } from "../api/apiSlice";
import type { ApiResponse } from "../../types/auth";
import type { Product } from "../../types/product";

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

export interface UpdateProductRequest {
  id: string;
  data: Partial<CreateProductRequest>;
}

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

    createProduct: builder.mutation<ApiResponse<Product>, CreateProductRequest>(
      {
        query: (product) => ({
          url: "/products",
          method: "POST",
          data: product,
        }),

        invalidatesTags: ["Product"],
      },
    ),

    updateProduct: builder.mutation<ApiResponse<Product>, UpdateProductRequest>(
      {
        query: ({ id, data }) => ({
          url: `/products/${id}`,
          method: "PUT",
          data,
        }),

        invalidatesTags: ["Product"],
      },
    ),

    deleteProduct: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
