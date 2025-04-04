"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart/cart-provider";

interface RelatedProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string | string[];
  category: string;
  rating?: number;
  reviews?: number;
  colors?: string[];
  sizes?: string[];
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
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCart();

  // Function to determine text color based on background color
  const getTextColor = (bgColor: string) => {
    if (typeof bgColor !== "string") return "text-black";

    const darkColors = ["black", "navy", "blue", "dark"];
    return darkColors.some((color) => bgColor.toLowerCase().includes(color))
      ? "text-white"
      : "text-black";
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation

    if (!selectedSize && sizes.length > 0) {
      alert("Please select a size");
      return;
    }

    if (!selectedColor && colors.length > 0) {
      alert("Please select a color");
      return;
    }

    addItem({
      id,
      name,
      price,
      image: Array.isArray(image) ? image[0] : image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const productImage = Array.isArray(image) ? image[0] : image;

  // Ensure colors and sizes are arrays and filter out non-string values
  const safeColors = Array.isArray(colors)
    ? colors.filter((color) => typeof color === "string")
    : [];
  const safeSizes = Array.isArray(sizes)
    ? sizes.filter((size) => typeof size === "string")
    : [];

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
            <Badge
              variant="secondary"
              className="bg-blue-600/90 backdrop-blur-sm text-white"
            >
              {category}
            </Badge>
          </div>
        </div>

        <h3 className="font-medium text-base">{name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-blue-600 font-semibold">${price.toFixed(2)}</p>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-muted-foreground ml-1">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>

      {/* Color Selection */}
      {safeColors.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-1">
            Color: {selectedColor}
          </p>
          <div className="flex flex-wrap gap-1">
            {safeColors.map((color, index) => (
              <button
                key={index}
                className={`h-6 w-6 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "border-blue-500 scale-110"
                    : "border-border"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
                title={color}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {safeSizes.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-1">
            Size: {selectedSize}
          </p>
          <div className="flex flex-wrap gap-1">
            {safeSizes.map((size) => (
              <button
                key={size}
                className={`h-6 min-w-[2rem] px-1 text-xs rounded border transition-all ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-background border-input"
                }`}
                onClick={() => setSelectedSize(size)}
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
  );
}
