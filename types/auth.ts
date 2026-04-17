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

export interface Employee {
  id: string;
  tenant_id: string;
  user_id: string;
  emp_code: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  marital_status: string | null;
  nationality: string | null;
  national_id: string | null;
  passport_number: string | null;
  personal_email: string | null;
  phone_primary: string | null;
  phone_emergency: string | null;
  emergency_contact_name: string | null;
  emergency_contact_rel: string | null;
  blood_group: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country_code: string | null;
  department_id: string | null;
  designation_id: string | null;
  work_location_id: string | null;
  manager_id: string | null;
  employment_type: string;
  work_mode: string;
  date_of_joining: string;
  probation_end_date: string | null;
  date_of_leaving: string | null;
  notice_period_days: number | null;
  status: string;
  exit_reason: string | null;
  exit_notes: string | null;
  bank_account_no: string | null;
  bank_ifsc: string | null;
  bank_name: string | null;
  pan_number: string | null;
  uan_number: string | null;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GetMeData {
  userDetails: User;
  employeeDetails: Employee;
  permissions: string[];
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