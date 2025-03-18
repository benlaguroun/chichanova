import { NextResponse } from "next/server"
import { getProduct, getShopId, mapPrintifyProductToLocal } from "@/lib/printify"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

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

    const product = await getProduct(shopId, productId, apiKey)

    // Map to our local format
    const formattedProduct = mapPrintifyProductToLocal(product)

    return NextResponse.json({
      product: formattedProduct,
      source: shopId.startsWith("mock") ? "mock" : "printify",
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch product from Printify" }, { status: 500 })
  }
}

