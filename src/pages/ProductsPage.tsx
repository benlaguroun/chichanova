"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter, SlidersHorizontal } from "lucide-react"
import ProductCard from "../components/ProductCard"

// Mock products data
const products = [
  {
    id: "1",
    name: "Classic Tee",
    price: 29.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "T-Shirts",
  },
  {
    id: "2",
    name: "Vintage Hoodie",
    price: 59.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "Hoodies",
  },
  {
    id: "3",
    name: "Statement Sweatshirt",
    price: 49.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "Sweatshirts",
  },
  {
    id: "4",
    name: "Graphic Tee",
    price: 34.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "T-Shirts",
  },
  {
    id: "5",
    name: "Minimalist Hoodie",
    price: 64.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "Hoodies",
  },
  {
    id: "6",
    name: "Eco Tee",
    price: 32.99,
    image: "/placeholder.svg?height=600&width=480",
    category: "T-Shirts",
  },
]

const ProductsPage = () => {
  const [searchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const category = searchParams.get("category")

  useEffect(() => {
    if (category) {
      setFilteredProducts(products.filter((product) => product.category.toLowerCase() === category.toLowerCase()))
    } else {
      setFilteredProducts(products)
    }
  }, [category])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filters Button */}
        <button
          className="flex md:hidden items-center gap-2 border border-border rounded-md px-4 py-2 mb-4"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>

        {/* Mobile Filters Panel */}
        {filtersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button className="p-2" onClick={() => setFiltersOpen(false)}>
                ✕
              </button>
            </div>
            <FiltersContent />
            <div className="mt-6">
              <button
                className="w-full bg-primary text-primary-foreground py-2 rounded-md"
                onClick={() => setFiltersOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 space-y-6">
          <h2 className="font-semibold text-lg">Filters</h2>
          <FiltersContent />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "All Products"}
            </h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select className="w-full sm:w-[180px] bg-secondary p-2 rounded-md">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <button className="hidden sm:flex p-2 border border-border rounded-md">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button className="mx-1 px-4 py-2 border border-border rounded-md">1</button>
            <button className="mx-1 px-4 py-2 border border-border rounded-md">2</button>
            <button className="mx-1 px-4 py-2 border border-border rounded-md">3</button>
            <button className="mx-1 px-4 py-2 border border-border rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for filters
const FiltersContent = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="t-shirts" className="rounded border-border" />
            <label htmlFor="t-shirts" className="text-sm">
              T-Shirts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="hoodies" className="rounded border-border" />
            <label htmlFor="hoodies" className="text-sm">
              Hoodies
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="sweatshirts" className="rounded border-border" />
            <label htmlFor="sweatshirts" className="text-sm">
              Sweatshirts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="accessories" className="rounded border-border" />
            <label htmlFor="accessories" className="text-sm">
              Accessories
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="100"
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm">$0</span>
          <span className="text-sm">$100+</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          <button className="border border-border rounded-md h-8">XS</button>
          <button className="border border-border rounded-md h-8">S</button>
          <button className="border border-border rounded-md h-8">M</button>
          <button className="border border-border rounded-md h-8">L</button>
          <button className="border border-border rounded-md h-8">XL</button>
          <button className="border border-border rounded-md h-8">2XL</button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full h-8 w-8 p-0 border-2 border-border bg-black"></button>
          <button className="rounded-full h-8 w-8 p-0 border-2 border-border bg-white"></button>
          <button className="rounded-full h-8 w-8 p-0 border-2 border-border bg-red-500"></button>
          <button className="rounded-full h-8 w-8 p-0 border-2 border-border bg-blue-500"></button>
          <button className="rounded-full h-8 w-8 p-0 border-2 border-border bg-green-500"></button>
        </div>
      </div>

      <button className="w-full bg-primary text-primary-foreground py-2 rounded-md">Apply Filters</button>
    </div>
  )
}

export default ProductsPage

