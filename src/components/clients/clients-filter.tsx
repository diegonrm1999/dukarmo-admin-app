import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, RotateCcw } from "lucide-react";
import { ClientFilters } from "@/lib/types/client";

interface ClientsFiltersProps {
  filters: ClientFilters;
  onFiltersChange: (filters: Partial<ClientFilters>) => void;
  loading?: boolean;
}

export function ClientsFilters({
  filters,
  onFiltersChange,
  loading = false,
}: ClientsFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFiltersChange({ search: localSearch || undefined });
    },
    [localSearch, onFiltersChange]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setLocalSearch("");
    onFiltersChange({
      search: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  }, [onFiltersChange]);

  const hasActiveFilters =
    (filters.search && filters.search !== "") ||
    filters.startDate ||
    filters.endDate;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
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
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda con formulario */}
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, DNI o teléfono..."
              value={localSearch}
              onChange={handleSearchChange}
              className="pl-10 border-slate-300 focus:border-purple-500"
              disabled={loading}
            />
            {/* Submit button invisible para que Enter funcione */}
            <button type="submit" className="sr-only" aria-hidden="true" />
          </form>

          {/* Fecha desde */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="date"
              placeholder="Registrado desde"
              value={filters.startDate || ""}
              onChange={(e) =>
                onFiltersChange({ startDate: e.target.value || undefined })
              }
              className="pl-10 border-slate-300 focus:border-purple-500"
              disabled={loading}
            />
          </div>

          {/* Fecha hasta */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="date"
              placeholder="Registrado hasta"
              value={filters.endDate || ""}
              onChange={(e) =>
                onFiltersChange({ endDate: e.target.value || undefined })
              }
              className="pl-10 border-slate-300 focus:border-purple-500"
              disabled={loading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
