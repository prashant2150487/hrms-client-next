import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { CreateEmployee, createEmployee } from '@/api/employees';
import toast from 'react-hot-toast';

interface CreateEmployeeModalProps {
    onClose?: () => void;
    refetchEmployees: () => void;
}

const CreateEmployeeModal = ({ onClose, refetchEmployees }: CreateEmployeeModalProps) => {
    const [formData, setFormData] = useState<CreateEmployee>({
        first_name: '',
        last_name: '',
        email: '',
        personal_email: '',
        phone_primary: '',
        date_of_joining: '',
        employment_type: 'full_time',
        role_id: 2
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'role_id' ? Number(value) : value
        }));
    };
    console.log(formData)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await createEmployee(formData);
            if(res.data.success){
                toast.success("Employee created successfully")
            }
            refetchEmployees();
            if (onClose) onClose();




        } catch (err){
            toast.error("Failed to create employee")
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-bold text-slate-800">Add New Employee</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <form id="create-employee-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="John"
                            required
                        />
                        <Input
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Doe"
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.doe@company.com"
                            required
                        />
                        <Input
                            label="Personal Email"
                            type="email"
                            name="personal_email"
                            value={formData.personal_email}
                            onChange={handleChange}
                            placeholder="john.personal@gmail.com"
                        />
                        <Input
                            label="Primary Phone"
                            name="phone_primary"
                            value={formData.phone_primary}
                            onChange={handleChange}
                            placeholder="+1-555-0123"
                            required
                        />
                        <Input
                            label="Date of Joining"
                            type="date"
                            name="date_of_joining"
                            value={formData.date_of_joining}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            as="select"
                            label="Employment Type"
                            name="employment_type"
                            value={formData.employment_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="full_time">Full Time</option>
                            <option value="part_time">Part Time</option>
                            <option value="contract">Contract</option>
                        </Input>
                        <Input
                            as="select"
                            label="Role ID"
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            required
                        >
                            <option value={1}>Admin (1)</option>
                            <option value={2}>Employee (2)</option>
                            <option value={3}>Manager (3)</option>
                        </Input>
                    </form>
                </div>

                <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
                    <Button variant="white" onClick={onClose} type="button">
                        Cancel
                    </Button>
                    <Button type="submit" form="create-employee-form">
                        Save Employee
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeModal;