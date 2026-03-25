import axios from 'axios';

// Configure the base URL for the API. 
// Use an environment variable, falling back to a default format for local development.
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * publicApi instance
 * Used for generic requests that DO NOT require authentication tokens.
 * Example uses: Login, Registration, Public configs.
 */
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * privateApi instance
 * Used for all authenticated requests. Has interceptors configured to 
 * automatically inject tokens and handle 401s (token expiry flows).
 */
export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Request Interceptor: Attach Auth Token
privateApi.interceptors.request.use(
  (config) => {
    // Adjust where you get tokens from. (e.g. Next.js Cookies, Zustand/Redux state, or LocalStorage)
    // For pure client-side examples, localStorage is common:
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Global Error Handling & Token Refresh Mock
privateApi.interceptors.response.use(
  (response) => {
    // Return direct success responses
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Optional: Handle 401 Unauthorized logic (e.g., attempt refresh token or redirect to login)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        /*
          // Example Refresh Token Implementation
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await publicApi.post('/auth/refresh', { refresh_token: refreshToken });
          
          const newAccessToken = response.data.access_token;
          localStorage.setItem('token', newAccessToken);
          
          // Re-attempt original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return privateApi(originalRequest);
        */
        
        // Fallback: If no refresh flow, clear token and redirect
        if (typeof window !== 'undefined') {
          // localStorage.removeItem('token');
          // window.location.href = '/login';
        }

      } catch (refreshError) {
        // Refresh failed, force re-login
        if (typeof window !== 'undefined') {
          // localStorage.removeItem('token');
          // window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    // Custom formatted generic error return, if needed globally
    return Promise.reject(error);
  }
);
