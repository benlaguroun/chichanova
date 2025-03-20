"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { getProductsFromAPI, getMockProducts, type Product } from "@/lib/product-service"
import ProductCard from "@/components/product-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function ShopCollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const fetchedProducts = await getProductsFromAPI()

        if (fetchedProducts.length === 0) {
          const mockProducts = getMockProducts()
          setProducts(mockProducts)

          // Extract unique categories from mock products
          const uniqueCategories = Array.from(new Set(mockProducts.map((p) => p.category)))
          setCategories(uniqueCategories)
        } else {
          setProducts(fetchedProducts)

          // Extract unique categories from fetched products
          const uniqueCategories = Array.from(new Set(fetchedProducts.map((p) => p.category)))
          setCategories(uniqueCategories)
        }

        setFilteredProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
        const mockProducts = getMockProducts()
        setProducts(mockProducts)

        // Extract unique categories from mock products
        const uniqueCategories = Array.from(new Set(mockProducts.map((p) => p.category)))
        setCategories(uniqueCategories)

        setFilteredProducts(mockProducts)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase()))
    }
  }, [activeCategory, products])

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Shop Collection"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Shop Collection</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Explore our latest styles and find your perfect fit</p>
        </div>
      </div>

      {/* Category Cards Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop By Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard
              name="All Products"
              image="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop"
              href="/shop"
              onClick={() => handleCategoryChange("all")}
              isActive={activeCategory === "all"}
            />

            {categories.map((category, index) => (
              <CategoryCard
                key={category}
                name={category}
                image={getCategoryImage(category)}
                href={`/products/${category.toLowerCase()}`}
                onClick={() => handleCategoryChange(category)}
                isActive={activeCategory === category}
                delay={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{activeCategory === "all" ? "All Products" : activeCategory}</h2>

            <Tabs defaultValue={activeCategory} onValueChange={handleCategoryChange}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span>Loading products...</span>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function CategoryCard({
  name,
  image,
  href,
  onClick,
  isActive = false,
  delay = 0,
}: {
  name: string
  image: string
  href: string
  onClick: () => void
  isActive?: boolean
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${
        isActive ? "ring-4 ring-primary scale-105" : "hover:scale-105"
      }`}
      onClick={onClick}
    >
      <Link href={href} className="block h-40">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white text-center">{name}</h3>
        </div>
      </Link>
    </motion.div>
  )
}

// Helper function to get category images
function getCategoryImage(category: string): string {
  const categoryImages: Record<string, string> = {
    "T-Shirts": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
    Hoodies: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
    Sweatshirts: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
    Accessories: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop",
  }

  return (
    categoryImages[category] ||
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
  )
}

