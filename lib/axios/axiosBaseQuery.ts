import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";
import { RootState } from "@/store";
import { logout, setCredentials } from "@/features/auth/authSlice";
import { Mutex } from "async-mutex";

// Prevent multiple simultaneous refresh calls
const mutex = new Mutex();

export interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export type AxiosBaseQueryError = {
  status: number | string;
  data: unknown;
};

const axiosBaseQuery = (): BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
> => {
  return async (args, api) => {
    const state = api.getState() as RootState;
    const accessToken = state.auth.accessToken;

    // Wait if a refresh is already in progress
    await mutex.waitForUnlock();

    try {
      const result = await axiosInstance({
        url: args.url,
        method: args.method ?? "GET",
        data: args.data,
        params: args.params,
        headers: {
          ...args.headers,
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });

      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;

      // Attempt token refresh on 401
      if (status === 401) {
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();

          try {
            const refreshToken = (api.getState() as RootState).auth.refreshToken;

            const refreshResult = await axiosInstance.post("/auth/refresh", {
              refreshToken,
            });

            if (refreshResult.data) {
              api.dispatch(setCredentials(refreshResult.data));

              // Retry original request with new token
              const retryResult = await axiosInstance({
                url: args.url,
                method: args.method ?? "GET",
                data: args.data,
                params: args.params,
                headers: {
                  ...args.headers,
                  Authorization: `Bearer ${refreshResult.data.accessToken}`,
                },
              });

              return { data: retryResult.data };
            } else {
              api.dispatch(logout());
            }
          } catch {
            api.dispatch(logout());
          } finally {
            release();
          }
        } else {
          // Wait for the refresh and retry
          await mutex.waitForUnlock();
          const newToken = (api.getState() as RootState).auth.accessToken;

          try {
            const retryResult = await axiosInstance({
              url: args.url,
              method: args.method ?? "GET",
              data: args.data,
              params: args.params,
              headers: {
                ...args.headers,
                ...(newToken && { Authorization: `Bearer ${newToken}` }),
              },
            });
            return { data: retryResult.data };
          } catch (retryError) {
            const e = retryError as AxiosError;
            return {
              error: {
                status: e.response?.status ?? "FETCH_ERROR",
                data: e.response?.data ?? e.message,
              },
            };
          }
        }
      }

      return {
        error: {
          status: axiosError.response?.status ?? "FETCH_ERROR",
          data: axiosError.response?.data ?? axiosError.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;