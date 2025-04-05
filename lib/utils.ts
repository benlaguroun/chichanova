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

// Add this utility function to check if a string is a valid CSS color

/**
 * Checks if a string is a valid CSS color
 * @param color The color string to check
 * @returns boolean indicating if the string is a valid CSS color
 */
export function isValidCssColor(color: string): boolean {
  if (!color || typeof color !== "string") return false

  // Check for hex colors
  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) return true

  // Check for rgb/rgba colors
  if (/^rgb$$\d+,\s*\d+,\s*\d+$$$/i.test(color) || /^rgba$$\d+,\s*\d+,\s*\d+,\s*[\d.]+$$$/i.test(color)) return true

  // Check for named colors using CSS.supports if available
  if (typeof CSS !== "undefined" && CSS.supports) {
    return CSS.supports("color", color.toLowerCase())
  }

  // Fallback for environments without CSS.supports
  const commonColors = [
    "black",
    "white",
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "pink",
    "orange",
    "brown",
    "gray",
    "cyan",
    "magenta",
    "lime",
    "navy",
    "teal",
    "olive",
    "maroon",
    "silver",
    "gold",
  ]

  return commonColors.includes(color.toLowerCase())
}

