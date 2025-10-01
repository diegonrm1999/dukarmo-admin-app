"use client";

import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { DashboardError } from "@/components/dashboard/DashboardError";
import { useDashboard } from "@/hooks/use-dashboard";

export default function DashboardPage() {
  const { stats, loading, error, refetch } = useDashboard();

  if (loading && !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Dashboard del Salón
          </h3>
          <p className="text-slate-500">Cargando estadísticas...</p>
        </div>
        <DashboardLoading />
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Dashboard del Salón
          </h3>
        </div>
        <DashboardError error={error} onRetry={refetch} />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
    </div>
  );
}
