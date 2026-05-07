"use client";

import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "@/api/employees";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  User,
} from "lucide-react";
import Button from "@/components/ui/button";
import Avatar from "@/components/ui/avatar";
import Chip from "@/components/ui/chip";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId,
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading employee details...
      </div>
    );
  }
  console.log(isError, response);

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Failed to load employee details.</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  const employee = response?.data;
  const fullName = `${employee?.first_name || ""} ${employee?.last_name || ""}`;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={() => router.back()} variant="outline" className="">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-semibold text-slate-800">
          Employee Details
        </h1>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-10 border-b bg-slate-50 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="shrink-0">
            <Avatar name={fullName} size="lg" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {fullName}
            </h2>
            <p className="text-slate-500 text-lg mt-1">{employee.emp_code}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              <Chip
                label={employee.status === "active" ? "Active" : "Inactive"}
                variant={employee.status === "active" ? "primary" : "secondary"}
              />
              <Chip
                label={
                  employee.employment_type === "full_time"
                    ? "Full Time"
                    : "Part Time"
                }
              />
            </div>
          </div>
          <div>
            <Button
              variant="primary"
              onClick={() => {
                // Placeholder for actual update logic on details page
                router.push(`/employees`);
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" /> Personal
                Information
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900">{fullName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Personal Email
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {employee.personal_email || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Primary Phone
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {employee.phone_primary || "-"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-500" /> Work
                Information
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Employee Code
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {employee.emp_code}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Date of Joining
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {employee.date_of_joining
                      ? new Date(employee.date_of_joining).toLocaleDateString()
                      : "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {employee.Department?.name || employee.department_id || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Designation
                  </dt>
                  <dd className="mt-1 text-sm text-slate-900">
                    {employee.Designation?.name ||
                      employee.designation_id ||
                      "-"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
