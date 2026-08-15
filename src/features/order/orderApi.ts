import { apiSlice } from "../api/apiSlice";
import type { ApiResponse } from "../../types/auth";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
}

export interface UpdateOrderStatusRequest {
  id: string;
  status: OrderStatus;
}

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      ApiResponse<Order>,
      CreateOrderRequest
    >({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Order", "Cart", "Product"],
    }),

    getMyOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    getMyOrder: builder.query<ApiResponse<Order>, string>({
      query: (id) => ({
        url: `/orders/my-orders/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Order", id },
      ],
    }),

    getAllOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => ({
        url: "/orders/admin/all",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    getOrder: builder.query<ApiResponse<Order>, string>({
      query: (id) => ({
        url: `/orders/admin/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Order", id },
      ],
    }),

    updateOrderStatus: builder.mutation<
      ApiResponse<Order>,
      UpdateOrderStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/orders/admin/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetMyOrderQuery,
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;