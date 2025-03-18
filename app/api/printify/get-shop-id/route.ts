import { NextResponse } from "next/server"
import { getShopId, MOCK_SHOP_ID } from "@/lib/printify"

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
      } catch (error) {
        console.error("Error getting shop ID:", error)
        return NextResponse.json({
          error: "Failed to get shop ID from Printify",
          shopId: MOCK_SHOP_ID,
          usingMock: true,
        })
      }
    }

    return NextResponse.json({
      shopId,
      usingMock: shopId === MOCK_SHOP_ID,
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({
      error: "Failed to get shop ID",
      shopId: MOCK_SHOP_ID,
      usingMock: true,
    })
  }
}

