import { NextResponse } from "next/server"
import { getProduct, getShopId } from "@/lib/printify"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY || "your-api-key"

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID

    if (!shopId) {
      shopId = await getShopId(apiKey)
    }

    const product = await getProduct(shopId, productId, apiKey)

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch product from Printify" }, { status: 500 })
  }
}

