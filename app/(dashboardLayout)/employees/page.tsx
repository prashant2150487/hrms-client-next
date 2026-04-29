"use client";

import { useQuery } from '@tanstack/react-query';
import { getAllEmployees } from '@/api/employees';
import EmployeeTable from '@/components/employees/employeeTable';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function Employees() {
  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500);
  const { data: response, isLoading, isError, refetch: refetchEmployees } = useQuery({
    queryKey: ['employees', debouncedSearch],
    queryFn: () => getAllEmployees({search:debouncedSearch}),
    staleTime: 0,
    gcTime: 0
  });

  if (isLoading) {
    return <div className='p-4 text-center'>Loading employees...</div>;
  }

  if (isError || !response?.data?.employees) {
    return <div className='p-4 text-center text-red-500'>Error loading employees.</div>;
  }

  return (
    <div className='border rounded-md p-4'>
      <EmployeeTable
        employeesData={response.data.employees}
        search={search}
        refetchEmployees={refetchEmployees} setSearch={setSearch} />
    </div>
  );
}
