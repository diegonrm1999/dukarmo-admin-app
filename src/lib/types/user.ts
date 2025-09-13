export enum Role {
  Stylist = "Stylist",
  Cashier = "Cashier",
  Operator = "Operator",
  Manager = "Manager",
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
} as const;

export const ROLE_COLORS = {
  [Role.Stylist]: "bg-purple-100 text-purple-800 border-purple-200",
  [Role.Cashier]: "bg-green-100 text-green-800 border-green-200",
  [Role.Operator]: "bg-blue-100 text-blue-800 border-blue-200",
  [Role.Manager]: "bg-orange-100 text-orange-800 border-orange-200",
} as const;
