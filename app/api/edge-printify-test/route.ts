import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.PRINTIFY_API_KEY

    // Log the API key length and first few characters for debugging
    console.log(
      `API Key exists: ${!!apiKey}, Length: ${apiKey?.length || 0}, First chars: ${apiKey?.substring(0, 4)}...`,
    )

    // Return early if no API key
    if (!apiKey) {
      return NextResponse.json({
        error: "PRINTIFY_API_KEY not set",
        environment: process.env.NODE_ENV,
        vercelEnvironment: process.env.VERCEL_ENV,
      })
    }

    // Create a simple fetch with detailed logging and error handling
    console.log("Starting edge runtime fetch to Printify API...")

    const startTime = Date.now()
    let responseReceived = false

    try {
      // Simple fetch to Printify API (no timeout in Edge Runtime)
      console.log("Sending request to Printify API from Edge Runtime...")
      const response = await fetch("https://api.printify.com/v1/shops.json", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      responseReceived = true

      const endTime = Date.now()
      console.log(`Received response in ${endTime - startTime}ms`)

      // Get response details
      const status = response.status
      const statusText = response.statusText
      const headers = Object.fromEntries(response.headers.entries())

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error (${status}): ${errorText}`)

        return NextResponse.json({
          error: "Failed to connect to Printify API from Edge Runtime",
          status,
          statusText,
          headers,
          errorDetails: errorText,
          responseTime: `${endTime - startTime}ms`,
          apiKeyLength: apiKey.length,
          runtime: "edge",
        })
      }

      const data = await response.json()

      return NextResponse.json({
        success: true,
        status,
        statusText,
        headers,
        data,
        responseTime: `${endTime - startTime}ms`,
        apiKeyLength: apiKey.length,
        runtime: "edge",
      })
    } catch (fetchError) {
      const endTime = Date.now()
      console.error(`Fetch error: ${fetchError.name} - ${fetchError.message}`)

      return NextResponse.json({
        error: "Error fetching from Printify API from Edge Runtime",
        errorType: fetchError.name,
        errorMessage: fetchError.message,
        responseReceived,
        responseTime: `${endTime - startTime}ms`,
        apiKeyLength: apiKey?.length || 0,
        runtime: "edge",
      })
    }
  } catch (error) {
    console.error("Unexpected error:", error)

    return NextResponse.json({
      error: "Unexpected error in edge test endpoint",
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      runtime: "edge",
    })
  }
}

