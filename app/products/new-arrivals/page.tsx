"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getNewArrivals, getMockProducts, type Product } from "@/lib/product-service"
import ProductCard from "@/components/product-card"
import { Loader2 } from "lucide-react"

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true)
        const newArrivals = await getNewArrivals()

        if (newArrivals.length === 0) {
          // If no new arrivals, use mock data
          const mockProducts = getMockProducts().slice(0, 8)
          setProducts(mockProducts)
          setError("Using mock data. Couldn't fetch real new arrivals.")
        } else {
          setProducts(newArrivals)
          setError(null)
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error)
        // Fallback to mock data
        const mockProducts = getMockProducts().slice(0, 8)
        setProducts(mockProducts)
        setError("Failed to fetch new arrivals. Using mock data instead.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewArrivals()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[40vh] bg-gradient-to-r from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=2070&auto=format&fit=crop"
            alt="New Arrivals"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">New Arrivals</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Check out our latest designs fresh from the collection
          </p>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Additions</h2>

          {error && (
            <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span>Loading new arrivals...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={Array.isArray(product.image) ? product.image[0] : product.image}
                  category={product.category}
                  rating={product.rating}
                  reviews={product.reviews}
                  colors={product.colors}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No new arrivals found at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

