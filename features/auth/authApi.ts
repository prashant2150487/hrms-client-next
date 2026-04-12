import axiosInstance from '@/config/axios/axiosInstance';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '@/types/auth';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<{ accessToken: string; refreshToken?: string; user: User }> {
    const response = await axiosInstance.post('/auth/login', credentials);
    return {
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken,
      user: response.data.user
    };
  }

  static async register(userData: RegisterRequest): Promise<{ accessToken: string; refreshToken?: string; user: User }> {
    const response = await axiosInstance.post('/auth/register', userData);
    return {
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken,
      user: response.data.user
    };
  }

  static async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  }

  static async getProfile(): Promise<User> {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  }

  static async refreshToken(): Promise<{ accessToken: string; refreshToken?: string }> {
    const response = await axiosInstance.post('/auth/refresh');
    return {
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken
    };
  }
}

// For backward compatibility, you can also export individual functions
export const login = AuthService.login;
export const register = AuthService.register;
export const logout = AuthService.logout;
export const getProfile = AuthService.getProfile;
export const refreshToken = AuthService.refreshToken;