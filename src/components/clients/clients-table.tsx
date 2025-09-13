import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Client } from "@/lib/types/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Edit, Trash2, Phone, Mail } from "lucide-react";

interface ClientsTableProps {
  clients: Client[];
  loading?: boolean;
  onView?: (client: Client) => void;
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
}

export function ClientsTable({
  clients,
  loading = false,
  onView,
  onEdit,
  onDelete,
}: ClientsTableProps) {
  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (clients.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent>
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">
              No se encontraron clientes
            </div>
            <p className="text-slate-500">
              Intenta ajustar los filtros para ver más resultados.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent>
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Contacto
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Registrado
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-slate-800">
                          {client.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          DNI: {client.dni}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {client.phone && (
                          <div className="flex items-center text-sm text-slate-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {client.phone}
                          </div>
                        )}
                        {client.email && (
                          <div className="flex items-center text-sm text-slate-600">
                            <Mail className="w-3 h-3 mr-1" />
                            {client.email}
                          </div>
                        )}
                        {!client.phone && !client.email && (
                          <span className="text-sm text-slate-400">
                            Sin contacto
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {new Date(client.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
