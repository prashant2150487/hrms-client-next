import Link from "next/link";
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

const navigation = [
  { title: "Dashboard", href: "/home", icon: LayoutDashboard, active: true },
  { title: "All Employees", href: "#", icon: Users },
  { title: "All Departments", href: "#", icon: Building2 },
  { title: "Attendance", href: "#", icon: CalendarDays },
  { title: "Payroll", href: "#", icon: DollarSign },
  { title: "Jobs", href: "#", icon: Briefcase },
  { title: "Candidates", href: "#", icon: UserCheck },
  { title: "Leaves", href: "#", icon: ClipboardList },
  { title: "Holidays", href: "#", icon: CalendarCheck },
  { title: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden xl:flex h-screen w-80 flex-col border-r border-slate-200 bg-white px-6 py-8 sticky top-0">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white text-xl font-black">
          ∞
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">HRMS</p>
          <p className="text-lg font-semibold text-slate-900">People tools</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-2 text-sm font-medium transition ${
                item.active
                  ? "bg-violet-50 text-violet-700 border-l-4 border-violent-600 text-violet-600"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-slate-900">
                <Icon className="h-4 w-4 text-violet-600" />
              </span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
