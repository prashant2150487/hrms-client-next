"use client"
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import type { Employee } from '@/api/employees/typing'

interface EmployeeTableProps {
    employeesData?: Employee[]
}

const EmployeeTable = ({ employeesData = [] }: EmployeeTableProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("")

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const filteredEmployees = employeesData.filter((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase()
        return fullName.includes(searchQuery.toLowerCase())
    })

    return (
        <div>
            <div className='flex justify-between'>
                <div className='mb-4'>
                    <Input iconLeft={<Search />} type='text' value={searchQuery} onChange={handleSearchChange} />
                </div>
                <div className='flex gap-5'>
                    <Button>Add new Employee</Button>
                    <Button variant='outline'>Filter</Button>
                </div>
            </div>

            <div>
                <p className='mb-3 text-sm text-slate-500'>Showing {filteredEmployees.length} of {employeesData.length} employees</p>
                <div className='overflow-x-auto rounded-md border'>
                    <table className='min-w-full divide-y divide-slate-200 text-left'>
                        <thead className='bg-slate-50'>
                            <tr>
                                <th className='px-4 py-3 text-sm font-semibold text-slate-700'>Name</th>
                                <th className='px-4 py-3 text-sm font-semibold text-slate-700'>Employee Code</th>
                                <th className='px-4 py-3 text-sm font-semibold text-slate-700'>Email</th>
                                <th className='px-4 py-3 text-sm font-semibold text-slate-700'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-200'>
                            {filteredEmployees.length ? (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td className='px-4 py-3 text-sm text-slate-700'>{employee.first_name} {employee.last_name}</td>
                                        <td className='px-4 py-3 text-sm text-slate-700'>{employee.emp_code}</td>
                                        <td className='px-4 py-3 text-sm text-slate-700'>{employee.personal_email ?? '—'}</td>
                                        <td className='px-4 py-3 text-sm text-slate-700'>{employee.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className='px-4 py-5 text-sm text-slate-500'>No employees found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmployeeTable
