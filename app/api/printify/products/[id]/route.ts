import { NextResponse } from "next/server"
import { getProduct, getShopId, mapPrintifyProductToLocal } from "@/lib/printify"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY

    if (!apiKey) {
      console.error("PRINTIFY_API_KEY environment variable is not set")
      return NextResponse.json(
        {
          error: "PRINTIFY_API_KEY environment variable is not set",
          product: null,
          source: "error",
        },
        { status: 200 },
      ) // Return 200 to prevent breaking the UI
    }

    // Get shop ID using the API key
    let shopId = process.env.PRINTIFY_SHOP_ID

    if (!shopId) {
      try {
        console.log("No PRINTIFY_SHOP_ID found, attempting to fetch from API...")
        shopId = await getShopId(apiKey)
        console.log(`Using shop ID: ${shopId}`)
      } catch (error) {
        console.error("Error getting shop ID:", error)
        return NextResponse.json(
          {
            error: "Failed to get shop ID from Printify",
            message: "Using mock data as fallback",
            product: null,
            source: "mock",
          },
          { status: 200 },
        )
      }
    }

    console.log(`Fetching product ${productId} with shop ID: ${shopId}`)
    const product = await getProduct(shopId, productId, apiKey)

    // Map to our local format
    const formattedProduct = mapPrintifyProductToLocal(product)

    return NextResponse.json({
      product: formattedProduct,
      source: shopId.startsWith("mock") ? "mock" : "printify",
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch product from Printify",
        errorDetails: error instanceof Error ? error.message : String(error),
        product: null,
        source: "error",
      },
      { status: 200 },
    ) // Return 200 to prevent breaking the UI
  }
}

