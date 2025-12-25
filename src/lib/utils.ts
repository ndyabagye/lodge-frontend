import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "UGX"): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(
  date: Date | string,
  pattern: string = "PPP",
): string {
  // We'll use date-fns format function
  const formattedDate = format(date, pattern);
  return formattedDate.toString();
}
