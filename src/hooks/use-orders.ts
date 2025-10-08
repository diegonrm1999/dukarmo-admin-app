import { useState, useEffect, useCallback } from "react";
import { OrdersResponse, OrderFilters, OrderDetail } from "@/lib/types/order";
import api from "@/app/api";

export function useOrders(initialFilters: OrderFilters = {}) {
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<OrderFilters>(initialFilters);

  const fetchOrders = useCallback(async (currentFilters: OrderFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api().getOrders(currentFilters);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar órdenes");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback(
    (newFilters: Partial<OrderFilters>) => {
      const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset page
      setFilters(updatedFilters);
      fetchOrders(updatedFilters);
    },
    [filters, fetchOrders]
  );

  const goToPage = useCallback(
    (page: number) => {
      const updatedFilters = { ...filters, page };
      setFilters(updatedFilters);
      fetchOrders(updatedFilters);
    },
    [filters, fetchOrders]
  );

  useEffect(() => {
    fetchOrders(filters);
  }, []);

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    goToPage,
    refetch: () => fetchOrders(filters),
  };
}

export function useOrderDetail(orderId: string | null) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      return;
    }

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api().getOrderDetail(orderId);
        setOrder(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
}
