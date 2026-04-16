"use client";

import type { Metadata } from "next";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { getMe } from "@/api/auth/auth";
import { setUser, setLoading } from "@/features/auth/authSlice";
import { RootState } from "@/store";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      // Only fetch if user is not already loaded
      if (user) return;

      try {
        dispatch(setLoading(true));
        const response = await getMe();
        
        if (response.data.success && response.data.data) {
          dispatch(setUser(response.data.data));
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
        console.error("Error fetching user:", error);
      } finally {
        dispatch(setLoading(false));
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
