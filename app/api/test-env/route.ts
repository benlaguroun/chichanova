import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    apiKeyExists: !!process.env.PRINTIFY_API_KEY,
    // Don't return the actual key for security reasons
    apiKeyFirstChars: process.env.PRINTIFY_API_KEY ? `${process.env.PRINTIFY_API_KEY.substring(0, 4)}...` : "Not found",
    shopId: process.env.PRINTIFY_SHOP_ID || "Not found (will be auto-detected)",
  })
}

