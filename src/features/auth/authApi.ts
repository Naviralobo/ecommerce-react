import { apiSlice } from "../api/apiSlice";

import type {
  ApiResponse,
  AuthData,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../../types/auth";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthData>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),

    register: builder.mutation<ApiResponse<RegisterResponse>, RegisterRequest>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        data: user,
      }),
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    profile: builder.query<ApiResponse<AuthData["user"]>, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),

      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileQuery,
} = authApi;
