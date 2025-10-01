"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import DashboardLayout from "./DashboardLayout";
import LoadingSpinner from "./LoadingSpinner";

const authPages = ["/login", "/register"];

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const isAuthPage = authPages.includes(pathname);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Si está en páginas de auth, no usar DashboardLayout
  if (isAuthPage || !user) {
    return <>{children}</>;
  }

  // Si está autenticado y no es página de auth, usar DashboardLayout
  return <DashboardLayout>{children}</DashboardLayout>;
}
