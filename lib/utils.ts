import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a price value, converting from cents to dollars if needed
 * @param price The price value to format
 * @returns Formatted price string with 2 decimal places
 */
export function formatPrice(price: number | string): string {
  if (typeof price === "string") {
    price = Number.parseFloat(price)
  }

  if (isNaN(price)) {
    return "0.00"
  }

  // If price is over 100, assume it's in cents and convert to dollars
  if (price > 100) {
    price = price / 100
  }

  return price.toFixed(2)
}

