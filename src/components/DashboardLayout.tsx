"use client";

import { useState } from "react";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  ShoppingBag,
  FileText,
  UserCheck,
  Menu,
  Home,
} from "lucide-react";
import Logo from "./common/logo";
import UserMenu from "./ui/userMenu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Determinar la pestaña activa basada en la ruta actual
  const getActiveTab = () => {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard";
    if (pathname === "/orders") return "orders";
    if (pathname === "/clients") return "clients";
    if (pathname === "/employees") return "employees";
    return "dashboard";
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "orders", label: "Órdenes", icon: ShoppingBag, path: "/orders" },
    { id: "clients", label: "Clientes", icon: Users, path: "/clients" },
    {
      id: "employees",
      label: "Trabajadores",
      icon: UserCheck,
      path: "/employees",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-50 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            {isSidebarOpen && <Logo />}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center ${
                  isSidebarOpen ? "justify-start gap-3" : "justify-center"
                } px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-black text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {navItems.find((item) => item.id === activeTab)?.label ||
                    "Dashboard"}
                </h2>
                <p className="text-slate-500">Gestiona tu negocio desde aquí</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
