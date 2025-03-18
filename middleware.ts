import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only apply to Printify API routes
  if (request.nextUrl.pathname.startsWith("/api/printify")) {
    // Check if API key is set
    const apiKey = process.env.PRINTIFY_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "PRINTIFY_API_KEY environment variable is not set",
          message: "Please add your Printify API key to your environment variables in Vercel",
        },
        { status: 401 },
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/printify/:path*"],
}

