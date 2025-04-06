import { NextResponse } from "next/server"

export async function GET() {
  // Return a sanitized version of environment variables for debugging
  return NextResponse.json({
    printifyApiKeyExists: !!process.env.PRINTIFY_API_KEY,
    printifyApiKeyFirstChars: process.env.PRINTIFY_API_KEY
      ? `${process.env.PRINTIFY_API_KEY.substring(0, 4)}...`
      : "Not set",
    printifyShopIdExists: !!process.env.PRINTIFY_SHOP_ID,
    printifyShopIdValue: process.env.PRINTIFY_SHOP_ID || "Not set",
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  })
}

