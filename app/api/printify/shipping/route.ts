import { NextResponse } from "next/server"
import { getShippingRates, getShopId } from "@/lib/printify"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { address, items } = body

    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY || "your-api-key"

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID

    if (!shopId) {
      shopId = await getShopId(apiKey)
    }

    const shippingRates = await getShippingRates(shopId, address, items, apiKey)

    return NextResponse.json({ shippingRates })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch shipping rates from Printify" }, { status: 500 })
  }
}

