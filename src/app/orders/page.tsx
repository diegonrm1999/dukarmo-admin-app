"use client";

import { useState } from "react";
import { OrdersFilters } from "@/components/orders/orders-filters";
import { OrdersTable } from "@/components/orders/orders-table";
import { Pagination } from "@/components/common/pagination";
import { useOrders } from "@/hooks/use-orders";
import { useUsers } from "@/hooks/use-users";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
    filters,
    updateFilters,
    goToPage,
    refetch,
  } = useOrders({ limit: 20 });

  const {
    stylists,
    cashiers,
    operators,
    loading: usersLoading,
    error: usersError,
  } = useUsers();

  const isLoading = ordersLoading || usersLoading;
  const hasError = ordersError || usersError;

  if (hasError) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>{ordersError || usersError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      {/* Filtros */}
      <OrdersFilters
        filters={filters}
        onFiltersChange={updateFilters}
        stylists={stylists}
        cashiers={cashiers}
        operators={operators}
        loading={isLoading}
      />

      {/* Tabla */}
      <OrdersTable orders={ordersData?.data || []} loading={ordersLoading} />

      {/* Paginación */}
      {ordersData && ordersData.meta.totalPages > 1 && (
        <Pagination
          currentPage={ordersData.meta.page}
          totalPages={ordersData.meta.totalPages}
          hasNext={ordersData.meta.hasNext}
          hasPrev={ordersData.meta.hasPrev}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
