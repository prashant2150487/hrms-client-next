"use client";

import { useQuery } from '@tanstack/react-query';
import { getAllEmployees } from '@/api/employees';
import EmployeeTable from '@/components/employees/employeeTable';

export default function Employees() {
  const { data: response, isLoading, isError, refetch: refetchEmployees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getAllEmployees()
  });

  if (isLoading) {
    return <div className='p-4 text-center'>Loading employees...</div>;
  }

  if (isError || !response?.data?.employees) {
    return <div className='p-4 text-center text-red-500'>Error loading employees.</div>;
  }

  return (
    <div className='border rounded-md p-4'>
      <EmployeeTable employeesData={response.data.employees} refetchEmployees={refetchEmployees} />
    </div>
  );
}
