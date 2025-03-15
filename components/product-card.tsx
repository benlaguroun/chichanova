"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingBag, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart/cart-provider"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id,
      name,
      price,
      image,
      quantity: 1,
      size: "M", // Default size
      color: "Black", // Default color
    })
  }

  return (
    <Card className="overflow-hidden group border-border/40 hover:border-primary/50 transition-colors hover-lift card-glow">
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full z-10 transition-transform duration-300 group-hover:scale-110"
            onClick={toggleWishlist}
          >
            <Heart className={cn("h-5 w-5", isWishlisted ? "fill-red-500 text-red-500" : "")} />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          <div className="absolute top-2 left-2">
            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button className="w-full gap-2 bg-primary/90 backdrop-blur-sm" onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">4.0</span>
          </div>
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-primary font-semibold">${price.toFixed(2)}</p>
            <div className="text-xs text-muted-foreground">Free shipping</div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

