"use client"
import React, { useState, useMemo, type ChangeEvent } from 'react'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Search, Eye, Pencil, Trash2 } from 'lucide-react'
import type { Employee } from '@/api/employees/typing'
import Avatar from '@/components/ui/avatar'
import Chip from '@/components/ui/chip'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import './table.css'
import { ModuleRegistry, ClientSideRowModelModule, ValidationModule, TextFilterModule } from 'ag-grid-community'
import type { ColDef } from 'ag-grid-community'
import CreateEmployeeModal from '../createEmployeeModal'

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule, TextFilterModule]);

interface EmployeeTableProps {
    employeesData?: Employee[]
    refetchEmployees: () => void
}

const EmployeeTable = ({ employeesData = [], refetchEmployees }: EmployeeTableProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false)

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const filteredEmployees = employeesData.filter((employee) => {
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase()
        return fullName.includes(searchQuery.toLowerCase())
    })

    const columnDefs = useMemo<ColDef<Employee>[]>(() => [
        {
            headerName: 'Employee Name',
            field: 'first_name',
            valueGetter: (params) => `${params.data?.first_name || ''} ${params.data?.last_name || ''}`,
            cellRenderer: (params: any) => {
                return (
                    <Avatar
                        name={params.value}
                        size="md"
                    />
                )
            },
            flex: 2,
            minWidth: 250,
        },
        {
            headerName: 'Employee ID',
            field: 'emp_code',
            flex: 1.5,
            minWidth: 150,
            cellStyle: { color: '#475569' }
        },
        {
            headerName: 'Department',
            field: 'department_id',
            cellRenderer: () => "Design", // Mock data mapping for visual match
            flex: 1.5,
            cellStyle: { color: '#475569' }
        },
        {
            headerName: 'Designation',
            field: 'designation_id',
            cellRenderer: () => "UI/UX Designer", // Mock data mapping for visual match
            flex: 2,
            cellStyle: { color: '#475569' }
        },
        {
            headerName: 'Type',
            field: 'employment_type',
            cellRenderer: (params: any) => {
                if (params.value === 'full_time') return 'Office';
                if (params.value === 'part_time') return 'Part Time';
                return 'Office';
            },
            flex: 1,
            cellStyle: { color: '#475569' }
        },
        {
            headerName: 'Status',
            field: 'status',
            cellRenderer: () => {
                return <Chip label="Permanent" variant="primary" size="sm" />
            },
            flex: 1.5,
        },
        {
            headerName: 'Action',
            cellRenderer: () => {
                return (
                    <div className="flex gap-4 items-center h-full">
                        <button className="text-slate-500 hover:text-slate-800 transition">
                            <Eye className="w-[18px] h-[18px]" />
                        </button>
                        <button className="text-slate-500 hover:text-slate-800 transition">
                            <Pencil className="w-[18px] h-[18px]" />
                        </button>
                        <button className="text-slate-500 hover:text-red-500 transition">
                            <Trash2 className="w-[18px] h-[18px]" />
                        </button>
                    </div>
                )
            },
            flex: 1.5,
            sortable: false,
            filter: false,
            minWidth: 120,
        }
    ], []);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        resizable: true,
    }), []);

    return (
        <div className="w-full flex-1 flex flex-col pt-2">
            <div className='flex justify-between items-end mb-6'>
                <div className='w-full max-w-sm'>
                    <Input iconLeft={<Search className="w-4 h-4" />}
                        type='text'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search employees..." />
                </div>
                <div className='flex gap-4'>
                    <Button variant='outline'>Filter</Button>
                    <Button onClick={() => setShowModal(true)}>Add new Employee</Button>
                </div>
            </div>

            <div className="ag-theme-quartz w-full [&_.ag-root-wrapper]:!border-none" style={{ height: '700px' }}>
                <AgGridReact
                    rowData={filteredEmployees}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowHeight={76}
                    headerHeight={56}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}
                    domLayout="normal"
                />
            </div>

            <div className="mt-2 text-sm text-slate-500">
                Showing {filteredEmployees.length} of {employeesData.length} records.
            </div>
            {showModal && <CreateEmployeeModal onClose={() => setShowModal(false)} refetchEmployees={refetchEmployees} />}
        </div>
    )
}

export default EmployeeTable

