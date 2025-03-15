import axios from "axios"

const API_URL = "https://api.printify.com/v1"

// You'll need to set up a proxy server to handle API requests
// For local development, you can use a service like https://cors-anywhere.herokuapp.com/
const PROXY_URL = ""

// Types
export interface PrintifyProduct {
  id: string
  title: string
  description: string
  images: string[]
  variants: PrintifyVariant[]
  tags: string[]
  options: PrintifyOption[]
}

export interface PrintifyVariant {
  id: string
  title: string
  price: number
  sku: string
  is_enabled: boolean
}

export interface PrintifyOption {
  name: string
  type: string
  values: string[]
}

// API functions
export const getShopId = async (apiKey: string): Promise<string> => {
  try {
    const response = await axios.get(`${PROXY_URL}${API_URL}/shops.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error("No shops found for this API key")
    }

    return response.data.data[0].id
  } catch (error) {
    console.error("Error fetching shop ID:", error)
    throw error
  }
}

export const getProducts = async (shopId: string, apiKey: string): Promise<PrintifyProduct[]> => {
  try {
    const response = await axios.get(`${PROXY_URL}${API_URL}/shops/${shopId}/products.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    return response.data.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export const getProduct = async (shopId: string, productId: string, apiKey: string): Promise<PrintifyProduct> => {
  try {
    const response = await axios.get(`${PROXY_URL}${API_URL}/shops/${shopId}/products/${productId}.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    return response.data
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error)
    throw error
  }
}

// For development/demo purposes, you can use mock data
export const getMockProducts = (): PrintifyProduct[] => {
  return [
    {
      id: "1",
      title: "Classic Tee",
      description: "Our signature classic tee is made from 100% organic cotton for ultimate comfort and durability.",
      images: ["/placeholder.svg?height=600&width=480"],
      variants: [
        { id: "101", title: "S / Black", price: 29.99, sku: "CT-S-BLK", is_enabled: true },
        { id: "102", title: "M / Black", price: 29.99, sku: "CT-M-BLK", is_enabled: true },
        { id: "103", title: "L / Black", price: 29.99, sku: "CT-L-BLK", is_enabled: true },
      ],
      tags: ["tee", "cotton", "organic"],
      options: [
        { name: "Size", type: "size", values: ["S", "M", "L", "XL"] },
        { name: "Color", type: "color", values: ["Black", "White", "Navy", "Gray"] },
      ],
    },
    {
      id: "2",
      title: "Vintage Hoodie",
      description: "A comfortable hoodie with a vintage feel, perfect for cooler days.",
      images: ["/placeholder.svg?height=600&width=480"],
      variants: [
        { id: "201", title: "S / Navy", price: 59.99, sku: "VH-S-NVY", is_enabled: true },
        { id: "202", title: "M / Navy", price: 59.99, sku: "VH-M-NVY", is_enabled: true },
        { id: "203", title: "L / Navy", price: 59.99, sku: "VH-L-NVY", is_enabled: true },
      ],
      tags: ["hoodie", "vintage", "comfortable"],
      options: [
        { name: "Size", type: "size", values: ["S", "M", "L", "XL"] },
        { name: "Color", type: "color", values: ["Navy", "Black", "Gray"] },
      ],
    },
    // Add more mock products as needed
  ]
}

export const getMockProduct = (id: string): PrintifyProduct | undefined => {
  return getMockProducts().find((product) => product.id === id)
}

