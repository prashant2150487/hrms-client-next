import axiosInstance from "../axios"
import { endPoints } from "../endpoints"
import { GetAllEmployeesResponse } from "./typing"






export interface GetAllEmployeesParams {
    page?: number
    limit?: number
    [key: string]: unknown
}

export interface CreateEmployee {
    first_name: string
    last_name: string
    email: string
    personal_email: string
    phone_primary: string
    date_of_joining: string
    employment_type: string
    role_id: number
}

export const getAllEmployees = async (
    params?: GetAllEmployeesParams
): Promise<GetAllEmployeesResponse> => {
    const res = await axiosInstance.get(endPoints.employees.getAll, {
        params,
    })
    return res.data
}
export const createEmployee = async (employeeData: CreateEmployee)=>{
    const res=await axiosInstance.post(endPoints.employees.create,employeeData)
    return res;
}   