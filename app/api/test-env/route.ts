import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.PRINTIFY_API_KEY
  const shopId = process.env.PRINTIFY_SHOP_ID

  return NextResponse.json({
    apiKeyExists: !!apiKey,
    // Don't return the actual key for security reasons
    apiKeyFirstChars: apiKey ? `${apiKey.substring(0, 4)}...` : "Not found",
    apiKeyLength: apiKey ? apiKey.length : 0,
    shopId: shopId || "Not found (will be auto-detected)",
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  })
}

