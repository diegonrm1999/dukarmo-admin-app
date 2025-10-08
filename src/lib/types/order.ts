export enum OrderStatus {
  Created = "Created",
  Claimed = "Claimed",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export enum PaymentMethod {
  Cash = "Cash",
  Yape = "Yape",
  Card = "Card",
}

export interface Order {
  id: string;
  orderNumber: number;
  totalPrice: number;
  paidAmount: number | null;
  paymentMethod: PaymentMethod | null;
  status: OrderStatus;
  ticketNumber: string | null;
  createdAt: string;
  updatedAt: string;
  stylistEarnings: number;
  client: {
    id: string;
    name: string;
    dni: string;
    phone: string | null;
  };
  stylist: {
    id: string;
    firstName: string;
    lastName: string;
  };
  operator: {
    id: string;
    firstName: string;
    lastName: string;
  };
  cashier: {
    id: string;
    firstName: string;
    lastName: string;
  };
  _count: {
    treatments: number;
  };
}

export interface OrdersResponse {
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  stylistId?: string;
  operatorId?: string;
  cashierId?: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  clientName?: string;
  orderNumber?: string;
}

interface OrderTreatment {
  treatment: {
    id: string;
    name: string;
  };
  price: number;
}

export interface OrderDetail {
  id: string;
  orderNumber: number;
  createdAt: string;
  totalPrice: number;
  paidAmount: number | null;
  paymentMethod: string | null;
  ticketNumber: string | null;
  status: OrderStatus;
  treatments: OrderTreatment[];
  cashier: {
    id: string;
    firstName: string;
    lastName: string;
  };
  stylist: {
    id: string;
    firstName: string;
    lastName: string;
  };
  client: {
    id: string;
    name: string;
    dni: string;
    phone: string | null;
    email: string | null;
  };
}
