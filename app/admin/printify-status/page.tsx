"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, CheckCircle, Copy, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function PrintifyStatusPage() {
  const [status, setStatus] = useState<"loading" | "success" | "warning" | "error">("loading")
  const [message, setMessage] = useState<string>("")
  const [shopId, setShopId] = useState<string | null>(null)
  const [apiKeyExists, setApiKeyExists] = useState<boolean>(false)
  const [apiKeyFirstChars, setApiKeyFirstChars] = useState<string>("")
  const [usingMockData, setUsingMockData] = useState<boolean>(false)

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const res = await fetch("/api/test-env")
        const data = await res.json()

        setApiKeyExists(data.apiKeyExists)
        setApiKeyFirstChars(data.apiKeyFirstChars)

        if (!data.apiKeyExists) {
          setStatus("error")
          setMessage("PRINTIFY_API_KEY environment variable is not set")
          return
        }

        // Try to get shop ID
        const shopRes = await fetch("/api/printify/get-shop-id")
        const shopData = await shopRes.json()

        if (shopData.error) {
          setStatus("warning")
          setMessage(shopData.error)
          setUsingMockData(true)
          setShopId("mock-shop-id (fallback)")
          return
        }

        setShopId(shopData.shopId)

        if (shopData.shopId.startsWith("mock")) {
          setStatus("warning")
          setMessage("No shops found for this API key. Using mock data.")
          setUsingMockData(true)
        } else {
          setStatus("success")
          setMessage("Printify API is correctly configured")
          setUsingMockData(false)
        }
      } catch (error) {
        setStatus("error")
        setMessage("Error checking Printify configuration")
        console.error(error)
      }
    }

    checkApiKey()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Printify Integration Status</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Status of your Printify API connection</CardDescription>
          </CardHeader>
          <CardContent>
            {status === "loading" && (
              <div className="flex items-center gap-2 text-yellow-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Checking configuration...</span>
              </div>
            )}

            {status === "success" && (
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle className="h-5 w-5" />
                <span>Printify API configured successfully!</span>
              </div>
            )}

            {status === "warning" && (
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertTriangle className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">API Key:</span>
                <span>{apiKeyExists ? "✅ Set" : "❌ Not Set"}</span>
              </div>

              {apiKeyExists && apiKeyFirstChars && (
                <div className="flex justify-between">
                  <span className="font-medium">API Key Value:</span>
                  <span>{apiKeyFirstChars}</span>
                </div>
              )}

              {shopId && (
                <div className="flex justify-between">
                  <span className="font-medium">Shop ID:</span>
                  <span className="flex items-center gap-1">
                    {shopId}
                    {!shopId.includes("mock") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                        onClick={() => {
                          navigator.clipboard.writeText(shopId)
                          alert("Shop ID copied to clipboard")
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </span>
                </div>
              )}

              {usingMockData && (
                <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-md">
                  <p className="text-sm">
                    <strong>Note:</strong> Your site is currently using mock data instead of real Printify products.
                    This allows you to develop and test your site without a valid Printify shop.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 items-start">
            <p className="text-sm text-muted-foreground">
              The Printify API key should be added as an environment variable named <code>PRINTIFY_API_KEY</code> in
              your Vercel project settings.
            </p>

            <Button asChild>
              <Link href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                Go to Vercel Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>What to do after configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Add your Printify API key to Vercel environment variables</li>
              <li>Set your PRINTIFY_SHOP_ID environment variable (optional, will be auto-detected)</li>
              <li>Deploy your project to Vercel</li>
              <li>Test the product listing page to ensure products are fetched correctly</li>
              <li>Create test orders to ensure checkout works (using test mode)</li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/products">View Your Products</Link>
              </Button>
              <Button asChild>
                <Link href="https://printify.com/app/dashboard" target="_blank" rel="noopener noreferrer">
                  Go to Printify Dashboard
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

