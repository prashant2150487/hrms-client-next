import axiosInstance from "../axios"
import { endPoints } from "../endpoints"
import { GetAllEmployeesResponse } from "./typing"






export interface GetAllEmployeesParams {
    page?: number
    limit?: number
    [key: string]: unknown
}

export const getAllEmployees = async (
    params?: GetAllEmployeesParams
): Promise<GetAllEmployeesResponse> => {
    const res = await axiosInstance.get(endPoints.employees.getAll, {
        params,
    })
    return res.data
}