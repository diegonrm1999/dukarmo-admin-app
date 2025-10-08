// components/orders/order-detail-modal.tsx

import { useEffect } from "react";
import { X, User, Package, DollarSign } from "lucide-react";
import { OrderStatusBadge } from "./order-status-badge";
import { PaymentMethodBadge } from "./payment-method-badge";
import { useOrderDetail } from "@/hooks/use-orders";

interface OrderDetailModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailModal({
  orderId,
  isOpen,
  onClose,
}: OrderDetailModalProps) {
  const { order, loading, error } = useOrderDetail(orderId);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-2xl">
          <div className="flex h-full flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {order
                    ? `Orden #${order.orderNumber}`
                    : "Detalles de la Orden"}
                </h2>
                {order && (
                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading && (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-20 bg-slate-100 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {order && (
                <div className="space-y-6">
                  {/* Status & Payment */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-2">Estado</p>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-2">
                          Método de Pago
                        </p>
                        <PaymentMethodBadge method={order.paymentMethod} />
                      </div>
                    </div>
                    {order.ticketNumber && (
                      <div className="mt-4">
                        <p className="text-sm text-slate-600">
                          Número de Ticket
                        </p>
                        <p className="font-medium text-slate-800">
                          {order.ticketNumber}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Client Information */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-5 h-5 text-slate-600" />
                      <h3 className="font-semibold text-slate-800">
                        Información del Cliente
                      </h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <div>
                        <p className="text-sm text-slate-600">Nombre</p>
                        <p className="font-medium text-slate-800">
                          {order.client.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">DNI</p>
                        <p className="font-medium text-slate-800">
                          {order.client.dni}
                        </p>
                      </div>
                      {order.client.phone && (
                        <div>
                          <p className="text-sm text-slate-600">Teléfono</p>
                          <p className="font-medium text-slate-800">
                            {order.client.phone}
                          </p>
                        </div>
                      )}
                      {order.client.email && (
                        <div>
                          <p className="text-sm text-slate-600">Email</p>
                          <p className="font-medium text-slate-800">
                            {order.client.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Staff Information */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-5 h-5 text-slate-600" />
                      <h3 className="font-semibold text-slate-800">Personal</h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-sm text-slate-600">Estilista</p>
                        <p className="font-medium text-slate-800">
                          {order.stylist.firstName} {order.stylist.lastName}
                        </p>
                      </div>
                      <div className="border-t border-slate-200 pt-3">
                        <p className="text-sm text-slate-600">Cajero</p>
                        <p className="font-medium text-slate-800">
                          {order.cashier.firstName} {order.cashier.lastName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Treatments */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-5 h-5 text-slate-600" />
                      <h3 className="font-semibold text-slate-800">
                        Tratamientos
                      </h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      {order.treatments.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0"
                        >
                          <span className="text-slate-800">
                            {item.treatment.name}
                          </span>
                          <span className="font-medium text-slate-800">
                            S/ {item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-slate-600" />
                      <h3 className="font-semibold text-slate-800">
                        Resumen Financiero
                      </h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total</span>
                        <span className="font-semibold text-lg text-slate-800">
                          S/ {order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                      {order.paidAmount !== null && (
                        <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                          <span className="text-slate-600">Pagado</span>
                          <span className="font-medium text-green-600">
                            S/ {order.paidAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
