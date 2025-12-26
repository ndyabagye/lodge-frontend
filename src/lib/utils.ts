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

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
