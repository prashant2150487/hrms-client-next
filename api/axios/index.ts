import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },

  // 🔥 CRITICAL for cookies
  withCredentials: true,
});

/**
 * ❌ REMOVE token logic completely
 * Cookies will be sent automatically
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * ✅ Response Interceptor with Refresh Flow
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 🔁 Handle expired access token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint (cookie will be sent automatically)
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout user
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    if (status === 403) {
      console.error("Access forbidden");
    }

    if (status && status >= 500) {
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
