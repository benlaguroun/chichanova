"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import ProductCard from "@/components/product-card"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getProductsFromAPI, getMockProducts, type Product } from "@/lib/product-service"
import { useSearchParams, useRouter } from "next/navigation"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category")

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam.toLowerCase()] : [],
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("newest")

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        console.log("Fetching products from API...")
        const fetchedProducts = await getProductsFromAPI()
        console.log(`Fetched ${fetchedProducts.length} products`)

        if (fetchedProducts.length === 0) {
          // Fallback to mock data if API returns empty array
          console.warn("API returned no products, using mock data")
          setProducts(getMockProducts())
          setError("Using mock data. Couldn't fetch real products.")
        } else {
          setProducts(fetchedProducts)
          setError(null)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts(getMockProducts())
        setError("Failed to fetch products. Using mock data instead.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Apply filters when products change or filter states change
  useEffect(() => {
    if (products.length === 0) return

    let result = [...products]

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category.toLowerCase()))
    }

    // Apply price filter
    result = result.filter((product) => {
      const price = typeof product.price === "number" ? product.price : Number.parseFloat(product.price as string)
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter((product) => {
        if (!product.sizes || !Array.isArray(product.sizes)) return false
        return product.sizes.some((size) => selectedSizes.includes(size.toLowerCase()))
      })
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter((product) => {
        if (!product.colors || !Array.isArray(product.colors)) return false
        return product.colors.some((color) => selectedColors.includes(color.toLowerCase()))
      })
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => {
          const priceA = typeof a.price === "number" ? a.price : Number.parseFloat(a.price as string)
          const priceB = typeof b.price === "number" ? b.price : Number.parseFloat(b.price as string)
          return priceA - priceB
        })
        break
      case "price-high":
        result.sort((a, b) => {
          const priceA = typeof a.price === "number" ? a.price : Number.parseFloat(a.price as string)
          const priceB = typeof b.price === "number" ? b.price : Number.parseFloat(b.price as string)
          return priceB - priceA
        })
        break
      case "popular":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
      default:
        // Assume newest is the default order from the API
        break
    }

    setFilteredProducts(result)
  }, [products, selectedCategories, priceRange, selectedSizes, selectedColors, sortOption])

  // Initialize filters from URL params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam.toLowerCase()])
    }
  }, [categoryParam])

  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category.toLowerCase()] : prev.filter((c) => c !== category.toLowerCase()),
    )
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    setSelectedSizes((prev) => (checked ? [...prev, size.toLowerCase()] : prev.filter((s) => s !== size.toLowerCase())))
  }

  const handleColorChange = (color: string, checked: boolean) => {
    setSelectedColors((prev) =>
      checked ? [...prev, color.toLowerCase()] : prev.filter((c) => c !== color.toLowerCase()),
    )
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 100])
    setSelectedSizes([])
    setSelectedColors([])
    setSortOption("newest")
  }

  // Get unique categories, sizes, and colors from all products
  const allCategories = Array.from(new Set(products.map((p) => p.category.toLowerCase())))
  const allSizes = Array.from(
    new Set(
      products
        .flatMap((p) => p.sizes || [])
        .filter(Boolean)
        .map((size) => size.toLowerCase()),
    ),
  )
  const allColors = Array.from(
    new Set(
      products
        .flatMap((p) => p.colors || [])
        .filter(Boolean)
        .map((color) => color.toLowerCase()),
    ),
  )

  // Find max price for slider
  const maxPrice = Math.max(
    ...products.map((p) => {
      const price = typeof p.price === "number" ? p.price : Number.parseFloat(p.price as string)
      return isNaN(price) ? 0 : price
    }),
    100, // Default max if no products
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex md:hidden mb-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-4">
              <FiltersContent
                categories={allCategories}
                sizes={allSizes}
                colors={allColors}
                maxPrice={maxPrice}
                selectedCategories={selectedCategories}
                selectedSizes={selectedSizes}
                selectedColors={selectedColors}
                priceRange={priceRange}
                onCategoryChange={handleCategoryChange}
                onSizeChange={handleSizeChange}
                onColorChange={handleColorChange}
                onPriceChange={handlePriceChange}
                onReset={handleResetFilters}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 space-y-6">
          <h2 className="font-semibold text-lg">Filters</h2>
          <FiltersContent
            categories={allCategories}
            sizes={allSizes}
            colors={allColors}
            maxPrice={maxPrice}
            selectedCategories={selectedCategories}
            selectedSizes={selectedSizes}
            selectedColors={selectedColors}
            priceRange={priceRange}
            onCategoryChange={handleCategoryChange}
            onSizeChange={handleSizeChange}
            onColorChange={handleColorChange}
            onPriceChange={handlePriceChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold font-brand">
              {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : "All Products"}
            </h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-[180px] bg-secondary">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-secondary aspect-[4/5] rounded-lg mb-3"></div>
                  <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-secondary rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          )}

          {filteredProducts.length > 6 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mx-1">
                1
              </Button>
              <Button variant="outline" className="mx-1">
                2
              </Button>
              <Button variant="outline" className="mx-1">
                3
              </Button>
              <Button variant="outline" className="mx-1">
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface FiltersContentProps {
  categories: string[]
  sizes: string[]
  colors: string[]
  maxPrice: number
  selectedCategories: string[]
  selectedSizes: string[]
  selectedColors: string[]
  priceRange: [number, number]
  onCategoryChange: (category: string, checked: boolean) => void
  onSizeChange: (size: string, checked: boolean) => void
  onColorChange: (color: string, checked: boolean) => void
  onPriceChange: (value: number[]) => void
  onReset: () => void
}

function FiltersContent({
  categories,
  sizes,
  colors,
  maxPrice,
  selectedCategories,
  selectedSizes,
  selectedColors,
  priceRange,
  onCategoryChange,
  onSizeChange,
  onColorChange,
  onPriceChange,
  onReset,
}: FiltersContentProps) {
  // Common size display names (for better UI)
  const sizeDisplayNames: Record<string, string> = {
    xs: "XS",
    s: "S",
    m: "M",
    l: "L",
    xl: "XL",
    "2xl": "2XL",
    "3xl": "3XL",
    xxl: "2XL",
    xxxl: "3XL",
  }

  // Common color display names and their CSS color values
  const colorInfo: Record<string, { display: string; cssColor: string }> = {
    black: { display: "Black", cssColor: "#000000" },
    white: { display: "White", cssColor: "#FFFFFF" },
    red: { display: "Red", cssColor: "#FF0000" },
    blue: { display: "Blue", cssColor: "#0000FF" },
    green: { display: "Green", cssColor: "#008000" },
    yellow: { display: "Yellow", cssColor: "#FFFF00" },
    purple: { display: "Purple", cssColor: "#800080" },
    orange: { display: "Orange", cssColor: "#FFA500" },
    pink: { display: "Pink", cssColor: "#FFC0CB" },
    gray: { display: "Gray", cssColor: "#808080" },
    grey: { display: "Gray", cssColor: "#808080" },
    navy: { display: "Navy", cssColor: "#000080" },
    brown: { display: "Brown", cssColor: "#A52A2A" },
  }

  return (
    <div className="space-y-6">
      {categories.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => onCategoryChange(category, checked === true)}
                />
                <label htmlFor={`category-${category}`} className="text-sm capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider value={priceRange} min={0} max={maxPrice} step={1} className="my-6" onValueChange={onPriceChange} />
        <div className="flex items-center justify-between">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      {sizes.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => {
              const displaySize = sizeDisplayNames[size] || size.toUpperCase()
              return (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  className="h-8"
                  onClick={() => onSizeChange(size, !selectedSizes.includes(size))}
                >
                  {displaySize}
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const colorData = colorInfo[color] || { display: color, cssColor: "#CCCCCC" }
              return (
                <Button
                  key={color}
                  variant="outline"
                  size="icon"
                  className={`rounded-full h-8 w-8 p-0 border-2 ${selectedColors.includes(color) ? "border-primary scale-110" : "border-border"}`}
                  style={{ backgroundColor: colorData.cssColor }}
                  onClick={() => onColorChange(color, !selectedColors.includes(color))}
                  title={colorData.display}
                />
              )
            })}
          </div>
        </div>
      )}

      <Button className="w-full" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  )
}

