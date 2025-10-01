import { Card, CardContent } from "@/components/ui/card";
import { Users, ShoppingBag, DollarSign, UserCheck } from "lucide-react";

interface SimpleStats {
  totalClients: number;
  ordersToday: number;
  ordersThisWeek: number;
  ordersThisMonth: number;
  salesToday: number;
  salesThisWeek: number;
  salesThisMonth: number;
  topStylistWeek: {
    name: string;
    orders: number;
  } | null;
}

interface DashboardStatsProps {
  stats: SimpleStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const mainStats = [
    {
      title: "Total Clientes",
      value: stats.totalClients.toString(),
      icon: Users,
      color: "purple",
    },
    {
      title: "Órdenes Hoy",
      value: stats.ordersToday.toString(),
      subtitle: `Semana: ${stats.ordersThisWeek} | Mes: ${stats.ordersThisMonth}`,
      icon: ShoppingBag,
      color: "blue",
    },
    {
      title: "Ventas Hoy",
      value: `S/ ${stats.salesToday.toLocaleString()}`,
      subtitle: `Semana: S/ ${stats.salesThisWeek.toLocaleString()}`,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Ventas del Mes",
      value: `S/ ${stats.salesThisMonth.toLocaleString()}`,
      icon: DollarSign,
      color: "green",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-slate-600 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-800 mt-2">
                      {stat.value}
                    </p>
                    {stat.subtitle && (
                      <p className="text-xs text-slate-500 mt-1">
                        {stat.subtitle}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat.color === "green"
                        ? "bg-green-100"
                        : stat.color === "blue"
                        ? "bg-blue-100"
                        : stat.color === "purple"
                        ? "bg-purple-100"
                        : "bg-orange-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "blue"
                          ? "text-blue-600"
                          : stat.color === "purple"
                          ? "text-purple-600"
                          : "text-orange-600"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Estilista de la Semana */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">
                Mejor Estilista de la Semana
              </p>
              {stats.topStylistWeek ? (
                <div>
                  <p className="text-lg font-bold text-slate-800">
                    {stats.topStylistWeek.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {stats.topStylistWeek.orders} órdenes esta semana
                  </p>
                </div>
              ) : (
                <p className="text-slate-500">No hay datos disponibles</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
