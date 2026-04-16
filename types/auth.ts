export interface Permission {
  id: number;
  module: string;
  action: string;
  codename: string;
  description: string;
}

export interface Role {
  id: number;
  tenant_id: string | null;
  name: string;
  label: string;
  in_system: number;
  created_at: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  tenant_id: string;
  role_id: number;
  email: string;
  is_active: boolean;
  is_email_varified: boolean;
  mfa_enabled: boolean;
  mfa_secret: string | null;
  failed_attempts: number;
  locked_until: string | null;
  last_login: string | null;
  last_login_ip: string | null;
  avatar_url: string | null;
  delete_at: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: Role;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}