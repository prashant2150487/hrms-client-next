"use client";

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) return;
      try {
        const response = await getMe();
        if (response.data.success && response.data.data) {
          dispatch(setAuthData(response.data.data));
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
        console.error("Error fetching user:", errorMessage);
      }
    };

    fetchUserData();
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-white">
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
