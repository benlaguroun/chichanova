// This is a simplified client for Printify API integration
// In a real application, you would need to handle authentication and more endpoints

const PRINTIFY_API_URL = "https://api.printify.com/v1"

interface PrintifyProduct {
  id: string
  title: string
  description: string
  images: string[]
  variants: PrintifyVariant[]
  tags: string[]
  options: PrintifyOption[]
}

interface PrintifyVariant {
  id: string
  title: string
  price: number
  sku: string
  is_enabled: boolean
}

interface PrintifyOption {
  name: string
  type: string
  values: string[]
}

interface PrintifyOrder {
  id: string
  external_id: string
  line_items: PrintifyLineItem[]
  shipping_method: number
  shipping_address: PrintifyAddress
  send_shipping_notification: boolean
}

interface PrintifyLineItem {
  product_id: string
  variant_id: number
  quantity: number
}

interface PrintifyAddress {
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

interface PrintifyShop {
  id: string
  title: string
  connection_status: string
}

// New function to get shop ID from API key
export async function getShopId(apiKey: string): Promise<string> {
  try {
    const response = await fetch(`${PRINTIFY_API_URL}/shops.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch shops: ${response.status}`)
    }

    const data = await response.json()

    if (!data.data || data.data.length === 0) {
      throw new Error("No shops found for this API key")
    }

    // Return the ID of the first shop
    return data.data[0].id
  } catch (error) {
    console.error("Error fetching shop ID from Printify:", error)
    throw error
  }
}

export async function getProducts(shopId: string, apiKey: string): Promise<PrintifyProduct[]> {
  try {
    const response = await fetch(`${PRINTIFY_API_URL}/shops/${shopId}/products.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching products from Printify:", error)
    throw error
  }
}

export async function getProduct(shopId: string, productId: string, apiKey: string): Promise<PrintifyProduct> {
  try {
    const response = await fetch(`${PRINTIFY_API_URL}/shops/${shopId}/products/${productId}.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching product ${productId} from Printify:`, error)
    throw error
  }
}

export async function createOrder(shopId: string, order: PrintifyOrder, apiKey: string): Promise<any> {
  try {
    const response = await fetch(`${PRINTIFY_API_URL}/shops/${shopId}/orders.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating order with Printify:", error)
    throw error
  }
}

export async function getShippingRates(
  shopId: string,
  address: PrintifyAddress,
  items: PrintifyLineItem[],
  apiKey: string,
): Promise<any> {
  try {
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
      throw new Error(`Failed to get shipping rates: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching shipping rates from Printify:", error)
    throw error
  }
}

