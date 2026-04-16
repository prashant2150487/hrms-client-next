import { LoginRequest, RegisterRequest, User, ApiResponse } from '@/types/auth';
import axiosInstance from '../axios';
import { endPoints } from '../endpoints';

export const login = (credentials: LoginRequest) => {
  return axiosInstance.post(endPoints.auth.login, credentials);
};
export const getMe = () => {
  return axiosInstance.get<ApiResponse<User>>(endPoints.auth.getMe);
};

export const register = (userData: RegisterRequest) => {
  return axiosInstance.post(endPoints.auth.register, userData);
};

export const logout = () => {
  return axiosInstance.post(endPoints.auth.logout);
};

export const getProfile = () => {
  return axiosInstance.get(endPoints.auth.getProfile);
};

export const refreshToken = () => {
  return axiosInstance.post(endPoints.auth.refreshToken);
};

export const verifyEmail = (token: string) => {
  return axiosInstance.post(endPoints.auth.verifyEmail, { token });
}
