import { apiSlice } from "../api/apiSlice";
import type { ApiResponse } from "../../types/auth";

interface UploadResponse {
  key: string;
  url: string;
}

export const uploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ApiResponse<UploadResponse>, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        data: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;