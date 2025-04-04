"use client"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductFiltersProps {
  categories?: string[]
  sizes?: string[]
  colors?: string[]
  maxPrice?: number
  selectedCategories?: string[]
  selectedSizes?: string[]
  selectedColors?: string[]
  priceRange?: [number, number]
  onCategoryChange?: (category: string, checked: boolean) => void
  onSizeChange?: (size: string, checked: boolean) => void
  onColorChange?: (color: string, checked: boolean) => void
  onPriceChange?: (value: number[]) => void
  onReset?: () => void
  showCategories?: boolean
}

export default function ProductFilters({
  categories = [],
  sizes = [],
  colors = [],
  maxPrice = 100,
  selectedCategories = [],
  selectedSizes = [],
  selectedColors = [],
  priceRange = [0, 100],
  onCategoryChange = () => {},
  onSizeChange = () => {},
  onColorChange = () => {},
  onPriceChange = () => {},
  onReset = () => {},
  showCategories = true,
}: ProductFiltersProps) {
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
      {showCategories && categories.length > 0 && (
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

