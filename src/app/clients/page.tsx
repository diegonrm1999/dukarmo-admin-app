"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientsTable } from "@/components/clients/clients-table";
import { Pagination } from "@/components/common/pagination";
import { useClients } from "@/hooks/use-clients";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Client } from "@/lib/types/client";
import { ClientsFilters } from "@/components/clients/clients-filter";

export default function ClientsPage() {
  const {
    data: clientsData,
    loading,
    error,
    filters,
    updateFilters,
    goToPage,
    refetch,
  } = useClients({ limit: 20 });

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Filtros */}
      <ClientsFilters
        filters={filters}
        onFiltersChange={updateFilters}
        loading={loading}
      />

      {/* Información adicional */}
      {clientsData && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div>
            Mostrando {clientsData.data.length} de{" "}
            {clientsData.meta.total.toLocaleString()} clientes
          </div>
          <div>
            Página {clientsData.meta.page} de {clientsData.meta.totalPages}
          </div>
        </div>
      )}

      {/* Tabla */}
      <ClientsTable clients={clientsData?.data || []} loading={loading} />

      {/* Paginación */}
      {clientsData && clientsData.meta.totalPages > 1 && (
        <Pagination
          currentPage={clientsData.meta.page}
          totalPages={clientsData.meta.totalPages}
          hasNext={clientsData.meta.hasNext}
          hasPrev={clientsData.meta.hasPrev}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
