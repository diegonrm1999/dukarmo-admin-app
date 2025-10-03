import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/lib/types/order";
import { OrderStatusBadge } from "./order-status-badge";
import { Skeleton } from "@/components/ui/skeleton";

interface OrdersTableProps {
  orders: Order[];
  loading?: boolean;
}

export function OrdersTable({ orders, loading = false }: OrdersTableProps) {
  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
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

  if (orders.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent>
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">
              No se encontraron órdenes
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
                    Número
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Estilista
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Operador
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Cajero
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Comisión
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Total
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Tratamientos
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-800">
                      #{order.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-slate-800">
                          {order.client.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          DNI: {order.client.dni}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {order.stylist.firstName} {order.stylist.lastName}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {order.operator.firstName} {order.operator.lastName}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {order.cashier.firstName} {order.cashier.lastName}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div className="font-semibold text-slate-800">
                        S/ {order.stylistEarnings.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-semibold text-slate-800">
                          S/ {order.totalPrice.toFixed(2)}
                        </div>
                        {order.paidAmount && (
                          <div className="text-sm text-slate-500">
                            Pagado: S/ {order.paidAmount.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {order._count.treatments}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("es-ES", {
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
