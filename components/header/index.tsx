import { RootState } from "@/store";

import { useSelector } from "react-redux";
import img1 from "../../public/assets/images/profile.jpg";
import Image from "next/image";
import { Bell, Search } from "lucide-react";

export function Header() {
  const { employee, user } = useSelector((state: RootState) => state.auth);
  const userName = employee
    ? `${employee.first_name}${employee.last_name ? ` ${employee.last_name}` : ""}`
    : "Guest";

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="">
          <p className="text-lg font-bold uppercase text-black">
            hello {employee?.first_name ?? "Guest"}
          </p>
          <h1 className="text-sm text-gray-500">Good Morning</h1>
        </div>

        <div className="flex flex-1 max-w-xl items-center gap-3">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
            <input
              type="search"
              placeholder="Search"
              className="w-full rounded-md border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </label>

          <button className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
            <Bell className="h-5 w-5 text-black" />
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-700  transition hover:bg-slate-50">
            <div>
              <Image src={img1} alt="Profile" className="size-11 rounded-md" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="hidden sm:inline font-bold text-md">
                {userName}
              </span>
              <span className="">{user?.role?.label || ""}</span>
            </div>

            {/* <ChevronDown className="h-4 w-4 text-slate-500" /> */}
          </button>
        </div>
      </div>
    </header>
  );
}
