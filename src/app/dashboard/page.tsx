"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Ventas del Mes",
      value: "S/ 45,230",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Órdenes Totales",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag,
      color: "blue",
    },
    {
      title: "Clientes Activos",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "purple",
    },
    {
      title: "Tasa de Conversión",
      value: "3.45%",
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "María García",
      amount: "S/ 250.00",
      status: "Completado",
      date: "Hace 2 horas",
    },
    {
      id: "#ORD-002",
      customer: "Carlos López",
      amount: "S/ 180.50",
      status: "Pendiente",
      date: "Hace 4 horas",
    },
    {
      id: "#ORD-003",
      customer: "Ana Silva",
      amount: "S/ 320.00",
      status: "En Proceso",
      date: "Hace 6 horas",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "text-green-700 bg-green-50";
      case "Pendiente":
        return "text-yellow-700 bg-yellow-50";
      case "En Proceso":
        return "text-blue-700 bg-blue-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Resumen del Negocio
        </h3>
        <p className="text-slate-500">
          Vista general de tu rendimiento hoy
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-800 mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ml-1 ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Órdenes Recientes */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-slate-800">
                Órdenes Recientes
              </h4>
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-700"
              >
                Ver todas
              </Button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-800">{order.id}</p>
                    <p className="text-sm text-slate-600">{order.customer}</p>
                    <p className="text-xs text-slate-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">
                      {order.amount}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actividades Rápidas */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-6">
              Acciones Rápidas
            </h4>
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 justify-start">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Nueva Orden
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-slate-50"
              >
                <Users className="w-4 h-4 mr-2" />
                Agregar Cliente
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-slate-50"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Ver Calendario
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-slate-50"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}