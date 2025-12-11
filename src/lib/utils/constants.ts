import { OrderStatus } from "../types/order";

export const ORDER_STATUS_LABELS = {
  [OrderStatus.Created]: "Creado",
  [OrderStatus.Claimed]: "Reclamado",
  [OrderStatus.Completed]: "Completado",
  [OrderStatus.Cancelled]: "Cancelado",
} as const;

export const ORDER_STATUS_COLORS = {
  [OrderStatus.Created]: "bg-blue-100 text-blue-800 border-blue-200",
  [OrderStatus.Claimed]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [OrderStatus.Completed]: "bg-green-100 text-green-800 border-green-200",
  [OrderStatus.Cancelled]: "bg-red-100 text-red-800 border-red-200",
} as const;

export const PAYMENT_METHOD_LABELS = {
  Cash: "Efectivo",
  Yape: "Yape",
  Card: "Tarjeta",
} as const;

export const PAYMENT_METHOD_COLORS = {
  Cash: "bg-green-100 text-green-800 border-green-200",
  Yape: "bg-purple-100 text-purple-800 border-purple-200",
  Card: "bg-indigo-100 text-indigo-800 border-indigo-200",
} as const;
