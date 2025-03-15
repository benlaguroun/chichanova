import { NextResponse } from "next/server"
import { createOrder, getShopId } from "@/lib/printify"

export async function POST(request: Request) {
  try {
    const order = await request.json()

    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY || "your-api-key"

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID

    if (!shopId) {
      shopId = await getShopId(apiKey)
    }

    const result = await createOrder(shopId, order, apiKey)

    return NextResponse.json({ success: true, order: result })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to create order with Printify" }, { status: 500 })
  }
}

