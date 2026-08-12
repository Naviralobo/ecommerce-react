import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axiosInstance from "./axios";
import { AxiosError } from "axios";
import type { RootState } from "../app/store";

type AxiosBaseQueryArgs = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
  params?: Record<string, unknown>;
};

export const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    { status?: number; data: unknown }
  > =>
  async ({ url, method, data, params }, api) => {
    try {
      const state = api.getState() as RootState;
      const accessToken = state.auth.accessToken;

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : undefined,
      });

      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };
