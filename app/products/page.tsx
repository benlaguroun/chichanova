import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import ProductCard from "@/components/product-card"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
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
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 space-y-6">
          <h2 className="font-semibold text-lg">Filters</h2>
          <FiltersContent />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="newest">
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

          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <ProductCard
                id="1"
                name="Classic Tee"
                price={29.99}
                image="/placeholder.svg?height=600&width=480"
                category="T-Shirts"
              />
              <ProductCard
                id="2"
                name="Vintage Hoodie"
                price={59.99}
                image="/placeholder.svg?height=600&width=480"
                category="Hoodies"
              />
              <ProductCard
                id="3"
                name="Statement Sweatshirt"
                price={49.99}
                image="/placeholder.svg?height=600&width=480"
                category="Sweatshirts"
              />
              <ProductCard
                id="4"
                name="Graphic Tee"
                price={34.99}
                image="/placeholder.svg?height=600&width=480"
                category="T-Shirts"
              />
              <ProductCard
                id="5"
                name="Minimalist Hoodie"
                price={64.99}
                image="/placeholder.svg?height=600&width=480"
                category="Hoodies"
              />
              <ProductCard
                id="6"
                name="Eco Tee"
                price={32.99}
                image="/placeholder.svg?height=600&width=480"
                category="T-Shirts"
              />
            </div>
          </Suspense>

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
        </div>
      </div>
    </div>
  )
}

function FiltersContent() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="t-shirts" />
            <label htmlFor="t-shirts" className="text-sm">
              T-Shirts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hoodies" />
            <label htmlFor="hoodies" className="text-sm">
              Hoodies
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sweatshirts" />
            <label htmlFor="sweatshirts" className="text-sm">
              Sweatshirts
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="accessories" />
            <label htmlFor="accessories" className="text-sm">
              Accessories
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider defaultValue={[0, 100]} max={100} step={1} className="my-6" />
        <div className="flex items-center justify-between">
          <span className="text-sm">$0</span>
          <span className="text-sm">$100+</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" size="sm" className="h-8">
            XS
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            S
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            M
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            L
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            XL
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            2XL
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            3XL
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0 border-2 bg-black" />
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0 border-2 bg-white" />
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0 border-2 bg-red-500" />
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0 border-2 bg-blue-500" />
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0 border-2 bg-green-500" />
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8 p-0 border-2 bg-yellow-500" />
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

