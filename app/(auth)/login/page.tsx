import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">
      {/* Left side - Dashboard Mockup Graphic Container */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#F5F4FA] items-center justify-center p-8 xl:p-20 relative rounded-r-[40px] shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
        {/* Abstract shapes / gradients (Optional) */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary opacity-[0.03] blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

        {/* Dashboard Window Mockup */}
        <div className="w-full max-w-[900px] h-full max-h-[850px] bg-[#FDFDFD] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] flex border border-white relative z-10 overflow-hidden">
          {/* Sidebar Mockup */}
          <div className="w-[260px] border-r border-[#F0F0F0] p-7 flex flex-col gap-6 bg-white shrink-0">
            <div className="flex items-center gap-3 mb-4 mix-blend-multiply">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary text-white font-bold pb-1 text-2xl shadow-sm">
                ∞
              </div>
              <span className="text-[22px] font-bold tracking-tight text-dark">
                HRMS
              </span>
            </div>

            <div className="space-y-[8px] pt-4 h-full flex flex-col">
              <div className="h-11 bg-primary/10 text-primary rounded-[10px] flex items-center px-4 text-[14px] font-semibold gap-4 transition-all">
                <span className="text-[20px] opacity-90">⊞</span> Dashboard
              </div>
              <div className="h-11 text-gray-normal hover:bg-gray-50 rounded-[10px] flex items-center px-4 text-[14px] font-medium gap-4 transition-all">
                <span className="text-[20px] opacity-70">👥</span> All Employees
              </div>
              <div className="h-11 text-gray-normal hover:bg-gray-50 rounded-[10px] flex items-center px-4 text-[14px] font-medium gap-4 transition-all">
                <span className="text-[20px] opacity-70">🏢</span> All
                Departments
              </div>
              <div className="h-11 text-gray-normal hover:bg-gray-50 rounded-[10px] flex items-center px-4 text-[14px] font-medium gap-4 transition-all">
                <span className="text-[20px] opacity-70">📅</span> Attendance
              </div>
              <div className="h-11 text-gray-normal hover:bg-gray-50 rounded-[10px] flex items-center px-4 text-[14px] font-medium gap-4 transition-all">
                <span className="text-[20px] opacity-70">💰</span> Payroll
              </div>
              <div className="h-11 text-gray-normal hover:bg-gray-50 rounded-[10px] flex items-center px-4 text-[14px] font-medium gap-4 transition-all">
                <span className="text-[20px] opacity-70">💼</span> Jobs
              </div>
              <div className="h-11 text-gray-normal hover:bg-gray-50 rounded-[10px] flex items-center px-4 text-[14px] font-medium gap-4 transition-all">
                <span className="text-[20px] opacity-70">👤</span> Candidates
              </div>
              <div className="h-11 text-gray-normal hover:bg-gray-50 rounded-[10px] flex items-center px-4 text-[14px] font-medium gap-4 mt-auto">
                <span className="text-[20px] opacity-70">⚙️</span> Settings
              </div>
            </div>
          </div>

          {/* Main Content Mockup */}
          <div className="flex-1 p-8 bg-[#FAFAFC] overflow-hidden flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-[22px] font-bold text-dark flex items-center gap-2">
                  Hello Robert <span className="text-xl">✌️</span>
                </h2>
                <p className="text-[13px] text-gray-normal mt-1 font-medium">
                  Good Morning
                </p>
              </div>
              <div className="w-[240px] h-10 bg-white rounded-full border border-gray-200 flex items-center px-4 text-gray-400 shadow-sm">
                <span className="text-[13px] flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Search
                </span>
              </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white p-5 rounded-[16px] border border-gray-100 flex flex-col gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 text-[13px] text-gray-normal font-medium">
                  <span className="bg-primary/10 p-1.5 rounded-lg text-primary text-[14px]">
                    👥
                  </span>{" "}
                  Total Employee
                </div>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-[32px] font-bold text-dark leading-none">
                    560
                  </span>
                  <span className="text-[10px] text-secondary font-bold bg-secondary/10 px-2 py-1 rounded-[4px] text-green-600 flex items-center gap-1">
                    ↑ 12%
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">
                  Update: July 16, 2023
                </span>
              </div>

              <div className="bg-white p-5 rounded-[16px] border border-gray-100 flex flex-col gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 text-[13px] text-gray-normal font-medium">
                  <span className="bg-primary/10 p-1.5 rounded-lg text-primary text-[14px]">
                    💼
                  </span>{" "}
                  Total Applicant
                </div>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-[32px] font-bold text-dark leading-none">
                    1050
                  </span>
                  <span className="text-[10px] text-secondary font-bold bg-secondary/10 px-2 py-1 rounded-[4px] text-green-600 flex items-center gap-1">
                    ↑ 5%
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">
                  Update: July 14, 2023
                </span>
              </div>

              <div className="bg-white p-5 rounded-[16px] border border-gray-100 flex flex-col gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 text-[13px] text-gray-normal font-medium">
                  <span className="bg-primary/10 p-1.5 rounded-lg text-primary text-[14px]">
                    📅
                  </span>{" "}
                  Today Attendance
                </div>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-[32px] font-bold text-dark leading-none">
                    470
                  </span>
                  <span className="text-[10px] font-bold bg-red-500/10 px-2 py-1 rounded-[4px] text-red-500 flex items-center gap-1">
                    ↓ 3%
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">
                  Update: July 14, 2023
                </span>
              </div>

              <div className="bg-white p-5 rounded-[16px] border border-gray-100 flex flex-col gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 text-[13px] text-gray-normal font-medium">
                  <span className="bg-primary/10 p-1.5 rounded-lg text-primary text-[14px]">
                    📋
                  </span>{" "}
                  Total Projects
                </div>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-[32px] font-bold text-dark leading-none">
                    250
                  </span>
                  <span className="text-[10px] text-secondary font-bold bg-secondary/10 px-2 py-1 rounded-[4px] text-green-600 flex items-center gap-1">
                    ↑ 12%
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">
                  Update: July 10, 2023
                </span>
              </div>
            </div>

            {/* Chart Mockup */}
            <div className="bg-white p-6 rounded-[16px] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-[16px] text-dark">
                  Attendance Overview
                </h3>
                <div className="text-[12px] border border-gray-200 px-3 py-1.5 rounded-[8px] flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                  Today
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </div>
              </div>

              {/* Chart Graph Area */}
              <div className="flex-1 flex items-end justify-between px-2 pt-4 relative">
                {/* Y-axis labels mock */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400 py-1 font-medium">
                  <span>100%</span>
                  <span>80%</span>
                  <span>60%</span>
                  <span>40%</span>
                  <span>20%</span>
                  <span>0</span>
                </div>
                <div className="w-6 shrink-0" /> {/* Spacer for Y axis */}
                {[
                  { h1: 45, h2: 20, h3: 35, day: "Mon" },
                  { h1: 65, h2: 15, h3: 20, day: "Tue" },
                  { h1: 50, h2: 30, h3: 20, day: "Wed" },
                  { h1: 70, h2: 20, h3: 10, day: "Thu" },
                  { h1: 40, h2: 45, h3: 15, day: "Fri" },
                  { h1: 30, h2: 55, h3: 15, day: "Sat" },
                  { h1: 25, h2: 25, h3: 50, day: "Sun" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 w-8 h-full"
                  >
                    <div className="w-2.5 h-full flex flex-col justify-end gap-1.5">
                      <div
                        className="w-full bg-[#FF7976] rounded-[4px]"
                        style={{ height: `${bar.h3}%` }}
                      ></div>
                      <div
                        className="w-full bg-[#FFB648] rounded-[4px]"
                        style={{ height: `${bar.h2}%` }}
                      ></div>
                      <div
                        className="w-full bg-primary rounded-[4px]"
                        style={{ height: `${bar.h1}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] text-gray-normal font-medium">
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form Container */}
      <div className="flex w-full items-center justify-center lg:w-[45%] px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="flex flex-col mb-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-[60px]">
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-primary text-white font-bold pb-1 text-3xl shadow-md">
                ∞
              </div>
              <span className="text-[28px] font-bold tracking-tight text-dark">
                HRMS
              </span>
            </div>

            {/* Welcome Text */}
            <h1 className="text-[34px] font-bold tracking-tight text-dark mb-2 flex items-center gap-3">
              Welcome 👋
            </h1>
            <p className="text-gray-normal text-[15px] font-medium">
              Please login here
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
