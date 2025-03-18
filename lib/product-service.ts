export interface Product {
  id: string
  name: string
  price: number
  image: string | string[]
  description?: string
  category: string
  sizes?: string[]
  colors?: string[]
  rating?: number
  reviews?: number
  inStock?: boolean
}

// Get all products
export async function getProductsFromAPI(): Promise<Product[]> {
  try {
    const response = await fetch("/api/printify/products")

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      console.warn("API returned an error:", data.error)
      console.log("Falling back to mock products")
      return getMockProducts()
    }

    return data.products || []
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return getMockProducts() // Return mock products on error
  }
}

// Get a single product by ID
export async function getProductFromAPI(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/printify/products/${id}`)

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      console.warn("API returned an error:", data.error)
      console.log("Falling back to mock product")
      const mockProducts = getMockProducts()
      return mockProducts.find((p) => p.id === id) || mockProducts[0]
    }

    return data.product || null
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error)
    // Try to find a matching mock product
    const mockProducts = getMockProducts()
    return mockProducts.find((p) => p.id === id) || mockProducts[0]
  }
}

// Fallback to mock products if API fails
export const getMockProducts = (): Product[] => {
  return [
    {
      id: "1",
      name: "Classic Tee",
      price: 29.99,
      image: "/placeholder.svg?height=600&width=480",
      description: "Our signature classic tee is made from 100% organic cotton for ultimate comfort and durability.",
      category: "T-Shirts",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black", "White", "Navy", "Gray", "Red"],
      rating: 4.8,
      reviews: 124,
      inStock: true,
    },
    {
      id: "2",
      name: "Vintage Hoodie",
      price: 59.99,
      image: "/placeholder.svg?height=600&width=480",
      description: "A comfortable hoodie with a vintage feel, perfect for cooler days.",
      category: "Hoodies",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "Black", "Gray"],
      rating: 4.5,
      reviews: 89,
      inStock: true,
    },
    {
      id: "3",
      name: "Statement Sweatshirt",
      price: 49.99,
      image: "/placeholder.svg?height=600&width=480",
      category: "Sweatshirts",
      rating: 4.7,
      reviews: 56,
      inStock: true,
    },
    {
      id: "4",
      name: "Graphic Tee",
      price: 34.99,
      image: "/placeholder.svg?height=600&width=480",
      category: "T-Shirts",
      rating: 4.6,
      reviews: 78,
      inStock: true,
    },
  ]
}

