"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

export default function ApiTestPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [envVars, setEnvVars] = useState<any>(null)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkApi = async () => {
      try {
        setIsLoading(true)

        // Check environment variables
        const envResponse = await fetch("/api/debug-env")
        const envData = await envResponse.json()
        setEnvVars(envData)

        // Try to fetch products
        const apiResponse = await fetch("/api/printify/products")
        const apiData = await apiResponse.json()
        setApiResponse(apiData)

        if (apiData.error) {
          setError(apiData.error)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    checkApi()
  }, [])

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Testing API connection...</span>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Status of your API configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">API Key:</span>
                  <span>{envVars?.printifyApiKeyExists ? "✅ Set" : "❌ Not Set"}</span>
                </div>
                {envVars?.printifyApiKeyExists && (
                  <div className="flex justify-between">
                    <span className="font-medium">API Key Value:</span>
                    <span>{envVars.printifyApiKeyFirstChars}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Shop ID:</span>
                  <span>{envVars?.printifyShopIdExists ? "✅ Set" : "⚠️ Will be auto-detected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Environment:</span>
                  <span>{envVars?.nodeEnv || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vercel Environment:</span>
                  <span>{envVars?.vercelEnv || "Not on Vercel"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Response</CardTitle>
              <CardDescription>Response from the Printify API</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 p-3 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Error: {error}</span>
                  </div>
                </div>
              ) : apiResponse?.products?.length > 0 ? (
                <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-3 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>
                      Successfully fetched {apiResponse.products.length} products from {apiResponse.source}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 p-3 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>No products found or unexpected response format</span>
                  </div>
                </div>
              )}

              <div className="mt-4 bg-secondary p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-xs">{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRetry}>Retry API Test</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

