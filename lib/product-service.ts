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
    console.log("Fetching products from API...")
    const response = await fetch("/api/printify/products", {
      cache: "no-store", // Disable caching to ensure fresh data
      next: { revalidate: 0 }, // Disable Next.js cache
    })

    if (!response.ok) {
      console.error(`Error fetching products: ${response.status}`)
      throw new Error(`Error fetching products: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response:", JSON.stringify(data))

    if (data.error) {
      console.warn("API returned an error:", data.error)
      console.log("Falling back to mock products")
      return getMockProducts()
    }

    if (!data.products || data.products.length === 0) {
      console.warn("API returned no products")
      console.log("Falling back to mock products")
      return getMockProducts()
    }

    return data.products
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return getMockProducts() // Return mock products on error
  }
}

// Get a single product by ID
export async function getProductFromAPI(id: string): Promise<Product | null> {
  try {
    console.log(`Fetching product ${id} from API...`)
    const response = await fetch(`/api/printify/products/${id}`, {
      cache: "no-store", // Disable caching to ensure fresh data
      next: { revalidate: 0 }, // Disable Next.js cache
    })

    if (!response.ok) {
      console.error(`Error fetching product: ${response.status}`)
      throw new Error(`Error fetching product: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response:", JSON.stringify(data))

    if (data.error) {
      console.warn("API returned an error:", data.error)
      console.log("Falling back to mock product")
      const mockProducts = getMockProducts()
      return mockProducts.find((p) => p.id === id) || mockProducts[0]
    }

    if (!data.product) {
      console.warn("API returned no product")
      console.log("Falling back to mock product")
      const mockProducts = getMockProducts()
      return mockProducts.find((p) => p.id === id) || mockProducts[0]
    }

    return data.product
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
      description: "Make a statement with this comfortable and stylish sweatshirt.",
      category: "Sweatshirts",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Gray", "Black", "White"],
      rating: 4.7,
      reviews: 56,
      inStock: true,
    },
    {
      id: "4",
      name: "Graphic Tee",
      price: 34.99,
      image: "/placeholder.svg?height=600&width=480",
      description: "Express yourself with our unique graphic tee designs.",
      category: "T-Shirts",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Black", "Gray"],
      rating: 4.6,
      reviews: 78,
      inStock: true,
    },
    {
      id: "5",
      name: "Snapback Cap",
      price: 24.99,
      image: "/placeholder.svg?height=600&width=480",
      description: "A stylish snapback cap to complete your casual look.",
      category: "Accessories",
      colors: ["Black", "Navy", "Red"],
      rating: 4.4,
      reviews: 45,
      inStock: true,
    },
    {
      id: "6",
      name: "Canvas Tote Bag",
      price: 19.99,
      image: "/placeholder.svg?height=600&width=480",
      description: "A durable canvas tote bag for your everyday essentials.",
      category: "Accessories",
      colors: ["Natural", "Black", "Navy"],
      rating: 4.3,
      reviews: 38,
      inStock: true,
    },
  ]
}

