import { useState, useEffect, useCallback } from "react";
import { User } from "@/lib/types/user";
import api from "@/api";

interface UseUsersOptions {
  strict?: boolean; // Para workers page
  autoFetch?: boolean; // Para controlar carga automática
}

export function useUsers(options: UseUsersOptions = {}) {
  const { strict = false, autoFetch = true } = options;

  const [stylists, setStylists] = useState<User[]>([]);
  const [cashiers, setCashiers] = useState<User[]>([]);
  const [operators, setOperators] = useState<User[]>([]);
  const [managers, setManagers] = useState<User[]>([]);

  const [loading, setLoading] = useState(autoFetch);
  const [loadingStates, setLoadingStates] = useState({
    stylists: autoFetch,
    cashiers: autoFetch,
    operators: autoFetch,
    managers: autoFetch,
  });

  const [error, setError] = useState<string | null>(null);

  // Función para fetch individual por rol
  const fetchUsersByRole = useCallback(
    async (role: "stylists" | "cashiers" | "operators" | "managers") => {
      try {
        setLoadingStates((prev) => ({ ...prev, [role]: true }));

        let data;
        switch (role) {
          case "stylists":
            data = await api().getStylists(strict);
            setStylists(data);
            break;
          case "cashiers":
            data = await api().getCashiers(strict);
            setCashiers(data);
            break;
          case "operators":
            data = await api().getOperators(strict);
            setOperators(data);
            break;
          case "managers":
            data = await api().getManagers();
            setManagers(data);
            break;
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar usuarios"
        );
      } finally {
        setLoadingStates((prev) => ({ ...prev, [role]: false }));
      }
    },
    [strict]
  );

  // Función para fetch todos (comportamiento original)
  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const promises = [
        api().getStylists(strict),
        api().getCashiers(strict),
        api().getOperators(strict),
      ];

      // Solo incluir managers si es para workers page
      if (strict !== undefined) {
        promises.push(api().getManagers());
      }

      const results = await Promise.all(promises);

      setStylists(results[0]);
      setCashiers(results[1]);
      setOperators(results[2]);

      if (results[3]) {
        setManagers(results[3]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios");
    } finally {
      setLoading(false);
      setLoadingStates({
        stylists: false,
        cashiers: false,
        operators: false,
        managers: false,
      });
    }
  }, [strict]);

  // Auto-fetch al montar si está habilitado
  useEffect(() => {
    if (autoFetch) {
      fetchAllUsers();
    }
  }, [autoFetch, fetchAllUsers]);

  // Para compatibilidad con orders page (formato original)
  const isAnyLoading = loading || Object.values(loadingStates).some(Boolean);

  return {
    // Datos (compatibilidad con orders)
    stylists,
    cashiers,
    operators,
    managers,

    // Loading states (para orders - comportamiento original)
    loading: isAnyLoading,

    // Loading states individuales (para workers)
    loadingStates,

    // Error
    error,

    // Funciones (para workers page)
    fetchAllUsers,
    fetchUsersByRole,
    refetch: fetchAllUsers, // Alias
  };
}
