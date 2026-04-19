import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  DollarSign,
  Briefcase,
  UserCheck,
  ClipboardList,
  CalendarCheck,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
type NavigationItem = {
  title: string,
  href: string,
  icon: React.ElementType,
  active?: boolean
}


const navigation: NavigationItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { title: "All Employees", href: "/employees", icon: Users, active: false },
  { title: "All Departments", href: "/departments", icon: Building2, active: false },
  { title: "Attendance", href: "/attendance", icon: CalendarDays, active: false },
  { title: "Payroll", href: "/payroll", icon: DollarSign, active: false },
  { title: "Jobs", href: "/jobs", icon: Briefcase, active: false },
  { title: "Candidates", href: "/candidates", icon: UserCheck, active: false },
  { title: "Leaves", href: "/leaves", icon: ClipboardList, active: false },
  { title: "Holidays", href: "/holidays", icon: CalendarCheck, active: false },
  { title: "Settings", href: "/settings", icon: Settings, active: false },
];

export function Sidebar() {
  const [sidebarData, setSidebarData] = useState<NavigationItem[] | null>(null);
  const router = useRouter()



  useEffect(() => {
    setSidebarData(navigation)
  }, [])
  const handleNevigate = (href: string, index: number) => {
    const updatesSidebarData = sidebarData ? sidebarData.map((item, i) => ({ ...item, active: i === index })) : null
    setSidebarData(updatesSidebarData)
    router.push(href)

  }
  return (
    <aside className="hidden xl:flex h-screen w-80 flex-col px-6 py-8 sticky top-0 bg-[#F9F9F9]">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white text-xl font-black">
          ∞
        </div>
        <div>
          <p className="text-2xl font-semibold text-slate-900">HRMS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {sidebarData?.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              onClick={() => handleNevigate(item.href, index)}
              className={`group flex items-center px-4 py-2 text-sm transition font-poppins ${item.active
                ? "bg-violet-50 border-l-4 border-[#7152F3] text-[#7152F3] font-extrabold"
                : "text-[#16151C] hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl  text-slate-700 group-hover:text-slate-900">
                <Icon className="h-4 w-4 text-[#7152F3]" />
              </span>
              <span className="">{item.title}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
