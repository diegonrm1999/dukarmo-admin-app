import { useState, useEffect, useCallback } from "react";
import api from "@/app/api";
import { ClientFilters, ClientsResponse } from "@/lib/types/client";

export function useClients(initialFilters: ClientFilters = {}) {
  const [data, setData] = useState<ClientsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ClientFilters>(initialFilters);

  const fetchClients = useCallback(async (currentFilters: ClientFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api().getClients(currentFilters);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar clientes");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback(
    (newFilters: Partial<ClientFilters>) => {
      const updatedFilters = { ...filters, ...newFilters, page: 1 };
      setFilters(updatedFilters);
      fetchClients(updatedFilters);
    },
    [filters, fetchClients]
  );

  const goToPage = useCallback(
    (page: number) => {
      const updatedFilters = { ...filters, page };
      setFilters(updatedFilters);
      fetchClients(updatedFilters);
    },
    [filters, fetchClients]
  );

  useEffect(() => {
    fetchClients(filters);
  }, []);

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    goToPage,
    refetch: () => fetchClients(filters),
  };
}
