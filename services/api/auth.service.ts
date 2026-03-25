import { publicApi, privateApi } from '@/lib/api';
import type { AuthResponse, LoginCredentials, RegisterData, User } from '@/types/auth';

/**
 * Authentication Service
 * 
 * Centralizes all Auth-related endpoints for the application.
 * Uses publicApi for unauthenticated endpoints (login, register),
 * and privateApi for authenticated endpoints (me/profile, logout).
 */
export const AuthService = {
  
  /**
   * Log in user
   * @param credentials Email and password
   * @returns AuthResponse containing the user and token
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // In a real API, this would be replacing the mock delay below with the actual POST.
    // Example: const { data } = await publicApi.post<AuthResponse>('/auth/login', credentials);
    // return data;
    
    // TEMPORARY MOCK to let the UI work without a real backend backend
    return new Promise((resolve) => setTimeout(() => {
      resolve({
        user: { id: "1", email: credentials.email, name: "Robert Allen", role: "admin" },
        token: "mock_jwt_token_123"
      });
    }, 1000));
  },

  /**
   * Register a new user
   * @param userData Name, email, password
   * @returns AuthResponse containing the user and token
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await publicApi.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  /**
   * Fetch current authenticated user profile
   * @returns The currently logged-in user profile
   */
  getCurrentUser: async (): Promise<User> => {
    // Uses privateApi, which will auto-inject the JWT Bearer Token inside its interceptors
    const { data } = await privateApi.get<User>('/auth/me');
    return data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const { data } = await privateApi.post<{ success: boolean; message: string }>('/auth/logout');
    return data;
  }
};
