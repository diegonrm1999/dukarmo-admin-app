export enum Role {
  Stylist = "Stylist",
  Cashier = "Cashier",
  Operator = "Operator",
  Manager = "Manager",
  Owner = "Owner",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: Role;
}

export const ROLE_LABELS = {
  [Role.Stylist]: "Estilistas",
  [Role.Cashier]: "Cajeros",
  [Role.Operator]: "Operadores",
  [Role.Manager]: "Gerentes",
  [Role.Owner]: "Dueños",
} as const;

export const ROLE_COLORS = {
  [Role.Stylist]: "bg-purple-100 text-purple-800 border-purple-200",
  [Role.Cashier]: "bg-green-100 text-green-800 border-green-200",
  [Role.Operator]: "bg-blue-100 text-blue-800 border-blue-200",
  [Role.Manager]: "bg-orange-100 text-orange-800 border-orange-200",
  [Role.Owner]: "bg-red-100 text-red-800 border-red-200",
} as const;

export interface LoginResponse {
  token: string;
  id: string;
  name: string;
  role: string;
  shopId: string;
}
