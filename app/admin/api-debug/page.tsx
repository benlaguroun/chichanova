"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, Copy } from "lucide-react"

export default function ApiDebugPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [apiKeyExists, setApiKeyExists] = useState(false)
  const [shopId, setShopId] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    const checkConfiguration = async () => {
      try {
        setIsLoading(true)

        // Check environment variables
        const envResponse = await fetch("/api/test-env")
        const envData = await envResponse.json()
        setApiKeyExists(envData.apiKeyExists)
        setEnvVars(envData)

        // Try to get shop ID
        const shopResponse = await fetch("/api/printify/get-shop-id")
        const shopData = await shopResponse.json()
        setShopId(shopData.shopId)

        // Try to fetch products
        const productsResponse = await fetch("/api/printify/products")
        const productsData = await productsResponse.json()
        setApiResponse(productsData)

        if (productsData.error) {
          setError(productsData.error)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    checkConfiguration()
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">API Debug Page</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading API diagnostics...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Environment Configuration</CardTitle>
              <CardDescription>Status of your API configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">API Key:</span>
                  <span>{apiKeyExists ? "✅ Set" : "❌ Not Set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">API Key First Chars:</span>
                  <span>{envVars.apiKeyFirstChars || "Not available"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shop ID:</span>
                  <span>{shopId || "Not found"}</span>
                </div>
                {error && (
                  <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>Error: {error}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRefresh}>Refresh</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products API Response</CardTitle>
              <CardDescription>Raw response from the products API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-xs">{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2))}
                className="flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Response
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Steps</CardTitle>
              <CardDescription>Try these steps to resolve API issues</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Verify that your <code>PRINTIFY_API_KEY</code> is correctly set in your Vercel environment variables.
                </li>
                <li>Check that your API key has the correct permissions in Printify.</li>
                <li>Verify that your Printify shop is active and has products.</li>
                <li>Try regenerating your API key in Printify if you continue to have issues.</li>
                <li>Check the browser console for any CORS or network errors.</li>
                <li>Ensure your Vercel deployment has finished building completely.</li>
                <li>
                  Visit the{" "}
                  <a href="/admin/printify-status" className="text-primary hover:underline">
                    Printify Status
                  </a>{" "}
                  page for more detailed diagnostics.
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

