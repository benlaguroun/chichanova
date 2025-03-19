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
      image: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1374&auto=format&fit=crop",
      ],
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
      image: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1372&auto=format&fit=crop",
      ],
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
      image: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1372&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1335&auto=format&fit=crop",
      ],
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
      image: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1364&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1369&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1470&auto=format&fit=crop",
      ],
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
      image: [
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1470&auto=format&fit=crop",
      ],
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
      image: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1470&auto=format&fit=crop",
      ],
      description: "A durable canvas tote bag for your everyday essentials.",
      category: "Accessories",
      colors: ["Natural", "Black", "Navy"],
      rating: 4.3,
      reviews: 38,
      inStock: true,
    },
  ]
}

