"use client";

import type { Metadata } from "next";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { getMe } from "@/api/auth/auth";
import { setAuthData } from "@/features/auth/authSlice";
import { RootState } from "@/store";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      // Only fetch if user is not already loaded
      if (user) return;
      setLoading(true)
      try {
        const response = await getMe();

        if (response.data.success && response.data.data) {
          dispatch(setAuthData(response.data.data));
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchUserData();
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header />
          <main className="flex-1 px-6 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
