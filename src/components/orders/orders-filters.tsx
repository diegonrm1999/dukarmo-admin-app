import { useEffect, useState } from "react";
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
import { OrderFilters, OrderStatus, PaymentMethod } from "@/lib/types/order";
import { User } from "@/lib/types/user";
import {
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
} from "@/lib/utils/constants";
import {
  formatDateToInput,
  getDefaultEndDate,
  getDefaultStartDate,
} from "@/lib/utils";

interface OrdersFiltersProps {
  filters: OrderFilters;
  onFiltersChange: (filters: Partial<OrderFilters>) => void;
  stylists: User[];
  cashiers: User[];
  operators: User[];
  loading?: boolean;
}

export function OrdersFilters({
  filters,
  onFiltersChange,
  stylists,
  cashiers,
  operators,
  loading = false,
}: OrdersFiltersProps) {
  const [localFilters, setLocalFilters] = useState({
    clientName: filters.clientName || "",
    orderNumber: filters.orderNumber || "",
  });

  useEffect(() => {
    if (!filters.startDate && !filters.endDate) {
      onFiltersChange({
        startDate: getDefaultStartDate(),
        endDate: getDefaultEndDate(),
      });
    }
  }, []);

  const handleStartDateChange = (value: string) => {
    if (!value) {
      onFiltersChange({ startDate: undefined });
      return;
    }

    const startDate = new Date(value);
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    // Validar que startDate no sea mayor que endDate
    if (endDate && startDate > endDate) {
      // Ajustar endDate a 30 días después del nuevo startDate
      const newEndDate = new Date(startDate);
      newEndDate.setDate(newEndDate.getDate() + 30);

      onFiltersChange({
        startDate: value,
        endDate: formatDateToInput(newEndDate),
      });
      return;
    }

    // Validar que el rango no exceda 6 meses
    if (endDate) {
      const monthsDiff =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

      if (monthsDiff > 6) {
        // Ajustar endDate a 6 meses después del startDate
        const adjustedEndDate = new Date(startDate);
        adjustedEndDate.setMonth(adjustedEndDate.getMonth() + 6);

        onFiltersChange({
          startDate: value,
          endDate: formatDateToInput(adjustedEndDate),
        });
        return;
      }
    }

    onFiltersChange({ startDate: value });
  };

  const handleEndDateChange = (value: string) => {
    if (!value) {
      onFiltersChange({ endDate: undefined });
      return;
    }

    const endDate = new Date(value);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;

    if (startDate && endDate < startDate) {
      const newStartDate = new Date(endDate);
      newStartDate.setDate(newStartDate.getDate() - 30);

      onFiltersChange({
        endDate: value,
        startDate: formatDateToInput(newStartDate),
      });
      return;
    }

    if (startDate) {
      const monthsDiff =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

      if (monthsDiff > 6) {
        const adjustedStartDate = new Date(endDate);
        adjustedStartDate.setMonth(adjustedStartDate.getMonth() - 6);

        onFiltersChange({
          endDate: value,
          startDate: formatDateToInput(adjustedStartDate),
        });
        return;
      }
    }
    onFiltersChange({ endDate: value });
  };

  const handleLocalChange = (key: keyof typeof localFilters, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setLocalFilters({ clientName: "", orderNumber: "" });
    onFiltersChange({
      clientName: undefined,
      orderNumber: undefined,
      stylistId: undefined,
      operatorId: undefined,
      cashierId: undefined,
      status: undefined,
      paymentMethod: undefined,
      startDate: getDefaultStartDate(),
      endDate: getDefaultEndDate(),
    });
  };

  const isDefaultDateRange =
    filters.startDate === getDefaultStartDate() &&
    filters.endDate === getDefaultEndDate();

  const hasActiveFilters =
    (filters.clientName && filters.clientName !== "") ||
    (filters.orderNumber && filters.orderNumber !== "") ||
    filters.stylistId ||
    filters.operatorId ||
    filters.cashierId ||
    filters.status ||
    filters.paymentMethod ||
    !isDefaultDateRange;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <CardTitle className="text-slate-800">Filtros</CardTitle>
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-slate-600 hover:text-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-4">
          {/* Estilista */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-600 mb-1">
              Estilista
            </label>
            <Select
              value={filters.stylistId || "all"}
              onValueChange={(value) =>
                onFiltersChange({
                  stylistId: value === "all" ? undefined : value,
                })
              }
              disabled={loading}
            >
              <SelectTrigger className="h-10 border-slate-300 focus:border-purple-500">
                <SelectValue placeholder="Todos los estilistas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {stylists.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.firstName} {s.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Operador */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-600 mb-1">
              Operador
            </label>
            <Select
              value={filters.operatorId || "all"}
              onValueChange={(value) =>
                onFiltersChange({
                  operatorId: value === "all" ? undefined : value,
                })
              }
              disabled={loading}
            >
              <SelectTrigger className="h-10 border-slate-300 focus:border-purple-500">
                <SelectValue placeholder="Todos los operadores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {operators.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.firstName} {o.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cajero */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-600 mb-1">Cajero</label>
            <Select
              value={filters.cashierId || "all"}
              onValueChange={(value) =>
                onFiltersChange({
                  cashierId: value === "all" ? undefined : value,
                })
              }
              disabled={loading}
            >
              <SelectTrigger className="h-10 border-slate-300 focus:border-purple-500">
                <SelectValue placeholder="Todos los cajeros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {cashiers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estado */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-600 mb-1">Estado</label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) =>
                onFiltersChange({
                  status: value === "all" ? undefined : (value as OrderStatus),
                })
              }
              disabled={loading}
            >
              <SelectTrigger className="h-10 border-slate-300 focus:border-purple-500">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => (
                  <SelectItem key={status} value={status}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Metodos de Pago */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-600 mb-1">
              Metodo de pago
            </label>
            <Select
              value={filters.paymentMethod || "all"}
              onValueChange={(value) =>
                onFiltersChange({
                  paymentMethod:
                    value === "all" ? undefined : (value as PaymentMethod),
                })
              }
              disabled={loading}
            >
              <SelectTrigger className="h-10 border-slate-300 focus:border-purple-500">
                <SelectValue placeholder="Todos los metodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {Object.entries(PAYMENT_METHOD_LABELS).map(
                  ([paymentMethod, label]) => (
                    <SelectItem key={paymentMethod} value={paymentMethod}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Fechas */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-600 mb-1">
              Fecha desde
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <Input
                type="date"
                value={filters.startDate || ""}
                onChange={(e) => handleStartDateChange(e.target.value)}
                max={filters.endDate || undefined}
                className="h-10 pl-9 border-slate-300 focus:border-purple-500 w-full"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-600 mb-1">
              Fecha hasta
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <Input
                type="date"
                value={filters.endDate || ""}
                onChange={(e) => handleEndDateChange(e.target.value)}
                min={filters.startDate || undefined}
                max={formatDateToInput(new Date())}
                className="h-10 pl-9 border-slate-300 focus:border-purple-500 w-full"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
