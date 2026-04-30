import axiosInstance from "../axios";
import { endPoints } from "../endpoints";
import { GetAllEmployeesResponse } from "./typing";

export interface GetAllEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: unknown;
}

export interface CreateEmployee {
  first_name: string;
  last_name: string;
  email: string;
  personal_email: string;
  phone_primary: string;
  date_of_joining: string;
  employment_type: string;
  role_id: string;
}

export const getAllEmployees = async (
  params?: GetAllEmployeesParams
): Promise<GetAllEmployeesResponse> => {
  const res = await axiosInstance.get(endPoints.employees.getAll, {
    params,
  });
  return res.data;
};
export const createEmployee = async (employeeData: CreateEmployee) => {
  const res = await axiosInstance.post(
    endPoints.employees.create,
    employeeData
  );
  return res;
};
export const deleteEmployee = async (
  employeeId: string,
  payload: { exit_reason: string; exit_notes: string }
) => {
  const res = await axiosInstance.patch(
    endPoints.employees.delete(employeeId),
    payload
  );
  return res.data;
};

export interface UpdateEmployeePayload {
  first_name?: string;
  last_name?: string;
  date_of_joining?: string;
  [key: string]: unknown;
}

export const updateEmployee = async (
  employeeId: string,
  payload: UpdateEmployeePayload
) => {
  const res = await axiosInstance.patch(
    endPoints.employees.update(employeeId),
    payload
  );
  return res.data;
};
