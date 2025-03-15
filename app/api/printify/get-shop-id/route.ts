import { NextResponse } from "next/server"
import { getShopId } from "@/lib/printify"

export async function GET() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "PRINTIFY_API_KEY environment variable is not set" }, { status: 400 })
    }

    const shopId = await getShopId(apiKey)

    return NextResponse.json({ shopId })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch shop ID from Printify" }, { status: 500 })
  }
}

