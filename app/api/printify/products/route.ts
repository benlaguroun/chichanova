import { NextResponse } from "next/server"
import { getProducts, getShopId } from "@/lib/printify"

export async function GET() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY || "your-api-key"

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID

    if (!shopId) {
      shopId = await getShopId(apiKey)
    }

    const products = await getProducts(shopId, apiKey)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch products from Printify" }, { status: 500 })
  }
}

