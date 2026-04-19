

import { getAllEmployees } from '@/api/employees'
import EmployeeTable from '@/components/employees/employeeTable'

export default async function Employees() {
  const employees = await getAllEmployees()
  console.log("Employees data:", employees)

  return (
    <div className='border rounded-md p-4'>
      <EmployeeTable employeesData={employees} />
    </div>
  )
}
