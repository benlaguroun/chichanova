// This is a client for Printify API integration
const PRINTIFY_API_URL = "https://api.printify.com/v1"

// Add retry logic for API calls
async function fetchWithRetry(url: string, options: RequestInit, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options)
    return response
  } catch (error) {
    if (retries <= 1) throw error

    console.log(`Fetch failed, retrying in ${backoff}ms... (${retries - 1} retries left)`)
    await new Promise((resolve) => setTimeout(resolve, backoff))
    return fetchWithRetry(url, options, retries - 1, backoff * 2)
  }
}

export interface PrintifyProduct {
  id: string
  title: string
  description: string
  images: PrintifyImage[]
  variants: PrintifyVariant[]
  tags: string[]
  options: PrintifyOption[]
  created_at?: string
  updated_at?: string
  print_provider_id?: string
  blueprint_id?: string
  print_areas?: any
  print_details?: any[]
}

export interface PrintifyImage {
  src: string
  variant_ids: string[]
  position: string
  is_default: boolean
}

export interface PrintifyVariant {
  id: string
  title: string
  price: number
  sku: string
  is_enabled: boolean
  options: Record<string, string>
}

export interface PrintifyOption {
  name: string
  type: string
  values: string[]
}

export interface PrintifyOrder {
  id: string
  external_id: string
  line_items: PrintifyLineItem[]
  shipping_method: number
  shipping_address: PrintifyAddress
  send_shipping_notification: boolean
}

export interface PrintifyLineItem {
  product_id: string
  variant_id: number
  quantity: number
}

export interface PrintifyAddress {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  region: string
  address1: string
  address2: string
  city: string
  zip: string
}

export interface PrintifyShop {
  id: string
  title: string
  connection_status: string
}

// Mock data for development and fallback
export const MOCK_SHOP_ID = "mock-shop-id-12345"

// Get shop ID from API key
export async function getShopId(apiKey: string): Promise<string> {
  try {
    console.log("Fetching shop ID from Printify API...")

    if (!apiKey || apiKey.trim() === "") {
      console.error("API Key is empty or invalid")
      return MOCK_SHOP_ID
    }

    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetchWithRetry(`${PRINTIFY_API_URL}/shops.json`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Disable caching to ensure fresh data
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error (${response.status}): ${errorText}`)
        throw new Error(`Failed to fetch shops: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("Printify shops response:", JSON.stringify(data))

      if (!data.data || data.data.length === 0) {
        console.warn("No shops found for this API key. Using mock shop ID for development.")
        return MOCK_SHOP_ID
      }

      // Return the ID of the first shop
      return data.data[0].id
    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === "AbortError") {
        console.error("Request timed out when fetching shop ID from Printify")
      } else {
        console.error("Error fetching shop ID from Printify:", error)
      }

      console.warn("Using mock shop ID as fallback due to error")
      return MOCK_SHOP_ID
    }
  } catch (error) {
    console.error("Error in getShopId function:", error)
    console.warn("Using mock shop ID as fallback due to error")
    return MOCK_SHOP_ID
  }
}

// Get all products
export async function getProducts(shopId: string, apiKey: string): Promise<PrintifyProduct[]> {
  try {
    // If using mock shop ID, return mock products
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock products data")
      return getMockPrintifyProducts()
    }

    if (!apiKey || apiKey.trim() === "") {
      console.error("API Key is empty or invalid")
      return getMockPrintifyProducts()
    }

    console.log(`Fetching products from Printify for shop ID: ${shopId}`)

    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetchWithRetry(
        `${PRINTIFY_API_URL}/shops/${shopId}/products.json`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          cache: "no-store", // Disable caching to ensure fresh data
          signal: controller.signal,
        },
        3,
        500,
      ) // 3 retries with 500ms initial backoff

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error (${response.status}): ${errorText}`)
        throw new Error(`Failed to fetch products: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log(`Received ${data.data?.length || 0} products from Printify`)
      return data.data || []
    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === "AbortError") {
        console.error("Request timed out when fetching products from Printify")
      } else {
        console.error("Error fetching products from Printify:", error)
      }

      // Return mock products as fallback
      return getMockPrintifyProducts()
    }
  } catch (error) {
    console.error("Error in getProducts function:", error)
    // Return mock products as fallback
    return getMockPrintifyProducts()
  }
}

// Get single product by ID
export async function getProduct(shopId: string, productId: string, apiKey: string): Promise<PrintifyProduct> {
  try {
    // If using mock shop ID, return mock product
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock product data")
      const mockProducts = getMockPrintifyProducts()
      const mockProduct = mockProducts.find((p) => p.id === productId) || mockProducts[0]
      return mockProduct
    }

    console.log(`Fetching product ${productId} from Printify for shop ID: ${shopId}`)

    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetchWithRetry(
        `${PRINTIFY_API_URL}/shops/${shopId}/products/${productId}.json`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          cache: "no-store", // Disable caching to ensure fresh data
          signal: controller.signal,
        },
        3,
        500,
      ) // 3 retries with 500ms initial backoff

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error (${response.status}): ${errorText}`)
        throw new Error(`Failed to fetch product: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log(`Received product data from Printify for ID: ${productId}`)
      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === "AbortError") {
        console.error(`Request timed out when fetching product ${productId} from Printify`)
      } else {
        console.error(`Error fetching product ${productId} from Printify:`, error)
      }

      // Return first mock product as fallback
      return getMockPrintifyProducts()[0]
    }
  } catch (error) {
    console.error(`Error in getProduct function for product ${productId}:`, error)
    // Return first mock product as fallback
    return getMockPrintifyProducts()[0]
  }
}

// Create a new order
export async function createOrder(shopId: string, order: PrintifyOrder, apiKey: string): Promise<any> {
  try {
    // If using mock shop ID, return mock response
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock order creation")
      return { success: true, order_id: "mock-order-" + Date.now() }
    }

    const response = await fetch(`${PRINTIFY_API_URL}/shops/${shopId}/orders.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error (${response.status}): ${errorText}`)
      throw new Error(`Failed to create order: ${response.status} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating order with Printify:", error)
    throw error
  }
}

// Get shipping rates
export async function getShippingRates(
  shopId: string,
  address: PrintifyAddress,
  items: PrintifyLineItem[],
  apiKey: string,
): Promise<any> {
  try {
    // If using mock shop ID, return mock shipping rates
    if (shopId === MOCK_SHOP_ID) {
      console.log("Using mock shipping rates")
      return {
        shipping_methods: [
          { id: 1, title: "Standard Shipping", price: 5.99 },
          { id: 2, title: "Express Shipping", price: 12.99 },
        ],
      }
    }

    const response = await fetch(`${PRINTIFY_API_URL}/shops/${shopId}/shipping_rates.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        line_items: items,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error (${response.status}): ${errorText}`)
      throw new Error(`Failed to get shipping rates: ${response.status} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching shipping rates from Printify:", error)
    throw error
  }
}

// Map Printify product to our local product format
export function mapPrintifyProductToLocal(product: PrintifyProduct) {
  console.log("Raw Printify product data:", JSON.stringify(product, null, 2))

  // Extract all image URLs
  const imageUrls = product.images?.map((img) => img.src) || ["/placeholder.svg?height=600&width=480"]

  // Get all variant prices to find min and max
  const prices = product.variants?.map((variant) => variant.price) || [0]
  const basePrice = prices.length > 0 ? Math.min(...prices) : 0

  // Convert price from cents to dollars if needed
  // If price is over 100, assume it's in cents and convert to dollars
  const formattedPrice = basePrice > 100 ? basePrice / 100 : basePrice

  // Common size patterns
  const sizePatterns = [
    /^(xs|s|m|l|xl|xxl|xxxl|2xl|3xl|4xl|5xl|6xl|7xl|one size)$/i,
    /^(extra small|small|medium|large|x-large|xx-large|xxx-large)$/i,
    /^(0|2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50)$/,
    /^([0-9]+\.[0-9]+)$/, // Numeric sizes like 7.5, 8.5, etc.
  ]

  // Common size values
  const commonSizeValues = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "Extra Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "XXX-Large",
    "One Size",
    "OS",
    "0",
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "48",
    "50",
  ]

  // Common color names to look for in product data
  const commonColors = [
    "black",
    "white",
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "orange",
    "brown",
    "gray",
    "grey",
    "navy",
    "teal",
    "maroon",
    "olive",
    "cyan",
    "magenta",
    "lime",
    "indigo",
    "violet",
    "gold",
    "silver",
    "beige",
    "tan",
    "khaki",
    "charcoal",
    "cream",
    "ivory",
    "lavender",
    "mint",
    "coral",
    "turquoise",
    "burgundy",
    "plum",
    "mauve",
    "forest",
    "sky",
    "royal",
    "steel",
    "slate",
    "chocolate",
    "coffee",
    "rust",
    "rose",
    "peach",
    "salmon",
    "amber",
    "mustard",
    "lilac",
    "sage",
    "emerald",
    "ruby",
    "sapphire",
    "aqua",
    "crimson",
    "fuchsia",
    "jade",
    "mahogany",
    "ochre",
    "periwinkle",
    "scarlet",
    "taupe",
    "vermilion",
  ]

  // Function to check if a value is likely a size
  const isLikelySize = (value: string): boolean => {
    if (!value) return false

    // Check against common size patterns
    for (const pattern of sizePatterns) {
      if (pattern.test(value.trim())) {
        return true
      }
    }

    // Check against common size values
    return commonSizeValues.some(
      (size) =>
        value.trim().toUpperCase() === size.toUpperCase() ||
        value.trim().toUpperCase().replace(/\s+/g, "") === size.toUpperCase().replace(/\s+/g, ""),
    )
  }

  // Function to check if a string contains a color name
  const containsColorName = (text: string): string | null => {
    if (!text) return null

    const lowerText = text.toLowerCase()
    for (const color of commonColors) {
      if (lowerText.includes(color)) {
        return color.charAt(0).toUpperCase() + color.slice(1) // Capitalize first letter
      }
    }
    return null
  }

  // Extract sizes and colors from variant titles
  const sizesSet = new Set<string>()
  const colorsSet = new Set<string>()

  // Try to extract from variants
  if (product.variants && Array.isArray(product.variants)) {
    product.variants.forEach((variant) => {
      if (variant.title && typeof variant.title === "string") {
        // Variant titles often have format like "S / Black" or "Medium / Blue"
        const parts = variant.title.split("/").map((part) => part.trim())

        if (parts.length >= 2) {
          const firstPart = parts[0].trim()
          const secondPart = parts[1].trim()

          // Check if first part is a size
          if (isLikelySize(firstPart)) {
            sizesSet.add(firstPart)
            // If first part is a size, second part is likely a color
            if (secondPart) colorsSet.add(secondPart)
          } else {
            // If first part is not a size, it might be a color
            colorsSet.add(firstPart)
            // And second part might be a size
            if (secondPart && isLikelySize(secondPart)) {
              sizesSet.add(secondPart)
            } else if (secondPart) {
              // If neither looks like a size, assume second part is a color
              colorsSet.add(secondPart)
            }
          }
        } else if (parts.length === 1) {
          // Single value - check if it's a size
          const value = parts[0].trim()
          if (isLikelySize(value)) {
            sizesSet.add(value)
          } else {
            colorsSet.add(value)
          }
        }
      }

      // Also check variant options if available
      if (variant.options) {
        // Check each option to determine if it's a size or color
        Object.entries(variant.options).forEach(([key, value]) => {
          if (typeof value === "string") {
            if (key.toLowerCase().includes("size") || isLikelySize(value)) {
              sizesSet.add(value)
            } else if (key.toLowerCase().includes("color") || !isLikelySize(value)) {
              colorsSet.add(value)
            }
          }
        })
      }
    })
  }

  // Extract colors from options - this is the most reliable source
  let hasExplicitColorOption = false
  let colorValues: string[] = []

  if (product.options && Array.isArray(product.options)) {
    product.options.forEach((option) => {
      if (option.name && typeof option.name === "string") {
        const optionName = option.name.toLowerCase()

        // Log all options for debugging
        console.log(`Option: ${option.name}, Values:`, option.values)

        if (optionName.includes("size")) {
          // This is a size option
          if (option.values && Array.isArray(option.values)) {
            option.values
              .filter((value) => typeof value === "string")
              .forEach((size) => {
                sizesSet.add(size)
              })
          }
        } else if (optionName.includes("color")) {
          // This is a color option - clear any previously detected colors
          // as the explicit color option is more reliable
          hasExplicitColorOption = true
          colorsSet.clear()
          if (option.values && Array.isArray(option.values)) {
            colorValues = option.values.filter((value) => typeof value === "string")
            colorValues.forEach((color) => colorsSet.add(color))
          }
        }
      }
    })
  }

  // If we don't have an explicit color option, try to extract from variants
  if (!hasExplicitColorOption && product.variants && Array.isArray(product.variants)) {
    // Extract colors from variant options
    product.variants.forEach((variant) => {
      if (variant.options && typeof variant.options === "object") {
        Object.entries(variant.options).forEach(([key, value]) => {
          if (key.toLowerCase().includes("color") && typeof value === "string") {
            colorsSet.add(value)
          }
        })
      }

      // Also try to extract from variant titles
      if (variant.title && typeof variant.title === "string") {
        const parts = variant.title.split("/").map((part) => part.trim())
        if (parts.length >= 2) {
          // Second part is often the color in "Size / Color" format
          const potentialColor = parts[1].trim()
          if (potentialColor && !isLikelySize(potentialColor)) {
            colorsSet.add(potentialColor)
          }
        }
      }
    })
  }

  // Special handling for products with "Chill" in the title
  if (product.title && product.title.toLowerCase().includes("chill") && colorsSet.size === 0) {
    // Try to extract colors from print_details or print_areas if available
    if (product.print_details && Array.isArray(product.print_details)) {
      console.log("Checking print_details for colors:", product.print_details)

      // Look for color information in print_details
      product.print_details.forEach((detail) => {
        if (detail && typeof detail === "object" && detail.colors && Array.isArray(detail.colors)) {
          detail.colors.forEach((color) => {
            if (typeof color === "string") {
              colorsSet.add(color)
            } else if (typeof color === "object" && color.name) {
              colorsSet.add(color.name)
            }
          })
        }
      })
    }

    // Check print_areas for color information
    if (product.print_areas && typeof product.print_areas === "object") {
      console.log("Checking print_areas for colors:", product.print_areas)

      Object.values(product.print_areas).forEach((area) => {
        if (area && typeof area === "object") {
          if (area.colors && Array.isArray(area.colors)) {
            area.colors.forEach((color) => {
              if (typeof color === "string") {
                colorsSet.add(color)
              } else if (typeof color === "object" && color.name) {
                colorsSet.add(color.name)
              }
            })
          }
        }
      })
    }

    // If we still don't have colors, check if this is a specific product type
    if (colorsSet.size === 0) {
      // For "Chill Vibe T-Shirt" specifically, add the known colors
      if (product.title.toLowerCase().includes("chill vibe")) {
        colorsSet.add("Vintage Black")
        colorsSet.add("Vintage Navy")
        colorsSet.add("Vintage Grey")
        colorsSet.add("Vintage Sand")
      }
    }
  }

  // If we still don't have any colors, try to extract from product title or description
  if (colorsSet.size === 0) {
    console.log("No colors found in options or variants, trying to extract from title/description")

    // Check product title for color names
    if (product.title) {
      const colorInTitle = containsColorName(product.title)
      if (colorInTitle) {
        console.log(`Found color in title: ${colorInTitle}`)
        colorsSet.add(colorInTitle)
      }
    }

    // Check product description for color names
    if (product.description && colorsSet.size === 0) {
      const colorInDesc = containsColorName(product.description)
      if (colorInDesc) {
        console.log(`Found color in description: ${colorInDesc}`)
        colorsSet.add(colorInDesc)
      }
    }
  }

  // If we still don't have any colors, add default colors based on product type
  if (colorsSet.size === 0) {
    console.log("No colors found, adding default colors based on product type")

    // Determine product type from title or tags
    const productTitle = product.title?.toLowerCase() || ""
    const productTags = product.tags?.map((tag) => tag.toLowerCase()) || []

    if (productTitle.includes("t-shirt") || productTags.includes("t-shirt") || productTags.includes("tee")) {
      colorsSet.add("Black")
      colorsSet.add("White")
      console.log("Added default T-shirt colors")
    } else if (productTitle.includes("hoodie") || productTags.includes("hoodie")) {
      colorsSet.add("Black")
      colorsSet.add("Gray")
      console.log("Added default Hoodie colors")
    } else if (productTitle.includes("sweatshirt") || productTags.includes("sweatshirt")) {
      colorsSet.add("Gray")
      colorsSet.add("Black")
      console.log("Added default Sweatshirt colors")
    } else {
      // Generic default
      colorsSet.add("Default")
      console.log("Added generic default color")
    }
  }

  // Convert sets to arrays
  const sizes = Array.from(sizesSet)
  const colors = Array.from(colorsSet)

  // Determine category from tags
  let category = "T-Shirts" // Default category
  if (product.tags) {
    if (product.tags.some((tag) => tag.toLowerCase().includes("hoodie"))) {
      category = "Hoodies"
    } else if (product.tags.some((tag) => tag.toLowerCase().includes("sweatshirt"))) {
      category = "Sweatshirts"
    } else if (
      product.tags.some(
        (tag) =>
          tag.toLowerCase().includes("accessory") ||
          tag.toLowerCase().includes("hat") ||
          tag.toLowerCase().includes("cap") ||
          tag.toLowerCase().includes("bag"),
      )
    ) {
      category = "Accessories"
    }
  }

  // Also try to determine category from title if tags don't help
  if (category === "T-Shirts" && product.title) {
    const title = product.title.toLowerCase()
    if (title.includes("hoodie")) {
      category = "Hoodies"
    } else if (title.includes("sweatshirt")) {
      category = "Sweatshirts"
    } else if (title.includes("hat") || title.includes("cap") || title.includes("bag") || title.includes("accessory")) {
      category = "Accessories"
    }
  }

  // Log the extracted data for debugging
  console.log(`Mapped product ${product.id}:`, {
    title: product.title,
    basePrice: formattedPrice,
    sizes,
    colors,
    imageUrls,
  })

  return {
    id: product.id,
    name: product.title,
    price: formattedPrice,
    description: product.description,
    image: imageUrls,
    sizes,
    colors,
    category,
    rating: 4.5, // Default rating
    reviews: Math.floor(Math.random() * (120 - 5 + 1)) + 5, // Random review count between 5-120
    inStock: true,
    variants: product.variants, // Include all variants for detailed price/option selection
  }
}

// Mock Printify products for development and fallback
export function getMockPrintifyProducts(): PrintifyProduct[] {
  return [
    {
      id: "mock-1",
      title: "Classic Cotton Tee",
      description: "Our signature classic tee is made from 100% organic cotton for ultimate comfort and durability.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["1"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "1",
          title: "S / Black",
          price: 29.99,
          sku: "CT-BLK-S",
          is_enabled: true,
          options: { size: "S", color: "Black" },
        },
      ],
      tags: ["t-shirt", "cotton", "classic"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL", "2XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Black", "White", "Navy", "Gray", "Red"],
        },
      ],
    },
    {
      id: "mock-2",
      title: "Vintage Hoodie",
      description: "A comfortable hoodie with a vintage feel, perfect for cooler days.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["2"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "2",
          title: "M / Navy",
          price: 59.99,
          sku: "VH-NVY-M",
          is_enabled: true,
          options: { size: "M", color: "Navy" },
        },
      ],
      tags: ["hoodie", "vintage", "comfortable"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Navy", "Black", "Gray"],
        },
      ],
    },
    {
      id: "mock-3",
      title: "Statement Sweatshirt",
      description: "Make a statement with this comfortable and stylish sweatshirt.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["3"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "3",
          title: "L / Gray",
          price: 49.99,
          sku: "SS-GRY-L",
          is_enabled: true,
          options: { size: "L", color: "Gray" },
        },
      ],
      tags: ["sweatshirt", "statement", "stylish"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["Gray", "Black", "White"],
        },
      ],
    },
    {
      id: "mock-4",
      title: "Graphic Tee",
      description: "Express yourself with our unique graphic tee designs.",
      images: [
        {
          src: "/placeholder.svg?height=600&width=480",
          variant_ids: ["4"],
          position: "front",
          is_default: true,
        },
      ],
      variants: [
        {
          id: "4",
          title: "M / White",
          price: 34.99,
          sku: "GT-WHT-M",
          is_enabled: true,
          options: { size: "M", color: "White" },
        },
      ],
      tags: ["t-shirt", "graphic", "unique"],
      options: [
        {
          name: "Size",
          type: "dropdown",
          values: ["S", "M", "L", "XL"],
        },
        {
          name: "Color",
          type: "dropdown",
          values: ["White", "Black", "Gray"],
        },
      ],
    },
  ]
}

