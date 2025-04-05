"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating?: number
  reviews?: number
  colors?: string[]
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  rating = 4.5,
  reviews = 0,
  colors = [],
}: ProductCardProps) {
  const { addItem } = useCart()

  // Function to determine text color based on background color
  const getTextColor = (bgColor: string) => {
    const darkColors = ["black", "navy", "blue", "dark"]
    return darkColors.some((color) => bgColor.toLowerCase().includes(color)) ? "text-white" : "text-black"
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation

    addItem({
      id,
      name,
      price,
      image,
      quantity: 1,
      // In a real app, you would handle size/color selection
    })
  }

  // Ensure colors is an array and filter out non-string values
  const safeColors = Array.isArray(colors) ? colors.filter((color) => typeof color === "string") : []

  // Format price correctly
  const formattedPrice = typeof price === "number" ? price.toFixed(2) : "0.00"

  return (
    <div className="group block">
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary/30">
          <Image
            src={image || "/placeholder.svg?height=600&width=480"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-blue-600/90 backdrop-blur-sm text-white font-secondary uppercase text-xs"
            >
              {category}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="mt-3">
        <h3 className="font-medium text-base product-title-brand">{name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-blue-600 font-semibold font-secondary">${formatPrice(price)}</p>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-muted-foreground ml-1 font-body">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Display available colors */}
        {safeColors.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {safeColors.slice(0, 4).map((color, index) => {
              // Try to determine if this is a valid CSS color
              const isValidCssColor =
                /^#([0-9A-F]{3}){1,2}$/i.test(color) ||
                /^rgb$$\d+,\s*\d+,\s*\d+$$$/i.test(color) ||
                CSS.supports("color", color.toLowerCase())

              return (
                <div
                  key={index}
                  className={`h-4 w-4 rounded-full border border-gray-300`}
                  style={
                    isValidCssColor
                      ? {
                          backgroundColor: color.toLowerCase(),
                          color: getTextColor(color),
                        }
                      : {
                          backgroundColor: "#e5e7eb", // Default gray background for non-CSS colors
                        }
                  }
                  title={color}
                >
                  {!isValidCssColor && color.length <= 1 && (
                    <span className="text-[6px] flex items-center justify-center h-full">{color}</span>
                  )}
                </div>
              )
            })}
            {safeColors.length > 4 && (
              <div className="text-xs text-muted-foreground ml-1 font-body">+{safeColors.length - 4} more</div>
            )}
          </div>
        ) : (
          <div className="mt-2">
            <div className="text-xs text-muted-foreground font-body">Single color</div>
          </div>
        )}
      </div>
    </div>
  )
}

