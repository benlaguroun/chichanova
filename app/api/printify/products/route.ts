import { NextResponse } from "next/server"
import { getProducts, getShopId, mapPrintifyProductToLocal } from "@/lib/printify"
import { getMockPrintifyProducts } from "@/lib/mock"

export async function GET() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY

    if (!apiKey) {
      console.error("PRINTIFY_API_KEY environment variable is not set")
      return NextResponse.json(
        {
          error: "PRINTIFY_API_KEY environment variable is not set",
          products: getMockPrintifyProducts().map((product) => mapPrintifyProductToLocal(product)),
          source: "mock",
        },
        { status: 200 },
      ) // Return mock data with 200 status
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
            products: getMockPrintifyProducts().map((product) => mapPrintifyProductToLocal(product)),
            source: "mock",
          },
          { status: 200 },
        )
      }
    }

    console.log(`Fetching products with shop ID: ${shopId}`)
    const products = await getProducts(shopId, apiKey)
    console.log(`Fetched ${products.length} products from Printify`)

    // Map Printify products to our local format
    const formattedProducts = products.map((product) => mapPrintifyProductToLocal(product))

    return NextResponse.json({
      products: formattedProducts,
      source: shopId.startsWith("mock") ? "mock" : "printify",
    })
  } catch (error) {
    console.error("Error in API route:", error)
    // Return mock products with error information
    const mockProducts = getMockPrintifyProducts().map((product) => mapPrintifyProductToLocal(product))
    return NextResponse.json(
      {
        error: "Failed to fetch products from Printify",
        errorDetails: error instanceof Error ? error.message : String(error),
        products: mockProducts,
        source: "error",
      },
      { status: 200 },
    ) // Return 200 to prevent breaking the UI
  }
}

