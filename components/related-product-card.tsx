"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface RelatedProductCardProps {
  id: string
  name: string
  price: number
  image: string | string[]
  category: string
  rating?: number
  reviews?: number
  colors?: string[]
  sizes?: string[]
}

export default function RelatedProductCard({
  id,
  name,
  price,
  image,
  category,
  rating = 4.5,
  reviews = 0,
  colors = [],
  sizes = [],
}: RelatedProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [currentPrice, setCurrentPrice] = useState<number>(price)
  const { addItem } = useCart()
  const [showOptions, setShowOptions] = useState(false)

  // Common size patterns to identify sizes
  const sizePatterns = [
    /^(xs|s|m|l|xl|xxl|xxxl|2xl|3xl|4xl|5xl|6xl|7xl|one size)$/i,
    /^(extra small|small|medium|large|x-large|xx-large|xxx-large)$/i,
    /^(0|2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50)$/,
    /^([0-9]+\.[0-9]+)$/, // Numeric sizes like 7.5, 8.5, etc.
  ]

  // Common size values
  const commonSizeValues = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "Extra Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "XXX-Large",
    "One Size",
    "OS",
    "0",
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "48",
    "50",
  ]

  // Function to check if a value is likely a size
  const isLikelySize = (value: string): boolean => {
    if (!value) return false

    // Check against common size patterns
    for (const pattern of sizePatterns) {
      if (pattern.test(value.trim())) {
        return true
      }
    }

    // Check against common size values
    return commonSizeValues.some(
      (size) =>
        value.trim().toUpperCase() === size.toUpperCase() ||
        value.trim().toUpperCase().replace(/\s+/g, "") === size.toUpperCase().replace(/\s+/g, ""),
    )
  }

  // Map common color names to CSS colors
  const colorMap: Record<string, string> = {
    black: "#000000",
    white: "#FFFFFF",
    red: "#FF0000",
    blue: "#0000FF",
    green: "#008000",
    yellow: "#FFFF00",
    purple: "#800080",
    orange: "#FFA500",
    pink: "#FFC0CB",
    gray: "#808080",
    grey: "#808080",
    navy: "#000080",
    brown: "#A52A2A",
    ivory: "#FFFFF0",
    blossom: "#FFB7C5",
    "island reef": "#4FD1C5",
  }

  // Function to get CSS color value
  const getCssColorValue = (colorName: string): string => {
    if (!colorName) return "#CCCCCC"

    const lowerColor = colorName.toLowerCase()

    // Check if it's a valid CSS color
    const isValidCssColor =
      /^#([0-9A-F]{3}){1,2}$/i.test(colorName) ||
      /^rgb$$\d+,\s*\d+,\s*\d+$$$/i.test(colorName) ||
      (typeof CSS !== "undefined" && CSS.supports && CSS.supports("color", colorName))

    if (isValidCssColor) return colorName

    // Check for exact color name match
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerColor === key) {
        return value
      }
    }

    // Check for partial color name match
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerColor.includes(key)) {
        return value
      }
    }

    return "#CCCCCC" // Default gray
  }

  // Process colors and sizes
  useEffect(() => {
    // Filter and process colors and sizes
    const processedColors: string[] = []
    const processedSizes: string[] = []

    if (Array.isArray(colors)) {
      colors.forEach((color) => {
        if (typeof color === "string" && !isLikelySize(color)) {
          processedColors.push(color)
        }
      })
    }

    if (Array.isArray(sizes)) {
      sizes.forEach((size) => {
        if (typeof size === "string") {
          if (isLikelySize(size)) {
            processedSizes.push(size)
          } else if (!processedColors.includes(size)) {
            // If it's not a size but also not in colors, it might be a color
            processedColors.push(size)
          }
        }
      })
    }

    // Set initial color and size if available
    if (processedColors.length > 0 && !selectedColor) {
      setSelectedColor(processedColors[0])
    }

    if (processedSizes.length > 0 && !selectedSize) {
      setSelectedSize(processedSizes[0])
    }
  }, [colors, sizes, selectedColor, selectedSize])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation

    const safeColors = Array.isArray(colors)
      ? colors.filter((color) => typeof color === "string" && !isLikelySize(color))
      : []
    const safeSizes = Array.isArray(sizes) ? sizes.filter((size) => typeof size === "string" && isLikelySize(size)) : []

    if (safeSizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      })
      return
    }

    if (safeColors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        description: "You need to select a color before adding to cart",
        variant: "destructive",
      })
      return
    }

    addItem({
      id,
      name,
      price: currentPrice,
      image: Array.isArray(image) ? image[0] : image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    })

    toast({
      title: "Added to cart",
      description: `${name} - ${selectedColor ? selectedColor + ", " : ""}${selectedSize ? "Size " + selectedSize : ""}`,
    })
  }

  const productImage = Array.isArray(image) ? image[0] : image

  // Ensure colors and sizes are arrays and filter out non-string values
  const safeColors = Array.isArray(colors)
    ? colors.filter((color) => typeof color === "string" && !isLikelySize(color))
    : []
  const safeSizes = Array.isArray(sizes) ? sizes.filter((size) => typeof size === "string" && isLikelySize(size)) : []

  return (
    <div className="group block bg-card rounded-lg shadow-sm hover:shadow-md transition-all p-4">
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary/30 mb-4">
          <Image
            src={productImage || "/placeholder.svg?height=600&width=480"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-blue-600/90 backdrop-blur-sm text-white">
              {category}
            </Badge>
          </div>
        </div>

        <h3 className="font-medium text-base">{name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-blue-600 font-semibold">${formatPrice(currentPrice)}</p>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>

      {/* Quick Options Toggle */}
      {(safeColors.length > 0 || safeSizes.length > 0) && (
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={(e) => {
              e.preventDefault()
              setShowOptions(!showOptions)
            }}
          >
            {showOptions ? "Hide Options" : "Quick Options"}
          </Button>
        </div>
      )}

      {/* Color Selection */}
      {showOptions && safeColors.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-1">Color: {selectedColor}</p>
          <div className="flex flex-wrap gap-1">
            {safeColors.map((color, index) => {
              const cssColor = getCssColorValue(color)

              return (
                <button
                  key={index}
                  className={`h-6 w-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === color ? "border-blue-500 scale-110" : "border-border"
                  }`}
                  style={{ backgroundColor: cssColor }}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedColor(color)
                  }}
                  title={color}
                  aria-label={`Select ${color} color`}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {showOptions && safeSizes.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-1">Size: {selectedSize}</p>
          <div className="flex flex-wrap gap-1">
            {safeSizes.map((size) => (
              <button
                key={size}
                className={`h-6 min-w-[2rem] px-1 text-xs rounded border transition-all ${
                  selectedSize === size ? "bg-blue-600 text-white border-blue-600" : "bg-background border-input"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedSize(size)
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        className="w-full mt-3 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-all"
        onClick={handleAddToCart}
      >
        <ShoppingBag className="h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}

