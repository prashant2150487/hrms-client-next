import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { updateEmployee } from "@/api/employees";
import type { Employee } from "@/api/employees/typing";
import toast from "react-hot-toast";

interface UpdateEmployeeModalProps {
  employee: Employee;
  onClose?: () => void;
  refetchEmployees: () => void;
}

const UpdateEmployeeModal = ({
  employee,
  onClose,
  refetchEmployees,
}: UpdateEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    first_name: employee.first_name || "",
    last_name: employee.last_name || "",
    date_of_joining: employee.date_of_joining
      ? employee.date_of_joining.split("T")[0]
      : "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateEmployee(employee.id, formData);
      if (res.success) {
        toast.success(res.message || "Employee updated successfully");
        refetchEmployees();
        if (onClose) onClose();
      } else {
        toast.error(res.message || "Failed to update employee");
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to update employee");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">Update Employee</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form
            id="update-employee-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
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
              label="Date of Joining"
              type="date"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleChange}
              required
            />
          </form>
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 flex justify-end gap-3">
          <Button variant="white" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="update-employee-form">
            Update Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;
