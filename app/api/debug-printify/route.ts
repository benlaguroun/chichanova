import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY
    const shopId = process.env.PRINTIFY_SHOP_ID

    // Check if API key exists
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "PRINTIFY_API_KEY environment variable is not set",
          environment: {
            nodeEnv: process.env.NODE_ENV,
            vercelEnv: process.env.VERCEL_ENV,
          },
        },
        { status: 401 },
      )
    }

    // Test direct connection to Printify API
    console.log("Testing direct connection to Printify API...")

    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetch("https://api.printify.com/v1/shops.json", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const responseStatus = response.status
      const responseHeaders = Object.fromEntries(response.headers.entries())

      if (!response.ok) {
        const errorText = await response.text()
        return NextResponse.json(
          {
            error: "Failed to connect to Printify API",
            status: responseStatus,
            headers: responseHeaders,
            errorDetails: errorText,
            apiKeyFirstChars: apiKey ? `${apiKey.substring(0, 4)}...` : "Not set",
            shopId: shopId || "Not set",
            environment: {
              nodeEnv: process.env.NODE_ENV,
              vercelEnv: process.env.VERCEL_ENV,
            },
          },
          { status: 200 },
        ) // Return 200 to make response readable in browser
      }

      const data = await response.json()

      return NextResponse.json({
        success: true,
        message: "Successfully connected to Printify API",
        status: responseStatus,
        headers: responseHeaders,
        data: data,
        apiKeyFirstChars: apiKey ? `${apiKey.substring(0, 4)}...` : "Not set",
        shopId: shopId || "Not set (will be auto-detected)",
        environment: {
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV,
        },
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)

      return NextResponse.json(
        {
          error: "Error fetching from Printify API",
          errorType: fetchError.name,
          errorMessage: fetchError.message,
          apiKeyFirstChars: apiKey ? `${apiKey.substring(0, 4)}...` : "Not set",
          shopId: shopId || "Not set",
          environment: {
            nodeEnv: process.env.NODE_ENV,
            vercelEnv: process.env.VERCEL_ENV,
          },
        },
        { status: 200 },
      ) // Return 200 to make response readable in browser
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected error in debug endpoint",
        errorMessage: error instanceof Error ? error.message : String(error),
        environment: {
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV,
        },
      },
      { status: 500 },
    )
  }
}

