import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToInput = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getDefaultStartDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return formatDateToInput(date);
};

export const getDefaultEndDate = (): string => {
  return formatDateToInput(new Date());
};

export const getMaxEndDate = (startDate: string): string => {
  const start = new Date(startDate);
  const maxEnd = new Date(start);
  maxEnd.setMonth(maxEnd.getMonth() + 6);
  return formatDateToInput(maxEnd);
};

export const getMinStartDate = (endDate: string): string => {
  const end = new Date(endDate);
  const minStart = new Date(end);
  minStart.setMonth(minStart.getMonth() - 6);
  return formatDateToInput(minStart);
};
