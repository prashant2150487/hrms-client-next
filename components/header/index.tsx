import { RootState } from "@/store";
import {
  Search,
  Bell,
  ChevronDown,
  UserCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

export function Header() {
  const { employee } = useSelector((state: RootState) => state.auth);
  const userName = employee ? `${employee.first_name}${employee.last_name ? ` ${employee.last_name}` : ""}` : "Guest";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="space-y-1">
          <p className="text-lg font-bold uppercase tracking-[0.24em] text-black">hi {employee?.first_name ?? "Guest"}</p>
          <h1 className="text-md font-semibold text-gray-500">Good Morning</h1>
        </div>

        <div className="flex flex-1 min-w-[280px] max-w-2xl items-center gap-3">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </label>

          <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
            <Bell className="h-5 w-5" />
          </button>

          <button className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
            <UserCircle className="h-5 w-5 text-slate-500" />
            <span className="hidden sm:inline">{userName}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
