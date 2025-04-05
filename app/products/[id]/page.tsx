"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingBag, Share2, Star, Truck, Loader2, Check } from "lucide-react"
import RelatedProductCard from "@/components/related-product-card"
import { getProductFromAPI, getProductsFromAPI, getMockProducts, type Product } from "@/lib/product-service"
import { useCart } from "@/components/cart/cart-provider"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

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
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [currentPrice, setCurrentPrice] = useState<number>(0)

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

          // Initialize selected size and color if available
          if (fetchedProduct.sizes?.length) {
            setSelectedSize(fetchedProduct.sizes[0])
          }
          if (fetchedProduct.colors?.length) {
            setSelectedColor(fetchedProduct.colors[0])
          }
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

  // Update selected variant and price when size or color changes
  useEffect(() => {
    if (product && product.variants && Array.isArray(product.variants)) {
      // Find the variant that matches the selected size and color
      const variant = product.variants.find((v: any) => {
        const variantOptions = v.options || {}
        const matchesSize = !selectedSize || variantOptions.size === selectedSize
        const matchesColor = !selectedColor || variantOptions.color === selectedColor
        return matchesSize && matchesColor
      })

      if (variant) {
        setSelectedVariant(variant)

        // Update the current price based on the selected variant
        let variantPrice = variant.price
        // If price is over 100, assume it's in cents and convert to dollars
        if (variantPrice > 100) {
          variantPrice = variantPrice / 100
        }
        setCurrentPrice(variantPrice)
        console.log("Selected variant:", variant, "Price:", variantPrice)
      } else {
        // If no exact match, try to find a variant with just the matching size
        const sizeVariant = product.variants.find((v: any) => {
          const variantOptions = v.options || {}
          return variantOptions.size === selectedSize
        })

        if (sizeVariant) {
          setSelectedVariant(sizeVariant)

          // Update the current price based on the selected size variant
          let variantPrice = sizeVariant.price
          // If price is over 100, assume it's in cents and convert to dollars
          if (variantPrice > 100) {
            variantPrice = variantPrice / 100
          }
          setCurrentPrice(variantPrice)
          console.log("Selected size variant:", sizeVariant, "Price:", variantPrice)
        } else {
          // Default to the base product price if no variant is found
          setCurrentPrice(product.price)
        }
      }
    }
  }, [product, selectedSize, selectedColor])

  const handleAddToCart = () => {
    if (!product) return

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

  // Ensure colors and sizes are arrays of strings
  const safeColors = Array.isArray(product.colors) ? product.colors.filter((color) => typeof color === "string") : []
  const safeSizes = Array.isArray(product.sizes) ? product.sizes.filter((size) => typeof size === "string") : []

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
              {product.inStock ? (
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

          <div className="space-y-4">
            {safeColors.length > 0 ? (
              <div>
                <h3 className="font-medium mb-2">
                  Color: <span className="text-primary">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {safeColors.map((color) => {
                    // Try to determine if this is a valid CSS color
                    const isValidCssColor =
                      /^#([0-9A-F]{3}){1,2}$/i.test(color) ||
                      /^rgb$$\d+,\s*\d+,\s*\d+$$$/i.test(color) ||
                      CSS.supports("color", color.toLowerCase())

                    return (
                      <button
                        key={color}
                        className={`h-10 px-3 rounded-md border-2 transition-all flex items-center justify-center ${
                          selectedColor === color ? "border-primary scale-105" : "border-border"
                        }`}
                        style={isValidCssColor ? { backgroundColor: color.toLowerCase() } : {}}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        aria-label={`Select ${color} color`}
                      >
                        {!isValidCssColor && color}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-medium mb-2">Color</h3>
                <div className="text-muted-foreground">This product is available in a single color variant.</div>
              </div>
            )}

            {safeSizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">
                  Size: <span className="text-primary">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {safeSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="h-10 min-w-12 px-3"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-4">
              <Button className="flex-1 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
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

