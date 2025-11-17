"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function DashboardLayoutHome({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/login";
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

      <Navbar username={user?.username} onLogout={logout} />

        <main className="flex-1 p-6 pt-20">
          {children}
        </main>

        {/* 🚀 TOASTER PARA NOTIFICACIONES */}
        <Toaster richColors position="top-right" closeButton />
      </div>
    </div>
  );
}
