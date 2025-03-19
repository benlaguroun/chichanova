import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
  // Function to determine text color based on background color
  const getTextColor = (bgColor: string) => {
    const darkColors = ["black", "navy", "blue", "dark"]
    return darkColors.some((color) => bgColor.toLowerCase().includes(color)) ? "text-white" : "text-black"
  }

  return (
    <Link href={`/products/${id}`} className="group block">
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
          <Button className="w-full gap-2 bg-primary/90 backdrop-blur-sm">
            <ShoppingBag className="h-4 w-4" />
            View Product
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-primary/90 backdrop-blur-sm text-primary-foreground">
            {category}
          </Badge>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-medium text-base">{name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-primary font-semibold">${price.toFixed(2)}</p>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Display available colors */}
        {colors && colors.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className={`h-4 w-4 rounded-full border border-gray-300`}
                style={{
                  backgroundColor: color.toLowerCase(),
                  color: getTextColor(color),
                }}
                title={color}
              />
            ))}
            {colors.length > 4 && <div className="text-xs text-muted-foreground ml-1">+{colors.length - 4} more</div>}
          </div>
        )}
      </div>
    </Link>
  )
}

