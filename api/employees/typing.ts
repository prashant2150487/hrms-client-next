export type EmployeeStatus = "active" | "inactive" | "terminated";
export type EmploymentType = "full_time" | "part_time" | "contract" | "intern";

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  personal_email: string | null;
  emp_code: string;
  phone_primary: string | null;
  date_of_joining: string; // ISO Date
  status: EmployeeStatus;
  department_id: string | null;
  designation_id: string | null;
  manager_id: string | null;
  work_location_id: string | null;
  employment_type: EmploymentType;
  probation_end_date: string | null;
  date_of_leaving: string | null;
  exit_reason: string | null;
}

export interface EmployeesData {
  count: number;
  employees: Employee[];
  totalPages: number;
  currentPage: number;
}

export interface GetAllEmployeesResponse {
  success: boolean;
  message: string;
  data: EmployeesData;
}
