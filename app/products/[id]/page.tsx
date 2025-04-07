"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingBag, Share2, Star, Truck, Loader2, Check, AlertCircle } from "lucide-react"
import RelatedProductCard from "@/components/related-product-card"
import { getProductFromAPI, getProductsFromAPI, getMockProducts, type Product } from "@/lib/product-service"
import { useCart } from "@/components/cart/cart-provider"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

// Define a type for variant
interface Variant {
  id: string
  title: string
  price: number
  sku: string
  is_enabled: boolean
  options: {
    size?: string
    color?: string
    [key: string]: string | undefined
  }
}

// Define a type for grouped variants
interface GroupedVariants {
  [color: string]: {
    color: string
    sizes: {
      size: string
      variant: Variant
      isAvailable: boolean
    }[]
    colorCssValue: string
  }
}

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [availableSizes, setAvailableSizes] = useState<string[]>([])
  const [groupedVariants, setGroupedVariants] = useState<GroupedVariants>({})

  // Fetch the product details on component mount
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true)
        if (!id) {
          throw new Error("Product ID not found")
        }

        const fetchedProduct = await getProductFromAPI(id)

        if (!fetchedProduct) {
          // Try to find a mock product as fallback
          const mockProducts = getMockProducts()
          const mockProduct = mockProducts.find((p) => p.id === id)

          if (mockProduct) {
            setProduct(mockProduct)
            setError("Using mock data. Couldn't fetch real product.")
          } else {
            throw new Error("Product not found")
          }
        } else {
          console.log("Fetched product:", fetchedProduct)

          // Ensure colors and sizes are arrays of strings
          if (fetchedProduct.colors) {
            fetchedProduct.colors = Array.isArray(fetchedProduct.colors)
              ? fetchedProduct.colors.filter((color) => typeof color === "string")
              : []
          }

          if (fetchedProduct.sizes) {
            fetchedProduct.sizes = Array.isArray(fetchedProduct.sizes)
              ? fetchedProduct.sizes.filter((size) => typeof size === "string")
              : []
          }

          setProduct(fetchedProduct)
          setCurrentPrice(fetchedProduct.price)
          setError(null)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    const getMixedProducts = async (productId: string): Promise<Product[]> => {
      const products = await getProductsFromAPI()
      return products.filter((p) => p.id !== productId).slice(0, 3)
    }

    const fetchRelatedProducts = async () => {
      try {
        // Get mixed products excluding the current product
        const mixedProducts = await getMixedProducts(id)
        setRelatedProducts(mixedProducts)
      } catch (error) {
        console.error("Error fetching related products:", error)
        // Fallback to mock data
        const mockProducts = getMockProducts().filter((p) => p.id !== id)
        setRelatedProducts(mockProducts.slice(0, 3))
      }
    }

    fetchProductDetails()
    fetchRelatedProducts()
  }, [id])

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

  // Process variants when product changes
  useEffect(() => {
    if (!product || !product.variants || !Array.isArray(product.variants)) {
      return
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
      beige: "#F5F5DC",
      tan: "#D2B48C",
      khaki: "#F0E68C",
      charcoal: "#36454F",
      cream: "#FFFDD0",
      ivory: "#FFFFF0",
      lavender: "#E6E6FA",
      mint: "#98FB98",
      coral: "#FF7F50",
      turquoise: "#40E0D0",
      burgundy: "#800020",
      plum: "#8E4585",
      mauve: "#E0B0FF",
      forest: "#228B22",
      sky: "#87CEEB",
      royal: "#4169E1",
      steel: "#4682B4",
      slate: "#708090",
      chocolate: "#D2691E",
      coffee: "#6F4E37",
      rust: "#B7410E",
      rose: "#FF007F",
      peach: "#FFDAB9",
      salmon: "#FA8072",
      amber: "#FFBF00",
      mustard: "#FFDB58",
      lilac: "#C8A2C8",
      sage: "#BCB88A",
      emerald: "#50C878",
      ruby: "#E0115F",
      sapphire: "#0F52BA",
      aqua: "#00FFFF",
      crimson: "#DC143C",
      fuchsia: "#FF00FF",
      jade: "#00A86B",
      mahogany: "#C04000",
      ochre: "#CC7722",
      periwinkle: "#CCCCFF",
      scarlet: "#FF2400",
      taupe: "#483C32",
      vermilion: "#E34234",
      blossom: "#FFB7C5", // Light pink
      "island reef": "#4FD1C5", // Teal/turquoise
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

    // Filter enabled variants
    const enabledVariants = product.variants.filter((variant: any) => variant.is_enabled !== false)

    // Group variants by color
    const grouped: GroupedVariants = {}

    enabledVariants.forEach((variant: any) => {
      const variantOptions = variant.options || {}
      let color = ""
      let size = ""

      // Extract color and size from options
      Object.entries(variantOptions).forEach(([key, value]) => {
        if (typeof value === "string") {
          const keyLower = key.toLowerCase()
          const valueLower = value.toLowerCase()

          if (keyLower.includes("color") || (!isLikelySize(value) && !keyLower.includes("size"))) {
            color = value
          } else if (keyLower.includes("size") || isLikelySize(value)) {
            size = value
          }
        }
      })

      // If no explicit color/size found in options, try to extract from title
      if (!color || !size) {
        const titleParts = variant.title.split("/").map((part: string) => part.trim())
        if (titleParts.length >= 2) {
          // Check each part to determine if it's a size or color
          titleParts.forEach((part) => {
            if (isLikelySize(part) && !size) {
              size = part
            } else if (!color) {
              color = part
            }
          })
        } else if (titleParts.length === 1) {
          // Single value - check if it's a size
          const value = titleParts[0].trim()
          if (isLikelySize(value)) {
            size = value
          } else {
            color = value
          }
        }
      }

      // Skip if we couldn't determine color or size
      if (!color || !size) {
        console.log("Skipping variant, couldn't determine color or size:", variant.title)
        return
      }

      // Create color group if it doesn't exist
      if (!grouped[color]) {
        grouped[color] = {
          color,
          sizes: [],
          colorCssValue: getCssColorValue(color),
        }
      }

      // Add size to color group
      grouped[color].sizes.push({
        size,
        variant,
        isAvailable: true, // We've already filtered for enabled variants
      })
    })

    // Sort sizes within each color group
    Object.values(grouped).forEach((group) => {
      group.sizes.sort((a, b) => {
        // Common size order
        const sizeOrder: Record<string, number> = {
          XS: 1,
          S: 2,
          M: 3,
          L: 4,
          XL: 5,
          "2XL": 6,
          "3XL": 7,
          "4XL": 8,
        }

        const aOrder = sizeOrder[a.size.toUpperCase()] || 999
        const bOrder = sizeOrder[b.size.toUpperCase()] || 999

        return aOrder - bOrder
      })
    })

    console.log("Grouped variants:", grouped)
    setGroupedVariants(grouped)

    // Set initial color and size if available
    const colorOptions = Object.keys(grouped)
    if (colorOptions.length > 0) {
      const initialColor = colorOptions[0]
      setSelectedColor(initialColor)

      const sizesForColor = grouped[initialColor].sizes
      if (sizesForColor.length > 0) {
        setAvailableSizes(sizesForColor.map((s) => s.size))
        setSelectedSize(sizesForColor[0].size)

        // Set initial variant and price
        const initialVariant = sizesForColor[0].variant
        setSelectedVariant(initialVariant)

        // Update price
        let variantPrice = initialVariant.price
        if (variantPrice > 100) {
          variantPrice = variantPrice / 100
        }
        setCurrentPrice(variantPrice)
      }
    }
  }, [product])

  // Update available sizes when color changes
  useEffect(() => {
    if (selectedColor && groupedVariants[selectedColor]) {
      const sizesForColor = groupedVariants[selectedColor].sizes
      const availableSizesForColor = sizesForColor.map((s) => s.size)
      setAvailableSizes(availableSizesForColor)

      // If current selected size is not available for this color, select the first available
      if (!availableSizesForColor.includes(selectedSize) && availableSizesForColor.length > 0) {
        setSelectedSize(availableSizesForColor[0])
      }
    }
  }, [selectedColor, groupedVariants, selectedSize])

  // Update selected variant and price when size or color changes
  useEffect(() => {
    if (!selectedColor || !selectedSize || !groupedVariants[selectedColor]) return

    const sizesForColor = groupedVariants[selectedColor].sizes
    const matchingVariant = sizesForColor.find((s) => s.size === selectedSize)?.variant

    if (matchingVariant) {
      setSelectedVariant(matchingVariant)

      // Update price
      let variantPrice = matchingVariant.price
      if (variantPrice > 100) {
        variantPrice = variantPrice / 100
      }
      setCurrentPrice(variantPrice)
    }
  }, [selectedSize, selectedColor, groupedVariants])

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toast({
        title: "Cannot add to cart",
        description: "Please select a size and color first",
        variant: "destructive",
      })
      return
    }

    // Use the selected variant price
    const price = currentPrice

    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: Array.isArray(product.image) ? product.image[0] : product.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      variantId: selectedVariant?.id || null,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} - ${selectedColor}, Size ${selectedSize}`,
    })
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading product details...</span>
      </div>
    )
  }

  if (error && !product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8 text-muted-foreground">{error}</p>
        <Button asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    )
  }

  // Prepare the product images array
  const productImages = Array.isArray(product.image)
    ? product.image
    : [product.image, "/placeholder.svg?height=800&width=600"]

  // Get available colors from grouped variants
  const availableColors = Object.keys(groupedVariants)
  const hasVariants = availableColors.length > 0

  return (
    <div className="container py-8">
      {error && (
        <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={productImages[selectedImageIndex] || "/placeholder.svg?height=800&width=800"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer ${
                  selectedImageIndex === index ? "border-primary" : "border-border/40"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg?height=200&width=200"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-2/5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                {product.category}
              </Badge>
              {hasVariants ? (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  In Stock
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                  Out of Stock
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating || 4.5} ({product.reviews || 0} reviews)
              </span>
            </div>
            <p className="text-2xl font-semibold mt-4">${formatPrice(currentPrice)}</p>
          </div>

          <p className="text-muted-foreground">{product.description || "No description available"}</p>

          <div className="space-y-6">
            {!hasVariants && (
              <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>This product is currently out of stock or has no available variants.</p>
              </div>
            )}

            {/* Color Selection */}
            {availableColors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">
                  Color: <span className="text-primary">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => {
                    const colorData = groupedVariants[color]
                    return (
                      <button
                        key={color}
                        className={`relative h-12 w-12 rounded-full transition-all ${
                          selectedColor === color ? "ring-2 ring-primary ring-offset-2 scale-110" : "ring-1 ring-border"
                        }`}
                        style={{ backgroundColor: colorData.colorCssValue }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        aria-label={`Select ${color} color`}
                      >
                        {selectedColor === color && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check
                              className={`h-6 w-6 ${colorData.colorCssValue === "#FFFFFF" || colorData.colorCssValue === "#FFFDD0" || colorData.colorCssValue === "#FFFFF0" || colorData.colorCssValue === "#F5F5DC" ? "text-black" : "text-white"}`}
                            />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {groupedVariants[selectedColor]?.sizes.length || 0} size options available
                </p>
              </div>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">
                    Size: <span className="text-primary">{selectedSize}</span>
                  </h3>
                  <Button variant="link" className="p-0 h-auto text-sm" asChild>
                    <Link href="/size-guide">Size Guide</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="h-10"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-4">
              <Button className="flex-1 gap-2" onClick={handleAddToCart} disabled={!hasVariants || !selectedVariant}>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>30-day easy returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>Satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details & Care</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="space-y-4">
              <p>{product.description || "No description available for this product."}</p>
              <p>
                Each piece is printed on-demand using eco-friendly inks and sustainable production methods. The design
                is applied using a state-of-art printing process that ensures vibrant colors and excellent wash
                durability.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-6">
            <div className="space-y-4">
              <h3 className="font-medium">Materials</h3>
              <p>100% Organic Cotton, 180 GSM</p>

              <h3 className="font-medium">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Relaxed fit</li>
                <li>Ribbed crew neck</li>
                <li>Double-needle stitching on sleeves and hem</li>
                <li>Pre-shrunk fabric</li>
                <li>Printed using eco-friendly water-based inks</li>
              </ul>

              <h3 className="font-medium">Care Instructions</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Machine wash cold with like colors</li>
                <li>Tumble dry low</li>
                <li>Do not bleach</li>
                <li>Iron on low heat if needed</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-6">
            <div className="space-y-4">
              <h3 className="font-medium">Shipping</h3>
              <p>
                All orders are printed on-demand through our partner Printify. Production typically takes 2-3 business
                days before shipping. Once shipped, delivery times are as follows:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>United States: 3-5 business days</li>
                <li>Canada: 5-10 business days</li>
                <li>International: 10-20 business days</li>
              </ul>

              <h3 className="font-medium">Returns & Exchanges</h3>
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy with your order, we
                accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original
                packaging with tags attached.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Based on {product.reviews || 0} reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Great quality and fit!</h4>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="mt-2 text-sm">
                    This is my new favorite! The fabric is super soft and the fit is perfect. I've already washed it
                    several times and it still looks brand new. Definitely ordering more colors.
                  </p>
                  <div className="mt-2 text-sm font-medium">Sarah T. - Verified Buyer</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <RelatedProductCard
              key={relatedProduct.id}
              id={relatedProduct.id}
              name={relatedProduct.name}
              price={relatedProduct.price}
              image={Array.isArray(relatedProduct.image) ? relatedProduct.image[0] : relatedProduct.image}
              category={relatedProduct.category}
              colors={relatedProduct.colors}
              sizes={relatedProduct.sizes}
              rating={relatedProduct.rating}
              reviews={relatedProduct.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

