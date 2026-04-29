import { deleteEmployee } from "@/api/employees";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface DeleteEmployeeModalProps {
    onClose: () => void;
    employeeId?: string | null;
    refetchEmployees?: () => void;
}

const exitReasons = [
    "resignation", "termination", "retirement", "contract_end", "other",
];

const DeleteEmployeeModal = ({
    onClose,
    employeeId,
    refetchEmployees,
}: DeleteEmployeeModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [exitReason, setExitReason] = useState("resignation");
    const [exitNotes, setExitNotes] = useState("");

    const handleDeleteEmployee = async () => {
        if (!employeeId) {
            toast.error("Employee not found");
            return;
        }

        try {
            setIsDeleting(true);

            const payload = {
                exit_reason: exitReason,
                exit_notes: exitNotes,
            };

            const res = await deleteEmployee(employeeId, payload);
            console.log(res);

            if (res?.success) {
                toast.success("Employee deleted successfully");
                refetchEmployees?.();
                onClose();
            } else {
                toast.error(res?.message || "Failed to delete employee");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Remove Employee
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                    <p className="text-sm text-gray-600">
                        This action will permanently remove the employee record.
                    </p>

                    {/* Exit Reason */}
                    <Input
                        as="select"
                        label="Exit Reason"
                        theme="rose"
                        value={exitReason}
                        onChange={(e: any) => setExitReason(e.target.value)}
                    >
                        {exitReasons.map((reason) => (
                            <option key={reason} value={reason}>
                                {reason.replace("_", " ").toUpperCase()}
                            </option>
                        ))}
                    </Input>

                    {/* Exit Notes */}
                    <Input
                        as="textarea"
                        label="Exit Notes"
                        theme="rose"
                        placeholder="Write employee exit note..."
                        value={exitNotes}
                        onChange={(e: any) => setExitNotes(e.target.value)}
                    />
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={isDeleting}>
                        Cancel
                    </Button>

                    <Button variant="danger" onClick={handleDeleteEmployee} disabled={isDeleting} className="border-none">Delete Employee</Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEmployeeModal;