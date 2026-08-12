import { apiSlice } from "../api/apiSlice";
import type { ApiResponse, User } from "../../types/auth";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    makeSeller: builder.mutation<
      ApiResponse<User>,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PATCH",
        data: {
          role: "seller",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useMakeSellerMutation,
} = adminApi;

