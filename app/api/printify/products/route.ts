import { NextResponse } from "next/server"
import { getProducts, getShopId, mapPrintifyProductToLocal } from "@/lib/printify"

export async function GET() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "PRINTIFY_API_KEY environment variable is not set" }, { status: 401 })
    }

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID

    if (!shopId) {
      try {
        shopId = await getShopId(apiKey)
        console.log(`Using shop ID: ${shopId}`)
      } catch (error) {
        console.error("Error getting shop ID:", error)
        return NextResponse.json(
          {
            error: "Failed to get shop ID from Printify",
            message: "Using mock data as fallback",
          },
          { status: 200 },
        )
      }
    }

    const products = await getProducts(shopId, apiKey)

    // Map Printify products to our local format
    const formattedProducts = products.map((product) => mapPrintifyProductToLocal(product))

    return NextResponse.json({
      products: formattedProducts,
      source: shopId.startsWith("mock") ? "mock" : "printify",
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch products from Printify" }, { status: 500 })
  }
}

