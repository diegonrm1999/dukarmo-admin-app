import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Calendar, RotateCcw } from "lucide-react";
import {
  Order,
  OrderFilters,
  OrdersResponse,
  OrderStatus,
} from "@/lib/types/order";
import { User } from "@/lib/types/user";
import { ORDER_STATUS_LABELS } from "@/lib/utils/constants";

interface OrdersTableProps {
  totalOrders: number;
  totalAmount: number;
  loading?: boolean;
}

export function OrderSummary({
  totalOrders = 0,
  totalAmount = 0,
  loading = false,
}: OrdersTableProps) {
  const formatMoney = (value: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(value);

  const SkeletonCard = () => (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="h-4 w-32 rounded bg-gray-200 animate-pulse mb-3" />
      <div className="h-6 w-24 rounded bg-gray-300 animate-pulse" />
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* Total Orders */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">Órdenes registradas</h3>
        <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
      </div>

      {/* Total Generated */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">Total generado</h3>
        <p className="text-2xl font-semibold text-gray-900">
          {formatMoney(totalAmount)}
        </p>
      </div>
    </div>
  );
}
