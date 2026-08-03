import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: axiosBaseQuery(),

  tagTypes: [
    "User",
    "Product",
    "Category",
    "Cart",
    "Wishlist",
    "Order",
    "Review",
  ],

  endpoints: () => ({}),
});